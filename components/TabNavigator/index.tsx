import React from 'react';
import { View, StyleSheet } from 'react-native';
import Router from 'next/router';
import { IconName } from '../Icon';
import { Colors, Paddings, Margins } from '../../styles';
import TabItemComponent from './TabItemComponent';

const TAB_ITEMS: { path: string; iconName: IconName }[] = [
  { path: '/form', iconName: 'form' },
  { path: '/map', iconName: 'map-marker-multiple' },
  { path: '/account', iconName: 'person' },
];

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 3,
    shadowColor: Colors.SHADOW.toString(),
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
    paddingTop: Paddings.Y,
    paddingBottom: 2,
  },
  tabItem: {
    width: `${Math.floor(100 / TAB_ITEMS.length - 2)}vw`,
    maxWidth: 180,
    marginHorizontal: Margins.MIN_X,
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
          width={styles.tabItem.width}
        />
      ))}
    </View>
  );
}
