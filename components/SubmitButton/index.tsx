import React from 'react';
import {
  Animated,
  ActivityIndicator,
  StyleSheet,
  View,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import Text from '../Text';
import { Progress, ProgressStatus } from '../../data-types';
import Color from '../../styles/Color';
import { Colors, Buttons, Paddings, Margins, Shadows } from '../../styles';

const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity);

const BORDER_RADIUS = 5;

export const styles = StyleSheet.create({
  container: {
    ...Shadows.FORM_CONTAINER,
    marginTop: Margins.MAX_Y,
    borderRadius: BORDER_RADIUS,
    minWidth: Buttons.MIN_WIDTH,
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
  backgroundColor?: Color;
  progress: Progress;
  disabled?: boolean;
  onPress: () => void;
}

export default function SubmitButton({
  label,
  labelTextStyle,
  backgroundColor,
  progress,
  disabled,
  onPress,
}: Props) {
  const isSubmitDisabled =
    progress.status === ProgressStatus.REQUEST ||
    progress.status === ProgressStatus.SUCCESS ||
    progress.status === ProgressStatus.ERROR ||
    disabled;

  const activityScaleRef = React.useRef(new Animated.Value(isSubmitDisabled ? 0 : 1));
  const isLoading = progress.status === ProgressStatus.REQUEST;

  React.useEffect(() => {
    Animated.timing(activityScaleRef.current, {
      toValue: isSubmitDisabled ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isSubmitDisabled]);

  const bgColor = backgroundColor.toString();
  const bgColorSaturated = backgroundColor.saturate(20, true);

  return (
    <View
      style={[styles.container, { shadowColor: isSubmitDisabled ? bgColorSaturated : bgColor }]}>
      <TouchableOpacityAnimated
        style={[
          styles.rectButton,
          {
            backgroundColor: activityScaleRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [bgColorSaturated, bgColor],
            }),
          },
        ]}
        activeOpacity={1}
        underlayColor={backgroundColor.shade(-20)}
        disabled={isSubmitDisabled}
        onPress={onPress}>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.INACTIVE_ICON.toString()} />
        ) : (
          <View>
            <Text style={labelTextStyle}>{label}</Text>
          </View>
        )}
      </TouchableOpacityAnimated>
    </View>
  );
}

SubmitButton.defaultProps = {
  backgroundColor: Colors.BLUE,
  labelTextStyle: {
    color: 'white',
    fontSize: Buttons.FONT_SIZE,
  },
};
