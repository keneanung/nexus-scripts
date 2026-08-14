import {
  Action,
  IfAction,
  LabelAction,
  RepeatAction,
  WaitAction,
} from '@keneanung/iron-realms-nexus-typings';

export type ParentReflexType = 'alias' | 'trigger' | 'keybind' | 'event';

export interface ConversionDiagnostic {
  severity: 'warning' | 'error';
  code: string;
  message: string;
  reflexName?: string;
  actionIndex?: number;
}

export interface ActionConversionResult {
  script: string;
  diagnostics: ConversionDiagnostic[];
}

interface ActionNode {
  kind: 'action';
  action: Action;
  index: number;
}

interface LabelNode {
  kind: 'label';
  action: LabelAction;
  index: number;
}

interface LoopNode {
  kind: 'loop';
  action: RepeatAction;
  index: number;
  end: number;
  children: Node[];
}

type Node = ActionNode | LabelNode | LoopNode;

interface RepeatRegion {
  start: number;
  end: number;
  action: RepeatAction;
  valid: boolean;
}

interface LabelInfo {
  index: number;
  functionName: string;
}

export interface ReadableCompilerOptions {
  actions: Action[];
  parentReflexName: string;
  renderAction: (action: Action) => string;
}

const controlActions = new Set(['if', 'repeat', 'label', 'goto']);

const safeIdentifier = (label: string, used: Set<string>) => {
  const base =
    `label_${label}`
      .normalize('NFKD')
      .replace(/[^A-Za-z0-9_$]+/g, '_')
      .replace(/^([^A-Za-z_$])/, '_$1') || 'label';
  let result = base;
  let suffix = 2;
  while (used.has(result)) {
    result = `${base}_${suffix++}`;
  }
  used.add(result);
  return result;
};

const diagnosticComment = (diagnostic: ConversionDiagnostic) =>
  `// ${diagnostic.severity.toUpperCase()} [${diagnostic.code}]: ${diagnostic.message}`;

/**
 * Returns whether an action list needs structured, teaching-oriented compilation.
 * @param {Action[]} actions The actions to inspect.
 * @returns {boolean} Whether the readable compiler is required.
 */
export const needsReadableCompiler = (actions: Action[]) =>
  actions.some((action) => controlActions.has(action.action));

/**
 * Compiles structured simplified-scripting actions to readable JavaScript.
 * @param {ReadableCompilerOptions} options The actions and rendering context.
 * @returns {ActionConversionResult} Generated JavaScript and any teaching diagnostics.
 */
