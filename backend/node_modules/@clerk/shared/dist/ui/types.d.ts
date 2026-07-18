import { ModuleManager } from "../moduleManager.js";
import { Clerk, ClerkOptions } from "../types/clerk.js";
import { EnvironmentResource } from "../types/environment.js";
//#region src/ui/types.d.ts
type Appearance = any;
type UIVersion = string;
type ComponentControls = {
  mountComponent: (params: {
    appearanceKey: string;
    name: string;
    node: HTMLDivElement;
    props?: any;
  }) => void;
  unmountComponent: (params: {
    node: HTMLDivElement;
  }) => void;
  updateProps: (params: {
    appearance?: Appearance | undefined;
    options?: ClerkOptions | undefined;
    node?: HTMLDivElement;
    props?: unknown;
  }) => void;
  openModal: (modal: string, props?: any) => void;
  closeModal: (modal: string, options?: {
    notify?: boolean;
  }) => void;
  openDrawer: (drawer: string, props?: any) => void;
  closeDrawer: (drawer: string, options?: {
    notify?: boolean;
  }) => void;
  prefetch: (component: 'organizationSwitcher') => void;
  mountImpersonationFab: () => void;
};
interface ClerkUIInstance {
  version: string;
  ensureMounted: (opts?: {
    preloadHint?: string;
  }) => Promise<ComponentControls>;
}
interface ClerkUIConstructor {
  new (getClerk: () => Clerk, getEnvironment: () => EnvironmentResource | null | undefined, options: ClerkOptions, moduleManager: ModuleManager): ClerkUIInstance;
  version: string;
}
type ClerkUI = ClerkUIInstance;
//#endregion
export { ClerkUI, ClerkUIConstructor, ClerkUIInstance, ComponentControls, UIVersion };