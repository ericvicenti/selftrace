import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextStyle, Animated } from 'react-native';
import Text from '../Text';
import TouchableRect, { TouchableRectProps } from '../TouchableRect';
import Content, { ContentProps } from './Content';
import { Margins, Typography } from '../../styles';

const ANIMATION_DURATION = 200;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
  },
  touchableRect: {
    width: '100%',
    paddingHorizontal: Margins.WINDOW,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...Typography.INACTIVE_TEXT_STYLES,
    minWidth: 90,
    marginRight: Margins.X,
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
        <View style={styles.touchableRect}>
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
