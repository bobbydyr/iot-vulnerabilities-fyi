import Head from 'next/head';
import { useRouter } from 'next/router';

import { ReactNode } from 'react';
import { Spacer } from '@nextui-org/react';
import NavBar from './Navbar';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title></title>
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"/>
      </Head>

      <NavBar/>

      <main className=' flex flex-col justify-center items-center'>
        <div className='w-full h-full max-w-screen-xl flex flex-col justify-center items-center'>
          {children}
        </div>
      </main>

    </>
  );
}
