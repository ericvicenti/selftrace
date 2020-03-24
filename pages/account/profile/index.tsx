import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View } from 'react-native';
import { t } from 'i18n-js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormContainer from '../../../components/FormContainer';
import EmailInput from '../../../components/TextInput/Email';
import Text from '../../../components/Text';
import AuthUtils from '../../../util/AuthUtils';
import SubmitButton from '../../../components/SubmitButton';
import { Action, Dispatch } from '../../../actions';
import * as Actions from '../../../actions/auth/userInfo';
import { ReduxRoot } from '../../../reducers';
import { Colors, Margins } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontWeight: '900',
    color: Colors.PRIMARY.toString(),
    fontSize: 28,
  },
  formContainer: {
    width: '100%',
    marginTop: Margins.Y,
  },
});

const mapStateToProps = (state: ReduxRoot) => ({
  currentEmail: state.auth.userInfo.email,
  progress: state.auth.userInfo.progress,
  uid: state.auth.userInfo.uid,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      uploadUserInfo: Actions.uploadUserInfo,
      clearProgress: () => (d: Dispatch) => d(Actions.clearUpdateUserInfoProgress()),
    },
    dispatch
  );

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

function ProfilePage({ currentEmail, uploadUserInfo, uid, progress, clearProgress }: Props) {
  const [email, setEmail] = React.useState(currentEmail);
  const submitDisabled = !AuthUtils.isValidEmail(email) || email === currentEmail;

  React.useEffect(
    () => () => {
      clearProgress();
    },
    [clearProgress]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('headers.profile')}</Text>
      <FormContainer progress={progress} style={styles.formContainer}>
        <EmailInput
          value={email}
          onChangeText={text => {
            if (progress.status) clearProgress();
            setEmail(text.toLowerCase());
          }}
        />
      </FormContainer>
      <SubmitButton
        label={t('buttons.update')}
        progress={progress}
        disabled={submitDisabled}
        onPress={() => {
          uploadUserInfo(uid, { email });
        }}
      />
    </View>
  );
}

ProfilePage.getInitialProps = async (ctx: NextPageContext) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
