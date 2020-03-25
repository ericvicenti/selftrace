import React from 'react';
import { View, StyleSheet } from 'react-native';
import Router from 'next/router';
import Icon from '../Icon';
import { Colors, Paddings } from '../../styles';
import TabItemComponent from './TabItemComponent';

const TAB_ITEMS = [
  { path: '/map', Icon: Icon.MapMarkerMultiple },
  { path: '/form', Icon: Icon.Form },
  { path: '/account', Icon: Icon.Person },
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
      {TAB_ITEMS.map(({ path, Icon: TabIcon }) => {
        const isActive = pathname === path;

        return (
          <TabItemComponent
            path={path}
            Icon={
              <TabIcon
                color={isActive ? Colors.PRIMARY.toString() : Colors.INACTIVE_ICON.toString()}
              />
            }
            isActive={isActive}
            onPress={onPressHandler(path)}
            style={styles.tabItem}
          />
        );
      })}
    </View>
  );
}
