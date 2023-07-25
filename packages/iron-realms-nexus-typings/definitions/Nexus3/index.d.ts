import { Group, Reflex, Package, WaitForAction, Action, FunctionReflex } from '../Reflexes';

export interface ReflexPackages {
  set_reflexes: (ref: Reflexes) => void;
  list: () => ReflexPackage[];
  encode: () => EncodedReflex[];
  apply: (list: ReflexPackage[]) => void;
  create: (name: string, description: string) => ReflexPackage;
  add: (package: ReflexPackage) => void;
  replace: (idx: number, pkg: ReflexPackage) => void;
  move: (from: number, to: number) => void;
  exists: (name: string, case_sensitive: boolean) => number;
  set_enabled: (idx: number, enable: boolean) => void;
  get: (name: string, case_sensitive: boolean) => ReflexPackage | undefined;
  get_idx: (idx: number) => ReflexPackage | undefined;
  remove: (name: string) => void;
  remove_idx: (idx: number) => void;
  reflex_package_merge_reflexes_recurs: (group: Group, ref: EncodedReflex, pkg: string) => void;
  reflex_package_merge_reflexes: (pkg: Group, ref: EncodedReflex) => void;
  create_default_reflex_packages: () => void;
}

export interface ReflexPackage extends Package {
  encode: () => EncodedReflex;
  apply: (e: EncodedReflex, reflexes: Reflexes) => void;
  duplicate: () => ReflexPackage;
}

export interface Reflexes {
  clear: () => void;
  set_packages: (pkgs: ReflexPackages) => void;
  packages: () => ReflexPackages;
  create: (type: 'group' | 'function' | 'alias' | 'keybind' | 'trigger' | 'event', name: string) => Reflex | null;
  append: (r: Reflex, parent_group: Group | Package) => void;
  remove: (r: Reflex) => void;
  duplicate: (r: Reflex) => Reflex;
  move: (src: Group, dest: Reflex, pos: number) => void;
  enable_reflex: (el: Reflex) => void;
  reflexes_changed: () => void;
  master_group: () => Group;
  package_for_reflex: (r: Reflex) => Package | null;
  package_highest_id: (pkg: Package) => number;
  find_by_id: (id: number, pkg_idx: number | undefined | null) => Reflex | null;
  find_by_name: (
    type: 'group' | 'function' | 'alias' | 'keybind' | 'trigger' | 'event',
    name: string,
    case_sensitive: boolean,
    enabled_only: boolean,
    pkg: Package | number | string,
  ) => Reflex | undefined;
  traverse: (
    fn: (arg: Reflex) => string | undefined,
    group: Group | Package | null,
    include_groups: boolean,
    include_packages: boolean,
  ) => void;
  get_flat_list: (type: 'group' | 'function' | 'alias' | 'keybind' | 'trigger' | 'event', active: boolean) => Reflex[];
  get_active_list: (type: 'group' | 'function' | 'alias' | 'keybind' | 'trigger' | 'event') => Reflex[];
  get_package_list: () => ReflexPackage[];
  determine_package_for_reflex: (r: Reflex) => Package | null;
  encode: (e: Reflex | null) => EncodedReflex;
  apply: (list: unknown[]) => void;
  add_waiting_action: (action: WaitForAction) => void;
  match_waiting_actions: (text: string, block: unknown, idx: number) => void;
  make_action: (
    atype:
      | 'script'
      | 'command'
      | 'notify'
      | 'notification'
      | 'sound'
      | 'wait'
      | 'waitfor'
      | 'variable'
      | 'if'
      | 'repeat'
      | 'label'
      | 'goto'
      | 'stop'
      | 'button'
      | 'disableme'
      | 'disable'
      | 'enable'
      | 'function',
  ) => Action;
  find_function_by_name: (name: string, enabled: boolean, pkg: Package | number | string) => FunctionReflex | undefined;
  handle_functions: (input: string) => string | false;
  run_function: (name: string, args: unknown[] | undefined, pkg: Package | number | string) => void;
}

export interface EncodedReflex {
  [key: string]: unknown;
}

export interface Interface {
  layout(): LayoutManager;
}

export interface LayoutManager {
  register_custom_tab(name: string, component?: string | React.JSX.Element): void;
  custom_tabs(): { [key: string]: unknown };
  unregister_custom_tab(name: string): void;
}

export interface NexusPlatform {
  real_mobile(): boolean;
  is_desktop(): boolean;
}
