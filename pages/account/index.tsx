import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { t } from 'i18n-js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Router from 'next/router';
import { AuthStatus } from '../../data-types';
import Text from '../../components/Text';
import TabNavigator from '../../components/TabNavigator';
import SubmitButton from '../../components/SubmitButton';
import * as SignoutActions from '../../actions/auth/signout';
import { Action, Dispatch } from '../../actions';
import { ReduxRoot } from '../../reducers';
import { Colors, Margins } from '../../styles';

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
  progress: state.auth.signout.progress,
  authStatus: state.auth.status,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      signoutUser: SignoutActions.signoutUser,
      clearProgress: () => (d: Dispatch) => d(SignoutActions.clearSignoutProgress()),
    },
    dispatch
  );

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
  pathname: string;
}

function AccountPage({ signoutUser, pathname, authStatus, progress, clearProgress }: Props) {
  React.useEffect(
    () => () => {
      clearProgress();
    },
    [clearProgress]
  );

  React.useEffect(() => {
    if (authStatus === AuthStatus.SignedOut) {
      Router.push('/');
    }
  }, [authStatus]);

  const onLinkPress = (path: string) => () => {
    Router.push(path);
  };

  return (
    <>
      <TabNavigator pathname={pathname} />
      <View style={styles.container}>
        <Text style={styles.title}>{t('headers.account')}</Text>
        <TouchableOpacity onPress={onLinkPress('/account/profile')}>
          <Text>{t('screens.account.profile')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLinkPress('/account/update-password')}>
          <Text>{t('screens.account.updatePassword')}</Text>
        </TouchableOpacity>
        <SubmitButton
          label={t('buttons.signout')}
          progress={progress}
          backgroundColor={Colors.RED}
          onPress={() => {
            signoutUser();
          }}
        />
      </View>
    </>
  );
}

AccountPage.getInitialProps = async (ctx: NextPageContext) => {
  // do async stuff here to load data
  // ctx.query is the ?params
  // eg:
  // let url = getApiUrl(urlWithQuery('/libraries', ctx.query), ctx);
  // let response = await fetch(url);
  // let result = await response.json();

  return {
    // data: result,
    // query: ctx.query,
    pathname: ctx.pathname,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
