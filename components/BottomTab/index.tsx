import React from 'react';
import { View, StyleSheet } from 'react-native';
import { A } from '@expo/html-elements';
import Icon from '../Icon';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

interface Props {}

export default function BottomTab({}: Props) {
  return (
    <View style={styles.container}>
      <A href="/form">
        <Icon name="form" color="blue" />
      </A>
      <A href="/map">
        <Icon name="map-marker-multiple" color="blue" />
      </A>
      <A href="/account">
        <Icon name="person" color="blue" />
      </A>
    </View>
  );
}
