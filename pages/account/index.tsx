import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View } from 'react-native';
import { t } from 'i18n-js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Router from 'next/router';
import { AuthStatus } from '../../data-types';
import Text from '../../components/Text';
import PageContainer from '../../components/PageContainer';

import Hoverable from '../../components/Hoverable';
import SubmitButton from '../../components/SubmitButton';
import * as SignoutActions from '../../actions/auth/signout';
import { Action, Dispatch } from '../../actions';
import { ReduxRoot } from '../../reducers';
import { Colors, Margins, Shadows, Buttons } from '../../styles';
import FlexLoader from '../../components/FlexLoader';

const styles = StyleSheet.create({
  title: {
    fontWeight: '900',
    color: Colors.PRIMARY.toString(),
    fontSize: 28,
  },
  formContainer: {
    width: '100%',
    marginTop: Margins.Y,
  },
  itemsContainer: {
    marginTop: Margins.MAX_Y,
  },
  item: {
    ...Shadows.MAIN_CONTAINER,
    shadowRadius: 7,
    alignSelf: 'flex-start',
    marginBottom: Margins.MIN_Y,
    minWidth: Buttons.MIN_WIDTH,
    minHeight: 50,
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

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

function AccountPage({ signoutUser, authStatus, progress, clearProgress }: Props) {
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

  if (authStatus === AuthStatus.SignedOut) {
    return <FlexLoader />;
  }

  return (
    <PageContainer>
      <Text style={styles.title}>{t('headers.account')}</Text>
      <View style={styles.itemsContainer}>
        <Hoverable onPress={onLinkPress('/account/profile')} style={styles.item}>
          <Text>{t('screens.account.profile')}</Text>
        </Hoverable>
        <Hoverable onPress={onLinkPress('/account/update-password')} style={styles.item}>
          <Text>{t('screens.account.updatePassword')}</Text>
        </Hoverable>
      </View>
      <SubmitButton
        label={t('buttons.signout')}
        progress={progress}
        backgroundColor={Colors.RED}
        onPress={() => {
          signoutUser();
        }}
      />
    </PageContainer>
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
