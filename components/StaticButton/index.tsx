import React from 'react';
import { StyleSheet, View, TextStyle, TouchableHighlight } from 'react-native';
import Text from '../Text';
import { Colors, Paddings, Shadows } from '../../styles';

const BORDER_RADIUS = 5;

export const styles = StyleSheet.create({
  container: {
    ...Shadows.FORM_CONTAINER,
    borderRadius: BORDER_RADIUS,
  },
  rectButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Paddings.MIN_X,
    paddingVertical: Paddings.MIN_Y,
    minWidth: 100,
    minHeight: 40,
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
  },
};
