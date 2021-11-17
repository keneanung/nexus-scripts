declare namespace client{
    export interface ScriptAction {
        action: 'script',
        script: string,
    }

    export type Action = client.ScriptAction;
}