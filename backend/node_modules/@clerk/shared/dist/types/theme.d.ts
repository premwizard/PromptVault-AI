//#region src/types/theme.d.ts
type EmUnit = string;
type FontWeight = string;
type BoxShadow = string;
type TransparentColor = 'transparent';
type BuiltInColors = 'black' | 'blue' | 'red' | 'green' | 'grey' | 'white' | 'yellow';
type HexColor = `#${string}`;
type HslaColor = {
  h: number;
  s: number;
  l: number;
  a?: number;
};
type RgbaColor = {
  r: number;
  g: number;
  b: number;
  a?: number;
};
type HexColorString = HexColor;
type HslaColorString = `hsl(${string})` | `hsla(${string})`;
type RgbaColorString = `rgb(${string})` | `rgba(${string})`;
type Color = string | HexColor | HslaColor | RgbaColor | TransparentColor;
type ColorString = HexColorString | HslaColorString | RgbaColorString;
//#endregion
export { BoxShadow, BuiltInColors, Color, ColorString, EmUnit, FontWeight, HexColor, HexColorString, HslaColor, HslaColorString, RgbaColor, RgbaColorString, TransparentColor };