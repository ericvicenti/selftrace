import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { A } from '@expo/html-elements';
import { useHover } from 'react-native-web-hooks';

interface Props {
  isColored: boolean;
  href: string;
  target: string;
  children: React.ReactNode | string;
  style?: TextStyle;
}

export default function ExternalLink(props: Props) {
  const { isColored, href, target, children, style } = props;
  const linkStyles: [TextStyle] = [isColored ? styles.bright : styles.plain];
  const linkRef = React.useRef();
  const isHovered = useHover(linkRef);

  if (isHovered) {
    linkStyles.push(isColored ? styles.brightHovered : styles.plainHovered);
  }

  return (
    <A href={href} target={target} style={[linkStyles, style]} ref={linkRef}>
      <Text>{children}</Text>
    </A>
  );
}

let styles = StyleSheet.create({
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

ExternalLink.defaultProps = {
  isColored: true,
  target: 'blank',
};
