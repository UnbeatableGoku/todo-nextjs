import Header from '@components/header/Header';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

import '@styles/globals.css';
function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Toaster />
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
