import NextApp from 'next/app';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';

// Import your hooks and lib functions
import { SiteContext, useSiteContext } from 'hooks/use-site';
import { SearchProvider } from 'hooks/use-search';
import { useApollo } from '../lib/apollo-client';
import { getSiteMetadata } from 'lib/site';
import { getRecentPosts } from 'lib/posts';
import { getCategories } from 'lib/categories';
import { getAllMenus } from 'lib/menus';

// Import your components and styles
import CookieConsent from 'react-cookie-consent';
import NextNProgress from 'nextjs-progressbar';
import AdsenseAutoAds from '../components/AdsenseAutoAds';
import 'styles/globals.scss';
import 'styles/wordpress.scss';
import variables from 'styles/_variables.module.scss';

function App({ Component, pageProps }) {
  // Initialize Apollo Client with the initial state
  const apolloClient = useApollo(pageProps.initialApolloState);

  // Use the site context hook to get the necessary site data
  const site = useSiteContext(pageProps);

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
      <SiteContext.Provider value={site}>
        <SearchProvider>
          <Head>
            {/* Matomo Tag Manager */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  var _mtm = window._mtm = window._mtm || [];
                  _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
                  (function() {
                    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                    g.async = true; g.src = 'https://matomo.it-live-blog.com/js/container_rO4Kojsr.js'; s.parentNode.insertBefore(g, s);
                  })();
                `,
              }}
            />
          </Head>
          <NextNProgress height={4} color={variables.progressbarColor} />
          <Component {...pageProps} />
          <AdsenseAutoAds />
        </SearchProvider>
      </SiteContext.Provider>
    </ApolloProvider>
  );
}

// Fetch global data for every page
App.getInitialProps = async function (appContext) {
  const appProps = await NextApp.getInitialProps(appContext);

  // Fetch data from your lib functions
  const metadata = await getSiteMetadata();
  const { posts: recentPosts } = await getRecentPosts({
    count: 5,
    queryIncludes: 'index',
  });
  const { categories } = await getCategories({ count: 5 });
  const { menus = [] } = await getAllMenus();

  // Return the data as props to be used in the site context
  return {
    ...appProps,
    pageProps: {
      metadata,
      recentPosts,
      categories,
      menus,
    },
  };
};

export default App;
