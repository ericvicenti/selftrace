import React, { ReactNode } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { withRouter, SingletonRouter } from 'next/router';
import { Margins } from '../../styles';
import TabNavigator from '../TabNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Margins.MAX_Y,
    paddingHorizontal: Margins.WINDOW,
  },
});

interface PublicProps extends ViewProps {
  showHeader?: boolean;
  children?: ReactNode;
}

interface PrivateProps {
  router: SingletonRouter;
}

interface Props extends PublicProps, PrivateProps {}

const PageContainer = (props: Props) => {
  const { showHeader = true, children, style, router, ...rest } = props;
  const Content = (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );

  return showHeader ? (
    <>
      <View>
        <TabNavigator pathname={router.pathname} />
      </View>
      {Content}
    </>
  ) : (
    Content
  );
};

const RoutedPageContainer = withRouter(PageContainer);

export default (props: PublicProps) => {
  return <RoutedPageContainer {...props} />;
};
