import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import Hoverable from '../Hoverable';
import { Colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    maxWidth: 180,
  },
  activeBorder: {
    height: 2,
    borderRadius: 5,
  },
});

interface Props {
  path: string;
  isActive?: boolean;
  activeColor?: string;
  Icon: JSX.Element;
  onPress: () => void;
  style: ViewStyle;
}

export default function TabItemComponent({
  path,
  isActive,
  activeColor = Colors.PRIMARY.toString(),
  Icon,
  onPress,
  style,
}: Props) {
  return (
    <View style={styles.container}>
      <Hoverable key={path} onPress={onPress} style={style} disabled={isActive}>
        {Icon}
      </Hoverable>
      <View
        style={[styles.activeBorder, { backgroundColor: isActive ? activeColor : 'transparent' }]}
      />
    </View>
  );
}
