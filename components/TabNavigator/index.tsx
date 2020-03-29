import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Router from 'next/router';
import Icon from '../Icon';
import { Colors, Margins } from '../../styles';
import TabItemComponent from './TabItemComponent';

const logoSource = require('../../assets/logo-with-title-small.png');

const TAB_ITEMS = [
  { path: '/map', Icon: Icon.MapMarkerMultiple },
  { path: '/form', Icon: Icon.Form },
  { path: '/account', Icon: Icon.Person },
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    shadowRadius: 3,
    shadowColor: Colors.SHADOW.toString(),
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  hoverable: {
    width: '100%',
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: Margins.MIN_X,
  },
  logo: {
    height: 40,
    width: 180,
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
      <TouchableOpacity
        onPress={onPressHandler('/map')}
        activeOpacity={0.5}
        style={styles.logoContainer}>
        <Image style={styles.logo} source={logoSource} resizeMode="cover" />
      </TouchableOpacity>
      <View style={styles.tabsContainer}>
        {TAB_ITEMS.map(({ path, Icon: TabIcon }) => {
          const isActive = pathname === path;

          return (
            <TabItemComponent
              key={path}
              path={path}
              Icon={
                <TabIcon
                  color={isActive ? Colors.PRIMARY.toString() : Colors.INACTIVE_ICON.toString()}
                />
              }
              isActive={isActive}
              onPress={onPressHandler(path)}
              hoverableStyle={styles.hoverable}
            />
          );
        })}
      </View>
    </View>
  );
}
