import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { A } from '@expo/html-elements';

interface Props {
  isColored: boolean;
  href: string;
  target: string;
  children: React.ReactNode | string;
  style?: TextStyle;
}

const styles = StyleSheet.create({
  bright: {
    color: 'rgba(65, 160, 248, 1)',
    textDecorationLine: 'none',
  },
  brightHovered: {
    textDecorationLine: 'underline',
  },
  plain: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'none',
  },
  plainHovered: {
    opacity: 0.5,
  },
});

export default function ExternalLink({
  isColored = true,
  href,
  target = 'blank',
  children,
  style,
}: Props) {
  const linkStyles: [TextStyle] = [isColored ? styles.bright : styles.plain];

  return (
    <A href={href} target={target} style={[linkStyles, style]}>
      <Text>{children}</Text>
    </A>
  );
}
