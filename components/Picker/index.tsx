import React from 'react';
import {
  View,
  StyleSheet,
  TextStyle,
  Picker as RNPicker,
  PickerProps as RNPickerProps,
  ViewStyle,
} from 'react-native';
import Text from '../Text';
import { Margins, Typography } from '../../styles';
import { t } from 'i18n-js';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {},
  label: {
    ...Typography.INACTIVE_TEXT_STYLES,
    minWidth: 90,
    marginRight: Margins.X,
  },
});

interface Props extends RNPickerProps {
  items: {
    label: string;
    value: string | number;
  }[];
  label: string;
  labelTextStyle?: TextStyle;
  style?: ViewStyle;
}

function Picker({ items, label, labelTextStyle, style, ...rest }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, labelTextStyle]}>{label}</Text>
      <RNPicker style={styles.picker} {...rest}>
        {[{ label: t('dropdowns.selectPlaceholder'), value: '' }, ...items].map(item => (
          <RNPicker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </RNPicker>
    </View>
  );
}

export default Picker;
