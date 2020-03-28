import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Router from 'next/router';
import Icon from '../Icon';
import { Colors, Paddings } from '../../styles';
import TabItemComponent from './TabItemComponent';
import {
  ResponsiveWidthRenderProps,
  ResponsiveSize,
  withResponsiveWidth,
} from '../../hocs/withResponsiveWidth';

const TAB_ITEMS = [
  { path: '/map', Icon: Icon.MapMarkerMultiple },
  { path: '/form', Icon: Icon.Form },
  { path: '/account', Icon: Icon.Person },
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    shadowRadius: 3,
    shadowColor: Colors.SHADOW.toString(),
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
    paddingTop: Paddings.Y,
  },
  tabItem: {
    width: '100%',
    paddingHorizontal: Paddings.MIN_X,
    alignItems: 'center',
    alignSelf: 'center',
  },
});

interface Props extends ResponsiveWidthRenderProps {
  pathname: string;
}

const onPressHandler = (path: string) => () => {
  Router.push(path);
};

const TabNavigator = ({ responsiveWidth, pathname }: Props) => {
  const containerStyles: StyleProp<ViewStyle> = [styles.container];

  containerStyles.push({
    justifyContent:
      responsiveWidth && responsiveWidth < ResponsiveSize.Medium ? 'space-between' : 'center',
  });

  return (
    <View style={containerStyles}>
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
            style={styles.tabItem}
          />
        );
      })}
    </View>
  );
};

export default withResponsiveWidth(TabNavigator);
