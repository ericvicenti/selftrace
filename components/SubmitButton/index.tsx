import React from 'react';
import { Animated, ActivityIndicator, StyleSheet, View, TextStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Text from '../Text';
import { Progress, ProgressStatus } from '../../data-types';
import Color from '../../styles/Color';
import { INACTIVE_ICON_COLOR, BLUE_COLOR } from '../../styles/colors';
import { MIN_PADDING_X, MIN_PADDING_Y, MAX_MARGIN_Y } from '../../styles';

const RectButtonAnimated = Animated.createAnimatedComponent(RectButton);

export const styles = StyleSheet.create({
  container: {
    marginTop: MAX_MARGIN_Y,
  },
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: MIN_PADDING_X,
    paddingVertical: MIN_PADDING_Y,
    padding: 15,
    minWidth: 100,
    borderRadius: 5,
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

  return (
    <View style={styles.container}>
      <RectButtonAnimated
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: MIN_PADDING_X,
          paddingVertical: MIN_PADDING_Y,
          minWidth: 100,
          borderRadius: 5,
          backgroundColor: activityScaleRef.current.interpolate({
            inputRange: [0, 1],
            outputRange: [backgroundColor.saturate(20, true), backgroundColor.toString()],
          }),
        }}
        activeOpacity={1}
        underlayColor={backgroundColor.shade(-20)}
        enabled={!isSubmitDisabled}
        onPress={onPress}>
        {isLoading ? (
          <ActivityIndicator size="small" color={INACTIVE_ICON_COLOR.toString()} />
        ) : (
          <View>
            <Text style={labelTextStyle}>{label}</Text>
          </View>
        )}
      </RectButtonAnimated>
    </View>
  );
}

SubmitButton.defaultProps = {
  backgroundColor: BLUE_COLOR,
  labelTextStyle: {
    color: 'white',
  },
};
