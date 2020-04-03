import * as React from 'react';
import Head from 'next/head';

const fav64 = require('../../assets/favicon-64x64.png');
const fav32 = require('../../assets/favicon-64x64.png');

export default function() {
  return (
    <Head>
      <link rel="icon" type="image/png" sizes="64x64" href={fav64} />
      <link rel="icon" type="image/png" sizes="32x32" href={fav32} />
    </Head>
  );
}
