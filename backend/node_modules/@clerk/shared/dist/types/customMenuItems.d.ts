//#region src/types/customMenuItems.d.ts
type CustomMenuItem = {
  label: string;
  href?: string;
  onClick?: () => void;
  open?: string;
  mountIcon?: (el: HTMLDivElement) => void;
  unmountIcon?: (el?: HTMLDivElement) => void;
  mount?: (el: HTMLDivElement) => void;
  unmount?: (el?: HTMLDivElement) => void;
};
//#endregion
export { CustomMenuItem };