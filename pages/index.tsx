import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { A } from '@expo/html-elements';
import EmailInput from '../components/TextInput/Email';
import PasswordInput from '../components/TextInput/Password';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    height: 160,
    width: 160,
  },
});

export default function App(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <EmailInput value={email} onChangeText={text => setEmail(text)} />
      <PasswordInput value={password} onChangeText={text => setPassword(text)} />
      <TouchableOpacity onPress={() => {}}>
        <Text>Log in</Text>
      </TouchableOpacity>
      <A href="/signup">Sign Up</A>
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
