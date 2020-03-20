import React from 'react';
import { View, StyleSheet } from 'react-native';
import { A } from '@expo/html-elements';
import Icon, { IconName } from '../Icon';
import { INACTIVE_ICON_COLOR, PRIMARY_COLOR } from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

interface Props {
  pathname: string;
}

export default function BottomTab({ pathname }: Props) {
  const tabs: { href: string; iconName: IconName }[] = [
    { href: '/form', iconName: 'form' },
    { href: '/map', iconName: 'map-marker-multiple' },
    { href: '/account', iconName: 'person' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(t => (
        <A key={t.href} href={t.href}>
          <Icon
            name={t.iconName!}
            color={pathname === t.href ? PRIMARY_COLOR.toString() : INACTIVE_ICON_COLOR.toString()}
          />
        </A>
      ))}
    </View>
  );
}
