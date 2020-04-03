import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export function useAnimatedBool(val: boolean, duration: number) {
  const animValRef = useRef(new Animated.Value(val ? 1 : 0));

  useEffect(() => {
    Animated.timing(animValRef.current, {
      duration,
      toValue: val ? 1 : 0,
    }).start();
  }, [val, duration]);

  return animValRef.current;
}
