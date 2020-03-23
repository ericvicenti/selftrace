import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Router from 'next/router';
import Icon, { IconName } from '../Icon';
import { INACTIVE_ICON_COLOR, PRIMARY_COLOR } from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
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

export default function BottomTab({ pathname }: Props) {
  return (
    <View style={styles.container}>
      {tabs.map(t => (
        <TouchableOpacity onPress={onPress(t.path)} key={t.path}>
          <Icon
            name={t.iconName!}
            color={pathname === t.path ? PRIMARY_COLOR.toString() : INACTIVE_ICON_COLOR.toString()}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
