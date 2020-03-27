import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Router from 'next/router';
import { t } from 'i18n-js';
import FormContainer from '../components/FormContainer';
import PageContainer from '../components/PageContainer';
import EmailInput from '../components/TextInput/Email';
import PasswordInput from '../components/TextInput/Password';
import SubmitButton from '../components/SubmitButton';
import StaticButton from '../components/StaticButton';
import { AuthStatus } from '../data-types';
import { ReduxRoot, isAuthDisabled } from '../reducers';
import { Dispatch, Action } from '../actions';
import * as SigninActions from '../actions/auth/signin';
import AuthUtils from '../util/AuthUtils';
import { Colors, Margins, Main, Paddings } from '../styles';
import FlexLoader from '../components/FlexLoader';
import DividerText from '../components/DividerText';

import { loginWithGoogle } from '../api/auth';

import GoogleButton from '../components/SocialButton/GoogleButton';

const logoSource = require('../assets/logo.png');

const styles = StyleSheet.create({
  logo: {
    height: 160,
    width: 160,
  },
  formContainer: {
    width: '100%',
    marginTop: Margins.MAX_Y,
  },
  forgotPasswordButton: {
    color: Colors.INACTIVE_TEXT.toString(),
    fontSize: 16,
    marginTop: Margins.MAX_Y,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  signupButton: {
    marginTop: Margins.MIN_Y,
    color: Colors.BLUE.toString(),
    fontSize: 16,
  },
  ctaContainer: {
    flex: 1,
    maxWidth: Main.FORM_CONTANER_MAX_WIDTH,
    paddingHorizontal: Paddings.MAX_X,
    width: '100%',
  },
  dividerTextContainer: {
    width: '100%',
  },
});

const mapStateToProps = (state: ReduxRoot) => ({
  authDisabled: isAuthDisabled(state.auth),
  progress: state.auth.signin.progress,
  authStatus: state.auth.status,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      signinUser: SigninActions.signinUser,
      clearProgress: () => (d: Dispatch) => d(SigninActions.clearSigninProgress()),
    },
    dispatch
  );

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

function LoginPage({ authDisabled, signinUser, progress, clearProgress, authStatus }: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(
    () => () => {
      clearProgress();
    },
    [clearProgress]
  );

  React.useEffect(() => {
    if (authStatus === AuthStatus.SignedIn) {
      Router.push('/map');
    }
  }, [authStatus]);

  const submitDisabled =
    authDisabled || !AuthUtils.isValidEmail(email) || !AuthUtils.isValidPassword(password);

  const onLinkPress = (path: string) => () => {
    Router.push(path);
  };

  if (authStatus === AuthStatus.SignedIn) {
    return <FlexLoader />;
  }

  return (
    <PageContainer showHeader={false}>
      <Image style={styles.logo} source={logoSource} />
      <FormContainer showErrorsOnly progress={progress} style={styles.formContainer}>
        <EmailInput
          value={email}
          onChangeText={text => {
            if (progress.status) clearProgress();
            setEmail(text);
          }}
        />
        <PasswordInput
          value={password}
          onChangeText={text => {
            if (progress.status) clearProgress();
            setPassword(text);
          }}
        />
      </FormContainer>
      <View style={styles.ctaContainer}>
        <SubmitButton
          label={t('buttons.signin')}
          progress={progress}
          disabled={submitDisabled}
          onPress={() => signinUser(email, password)}
        />
        <GoogleButton onPress={loginWithGoogle} />
        <View style={styles.dividerTextContainer}>
          <DividerText label={t('dividers.or').toUpperCase()} />
        </View>
        <StaticButton label={t('buttons.signup')} onPress={onLinkPress('/signup')} />
        <TouchableOpacity onPress={onLinkPress('/reset-password')}>
          <Text style={styles.forgotPasswordButton}>{t('buttons.forgotPassword')}</Text>
        </TouchableOpacity>
      </View>
    </PageContainer>
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
