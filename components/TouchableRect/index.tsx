import React, { ReactElement, ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import { Main, Colors, Margins, Paddings } from '../../styles';

const baseStyles = StyleSheet.create({
  touchable: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    width: Main.W_WIDTH,
    backgroundColor: Colors.WHITE_BG.toString(),
    paddingHorizontal: Margins.WINDOW,
    paddingVertical: Paddings.Y,
  },
});

const {
  ImpactFeedbackStyle: { Light, Medium, Heavy },
} = Haptics;

export interface TouchableRectProps extends RectButtonProperties {
  children: ReactNode;
  haptic?: 'light' | 'medium' | 'heavy';
  containerStyle?: ViewStyle;
}

function TouchableRect({
  children,
  onPress,
  haptic,
  style,
  containerStyle,
  ...rest
}: TouchableRectProps): ReactElement {
  let onPressFinal = onPress;

  if (haptic) {
    onPressFinal = async (): Promise<void> => {
      let impact = Light;
      if (haptic === 'medium') impact = Medium;
      if (haptic === 'heavy') impact = Heavy;

      await Haptics.impactAsync(impact);
      onPress(false);
    };
  }

  /*
   * Wrapping RectButton with View as a temporary workaround since
   * RectButton doesn't support borderBottomWidth.
   * TODO: Fix this when there is a solution.
   */
  return (
    <View
      style={{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.BORDER.toString(),
        ...containerStyle,
      }}>
      <RectButton
        onPress={onPressFinal}
        underlayColor={Colors.TOUCH.toString()}
        activeOpacity={1}
        style={[baseStyles.touchable, style]}
        {...rest}>
        {children}
      </RectButton>
    </View>
  );
}

export default React.memo(TouchableRect);
