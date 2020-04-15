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
import FlexLoader from '../components/FlexLoader';
import DividerText from '../components/DividerText';
import GoogleButton from '../components/SocialButton/GoogleButton';
import { useAuthRedirect } from '../hooks';
import { AuthStatus } from '../data-types';
import { ReduxRoot } from '../reducers';
import * as Selectors from '../selectors';
import { Dispatch, Action } from '../actions';
import * as SigninActions from '../actions/auth/signin';
import AuthUtils from '../util/AuthUtils';
import { Colors, Margins, Main, Paddings } from '../styles';

const logoSource = require('../../assets/logo-with-title.png');

const styles = StyleSheet.create({
  container: {
    paddingBottom: Paddings.MAX_Y,
  },
  logo: {
    paddingVertical: Paddings.Y,
    paddingHorizontal: Paddings.X,
    marginVertical: Margins.MAX_Y,
    height: 120,
    width: 300,
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
    marginBottom: 3 * Margins.MAX_Y, // TODO: Handle better
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
  authDisabled: Selectors.isAuthDisabled(state),
  progress: state.auth.signin.progress,
  authStatus: state.auth.status,
  isEmailVerified: state.auth.userInfo.isEmailVerified,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      signinUser: SigninActions.signinUser,
      googleOAuthUser: SigninActions.googleOAuthUser,
      clearProgress: () => (d: Dispatch) => d(SigninActions.clearSigninProgress()),
    },
    dispatch
  );

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

function LoginPage({
  authDisabled,
  signinUser,
  progress,
  clearProgress,
  authStatus,
  isEmailVerified,
  googleOAuthUser,
}: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(
    () => () => {
      clearProgress();
    },
    [clearProgress]
  );

  useAuthRedirect(authStatus, isEmailVerified);

  const submitDisabled =
    authDisabled || !AuthUtils.isValidEmail(email) || !AuthUtils.isValidPassword(password);

  const onLinkPress = (path: string) => () => {
    Router.push(path);
  };

  if (authStatus === AuthStatus.SignedIn) {
    return <FlexLoader />;
  }

  return (
    <PageContainer showHeader={false} isProtected={false} style={styles.container}>
      <Image style={styles.logo} source={logoSource} />
      <FormContainer showErrorsOnly progress={progress} style={styles.formContainer}>
        <EmailInput
          value={email}
          onChangeText={text => {
            if (!progress.isNil()) {
              clearProgress();
            }
            setEmail(text);
          }}
          onSubmitEditing={() => signinUser(email, password)}
        />
        <PasswordInput
          value={password}
          onChangeText={text => {
            if (!progress.isNil()) {
              clearProgress();
            }
            setPassword(text);
          }}
          onSubmitEditing={() => signinUser(email, password)}
        />
      </FormContainer>
      <View style={styles.ctaContainer}>
        <SubmitButton
          label={t('buttons.signin')}
          progress={progress}
          disabled={submitDisabled}
          onPress={() => signinUser(email, password)}
        />
        <GoogleButton onPress={googleOAuthUser} />
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
