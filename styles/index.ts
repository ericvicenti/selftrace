import { Dimensions, ViewStyle } from 'react-native';
import { Colors } from '../styles';

const { width: W_WIDTH, height: W_HEIGHT } = Dimensions.get('window');

export const Main = {
  BOTTOM_TAB_HEIGHT: 50,
  FORM_CONTANER_MAX_WIDTH: 600,
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
  MAX_X: 25,
  MAX_Y: 15,
  WINDOW: 20, // Minimum distance from a window edge and a UI element
};

const FORM_CONTAINER: ViewStyle = {
  shadowOffset: {
    height: 0,
    width: 0,
  },
  shadowRadius: 15,
  shadowOpacity: 0.5,
  shadowColor: Colors.SHADOW.toString(),
};

export const Shadows = {
  FORM_CONTAINER,
};

export * from './colors';
export * from './typography';
