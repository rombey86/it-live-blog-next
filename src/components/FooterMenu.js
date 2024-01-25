import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query to fetch the footer menu items
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

  // Function to convert an absolute URL to a relative path
  const toRelativePath = (url) => {
    try {
      // Create a new URL object with the provided URL
      const urlObj = new URL(url);
      // Return the pathname, which is the relative path
      return urlObj.pathname;
    } catch (error) {
      console.error('Invalid URL:', url);
      return '#'; // Fallback to a safe anchor if the URL is invalid
    }
  };

  return (
    <footer>
      <nav>
        <ul>
          {data && data.menuItems.edges.map(({ node }) => (
            <li key={node.id}>
              {/* Convert the URL to a relative path before rendering the link */}
              <a href={toRelativePath(node.url)}>{node.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default FooterMenu;
