import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../Text';
import { Colors, Paddings } from '../../styles';
import Color from '../../styles/Color';

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
    height: 1,
    flex: 1,
  },
});

interface Props {
  label: string;
  color?: Color;
}

export default function DividerText({ label, color }: Props) {
  return (
    <View style={styles.orContainer}>
      <View style={[styles.orLine, { backgroundColor: color.toString() }]} />
      <View style={styles.orTextContainer}>
        <Text style={[styles.orText, { color }]}>{label}</Text>
      </View>
      <View style={[styles.orLine, { backgroundColor: color.toString() }]} />
    </View>
  );
}

DividerText.defaultProps = {
  color: Colors.INACTIVE_TEXT,
};
