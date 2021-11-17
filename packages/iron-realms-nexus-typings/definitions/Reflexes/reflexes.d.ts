declare namespace client {
    export interface Group {
        name: string,
        id: number,
        type: 'group',
        enabled: boolean,
        items: client.Reflex[],
    }

    export interface Function {
        name: string,
        id: number,
        type: 'function',
        enabled: boolean,
        code: string,
    }

    export interface Alias {
        name: string,
        id: number,
        type: 'alias',
        enabled: boolean,
        matching: 'exact' | 'begins' | 'regexp',
        whole_words: boolean,
        case_sensitive: boolean,
        prefix_suffix: boolean,
        text: string,
        actions: client.Action[],
    }

    export interface Keybind {
        name: string,
        id: number,
        type: 'keybind',
        enabled: boolean,
        key: number,
        key_alt: boolean,
        key_ctrl: boolean,
        key_shift: boolean,
        actions: client.Action[],
    }

    export interface Trigger {
        name: string,
        id: number,
        type: 'trigger',
        enabled: boolean,
        text: string,
        matching: 'exact' | 'begins' | 'regexp' | 'substring',
        whole_words: boolean,
        case_sensitive: boolean,
        actions: client.Action[],
    }

    export interface Event {
        name: string,
        id: number,
        type: 'event',
        enabled: boolean,
        evtype: 'GMCP',
        evsubtype: 'Char.Vitals' | 'Char.Afflictions.Add' | 'Char.Afflictions.Remove' | 'Char.Defences.Add' | 'Char.Defences.Remove' | 'Room.AddPlayer' | 'Room.RemovePlayer' | 'Room.Info' | 'IRE.Target.Set',
        actions: client.Action[],
    }

    export type Reflex = client.Group | client.Function | client.Alias | client.Keybind | client.Trigger | client.Event;
}