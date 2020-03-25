import React from 'react';
import { View, StyleSheet } from 'react-native';
import Router from 'next/router';
import Icon from '../Icon';
import { Colors, Paddings, Margins } from '../../styles';
import TabItemComponent from './TabItemComponent';

const TAB_ITEMS = [
  { path: '/form', Icon: Icon.Form },
  { path: '/map', Icon: Icon.MapMarkerMultiple },
  { path: '/account', Icon: Icon.Person },
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
            width={styles.tabItem.width}
          />
        );
      })}
    </View>
  );
}
