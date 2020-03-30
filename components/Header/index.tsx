import React from 'react';
import Router from 'next/router';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Colors, Paddings } from '../../styles';
import TabNavigator from '../TabNavigator';

const logoSource = require('../../assets/logo-with-title-small.png');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    shadowRadius: 3,
    shadowColor: Colors.SHADOW.toString(),
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
    paddingLeft: Paddings.MIN_X,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: {
    height: 40,
    width: 150,
  },
});

export default function Header() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => Router.push('/map')}
        activeOpacity={0.5}
        style={styles.logoContainer}>
        <Image style={styles.logo} source={logoSource} resizeMode="cover" />
      </TouchableOpacity>
      <TabNavigator />
    </View>
  );
}
