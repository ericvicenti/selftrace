import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { Margins, Colors } from '../../styles';
import Header from '../Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Margins.MAX_Y,
    paddingHorizontal: Margins.WINDOW,
  },
  navContainer: {
    flexDirection: 'row',
    shadowRadius: 3,
    shadowColor: Colors.SHADOW.toString(),
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
  },
});

interface Props extends ViewProps {
  showHeader?: boolean;
  children?: ReactNode;
  isFullScreen?: boolean;
}

export default function PageContainer(props: Props) {
  const { showHeader = true, children, isFullScreen, style, ...rest } = props;

  const containerStyles: StyleProp<ViewStyle> = [styles.container];

  if (isFullScreen) {
    containerStyles.push({ padding: 0 });
  }

  const Content = (
    <View style={[containerStyles, style]} {...rest}>
      {children}
    </View>
  );

  return showHeader ? (
    <>
      <Header />
      {Content}
    </>
  ) : (
    Content
  );
}
