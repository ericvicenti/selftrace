import React from 'react';
import { View, Text } from 'react-native';
import { GoogleLogo } from '../../util/svg';

const GoogleButton = () => (
  <View>
    <GoogleLogo />
    <Text>Sign in with Google</Text>
  </View>
);

export default GoogleButton;
