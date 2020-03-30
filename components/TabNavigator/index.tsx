import React from 'react';
import { StyleSheet, View } from 'react-native';
import Router, { withRouter, SingletonRouter } from 'next/router';
import Icon from '../Icon';
import { Colors } from '../../styles';
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
});

interface Props {
  router: SingletonRouter;
}

const onPressHandler = (path: string) => () => {
  Router.push(path);
};

const TabNavigator = React.memo(
  ({ router }: Props) => {
    return (
      <View style={styles.container}>
        {TAB_ITEMS.map(({ path, Icon: TabIcon }) => {
          const isActive = router.pathname === path;

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
  },
  (prevProps, nextProps) => prevProps.router.pathname !== nextProps.router.pathname
);

const RoutedTabNavigator = withRouter(TabNavigator);

export default RoutedTabNavigator;
