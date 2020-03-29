import React from 'react';
import {
  StyleSheet,
  View,
  // ViewStyle,
  // StyleProp,
  Image,
  TouchableOpacity,
} from 'react-native';
import Router from 'next/router';
import Icon from '../Icon';
import { Margins, Colors, Paddings } from '../../styles';
import TabItemComponent from './TabItemComponent';
import {
  ResponsiveWidthRenderProps,
  withResponsiveWidth,
  // ResponsiveSize,
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
    paddingTop: Paddings.Y,
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  hoverable: {
    width: '100%',
    minWidth: 60,
    paddingHorizontal: Paddings.MIN_X,
  },
  logoContainer: {
    marginLeft: Margins.X,
    justifyContent: 'flex-end',
  },
  logo: {
    height: 50,
    width: 200,
    transform: [{ scale: 0.85 }],
  },
});

interface Props extends ResponsiveWidthRenderProps {
  pathname: string;
}

const onPressHandler = (path: string) => () => {
  Router.push(path);
};

const TabNavigator = ({
  // responsiveWidth,
  pathname,
}: Props) => {
  // const containerStyles: StyleProp<ViewStyle> = [
  //   styles.container,
  //   {
  //     justifyContent:
  //       responsiveWidth && responsiveWidth < ResponsiveSize.Medium ? 'space-between' : 'center',
  //   },
  // ];

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
};

export default withResponsiveWidth(TabNavigator);
