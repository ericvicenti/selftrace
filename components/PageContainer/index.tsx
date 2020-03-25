import React, { ReactNode } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { withRouter, SingletonRouter } from 'next/router';
import { Margins } from '../../styles';
import TabNavigator from '../TabNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: Margins.WINDOW,
  },
});

interface PublicProps extends ViewProps {
  children?: ReactNode;
}

interface PrivateProps {
  router?: SingletonRouter;
}

interface Props extends PublicProps, PrivateProps {}

const PageContainer = (props: Props) => {
  const { children, style, router, ...rest } = props;
  return (
    <>
      <View>
        <TabNavigator pathname={router.pathname} />
      </View>
      <View style={[styles.container, style]} {...rest}>
        {children}
      </View>
    </>
  );
};

const RoutedPageContainer = withRouter(PageContainer);

export default (props: PublicProps) => {
  return <RoutedPageContainer {...props} />;
};
