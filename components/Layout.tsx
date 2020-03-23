import React from 'react';
// import { ActivityIndicator, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthStatusActions from '../actions/auth/status';
import { Dispatch, Action } from '../actions';
import { ReduxRoot } from '../reducers';
import { AuthStatus } from '../data-types';
// import { PRIMARY_COLOR } from '../styles/colors';

const mapStateToProps = (state: ReduxRoot) => ({
  authStatus: state.auth.status,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      subscribeToAuthStateChange: AuthStatusActions.subscribeToAuthStateChange,
    },
    dispatch
  );

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

class App extends React.PureComponent<Props> {
  unsubscribeFromAuthStateChange: any;

  componentDidMount() {
    this.unsubscribeFromAuthStateChange = this.props.subscribeToAuthStateChange();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.authStatus !== this.props.authStatus) {
      if (prevProps.authStatus === AuthStatus.Checking) {
        if (this.props.authStatus === AuthStatus.SignedOut) {
          // Router.push('/');
        }
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromAuthStateChange();
  }

  render() {
    if (this.props.authStatus === AuthStatus.Checking) {
      return null;
      //   return (
      //     <View style={{ flex: 1 }}>
      //       <ActivityIndicator size="large" color={PRIMARY_COLOR.toString()} />
      //     </View>
      //   );
    }
    return this.props.children;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
