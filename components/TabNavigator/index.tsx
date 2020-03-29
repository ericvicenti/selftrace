import React from 'react';
import { StyleSheet, View } from 'react-native';
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  hoverable: {
    flex: 1,
    width: '100%',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: Paddings.MIN_X,
  },
  logo: {
    height: 40,
    width: 150,
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
  );
}
