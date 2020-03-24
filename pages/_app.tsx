import * as React from 'react';
import { View } from 'react-native';
// import * as Sentry from '@sentry/node';
import Head from 'next/head';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import CustomAppearanceProvider from '../context/CustomAppearanceProvider';
import Favicon from '../components/Favicon';
import GlobalFooter from '../components/GlobalFooter';
import Layout from '../components/Layout';
import { initStore } from '../store';
import '../config/localization';

// Sentry.init({
//   dsn: 'https://b084338633454a63a82c787541b96d8f@sentry.io/2503319',
//   enabled: process.env.NODE_ENV === 'production',
// });

const site = {
  title: 'Corona Map',
  description: 'Track COVID-19',
};

const themeColor = '#fff';

function App(props: any) {
  const { pageProps, Component, store } = props;

  return (
    <Provider store={store}>
      <Head>
        <title>CoronaMap</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            html,
            body {
              position: relative;
              width: 100%;
              height: 100%;
            }
          
            html,
            body,
            #__next {
              display: flex;
              flex-direction: column;
              flex-grow: 1;
            }

            @font-face {
              font-family: 'office-code';
              src: url(${require('../assets/fonts/OfficeCodePro-Regular.eot')});
              src: url(${require('../assets/fonts/OfficeCodePro-Regular.ttf')}) format('truetype');
            }

            @font-face {
              font-family: 'office-code-medium';
              src: url(${require('../assets/fonts/OfficeCodePro-Medium.eot')});
              src: url(${require('../assets/fonts/OfficeCodePro-Medium.ttf')}) format('truetype');
            }
          `,
          }}
        />
        <link rel="manifest" href="/manifest.webmanifest"></link>
        {/* <GoogleAnalytics id="UA-107832480-1" /> */}
        {injectMeta.map((value, index) => {
          return <meta key={`meta-${index}`} {...value} />;
        })}
      </Head>
      <SafeAreaProvider>
        <AppearanceProvider>
          <CustomAppearanceProvider>
            <View style={{ flex: 1 }}>
              <Favicon />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </View>
            <GlobalFooter />
          </CustomAppearanceProvider>
        </AppearanceProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

const injectMeta = [
  {
    name: `description`,
    content: site.description,
  },
  {
    property: `og:description`,
    content: site.description,
  },
  {
    property: `og:title`,
    content: site.title,
  },
  {
    property: 'og:site_name',
    content: site.title,
  },
  // {
  //   property: 'og:url',
  //   content: `https://coronamap.com???`,
  // },
  {
    property: `og:type`,
    content: `website`,
  },
  {
    key: 'viewport',
    name: 'viewport',
    content:
      'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1.00001,viewport-fit=cover',
  },
  {
    name: 'msapplication-TileColor',
    content: themeColor,
  },
  {
    name: 'theme-color',
    content: themeColor,
  },
  { name: `twitter:card`, content: 'Find packages for your apps' },
  { name: `twitter:title`, content: site.title },
  { name: `twitter:description`, content: site.description },

  // Image
  // { property: 'og:image', content: image.url },
  // { property: 'og:image:secure_url', content: image.secureUrl },
  // { property: 'og:image:type', content: image.type },
  // { property: 'og:image:width', content: image.width },
  // { property: 'og:image:height', content: image.height },
  // { property: 'og:image:alt', content: image.description },
];

if (typeof navigator == 'object' && 'serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      console.log('SW registered: ', registration)
    }).catch(function (error) {
      console.log('SW registration failed: ', error)
    })
  })
}

export default withRedux(initStore)(App);
