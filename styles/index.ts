import { Dimensions } from 'react-native';

const { width: W_WIDTH, height: W_HEIGHT } = Dimensions.get('window');

export const Main = {
  HEADER_HEIGHT: 60,
  BOTTOM_TAB_HEIGHT: 50,
  FORM_INPUT_HEIGHT: 80,
  W_WIDTH,
  W_HEIGHT,
};

export const Margins = {
  MIN_X: 5,
  MIN_Y: 10,
  X: 15,
  Y: 20,
  MAX_X: 25,
  MAX_Y: 30,
  WINDOW: 20, // Minimum distance from a window edge and a UI element
};

export const Paddings = {
  MIN_X: 8,
  MIN_Y: 5,
  X: 13,
  Y: 10,
  MAX_X: 18,
  MAX_Y: 15,
};

export * from './colors';
export * from './typography';
