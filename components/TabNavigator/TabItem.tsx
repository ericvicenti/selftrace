import React, { ReactNode } from 'react';
import { ViewStyle, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useHover } from 'react-native-web-hooks';
import { Colors, Paddings } from '../../styles';

interface Props {
  children: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Paddings.X,
    paddingVertical: Paddings.Y,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function TabItem({ children, onPress, style }: Props): any {
  const hoverRef = React.useRef(null);
  const isHovered = useHover(hoverRef);
  const hoverScaleRef = React.useRef(new Animated.Value(isHovered ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(hoverScaleRef.current, {
      toValue: isHovered ? 1 : 0,
      duration: 100,
    }).start();
  }, [isHovered]);

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Animated.View
        ref={hoverRef}
        style={[
          styles.container,
          style,
          {
            backgroundColor: hoverScaleRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: ['white', Colors.HOVER.toString()],
            }),
          },
        ]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}
