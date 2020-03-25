import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import Hoverable from '../Hoverable';
import Icon, { IconName } from '../Icon';
import { Colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexGrow: 1,
    maxWidth: 180,
  },
  activeBorder: {
    height: 2,
    borderRadius: 5,
  },
});

interface Props {
  iconName: IconName;
  path: string;
  isActive?: boolean;
  activeColor?: string;
  defaultColor?: string;
  onPress: () => void;
  style: ViewStyle;
}

export default function TabItemComponent({
  iconName,
  path,
  isActive,
  activeColor = Colors.PRIMARY.toString(),
  defaultColor = Colors.INACTIVE_ICON.toString(),
  onPress,
  style,
}: Props) {
  return (
    <View style={styles.container}>
      <Hoverable key={path} onPress={onPress} style={style} disabled={isActive}>
        <Icon name={iconName} color={isActive ? activeColor : defaultColor} />
      </Hoverable>
      <View
        style={[styles.activeBorder, { backgroundColor: isActive ? activeColor : 'transparent' }]}
      />
    </View>
  );
}
