declare namespace nexusclient {
  export interface ReflexPackages {
    set_reflexes: (ref: Reflexes) => void
    list: () => ReflexPackage[]
    encode: () => EncodedReflex[]
    apply: (list: ReflexPackage[]) => void
    create: (name: string, description: string) => ReflexPackage
    add: (package: ReflexPackage) => void
    replace: (idx: number, pkg: ReflexPackage) => void
    move: (from: number, to: number) => void
    exists: (name: string, case_sensitive: boolean) => number
    set_enabled: (idx: number, enable: boolean) => void
    get: (name: string, case_sensitive: boolean) => (ReflexPackage | undefined)
    get_idx: (idx: number) => (ReflexPackage | undefined)
    remove: (name: string) => void
    remove_idx: (idx: number) => void
    reflex_package_merge_reflexes_recurs: (group: client.Group, ref: EncodedReflex, pkg: string) => void
    reflex_package_merge_reflexes: (pkg: client.Group, ref: EncodedReflex) => void
    create_default_reflex_packages: () => void
  }

  export interface ReflexPackage extends client.Package {
    encode:() => EncodedReflex
    apply: (e: EncodedReflex, reflexes: Reflexes) => void
    duplicate: () => ReflexPackage;
  }

  export interface Reflexes {
    clear: () => void
    set_packages: (pkgs: ReflexPackages) => void
    packages: () => ReflexPackages
    create: (type: 'group' | 'function' | 'alias' | 'keybind' | 'trigger' | 'event', name: string) => (client.Reflex | null)
    append: (r: client.Reflex, parent_group: client.Group | client.Package) => void
    remove: (r: client.Reflex) => void
    duplicate: (r: client.Reflex) => client.Reflex
    move: (src: client.Group, dest: client.Reflex, pos: number) => void
    enable_reflex: (el: client.Reflex) => void
    reflexes_changed: () => void
    master_group: () => client.Group
    package_for_reflex: (r: client.Reflex) => (client.Package | null)
    package_highest_id: (pkg: client.Package) => number
    find_by_id: (id: number, pkg_idx: number | undefined | null) => (client.Reflex | null)
    find_by_name: (type: 'group' | 'function' | 'alias' | 'keybind' | 'trigger' | 'event', name: string, case_sensitive: boolean, enabled_only: boolean, pkg: client.Package | number | string) => (client.Reflex | undefined)
    traverse: (fn: (arg: client.Reflex) => (string | undefined), group: client.Group | client.Package | null, include_groups: boolean, include_packages: boolean) => void
    get_flat_list: (type: 'group' | 'function' | 'alias' | 'keybind' | 'trigger' | 'event', active: boolean) => client.Reflex[]
    get_active_list: (ype: 'group' | 'function' | 'alias' | 'keybind' | 'trigger' | 'event') => client.Reflex[]
    get_package_list: () => ReflexPackage[]
    determine_package_for_reflex: (r: client.Reflex) => (client.Package | null)
    encode: (e: client.Reflex | null) => EncodedReflex
    apply: (list: any[]) => void
    add_waiting_action: (action: client.WaitForAction) => void
    match_waiting_actions: (text: string, block: any, idx: number) => void
    make_action: (atype: 'script' | 'command' | 'notify' | 'notification' | 'sound' | 'wait' | 'waitfor' | 'variable' | 'if' | 'repeat' | 'label' | 'goto' | 'stop' | 'button' | 'disableme' | 'disable' | 'enable' | 'function') => client.Action
    find_function_by_name: (name: string, enabled: boolean, pkg: client.Package | number | string) => (client.Function | undefined)
    handle_functions: (input: string) => (string | false)
    run_function: (name: string, args: any[] | undefined, pkg: client.Package | number | string) => void
  }

  export interface EncodedReflex {
    [key: string]: any
  }
}