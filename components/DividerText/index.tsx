import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../Text';
import { Colors, Paddings } from '../../styles';

export const styles = StyleSheet.create({
  orContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Paddings.MAX_Y * 2,
    paddingHorizontal: Paddings.X * 2,
  },
  orTextContainer: {
    paddingHorizontal: Paddings.X,
  },
  orText: {
    fontSize: 16,
    fontWeight: '600',
  },
  orLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.BORDER.toString(),
  },
});

interface Props {
  label: string;
  color?: string;
}

export default function DividerText({ label, color = Colors.INACTIVE_TEXT.toString() }: Props) {
  return (
    <View style={styles.orContainer}>
      <View style={styles.orLine} />
      <View style={styles.orTextContainer}>
        <Text style={[styles.orText, { color }]}>{label}</Text>
      </View>
      <View style={styles.orLine} />
    </View>
  );
}
