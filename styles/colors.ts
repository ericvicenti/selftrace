import Color from './Color';

// Helper function
const rgb = (r: number, g: number, b: number): Color => new Color(r, g, b);

const PRIMARY = rgb(252, 10, 116);

export const Colors = {
  PRIMARY,
  SECONDARY: rgb(254, 39, 177),
  CLUSTER_BASE: PRIMARY,
  BLUE: rgb(26, 141, 249),
  RED: rgb(230, 44, 62),
  WHITE: rgb(255, 255, 255),
  WHITE_BG: rgb(255, 255, 255),
  LIGHT_GRAY_BG: rgb(242, 242, 242),
  TOUCH: rgb(225, 225, 225),
  BORDER: rgb(225, 225, 225),
  SHADOW: rgb(200, 200, 200),
  INACTIVE_ICON: rgb(175, 175, 175),
  INACTIVE_TEXT: rgb(125, 125, 125),
  DARK_TEXT: rgb(60, 60, 60),
  DARK_GRAY: rgb(50, 50, 50),
  BLACK_TEXT: rgb(30, 30, 30),
};
