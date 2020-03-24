import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import ExternalLink from './ExternalLink';
import { Colors } from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    padding: 24,
    paddingLeft: 20,
    marginBottom: 10,
    borderTopWidth: 1,
    marginTop: 10,
    borderTopColor: '#ececec',
  },
});

export default () => {
  return (
    <View style={styles.container}>
      <Text style={{ lineHeight: 22, color: Colors.INACTIVE_TEXT.toString() }}>
        See more from the{' '}
        <ExternalLink href="https://www.cdc.gov/coronavirus/2019-ncov/">CDC</ExternalLink>.
      </Text>
    </View>
  );
};
