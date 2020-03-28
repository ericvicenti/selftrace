import * as React from 'react';
import Head from 'next/head';

export default function() {
  return (
    <Head>
      <link
        rel="icon"
        type="image/png"
        sizes="64x64"
        href={require('../assets/favicon-64x64.png')}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={require('../assets/favicon-32x32.png')}
      />
    </Head>
  );
}
