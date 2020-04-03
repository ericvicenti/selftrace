import React from 'react';
import { StyleSheet, View, TextStyle, TouchableHighlight } from 'react-native';
import Text from '../Text';
import { Colors, Buttons, Paddings, Shadows } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    borderRadius: Buttons.BORDER_RADIUS,
    minWidth: Buttons.MIN_WIDTH,
    ...Shadows.MAIN_CONTAINER,
  },
  rectButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Buttons.BORDER_RADIUS,
    height: Buttons.HEIGHT,
    paddingVertical: Paddings.MIN_Y * 3,
  },
});

interface Props {
  label: string;
  labelTextStyle?: TextStyle;
  backgroundColor?: string;
  underlayColor?: string;
  disabled?: boolean;
  onPress: () => void;
}

export default function StaticButton({
  label,
  labelTextStyle = {
    color: 'white',
    fontSize: Buttons.FONT_SIZE,
  },
  backgroundColor = Colors.BLUE.toString(),
  underlayColor = Colors.BLUE.lighten(-20),
  disabled,
  onPress,
}: Props) {
  return (
    <View style={[styles.container, { shadowColor: backgroundColor }]}>
      <TouchableHighlight
        style={[styles.rectButton, { backgroundColor }]}
        activeOpacity={1}
        underlayColor={underlayColor}
        onPress={onPress}
        disabled={disabled}>
        <View>
          <Text style={labelTextStyle}>{label}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
