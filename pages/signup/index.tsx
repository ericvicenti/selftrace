import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { t } from 'i18n-js';
import Router from 'next/router';
import FormContainer from '../../components/FormContainer';
import EmailInput from '../../components/TextInput/Email';
import PasswordInput from '../../components/TextInput/Password';
import Text from '../../components/Text';
import SubmitButton from '../../components/SubmitButton';
import { PRIMARY_COLOR } from '../../styles/colors';
import { MARGIN_Y } from '../../styles';
import { ProgressStatus, AuthStatus } from '../../data-types';
import { ReduxRoot, isAuthDisabled } from '../../reducers';
import { Dispatch, Action } from '../../actions';
import * as SignupActions from '../../actions/auth/signup';
import AuthUtils from '../../util/AuthUtils';

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
    marginTop: MARGIN_Y,
  },
});

const mapStateToProps = (state: ReduxRoot) => ({
  authDisabled: isAuthDisabled(state.auth),
  progress: state.auth.signup.progress,
  authStatus: state.auth.status,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      signupUser: SignupActions.signupUser,
      clearProgress: () => (d: Dispatch) => d(SignupActions.clearSignupProgress()),
    },
    dispatch
  );

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

function SignupPage({ signupUser, progress, clearProgress, authDisabled, authStatus }: Props) {
  const [email, setEmail] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  React.useEffect(
    () => () => {
      clearProgress();
    },
    [clearProgress]
  );

  React.useEffect(() => {
    if (authStatus === AuthStatus.SignedIn) {
      Router.push('/form');
    }
  }, [authStatus]);

  const submitDisabled =
    authDisabled ||
    password1 !== password2 ||
    !AuthUtils.isValidPassword(password1) ||
    !AuthUtils.isValidEmail(email);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('headers.signup')}</Text>
      <FormContainer progress={progress} style={styles.formContainer}>
        <EmailInput
          value={email}
          onChangeText={text => {
            if (progress.status) clearProgress();
            setEmail(text);
          }}
          placeholder="Enter your email" // TODO: Localize
        />
        <PasswordInput
          value={password1}
          onChangeText={text => {
            if (progress.status) clearProgress();
            setPassword1(text);
          }}
          placeholder="Enter a new password" // TODO: Localize
        />
        <PasswordInput
          value={password2}
          onChangeText={text => {
            if (progress.status) clearProgress();
            setPassword2(text);
          }}
          placeholder="Confirm your new password" // TODO: Localize
        />
      </FormContainer>
      <SubmitButton
        label={t('buttons.signup')}
        progress={progress}
        disabled={submitDisabled}
        onPress={() => signupUser(email, password1)}
      />
    </View>
  );
}

SignupPage.getInitialProps = async (ctx: NextPageContext) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
