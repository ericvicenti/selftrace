import React, { ReactNode } from 'react';
import { ViewStyle, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useHover } from 'react-native-web-hooks';
import { Colors, Paddings } from '../../styles';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Paddings.X,
    paddingVertical: Paddings.Y,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  children: ReactNode;
  onPress: () => void;
  hoverBackgroundColor?: string;
  defaultBackgroundColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Hoverable({
  children,
  onPress,
  hoverBackgroundColor = Colors.HOVER.toString(),
  defaultBackgroundColor = 'white',
  disabled,
  style,
}: Props): any {
  const hoverRef = React.useRef(null);
  const isHovered = useHover(hoverRef);
  const hoverScaleRef = React.useRef(new Animated.Value(isHovered ? 1 : 0));

  React.useEffect(() => {
    if (!disabled) {
      if (isHovered) {
        hoverScaleRef.current.setValue(1);
      } else {
        Animated.timing(hoverScaleRef.current, {
          toValue: 0,
          duration: 200,
        }).start();
      }
    }
  }, [isHovered, disabled]);

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} disabled={disabled}>
      <Animated.View
        ref={hoverRef}
        style={[
          styles.container,
          style,
          {
            backgroundColor: hoverScaleRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [defaultBackgroundColor, hoverBackgroundColor],
            }),
          },
        ]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}
