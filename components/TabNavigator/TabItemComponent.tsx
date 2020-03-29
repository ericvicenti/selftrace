import React from 'react';
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native';
import Hoverable from '../Hoverable';
import { Colors, Margins } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    maxWidth: 100,
    marginHorizontal: Margins.MIN_X,
  },
  activeBorder: {
    width: '100%',
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
  hoverableStyle: ViewStyle;
  isMobile?: boolean;
}

export default function TabItemComponent({
  path,
  isActive,
  activeColor = Colors.PRIMARY.toString(),
  Icon,
  onPress,
  hoverableStyle,
  isMobile,
}: Props) {
  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    {
      maxWidth: isMobile ? 60 : 100,
    },
  ];
  return (
    <View style={containerStyles}>
      <Hoverable key={path} onPress={onPress} style={hoverableStyle} disabled={isActive}>
        {Icon}
      </Hoverable>
      <View
        style={[styles.activeBorder, { backgroundColor: isActive ? activeColor : 'transparent' }]}
      />
    </View>
  );
}
