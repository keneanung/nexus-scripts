declare namespace client{

    /**
     * Action that runs a given JavaScript.
     */
    export interface ScriptAction {
        /**
         * Internal: used to find the type of this action.
         */
        action: 'script',

        /**
         * Script that should be ran as the action.
         */
        script: string,
    }

    export interface CommandAction {
        action: 'command',
        command: string
        prefix_suffix: boolean
    }

    export interface NotifyAction {
        action: 'notify',
        notice: string,
        notice_fg: string,
        notice_bg: string
    }

    export interface NotificationAction {
        action: 'notification',
        heading : string,
        text: string
    }

    export interface SoundAction {
        action: 'sound',
        sound: string
    }

    export interface WaitAction {
        action: 'wait',
        seconds: string,
        milliseconds: string
    }

    export interface WaitForAction {
        action: 'waitfor',
        text: string,
        matching: 'substring' | 'begins' | 'regexp' | 'exact',
        whole_words: boolean,
        case_sensitive: boolean,
        expire: string
    }

    export interface VariableAction {
        action: 'variable',
        varname: string,
        valtype: 'variable' | 'target' | 'value',
        value: string,
        op: 'set' | 'del' | 'add' | 'sub' | 'mul' | 'div'
    }

    export interface IfAction {
        action: 'if',
        'cond-type1': 'variable' | 'target' | 'value',
        'cond-val1': string,
        'cond-type2': 'variable' | 'target' | 'value',
        'cond-val2': string,
        'cond-op': 'eq' | 'greater' | 'smaller' | 'starts' | 'ends',
        'cond-mod': '' | 'not',
        'cond-cs': boolean,
        dothen: 'continue' | 'stop'| 'jump',
        doelse: 'continue' | 'stop'| 'jump',
        dothenlabel: string,
        doelselabel: string
    }

    export interface RepeatAction {
        action: 'repeat',
        'cond-type1': 'variable' | 'target' | 'value',
        'cond-val1': string,
        'cond-type2': 'variable' | 'target' | 'value',
        'cond-val2': string,
        'cond-op': 'eq' | 'greater' | 'smaller' | 'starts' | 'ends',
        'cond-mod': '' | 'not',
        'cond-cs': boolean,
        label: string,
        mode: 'count' | 'while'
    }

    export interface LabelAction {
        action: 'label',
        label: string
    }

    export interface GotoAction {
        action: 'goto',
        label: string
    }

    export interface StopAction {
        action: 'stop'
    }

    export interface ButtonAction {
        action: 'button',
        label: string,
        buttonid: string,
        buttonaction: 'label' | 'command' | 'highlight' | 'unhighlight' | 'default',
        command: string
    }

    export interface DisablemeAction {
        action: 'disableme'
    }

    export interface DisableAction {
        action: 'disable',
        type: 'group' | 'alias' | 'trigger' | 'keybind' | 'event',
        name: string
    }

    export interface EnableAction {
        action: 'enable',
        type: 'group' | 'alias' | 'trigger' | 'keybind' | 'event',
        name: string
    }

    /**
     * Action which runs a given function.
     */
    export interface FunctionAction {
        /**
         * Internal: used to find the type of this action.
         */
        action: 'function',

        /**
         * Function to run.
         */
        fn: string
    }

    /**
     * Type that encompasses all action types.
     */
    export type Action = client.ScriptAction | client.CommandAction | client.NotifyAction | client.NotificationAction | client.SoundAction | client.WaitAction | client.WaitForAction | client.VariableAction | client.IfAction | client.RepeatAction | client.LabelAction | client.GotoAction | client.StopAction | client.ButtonAction | client.DisablemeAction | client.DisableAction | client.EnableAction | client.FunctionAction;
}