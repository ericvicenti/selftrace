import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native-web';

import { GoogleLogo } from '../../util/svg';
import { Margins, Shadows } from '../../styles';

const styles = StyleSheet.create({
  container: {
    width: 'fit-content',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Margins.MAX_Y,
    borderRadius: 5,
    backgroundColor: '#EEEEEE', // From Google's Sketch
    ...Shadows.FORM_CONTAINER,
  },
  button: {
    height: 40, // does not recognize dp
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    marginRight: 24,
  },
  text: {
    // TODO: Move this to Colors
    color: 'rgba(0,0,0,0.54)', // From Google's Sketch
    fontFamily: "'Roboto', sans-serif;", // From Google's brandline
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