export const compileReadableActions = (options: ReadableCompilerOptions): ActionConversionResult => {
  const { actions, parentReflexName, renderAction } = options;
  const diagnostics: ConversionDiagnostic[] = [];
  const diagnosticsByIndex = new Map<number, ConversionDiagnostic[]>();
  const diagnosed = new Set<string>();

  const addDiagnostic = (diagnostic: Omit<ConversionDiagnostic, 'reflexName'>) => {
    const complete = { ...diagnostic, reflexName: parentReflexName };
    const key = `${complete.code}:${complete.actionIndex ?? ''}:${complete.message}`;
    if (diagnosed.has(key)) return complete;
    diagnosed.add(key);
    diagnostics.push(complete);
    if (complete.actionIndex !== undefined) {
      const existing = diagnosticsByIndex.get(complete.actionIndex) ?? [];
      existing.push(complete);
      diagnosticsByIndex.set(complete.actionIndex, existing);
    }
    return complete;
  };

  const usedNames = new Set<string>();
  const labels = new Map<string, LabelInfo>();
  actions.forEach((action, index) => {
    if (action.action !== 'label') return;
    if (labels.has(action.label)) {
      addDiagnostic({
        severity: 'warning',
        code: 'NSSC_DUPLICATE_LABEL',
        message: `Label ${JSON.stringify(action.label)} is duplicated; jumps use its first occurrence.`,
        actionIndex: index,
      });
      return;
    }
    labels.set(action.label, { index, functionName: safeIdentifier(action.label, usedNames) });
  });

  const jumpTargets = new Set<string>();
  actions.forEach((action) => {
    if (action.action === 'goto') jumpTargets.add(action.label);
    if (action.action === 'if') {
      if (action.dothen === 'jump') jumpTargets.add(action.dothenlabel);
      if (action.doelse === 'jump') jumpTargets.add(action.doelselabel);
    }
  });

  const repeatRegions: RepeatRegion[] = [];
  actions.forEach((action, index) => {
    if (action.action !== 'repeat') return;
    const target = labels.get(action.label);
    const region: RepeatRegion = { start: index, end: target?.index ?? -1, action, valid: true };
    if (!target) {
      region.valid = false;
      addDiagnostic({
        severity: 'warning',
        code: 'NSSC_REPEAT_LABEL_MISSING',
        message: `Repeat target ${JSON.stringify(action.label)} does not exist; add the loop manually.`,
        actionIndex: index,
      });
    } else if (target.index <= index) {
      region.valid = false;
      addDiagnostic({
        severity: 'warning',
        code: 'NSSC_REPEAT_LABEL_NOT_FORWARD',
        message: `Repeat target ${JSON.stringify(action.label)} is not after the Repeat action; add the loop manually.`,
        actionIndex: index,
      });
    } else if (jumpTargets.has(action.label)) {
      region.valid = false;
      addDiagnostic({
        severity: 'warning',
        code: 'NSSC_REPEAT_EXTERNAL_ENTRY',
        message: `Repeat target ${JSON.stringify(action.label)} is also a jump target, so the loop cannot be structured safely.`,
        actionIndex: index,
      });
    } else if (actions.slice(index + 1, target.index).some((item) => item.action === 'wait')) {
      region.valid = false;
      addDiagnostic({
        severity: 'warning',
        code: 'NSSC_REPEAT_ASYNC_WAIT',
        message: `Repeat ending at ${JSON.stringify(action.label)} contains Wait; convert this loop to async JavaScript manually.`,
        actionIndex: index,
      });
    }
    repeatRegions.push(region);
  });

  for (let first = 0; first < repeatRegions.length; first++) {
    for (let second = first + 1; second < repeatRegions.length; second++) {
      const a = repeatRegions[first];
      const b = repeatRegions[second];
      if (!a.valid || !b.valid) continue;
      if (a.end === b.end) {
        a.valid = false;
        b.valid = false;
        for (const region of [a, b]) {
          addDiagnostic({
            severity: 'warning',
            code: 'NSSC_REPEAT_SHARED_LABEL',
            message: `Multiple Repeat actions use ${JSON.stringify(region.action.label)} as their boundary; add these loops manually.`,
            actionIndex: region.start,
          });
        }
        continue;
      }
      const crossing =
        (a.start < b.start && b.start < a.end && a.end < b.end) ||
        (b.start < a.start && a.start < b.end && b.end < a.end);
      if (!crossing) continue;
      a.valid = false;
      b.valid = false;
      for (const region of [a, b]) {
        addDiagnostic({
          severity: 'warning',
          code: 'NSSC_REPEAT_OVERLAP',
          message: `Repeat ending at ${JSON.stringify(region.action.label)} overlaps another loop; add the loop manually.`,
          actionIndex: region.start,
        });
      }
    }
  }

  let changed = true;
  while (changed) {
    changed = false;
    for (const region of repeatRegions.filter((item) => item.valid)) {
      const internalLabels = actions
        .map((action, index) => ({ action, index }))
        .filter(({ action, index }) => action.action === 'label' && index > region.start && index < region.end);
      const allAreNestedRepeatEnds = internalLabels.every(({ index }) =>
        repeatRegions.some(
          (candidate) =>
            candidate.valid && candidate.start > region.start && candidate.end === index && candidate.end < region.end,
        ),
      );
      if (allAreNestedRepeatEnds) continue;
      region.valid = false;
      changed = true;
      addDiagnostic({
        severity: 'warning',
        code: 'NSSC_REPEAT_UNSTRUCTURED_LABEL',
        message: `Repeat ending at ${JSON.stringify(region.action.label)} contains a label that is not a nested loop boundary.`,
        actionIndex: region.start,
      });
    }
  }

  const validRepeatByStart = new Map(
    repeatRegions.filter((region) => region.valid).map((region) => [region.start, region]),
  );
  const consumedRepeatLabels = new Set(repeatRegions.filter((region) => region.valid).map((region) => region.end));

  const buildNodes = (start: number, end: number): Node[] => {
    const nodes: Node[] = [];
    let index = start;
    while (index < end) {
      const repeat = validRepeatByStart.get(index);
      if (repeat && repeat.end < end) {
        nodes.push({
          kind: 'loop',
          action: repeat.action,
          index,
          end: repeat.end,
          children: buildNodes(index + 1, repeat.end),
        });
        index = repeat.end + 1;
        continue;
      }
      const action = actions[index];
      if (action.action === 'label' && !consumedRepeatLabels.has(index)) {
        if (labels.get(action.label)?.index === index) nodes.push({ kind: 'label', action, index });
        else nodes.push({ kind: 'action', action, index });
      } else if (action.action !== 'label') {
        nodes.push({ kind: 'action', action, index });
      }
      index++;
    }
    return nodes;
  };

  const nodes = buildNodes(0, actions.length);
  const hasConditions = actions.some((action) => action.action === 'if' || (action.action === 'repeat' && action.mode === 'while'));
  const hasValues = hasConditions || actions.some((action) => action.action === 'repeat' && action.mode === 'count');
  const preamble: string[] = [];

  if (hasValues) {
    preamble.push(`const _nsscValue = (type, value) => {
  if (!type || type === 'value') return value;
  if (type === 'variable') return nexusclient.variables().get(value.startsWith('@') ? value.slice(1) : value);
  if (type === 'target') return nexusclient.datahandler().current_target();
  if (type === 'capture') return args ? args[parseInt(value)] : undefined;
};`);
  }
  if (hasConditions) {
    preamble.push(`const _nsscCompare = (left, right, operator, caseSensitive, negate) => {
  left = left == null ? '' : left;
  right = right == null ? '' : right;
  if (!caseSensitive) {
    if (typeof left === 'string') left = left.toLowerCase();
    if (typeof right === 'string') right = right.toLowerCase();
  }
  if (isFinite(left)) left = parseFloat(left);
  if (isFinite(right)) right = parseFloat(right);
  let result = false;
  if (operator === 'eq') result = left === right;
  else if (operator === 'greater') result = left > right;
  else if (operator === 'smaller') result = left < right;
  else if (operator === 'starts') result = left.toString().startsWith(right.toString());
  else if (operator === 'ends') result = left.toString().endsWith(right.toString());
  return negate ? !result : result;
};`);
  }

  const conditionExpression = (action: IfAction | RepeatAction) =>
    `_nsscCompare(_nsscValue(${JSON.stringify(action['cond-type1'])}, ${JSON.stringify(action['cond-val1'])}), ` +
    `_nsscValue(${JSON.stringify(action['cond-type2'])}, ${JSON.stringify(action['cond-val2'])}), ` +
    `${JSON.stringify(action['cond-op'])}, ${JSON.stringify(action['cond-cs'])}, ${JSON.stringify(action['cond-mod'] === 'not')})`;

  const jumpStatement = (label: string, actionIndex: number) => {
    const target = labels.get(label);
    if (!target) {
      const diagnostic = addDiagnostic({
        severity: 'warning',
        code: 'NSSC_JUMP_LABEL_MISSING',
        message: `Jump target ${JSON.stringify(label)} does not exist; Nexus would continue with the next action.`,
        actionIndex,
      });
      return `${diagnosticComment(diagnostic)}\n// TODO: The label ${JSON.stringify(label)} does not exist; continuing instead.`;
    }
    if (target.index < actionIndex) {
      const diagnostic = addDiagnostic({
        severity: 'warning',
        code: 'NSSC_BACKWARD_GOTO_RECURSION',
        message: `Backward jump to ${JSON.stringify(label)} becomes a recursive function call and may exhaust the call stack.`,
        actionIndex,
      });
      return `${diagnosticComment(diagnostic)}\nreturn ${target.functionName}();`;
    }
    return `return ${target.functionName}();`;
  };

  const branchStatement = (mode: IfAction['dothen'], label: string, actionIndex: number) => {
    if (mode === 'stop') return 'return;';
    if (mode === 'jump') return jumpStatement(label, actionIndex);
    return '// Continue with the next action.';
  };

  const actionPrefix = (index: number, action: Action) => {
    const comments = (diagnosticsByIndex.get(index) ?? []).map(diagnosticComment);
    return [...comments, `// ${action.action} action (index ${index})`];
  };

  const emitSequence = (sequence: Node[], continuation?: string): string => {
    const result: string[] = [];
    for (let position = 0; position < sequence.length; position++) {
      const node = sequence[position];
      if (node.kind === 'label') continue;
      if (node.kind === 'loop') {
        result.push(...actionPrefix(node.index, node.action));
        if (node.action.mode === 'while') {
          result.push(`while (${conditionExpression(node.action)}) {`);
        } else {
          const countName = `_nsscRepeat${node.index}`;
          result.push(
            `for (let ${countName} = parseInt(_nsscValue(${JSON.stringify(node.action.counttype)}, ${JSON.stringify(node.action.count)})) || 0; ${countName} > 0; ${countName}--) {`,
          );
        }
        result.push(emitSequence(node.children));
        result.push('}');
        continue;
      }

      const { action, index } = node;
      result.push(...actionPrefix(index, action));
      if (action.action === 'if') {
        result.push(`if (${conditionExpression(action)}) {`);
        result.push(branchStatement(action.dothen, action.dothenlabel, index));
        result.push('} else {');
        result.push(branchStatement(action.doelse, action.doelselabel, index));
        result.push('}');
      } else if (action.action === 'goto') {
        result.push(jumpStatement(action.label, index));
      } else if (action.action === 'repeat') {
        result.push('// TODO: This Repeat could not be represented as a safe, structured JavaScript loop.');
      } else if (action.action === 'label') {
        result.push('// Duplicate label; the first label with this name remains the jump target.');
      } else if (action.action === 'wait') {
        const wait = action as WaitAction;
        const delay = parseInt(wait.seconds) * 1000 + parseInt(wait.milliseconds);
        result.push('setTimeout(() => {');
        result.push(emitSequence(sequence.slice(position + 1), continuation));
        result.push(`}, ${Number.isNaN(delay) ? 0 : delay});`);
        result.push('return;');
        return result.join('\n');
      } else {
        result.push(renderAction(action));
      }
    }
    if (continuation) result.push(continuation);
    return result.join('\n');
  };

  interface Segment {
    label?: LabelNode;
    nodes: Node[];
  }
  const segments: Segment[] = [{ nodes: [] }];
  for (const node of nodes) {
    if (node.kind === 'label') segments.push({ label: node, nodes: [] });
    else segments[segments.length - 1].nodes.push(node);
  }

  const declarations: string[] = [];
  for (let index = 1; index < segments.length; index++) {
    const segment = segments[index];
    if (!segment.label) continue;
    const info = labels.get(segment.label.action.label);
    if (!info || info.index !== segment.label.index) continue;
    const next = segments.slice(index + 1).find((candidate) => {
      if (!candidate.label) return false;
      const nextInfo = labels.get(candidate.label.action.label);
      return nextInfo?.index === candidate.label.index;
    });
    const nextInfo = next?.label ? labels.get(next.label.action.label) : undefined;
    declarations.push(`function ${info.functionName}() {
${emitSequence(segment.nodes, nextInfo ? `return ${nextInfo.functionName}();` : undefined)}
}`);
  }

  const firstLabelSegment = segments.slice(1).find((segment) => {
    if (!segment.label) return false;
    return labels.get(segment.label.action.label)?.index === segment.label.index;
  });
  const firstLabelInfo = firstLabelSegment?.label ? labels.get(firstLabelSegment.label.action.label) : undefined;
  const main = emitSequence(segments[0].nodes, firstLabelInfo ? `return ${firstLabelInfo.functionName}();` : undefined);

  return {
    script: [...preamble, ...declarations, main].filter(Boolean).join('\n\n'),
    diagnostics,
  };
};
