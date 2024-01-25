import React from 'react';
import { useQuery, gql } from '@apollo/client';

const FOOTER_MENU_QUERY = gql`
  query GetFooterMenu {
    menuItems(where: { location: FOOTER }) {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const toRelativePath = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch (error) {
      console.error('Invalid URL:', url);
      return '#';
    }
  };

  return (
    <footer>
      <nav>
        <ul>
          {data?.menuItems.edges.map(({ node }) => (
            <li key={node.id}>
              <a href={toRelativePath(node.url)}>{node.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default FooterMenu;
