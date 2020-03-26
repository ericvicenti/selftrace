import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import ExternalLink from './ExternalLink';
import { Colors } from '../styles/colors';
import { Margins, Paddings } from '../styles';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: Paddings.MAX_Y * 2,
    paddingHorizontal: Paddings.WINDOW,
    marginTop: Margins.MAX_Y,
    borderTopColor: Colors.BORDER.toString(),
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  text: {
    color: Colors.INACTIVE_TEXT.toString(),
  },
});

export default () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        See more from the{' '}
        <ExternalLink href="https://www.cdc.gov/coronavirus/2019-ncov/">CDC</ExternalLink>.
      </Text>
    </View>
  );
};
