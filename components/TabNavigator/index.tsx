import React from 'react';
import { View, StyleSheet } from 'react-native';
import Router from 'next/router';
import { IconName } from '../Icon';
import { Colors, Paddings } from '../../styles';
import TabItemComponent from './TabItemComponent';

const TAB_ITEMS: { path: string; iconName: IconName }[] = [
  { path: '/form', iconName: 'form' },
  { path: '/map', iconName: 'map-marker-multiple' },
  { path: '/account', iconName: 'person' },
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowRadius: 3,
    shadowColor: Colors.SHADOW.toString(),
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
    paddingTop: Paddings.Y,
    paddingHorizontal: Paddings.X,
  },
  tabItem: {
    width: '100%',
    paddingHorizontal: Paddings.MIN_X,
    alignItems: 'center',
    alignSelf: 'center',
  },
});

interface Props {
  pathname: string;
}

const onPressHandler = (path: string) => () => {
  Router.push(path);
};

export default function TabNavigator({ pathname }: Props) {
  return (
    <View style={styles.container}>
      {TAB_ITEMS.map(t => (
        <TabItemComponent
          iconName={t.iconName}
          path={t.path}
          isActive={pathname === t.path}
          onPress={onPressHandler(t.path)}
          style={styles.tabItem}
        />
      ))}
    </View>
  );
}
