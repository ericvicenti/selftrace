import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import Router from 'next/router';
import { Margins } from '../../styles';

const logoSource = require('../../assets/logo-with-title-small.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: Margins.MIN_X,
  },
  logo: {
    height: 40,
    width: 150,
  },
});

export default function NavLogo() {
  return (
    <TouchableOpacity
      onPress={() => Router.push('/map')}
      activeOpacity={0.5}
      style={styles.container}>
      <Image style={styles.logo} source={logoSource} resizeMode="cover" />
    </TouchableOpacity>
  );
}
