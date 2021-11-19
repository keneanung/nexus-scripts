declare namespace client {
    /**
     * Interface for Nexus script packages.
     */
    export interface Package {
        /**
         * Package name
         */
        name: string,

        /**
         * Whether the package is enabled
         */
        enabled: boolean,

        /**
         * Description of the package
         */
        description: string,

        /**
         * Internal: used to find type of this reflex
         */
        type: 'group',

        /**
         * Unique identifier of this reflex
         */
        id: number,

        /**
         * Reflexes in this package
         */
        items: Reflex[]
    }

    /**
     * Interface for group type reflexes.
     */
    export interface Group {
        /**
         * Name of the group
         */
        name: string,

        /**
         * Unique identifier of this reflex
         */
        id: number,

        /**
         * Internal: used to find type of this reflex
         */
        type: 'group',

        /**
         * Whether the group is enabled
         */
        enabled: boolean,

        /**
         * Reflexes in this group
         */
        items: client.Reflex[],
    }

    /**
     * Interface for function type reflexes.
     */
    export interface Function {
        /**
         * Function name
         */
        name: string,

        /**
         * Unique identifier of this reflex
         */
        id: number,

        /**
         * Internal: used to find type of this reflex
         */
        type: 'function',

        /**
         * Whether the function is enabled
         */
        enabled: boolean,

        /**
         * Code of this function
         */
        code: string,
    }

    /**
     * Interface for alias type reflexes.
     */
    export interface Alias {
        /**
         * Alias name
         */
        name: string,

        /**
         * Unique identifier of this reflex
         */
        id: number,

        /**
         * Internal: used to find type of this reflex
         */
        type: 'alias',

        /**
         * Whether the alias is enabled
         */
        enabled: boolean,

        /**
         * Matching type of the alias:
         * * exact: The text must be matching exactly as is written here.
         * * begins: The text must begin with what is written here.
         * * regex: The text must match the regular expression that is written here.
         */
        matching: 'exact' | 'begins' | 'regexp',

        /**
         * Whether the match has to start at a word boundary
         */
        whole_words: boolean,

        /**
         * Whether the match is case sensitive
         */
        case_sensitive: boolean,

        /**
         * Whether to remember prefix and suffix. Not configurable through the UI.
         */
        prefix_suffix: boolean,

        /**
         * The text to match
         */
        text: string,

        /**
         * Actions to run on successful match
         */
        actions: client.Action[],
    }

    /**
     * Interface for keybind type reflexes.
     */
    export interface Keybind {
        /**
         * Keybind name
         */
        name: string,

        /**
         * Unique identifier of this reflex
         */
        id: number,

        /**
         * Internal: used to find type of this reflex
         */
        type: 'keybind',

        /**
         * Whether this keybind is enabled
         */
        enabled: boolean,

        /**
         * The key that triggers this keybind
         */
        key: number,

        /**
         * Whether the ALT key has to be pressed
         */
        key_alt: boolean,

        /**
         * Whether the CTRL key has to be pressed
         */
        key_ctrl: boolean,

        /**
         * Whether the shift key has to be pressed
         */
        key_shift: boolean,

        /**
         * Actions to run on successful match
         */
        actions: client.Action[],
    }

    /**
     * Interface for trigger type reflexes.
     */
    export interface Trigger {
        /**
         * Trigger name
         */
        name: string,

        /**
         * Unique identifier of this reflex
         */
        id: number,

        /**
         * Internal: used to find type of this reflex
         */
        type: 'trigger',

        /**
         * Whether this trigger is enabled
         */
        enabled: boolean,

        /**
         * The text to match.
         */
        text: string,

        /**
         * Matching type of the trigger:
         * * exact: The text must be matching exactly as is written here.
         * * begins: The text must begin with what is written here.
         * * regex: The text must match the regular expression that is written here.
         * * substring: The text must have a part that looks like it is written here.
         */
        matching: 'exact' | 'begins' | 'regexp' | 'substring',

        /**
         * Whether the match has to start at a word boundary
         */
        whole_words: boolean,

        /**
         * Whether the match is case sensitive
         */
        case_sensitive: boolean,

        /**
         * Actions to run on successful match
         */
        actions: client.Action[],
    }

    /**
     * Interface for event type reflexes.
     */
    export interface Event {
        /**
         * Event name
         */
        name: string,

        /**
         * Unique identifier of this reflex
         */
        id: number,

        /**
         * Internal: used to find type of this reflex
         */
        type: 'event',

        /**
         * Whether this event is enabled
         */
        enabled: boolean,

        /**
         * Currently, only GMCP events are supported
         */
        evtype: 'GMCP',

        /**
         * GMCP message that triggers the event
         */
        evsubtype: 'Char.Vitals' | 'Char.Afflictions.Add' | 'Char.Afflictions.Remove' | 'Char.Defences.Add' | 'Char.Defences.Remove' | 'Room.AddPlayer' | 'Room.RemovePlayer' | 'Room.Info' | 'IRE.Target.Set',

        /**
         * Actions to run on event
         */
        actions: client.Action[],
    }

    /**
     * Type that encompasses all reflex types.
     */
    export type Reflex = client.Group | client.Function | client.Alias | client.Keybind | client.Trigger | client.Event;
}