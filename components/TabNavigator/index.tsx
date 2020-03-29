import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import Router from 'next/router';
import Icon from '../Icon';
import { Colors, Margins } from '../../styles';
import TabItemComponent from './TabItemComponent';
import {
  ResponsiveWidthRenderProps,
  withResponsiveWidth,
  ResponsiveSize,
} from '../../hocs/withResponsiveWidth';

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
    alignItems: 'flex-end',
  },
  logo: {
    height: 40,
    width: 180,
  },
});

interface Props extends ResponsiveWidthRenderProps {
  pathname: string;
}

const onPressHandler = (path: string) => () => {
  Router.push(path);
};

const TabNavigator = ({ responsiveWidth, pathname }: Props) => {
  const logoContainerStyles: StyleProp<ViewStyle> = [
    styles.logoContainer,
    {
      marginLeft: responsiveWidth && responsiveWidth < ResponsiveSize.Medium ? 0 : Margins.X,
    },
  ];
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressHandler('/map')}
        activeOpacity={0.5}
        style={logoContainerStyles}>
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
              isMobile={responsiveWidth !== undefined && responsiveWidth < ResponsiveSize.Medium}
            />
          );
        })}
      </View>
    </View>
  );
};

export default withResponsiveWidth(TabNavigator);
