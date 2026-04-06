import * as client from '@keneanung/iron-realms-nexus-typings';

export type PackageFile = client.Package & {
  version?: string;
  dependencies?: string[];
  website?: string;
};

export type BuilderCompatibleScriptAction = Omit<client.ScriptAction, 'script'> & { scriptFile?: string };
export type BuilderCompatibleAction = Exclude<client.Action, client.ScriptAction> | BuilderCompatibleScriptAction;

export type BuilderCompatibleGroup = Omit<client.Group, 'id' | 'items'> & { items: BuilderCompatibleReflex[] };
export type BuilderCompatibleFunction = Omit<client.FunctionReflex, 'id' | 'code'> & { codeFile?: string };
export type BuilderCompatibleAlias = Omit<client.Alias, 'id' | 'actions'> & { actions: BuilderCompatibleAction[] };
export type BuilderCompatibleKeybind = Omit<client.Keybind, 'id' | 'actions'> & { actions: BuilderCompatibleAction[] };
export type BuilderCompatibleTrigger = Omit<client.Trigger, 'id' | 'actions'> & { actions: BuilderCompatibleAction[] };
export type BuilderCompatibleEvent = Omit<client.Event, 'id' | 'actions'> & { actions: BuilderCompatibleAction[] };

export type BuilderCompatibleReflex =
  | BuilderCompatibleGroup
  | BuilderCompatibleFunction
  | BuilderCompatibleAlias
  | BuilderCompatibleKeybind
  | BuilderCompatibleTrigger
  | BuilderCompatibleEvent;

export type BuilderCompatiblePackage = Omit<PackageFile, 'id' | 'items'> & { items: BuilderCompatibleReflex[] };
