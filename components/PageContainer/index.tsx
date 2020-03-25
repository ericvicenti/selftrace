import React, { ReactNode } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { Margins } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Margins.MAX_Y,
    paddingHorizontal: Margins.WINDOW,
  },
});

interface Props extends ViewProps {
  children?: ReactNode;
}

export default function PageContainer({ children, style, ...rest }: Props) {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
}
