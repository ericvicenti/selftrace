import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet } from 'react-native';
import { t } from 'i18n-js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormContainer from '../../../components/FormContainer';
import PageContainer from '../../../components/PageContainer';
import PasswordInput from '../../../components/TextInput/Password';
import Text from '../../../components/Text';
import AuthUtils from '../../../util/AuthUtils';
import SubmitButton from '../../../components/SubmitButton';
import { ProgressStatus } from '../../../data-types';
import { Action, Dispatch } from '../../../actions';
import * as Actions from '../../../actions/auth/updatePassword';
import { ReduxRoot } from '../../../reducers';
import { Colors, Margins } from '../../../styles';

const styles = StyleSheet.create({
  title: {
    fontWeight: '900',
    color: Colors.PRIMARY.toString(),
    fontSize: 28,
  },
  formContainer: {
    width: '100%',
    marginTop: Margins.MAX_Y,
  },
});

const mapStateToProps = (state: ReduxRoot) => ({
  progress: state.auth.updatePassword.progress,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      updateUserPassword: Actions.updateUserPassword,
      clearProgress: () => (d: Dispatch) => d(Actions.clearUpdatePasswordProgress()),
    },
    dispatch
  );

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

function UpdatePasswordPage({ progress, updateUserPassword, clearProgress }: Props) {
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  const submitDisabled = password1 !== password2 || !AuthUtils.isValidPassword(password1);

  React.useEffect(
    () => () => {
      clearProgress();
    },
    [clearProgress]
  );

  return (
    <PageContainer>
      <Text style={styles.title}>{t('headers.updatePassword')}</Text>
      <FormContainer progress={progress} style={styles.formContainer}>
        <PasswordInput
          value={password1}
          onChangeText={text => {
            if (progress.status !== ProgressStatus.NIL) clearProgress();
            setPassword1(text);
          }}
          placeholder={t('inputs.newPasswordPlaceholder')}
          onSubmitEditing={() => {
            updateUserPassword(password1);
          }}
        />
        <PasswordInput
          value={password2}
          onChangeText={text => {
            if (progress.status !== ProgressStatus.NIL) clearProgress();
            setPassword2(text);
          }}
          placeholder={t('inputs.confirmPasswordPlaceholder')}
          onSubmitEditing={() => {
            updateUserPassword(password1);
          }}
        />
      </FormContainer>
      <SubmitButton
        label={t('buttons.update')}
        progress={progress}
        disabled={submitDisabled}
        onPress={() => {
          updateUserPassword(password1);
        }}
      />
    </PageContainer>
  );
}

UpdatePasswordPage.getInitialProps = async (ctx: NextPageContext) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePasswordPage);
