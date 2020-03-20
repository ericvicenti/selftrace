import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Router from 'next/router';
import FormContainer from '../../components/FormContainer';
import Picker from '../../components/Picker';
import Text from '../../components/Text';
import SubmitButton from '../../components/SubmitButton';
import * as Actions from '../../actions/auth/userInfo';
import * as AuthStatusActions from '../../actions/auth/status';
import { Dispatch, Action } from '../../actions';
import { ReduxRoot } from '../../reducers';
import { PRIMARY_COLOR, BORDER_COLOR } from '../../styles/colors';
import { MARGIN_Y, W_WIDTH, W_MARGIN } from '../../styles';
import { AuthStatus } from '../../data-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  topText: {},
  textContainer: {
    padding: W_MARGIN,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR,
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

function FormPage({ currentWellbeing, progress, authStatus, subscribeToAuthStateChange }: Props) {
  const [wellbeing, setWellbeing] = React.useState(currentWellbeing);
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
      <Text style={styles.title as any}>Form</Text>
      <View style={styles.textContainer as any}>
        <Text style={styles.topText as any}>Top Note</Text>
      </View>
      <FormContainer progress={progress}>
        <Picker
          label="Wellbeing"
          displayValue="DisplayVal"
          selectedValue={wellbeing}
          onValueChange={val => setWellbeing(val)}
          items={[
            { label: 'Label1', value: 'val1' },
            { label: 'Label2', value: 'val2' },
          ]}
        />
      </FormContainer>
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
