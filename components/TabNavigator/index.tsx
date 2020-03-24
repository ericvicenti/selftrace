import React from 'react';
import { View, StyleSheet } from 'react-native';
import Router from 'next/router';
import Icon, { IconName } from '../Icon';
import { Main, Colors, Paddings, Margins } from '../../styles';
import TabItem from './TabItem';

const TABS: { path: string; iconName: IconName }[] = [
  { path: '/form', iconName: 'form' },
  { path: '/map', iconName: 'map-marker-multiple' },
  { path: '/account', iconName: 'person' },
];

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    minHeight: Main.HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 3,
    shadowColor: Colors.SHADOW.toString(),
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
    paddingTop: Paddings.MIN_Y,
    paddingBottom: 2,
  },
  hoverable: {
    width: `${Math.floor(100 / TABS.length - 2)}vw`,
    maxWidth: 180,
    marginHorizontal: Margins.MIN_X,
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
      {TABS.map(t => (
        <TabItem key={t.path} onPress={onPressHandler(t.path)} style={styles.hoverable}>
          <Icon
            name={t.iconName!}
            color={
              pathname === t.path ? Colors.PRIMARY.toString() : Colors.INACTIVE_ICON.toString()
            }
          />
        </TabItem>
      ))}
    </View>
  );
}
