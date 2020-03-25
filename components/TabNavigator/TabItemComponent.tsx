import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import Hoverable from '../Hoverable';
import { Colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
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
  width: number | string; // TODO: See if we can do without this
}

export default function TabItemComponent({
  path,
  isActive,
  activeColor = Colors.PRIMARY.toString(),
  Icon,
  onPress,
  style,
  width,
}: Props) {
  return (
    <View style={styles.container}>
      <Hoverable key={path} onPress={onPress} style={style} disabled={isActive}>
        {Icon}
      </Hoverable>
      {isActive && <View style={[styles.activeBorder, { backgroundColor: activeColor, width }]} />}
    </View>
  );
}
