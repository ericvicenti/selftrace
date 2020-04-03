import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { H2 } from '@expo/html-elements';

export default ({ statusCode }) => {
  return (
    <View style={styles.container}>
      <H2 style={[styles.text, { fontFamily: 'office-code-medium' }]}>
        Uh oh, something went wrong ({statusCode})
      </H2>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 70,
    marginBottom: 80,
  },
  img: {
    marginTop: 48,
    marginBottom: 24,
    width: 64,
    height: 64,
  },
  text: {
    textAlign: 'center',
  },
});
