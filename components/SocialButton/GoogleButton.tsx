import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native-web';

import { GoogleLogo } from '../../util/svg';
import { Margins, Shadows, Buttons, Paddings } from '../../styles';

const styles = StyleSheet.create({
  container: {
    borderRadius: Buttons.BORDER_RADIUS,
    marginTop: Margins.Y,
    minWidth: Buttons.MIN_WIDTH,
    ...Shadows.FORM_CONTAINER,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 48,
    borderRadius: Buttons.BORDER_RADIUS,
    paddingHorizontal: Paddings.MIN_X,
  },
  logo: {
    marginRight: 24,
    width: 22,
    height: 22,
  },
  text: {
    // TODO: Move this to Colors
    color: 'rgba(0,0,0,0.54)', // From Google's Sketch
    fontFamily: "'Roboto', sans-serif;", // From Google's brandline
    fontSize: Buttons.FONT_SIZE,
  },
});

// TODO: This changes the opacity of Logo and Text too, really I just want the background to transition color
// May need to switch to animated for this, but this is low priority in terms of functionality
interface GoogleButtonProps {
  onPress: () => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onPress }: GoogleButtonProps) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <GoogleLogo style={styles.logo} />
      <Text style={styles.text}>Sign in with Google</Text>
    </TouchableOpacity>
  </View>
);

export default GoogleButton;
