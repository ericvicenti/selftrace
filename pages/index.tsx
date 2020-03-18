import * as React from 'react';
import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View, Text } from 'react-native';
import { A, Header } from '@expo/html-elements';

export default function App(props) {
  return (
    <View style={styles.container}>
      <Text>Hello, World!</Text>
      <A href="/login">Log in here</A>
    </View>
  );
}

App.getInitialProps = async (ctx: NextPageContext) => {
  // do async stuff here to load data
  // ctx.query is the ?params
  // eg:
  // let url = getApiUrl(urlWithQuery('/libraries', ctx.query), ctx);
  // let response = await fetch(url);
  // let result = await response.json();

  return {
    // data: result,
    // query: ctx.query,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
