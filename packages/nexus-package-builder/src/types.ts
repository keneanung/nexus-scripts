export type PartialPackage = Omit<Partial<client.Package>, 'items'> & { items?: PartialReflex[] } & {
  version?: string;
  dependencies?: string[];
  website?: string;
};

export type PartialReflex =
  | PartialAlias
  | PartialTrigger
  | PartialEvent
  | PartialFunction
  | PartialKeybind
  | PartialGroup;

export type PartialFunction = Partial<client.Function> & { codeFile?: string };
export type PartialGroup = Omit<Partial<client.Group>, 'items'> & { items?: PartialReflex[] };
export type PartialAlias = Omit<Partial<client.Alias>, 'actions'> & { actions?: PartialAction[] };
export type PartialTrigger = Omit<Partial<client.Trigger>, 'actions'> & { actions?: PartialAction[] };
export type PartialEvent = Omit<Partial<client.Event>, 'actions'> & { actions?: PartialAction[] };
export type PartialKeybind = Omit<Partial<client.Keybind>, 'actions'> & { actions?: PartialAction[] };

export type PartialAction =
  | Partial<client.ButtonAction>
  | Partial<client.CommandAction>
  | Partial<client.DisableAction>
  | client.DisablemeAction
  | Partial<client.EnableAction>
  | Partial<client.FunctionAction>
  | Partial<client.GotoAction>
  | Partial<client.IfAction>
  | Partial<client.LabelAction>
  | Partial<client.NotificationAction>
  | Partial<client.NotifyAction>
  | Partial<client.RepeatAction>
  | PartialScriptAction
  | Partial<client.SoundAction>
  | client.StopAction
  | Partial<client.VariableAction>
  | Partial<client.WaitAction>
  | Partial<client.WaitForAction>;
export type PartialScriptAction = Partial<client.ScriptAction> & { scriptFile?: string };
