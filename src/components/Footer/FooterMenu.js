// src/components/Footer/FooterMenu.js
import React from 'react';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import styles from './Footer.module.scss';

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
    <div className={styles.footerMenu}>
      <ul className={styles.footerMenuColumns}>
        {data?.menuItems.edges.map(({ node }) => (
          <li key={node.id} className={styles.footerMenuItem}>
            <Link href={toRelativePath(node.url)}>
              <a className={styles.footerMenuLink}>{node.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterMenu;
