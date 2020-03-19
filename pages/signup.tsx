import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View } from 'react-native';
import FormContainer from '../components/FormContainer';
import EmailInput from '../components/TextInput/Email';
import PasswordInput from '../components/TextInput/Password';
import Text from '../components/Text';
import { PRIMARY_COLOR } from '../styles/colors';
import { MARGIN_Y } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontWeight: '900',
    color: PRIMARY_COLOR.toString(),
    fontSize: 28,
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'lightgreen',
    marginTop: MARGIN_Y,
  },
});

export default function App(props) {
  const [email, setEmail] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <FormContainer
        showErrorsOnly
        progress={{ message: '', status: null }}
        style={styles.formContainer}>
        <EmailInput
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Enter your email"
        />
        <PasswordInput
          value={password1}
          onChangeText={text => setPassword1(text)}
          placeholder="Enter a new password"
        />
        <PasswordInput
          value={password2}
          onChangeText={text => setPassword2(text)}
          placeholder="Confirm your new password"
        />
      </FormContainer>
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
