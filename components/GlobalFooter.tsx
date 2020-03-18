import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ExternalLink from '../components/ExternalLink';

export default () => {
  return (
    <View style={styles.container}>
      <Text style={{ lineHeight: 22 }}>
        See more from the{' '}
        <ExternalLink href="https://www.cdc.gov/coronavirus/2019-ncov/">CDC</ExternalLink>.
      </Text>
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 24,
    paddingLeft: 20,
    marginBottom: 10,
    borderTopWidth: 1,
    marginTop: 10,
    borderTopColor: '#ececec',
  },
});
