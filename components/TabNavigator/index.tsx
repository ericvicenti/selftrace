import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Router from 'next/router';
import Icon, { IconName } from '../Icon';
import { Main, Colors, Paddings } from '../../styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    minHeight: Main.HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowRadius: 3,
    shadowColor: Colors.SHADOW.toString(),
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
    paddingVertical: Paddings.MAX_Y,
  },
  touchable: {},
});

interface Props {
  pathname: string;
}

const tabs: { path: string; iconName: IconName }[] = [
  { path: '/form', iconName: 'form' },
  { path: '/map', iconName: 'map-marker-multiple' },
  { path: '/account', iconName: 'person' },
];

const onPress = (path: string) => () => {
  Router.push(path);
};

export default function TabNavigator({ pathname }: Props) {
  return (
    <View style={styles.container}>
      {tabs.map(t => (
        <TouchableOpacity onPress={onPress(t.path)} key={t.path} style={styles.touchable}>
          <Icon
            name={t.iconName!}
            color={
              pathname === t.path ? Colors.PRIMARY.toString() : Colors.INACTIVE_ICON.toString()
            }
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
