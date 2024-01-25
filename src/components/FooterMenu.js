import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query with a variable for the location
const FOOTER_MENU_QUERY = gql`
  query GetFooterMenu($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }) {
      edges {
        node {
          id
          label
          url
        }
      }
    }
  }
`;

const FooterMenu = () => {
  // Fetch the environment variable
 // const menuLocation = process.env.WORDPRESS_MENU_LOCATION_FOOTER;
  // Pass the variable to the useQuery hook
  // const { loading, error, data } = useQuery(FOOTER_MENU_QUERY, {
    // variables: { location: menuLocation },
  // });
  const { loading, error, data } = useQuery(FOOTER_MENU_QUERY, {
    variables: { location: 'FOOTER' }, // Replace with your actual menu location
  });
  if (loading) return <p>Lade...</p>;
  if (error) return <p>Fehler: {error.message}</p>;

  // Ensure data is not undefined
  if (!data || !data.menuItems) return null;

  return (
    <footer>
      <nav>
        <ul>
          {data.menuItems.edges.map(({ node }) => (
            <li key={node.id}>
              <a href={node.url}>{node.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default FooterMenu;
