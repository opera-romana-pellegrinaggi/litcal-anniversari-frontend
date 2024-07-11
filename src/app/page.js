'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const AppRoot = dynamic(() => import('../AppRoot'), { ssr: false });

function Page() {
  return <AppRoot />;
}

export default Page;
