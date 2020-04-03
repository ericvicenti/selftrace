import React, { ReactNode } from 'react';
import { Text as RNText, TextProps as RNTextProps, Animated } from 'react-native';
import { Colors, Typography } from '../../styles';

export interface TextProps extends RNTextProps {
  children: ReactNode;
  animated?: boolean;
  style?: any; // FIXME
}

function Text({ children, animated, style, ...rest }: TextProps) {
  const Wrapper = animated ? Animated.Text : RNText;
  return (
    <Wrapper
      style={[
        {
          fontFamily: Typography.MAIN_FONT_FAMILY,
          fontSize: 14, // TODO: import from /styles/typography
          color: Colors.BLACK_TEXT.toString(),
        },
        style,
      ]}
      {...rest}>
      {children}
    </Wrapper>
  );
}

export default React.memo(Text);
