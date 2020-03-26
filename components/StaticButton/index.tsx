import React from 'react';
import { StyleSheet, View, TextStyle, TouchableHighlight } from 'react-native';
import Text from '../Text';
import { Colors, Buttons, Paddings, Shadows } from '../../styles';

const BORDER_RADIUS = 5;

export const styles = StyleSheet.create({
  container: {
    minWidth: Buttons.MIN_WIDTH,
    borderRadius: BORDER_RADIUS,
    ...Shadows.FORM_CONTAINER,
  },
  rectButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Paddings.MIN_X,
    paddingVertical: Paddings.MIN_Y * 3,
    borderRadius: BORDER_RADIUS,
  },
});

interface Props {
  label: string;
  labelTextStyle?: TextStyle;
  backgroundColor?: string;
  disabled?: boolean;
  onPress: () => void;
}

export default function StaticButton({
  label,
  labelTextStyle,
  backgroundColor,
  disabled,
  onPress,
}: Props) {
  return (
    <View style={[styles.container, { backgroundColor, shadowColor: backgroundColor }]}>
      <TouchableHighlight
        style={styles.rectButton}
        activeOpacity={1}
        onPress={onPress}
        disabled={disabled}>
        <View>
          <Text style={labelTextStyle}>{label}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

StaticButton.defaultProps = {
  backgroundColor: Colors.BLUE,
  labelTextStyle: {
    color: 'white',
    fontSize: Buttons.FONT_SIZE,
  },
};
