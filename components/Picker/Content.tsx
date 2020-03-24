import React from 'react';
import {
  Picker as RNPicker,
  PickerProps as RNPickerProps,
  Animated,
  StyleSheet,
  View,
} from 'react-native';
import withDelayedUnmount from '../../hocs/withDelayedUnmount';
import { Paddings } from '../../styles';
import { Colors } from '../../styles/colors';

const PICKER_CONTAINER_HEIGHT = 120;

const styles = StyleSheet.create({
  container: {
    height: PICKER_CONTAINER_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: Paddings.X,
    zIndex: -1,
  },
  picker: {
    borderColor: 'white',
    justifyContent: 'center',
  },
  border: {
    backgroundColor: Colors.BORDER.toString(),
    width: '100%',
    height: StyleSheet.hairlineWidth,
  },
});

interface Item {
  label: string;
  value: string | number;
}

export interface ContentProps extends RNPickerProps {
  scale?: Animated.Value;
  items: Item[];
}

function Content({ scale, items, ...rest }: ContentProps) {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          marginTop: scale.interpolate({
            inputRange: [0, 1],
            outputRange: [-PICKER_CONTAINER_HEIGHT, 0],
          }),
        },
      ]}>
      <RNPicker style={styles.picker} {...rest}>
        {items.map(item => (
          <RNPicker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </RNPicker>
      <View style={styles.border} />
    </Animated.View>
  );
}

export default withDelayedUnmount(Content);
