import React from 'react';
import { useQuery, gql } from '@apollo/client';

const FOOTER_MENU_QUERY = gql`
  query GetFooterMenu {
    menuItems(where: {location: ${process.env.WORDPRESS_MENU_LOCATION_FOOTER}}) {
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
  const { loading, error, data } = useQuery(FOOTER_MENU_QUERY);

  if (loading) return <p>Lade...</p>;
  if (error) return <p>Fehler: {error.message}</p>;

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
