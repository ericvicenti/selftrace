import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { connect } from 'react-redux';
import Router from 'next/router';
import { ReduxRoot } from '../../reducers';
import { AuthStatus } from '../../data-types';
import { Margins, Colors } from '../../styles';
import Header from '../Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Margins.MAX_Y,
    paddingHorizontal: Margins.WINDOW,
  },
  navContainer: {
    flexDirection: 'row',
    shadowRadius: 3,
    shadowColor: Colors.SHADOW.toString(),
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
  },
});

const mapStateToProps = (state: ReduxRoot) => ({
  authStatus: state.auth.status,
  isEmailVerified: state.auth.userInfo.isEmailVerified,
});

interface ComponentProps extends ViewProps {
  showHeader?: boolean;
  isProtected?: boolean;
  isFullScreen?: boolean;
  children?: ReactNode;
}

type Props = ComponentProps & ReturnType<typeof mapStateToProps>;

const PageContainer = ({
  authStatus,
  isEmailVerified,
  showHeader = true,
  isProtected = true,
  isFullScreen = false,
  children,
  style,
  ...rest
}: Props) => {
  const containerStyles: StyleProp<ViewStyle> = [styles.container];

  React.useEffect(() => {
    if (isProtected && authStatus === AuthStatus.SignedIn && !isEmailVerified) {
      Router.push('/verify-email');
    }
  }, [isProtected, authStatus, isEmailVerified]);

  React.useEffect(() => {
    if (isProtected && authStatus === AuthStatus.SignedOut) {
      Router.push('/');
    }
  }, [isProtected, authStatus]);

  if (isProtected && authStatus !== AuthStatus.SignedIn) {
    return null;
  }

  if (isProtected && authStatus === AuthStatus.SignedIn && !isEmailVerified) {
    return null;
  }

  if (isFullScreen) {
    containerStyles.push({ padding: 0 });
  }

  const Content = (
    <View style={[containerStyles, style]} {...rest}>
      {children}
    </View>
  );

  return showHeader ? (
    <>
      <Header />
      {Content}
    </>
  ) : (
    Content
  );
};

export default connect<Props>(mapStateToProps, () => ({}))(PageContainer);
