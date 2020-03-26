import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GoogleLogo } from '../../util/svg';
import { Colors } from '../../styles';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#EEEEEE',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40, // does not recognize dp
    paddingHorizontal: 8,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    borderRadius: 2,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowColor: Colors.SHADOW.toString(),
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginRight: 24,
  },
  text: {
    // TODO: Move this to Colors
    color: 'rgba(0,0,0,0.54)',
    fontFamily: "'Roboto', sans-serif;",
  },
});

const GoogleButton = () => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button}>
      <GoogleLogo style={styles.logo} />
      <Text style={styles.text}>Sign in with Google</Text>
    </TouchableOpacity>
  </View>
);

export default GoogleButton;
