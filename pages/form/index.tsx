import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Router from 'next/router';
import Text from '../../components/Text';
import SubmitButton from '../../components/SubmitButton';
import * as Actions from '../../actions/auth/userInfo';
import * as AuthStatusActions from '../../actions/auth/status';
import { Dispatch, Action } from '../../actions';
import { ReduxRoot } from '../../reducers';
import { PRIMARY_COLOR } from '../../styles/colors';
import { MARGIN_Y } from '../../styles';
import { AuthStatus } from '../../data-types';

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

const mapStateToProps = (state: ReduxRoot) => ({
  currentWellbeing: state.auth.userInfo.wellbeing,
  progress: state.auth.userInfo.progress,
  authStatus: state.auth.status,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      uploadUserInfo: Actions.uploadUserInfo,
      clearProgress: () => (d: Dispatch) => d(Actions.clearUpdateUserInfoProgress()),
      subscribeToAuthStateChange: AuthStatusActions.subscribeToAuthStateChange,
    },
    dispatch
  );

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

function FormPage({ authStatus, subscribeToAuthStateChange }: Props) {
  const authListenerUnsubscriber = React.useRef(null);

  React.useEffect(() => {
    authListenerUnsubscriber.current = subscribeToAuthStateChange();
  }, []);

  React.useEffect(() => () => {
    if (authListenerUnsubscriber.current) {
      authListenerUnsubscriber.current();
    }
  });

  if (authStatus !== AuthStatus.SignedIn) {
    Router.push('/');
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form</Text>
      <SubmitButton
        label="Update"
        disabled={false}
        onPress={() => {
          //
        }}
      />
    </View>
  );
}

FormPage.getInitialProps = async (ctx: NextPageContext) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
