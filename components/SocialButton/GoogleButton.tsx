import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GoogleLogo } from '../../util/svg';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40, // does not recognize dp
    paddingHorizontal: 8,
    borderBottomColor: 'black',
  },
  logo: {
    marginRight: 24,
  },
  text: {
    color: 'rgba(0,0,0,0.54)',
  },
});

const GoogleButton = () => (
  <TouchableOpacity style={styles.container}>
    <GoogleLogo style={styles.logo} />
    <Text style={styles.text}>Sign in with Google</Text>
  </TouchableOpacity>
);

export default GoogleButton;
