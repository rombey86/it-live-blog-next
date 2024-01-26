import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { useApollo } from '../lib/apollo-client';

import { SiteContext } from 'hooks/use-site';
import { SearchProvider } from 'hooks/use-search';

import NextNProgress from 'nextjs-progressbar';
import AdsenseAutoAds from '../components/AdsenseAutoAds';
import 'styles/globals.scss';
import 'styles/wordpress.scss';
import variables from 'styles/_variables.module.scss';

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <SiteContext.Provider value={pageProps}>
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
                    g.async = true; g.src = 'https://matomo.it-live-blog.com/js/container_U7VVtRw5.js'; s.parentNode.insertBefore(g, s);
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

export default App;