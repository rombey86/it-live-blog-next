import NextApp from 'next/app';
import { ApolloProvider } from '@apollo/client';

// Import your hooks and lib functions
import { SiteContext, useSiteContext } from 'hooks/use-site';
import { SearchProvider } from 'hooks/use-search';
import { useApollo } from '../lib/apollo-client';
import { getSiteMetadata } from 'lib/site';
import { getRecentPosts } from 'lib/posts';
import { getCategories } from 'lib/categories';
import { getAllMenus } from 'lib/menus';

// Import your components and styles
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
    // Wrap your application with ApolloProvider and pass the client instance
    <ApolloProvider client={apolloClient}>
      <SiteContext.Provider value={site}>
        <SearchProvider>
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
