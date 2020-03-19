import React from 'react';
import { Animated, ActivityIndicator, StyleSheet, View, TextStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Text from '../Text';
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
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
}

export default class SubmitButton extends React.PureComponent<Props> {
  private activityScale: Animated.Value;

  static defaultProps = {
    backgroundColor: BLUE_COLOR,
    labelTextStyle: {
      color: 'white',
    },
  };

  constructor(props: Props) {
    super(props);
    this.activityScale = new Animated.Value(props.disabled ? 0 : 1);
  }

  componentDidUpdate(prevProps: Props): void {
    if (this.props.disabled !== prevProps.disabled) {
      Animated.timing(this.activityScale, {
        toValue: this.props.disabled ? 0 : 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }
  render() {
    const { label, labelTextStyle, backgroundColor, disabled, loading } = this.props;

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
            backgroundColor: this.activityScale.interpolate({
              inputRange: [0, 1],
              outputRange: [backgroundColor.saturate(20, true), backgroundColor.toString()],
            }),
          }}
          activeOpacity={1}
          underlayColor={backgroundColor.shade(-20)}
          enabled={!disabled}>
          {loading ? (
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
}
