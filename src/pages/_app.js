// pages/_app.js
//import App from 'next/app';
import { ApolloProvider } from '@apollo/client';
import CookieConsent from 'react-cookie-consent';
import { useApollo } from '../lib/apollo-client';
import AdsenseAutoAds from '../components/AdsenseAutoAds';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <CookieConsent
        location="bottom"
        buttonText="Akzeptieren"
        declineButtonText="Ablehnen"
        cookieName="userConsent"
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        expires={150}
        onAccept={() => console.log('Cookie akzeptiert')}
        onDecline={() => console.log('Cookie abgelehnt')}
        enableDeclineButton
      >
        Wir verwenden Cookies, um die Benutzererfahrung zu verbessern und die Website sicherer und effektiver zu
        gestalten. Weitere Informationen finden Sie in unserer{' '}
        <a href="https://static.it-live-blog.com/datenschutzerklaerung-2-0/" style={{ textDecoration: 'underline' }}>
          Datenschutzerklärung
        </a>
        .
      </CookieConsent>
      <Component {...pageProps} />
      <AdsenseAutoAds />
    </ApolloProvider>
  );
}

export default MyApp;
