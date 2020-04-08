import { Dimensions, ViewStyle } from 'react-native';
import { createMuiTheme } from '@material-ui/core/styles';
import { Colors } from './colors';

const { width: W_WIDTH, height: W_HEIGHT } = Dimensions.get('window');

export const Main = {
  BOTTOM_TAB_HEIGHT: 50,
  FORM_CONTANER_MAX_WIDTH: 400,
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

export const Shadows: { [key: string]: ViewStyle } = {
  MAIN_CONTAINER: {
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 15,
    shadowOpacity: 0.5,
    shadowColor: Colors.SHADOW.toString(),
  },
};

export const Buttons = {
  BORDER_RADIUS: 5,
  FONT_SIZE: 16,
  HEIGHT: 48,
  MIN_WIDTH: 230,
};

// Material UI
export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.PRIMARY.toString(),
    },
    secondary: {
      main: Colors.SECONDARY.toString(),
    },
  },
});

export * from './colors';
export * from './typography';
