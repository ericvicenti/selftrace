import { Platform, TextStyle } from 'react-native';
import { Colors } from './colors';

const INACTIVE_TEXT_STYLES: TextStyle = {
  fontWeight: '600',
  color: Colors.INACTIVE_TEXT.toString(),
};

export const Typography = {
  MAIN_FONT_FAMILY: Platform.select({
    //   ios: 'Helvetica Neue',
    android: 'notoserif',
  }),
  HEADER_FONT_FAMILY: Platform.select({
    ios: 'AvenirNext-Heavy',
    android: 'notoserif',
  }),
  INACTIVE_TEXT_STYLES,
};
