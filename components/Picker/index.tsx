import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextStyle, Animated } from 'react-native';
import Text from '../Text';
import TouchableRect, { TouchableRectProps } from '../TouchableRect';
import Content, { ContentProps } from './Content';
import { MARGIN_X, W_MARGIN } from '../../styles';
import { INACTIVE_TEXT_STYLES } from '../../styles/typography';

const ANIMATION_DURATION = 200;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  touchableRect: {
    width: '100%',
    paddingHorizontal: W_MARGIN,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...INACTIVE_TEXT_STYLES,
    minWidth: 90,
    marginRight: MARGIN_X,
  },
  displayValue: {
    fontWeight: '800',
  },
});

interface Props extends ContentProps {
  label: string;
  labelTextStyle?: TextStyle;
  displayValue: string;
  displayValueTextStyle?: TextStyle;
  touchableProps?: TouchableRectProps;
}

function Picker({
  label,
  labelTextStyle,
  displayValue,
  displayValueTextStyle,
  touchableProps,
  ...rest
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const pickerScaleRef = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(pickerScaleRef.current, {
      toValue: isVisible ? 1 : 0,
      duration: ANIMATION_DURATION,
    }).start();
  }, [isVisible]);

  return (
    <View style={styles.container}>
      <TouchableRect
        onPress={() => setIsVisible(prev => !prev)}
        style={styles.container}
        {...touchableProps}>
        <View>
          <Text style={[styles.label, labelTextStyle]}>{label}</Text>
          <Text style={[styles.displayValue, displayValueTextStyle]}>{displayValue}</Text>
        </View>
      </TouchableRect>
      <Content
        isVisible={isVisible}
        duration={ANIMATION_DURATION}
        scale={pickerScaleRef.current}
        {...rest}
      />
    </View>
  );
}

export default React.memo(Picker);
