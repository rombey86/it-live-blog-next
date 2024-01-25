// src/components/Footer/index.js
import React from 'react';
import FooterMenu from './FooterMenu';
import styles from './Footer.module.scss';
import useSite from 'hooks/use-site';

const Footer = () => {
  const { metadata: { title } = {} } = useSite();

  return (
    <footer className={styles.footer}>
      <FooterMenu />
      <div className={styles.footerLegal}>
        <p>
          &copy; {new Date().getFullYear()} {title}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
