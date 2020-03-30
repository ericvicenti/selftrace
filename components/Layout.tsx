import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthStatusActions from '../actions/auth/status';
import { Dispatch, Action } from '../actions';
import { ReduxRoot } from '../reducers';
import { AuthStatus } from '../data-types';

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

  componentWillUnmount() {
    if (this.unsubscribeFromAuthStateChange) {
      this.unsubscribeFromAuthStateChange();
    }
  }

  render() {
    if (this.props.authStatus === AuthStatus.Checking) {
      return null;
    }
    return this.props.children;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
