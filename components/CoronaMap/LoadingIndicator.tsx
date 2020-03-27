import React from 'react';
import { Animated, ActivityIndicator, StyleSheet } from 'react-native';
import Text from '../Text';
import { Colors, Paddings, Margins } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY.toString(),
    paddingHorizontal: Paddings.X,
    paddingVertical: Paddings.Y,
    borderRadius: 25,
  },
  text: {
    marginLeft: Margins.X,
    color: 'white',
  },
});

interface Props {
  message: string;
  style?: any;
}

export default function LoadingIndicator({ message, style }: Props) {
  return (
    <Animated.View style={[styles.container, style]}>
      <ActivityIndicator size="small" color="white" />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}
