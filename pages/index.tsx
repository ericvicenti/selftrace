import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { A } from '@expo/html-elements';
import Router from 'next/router';
import { t } from 'i18n-js';
import FormContainer from '../components/FormContainer';
import EmailInput from '../components/TextInput/Email';
import PasswordInput from '../components/TextInput/Password';
import SubmitButton from '../components/SubmitButton';
import { ProgressStatus, AuthStatus } from '../data-types';
import { ReduxRoot, isAuthDisabled } from '../reducers';
import { Dispatch, Action } from '../actions';
import * as SigninActions from '../actions/auth/signin';
import * as AuthStatusActions from '../actions/auth/status';
import AuthUtils from '../util/AuthUtils';
import { MIN_MARGIN_Y, MARGIN_Y, MAX_MARGIN_Y } from '../styles';
import { BLUE_COLOR, INACTIVE_TEXT_COLOR } from '../styles/colors';

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
  formContainer: {
    width: '100%',
    marginTop: MIN_MARGIN_Y,
  },
  forgotPasswordButton: {
    marginTop: MAX_MARGIN_Y,
    color: INACTIVE_TEXT_COLOR.toString(),
  },
  signupButton: {
    // alignSelf: 'flex-end',
    marginTop: 3 * MARGIN_Y,
    color: BLUE_COLOR.toString(),
  },
});

const mapStateToProps = (state: ReduxRoot) => ({
  authDisabled: isAuthDisabled(state.auth),
  signinProgress: state.auth.signin.progress,
  authStatus: state.auth.status,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      signinUser: SigninActions.signinUser,
      clearSigninProgress: () => (d: Dispatch) => d(SigninActions.clearSigninProgress()),
      subscribeToAuthStateChange: AuthStatusActions.subscribeToAuthStateChange,
    },
    dispatch
  );

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

function LoginPage({
  authDisabled,
  signinUser,
  signinProgress,
  clearSigninProgress,
  authStatus,
  subscribeToAuthStateChange,
}: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const authListenerUnsubscriber = React.useRef(null);

  React.useEffect(() => {
    authListenerUnsubscriber.current = subscribeToAuthStateChange();
  }, []);

  React.useEffect(() => {
    if (authStatus === AuthStatus.SignedIn) {
      Router.push('/form');
    }
  }, [authStatus]);

  React.useEffect(
    () => () => {
      clearSigninProgress();
      if (authListenerUnsubscriber.current) {
        authListenerUnsubscriber.current();
      }
    },
    [clearSigninProgress]
  );

  if (authStatus === AuthStatus.SignedIn) {
    Router.push('/form');
    return null;
  }

  const submitDisabled =
    authDisabled || !AuthUtils.isValidEmail(email) || !AuthUtils.isValidPassword(password);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <FormContainer showErrorsOnly progress={signinProgress} style={styles.formContainer}>
        <EmailInput
          value={email}
          onChangeText={text => {
            if (signinProgress.status) clearSigninProgress();
            setEmail(text);
          }}
        />
        <PasswordInput
          value={password}
          onChangeText={text => {
            if (signinProgress.status) clearSigninProgress();
            setPassword(text);
          }}
        />
      </FormContainer>
      <SubmitButton
        label={t('buttons.signin')}
        disabled={submitDisabled}
        onPress={() => signinUser(email, password)}
        loading={signinProgress.status === ProgressStatus.REQUEST}
      />
      <A href="/reset-password" style={styles.forgotPasswordButton}>
        {t('buttons.forgotPassword')}
      </A>
      <A href="/signup" style={styles.signupButton}>
        {t('buttons.signup')}
      </A>
    </View>
  );
}

LoginPage.getInitialProps = async (ctx: NextPageContext) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
