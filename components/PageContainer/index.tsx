import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { withRouter, SingletonRouter } from 'next/router';
import { Margins, Colors } from '../../styles';
import TabNavigator from '../TabNavigator';
import NavLogo from '../NavLogo';

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

interface PublicProps extends ViewProps {
  showHeader?: boolean;
  children?: ReactNode;
  isFullScreen?: boolean;
}

interface PrivateProps {
  router: SingletonRouter;
}

interface Props extends PublicProps, PrivateProps {}

const PageContainer = (props: Props) => {
  const { showHeader = true, children, isFullScreen, style, router, ...rest } = props;

  const containerStyles: StyleProp<ViewStyle> = [styles.container];

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
      <View style={styles.navContainer}>
        <NavLogo />
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
