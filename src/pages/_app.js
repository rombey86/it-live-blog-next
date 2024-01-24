import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo-client';

// Import your hooks and lib functions
import { SiteContext, useSiteContext } from 'hooks/use-site';
import { SearchProvider } from 'hooks/use-search';

// Import your components and styles
import NextNProgress from 'nextjs-progressbar';
import AdsenseAutoAds from '../components/AdsenseAutoAds';
import FooterMenu from '../components/FooterMenu';
import 'styles/globals.scss';
import 'styles/wordpress.scss';
import variables from 'styles/_variables.module.scss';

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  // Use the site context hook to get the necessary site data
  const site = useSiteContext(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <SiteContext.Provider value={site}>
        <SearchProvider>
          <NextNProgress height={4} color={variables.progressbarColor} />
          <Component {...pageProps} />
          <FooterMenu />
          <AdsenseAutoAds />
        </SearchProvider>
      </SiteContext.Provider>
    </ApolloProvider>
  );
}

export default App;
