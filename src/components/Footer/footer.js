import React from 'react';
import styles from './footer.css';
import { Link } from 'react-router-dom';

import {CURRENT_YEAR} from '../../config'

const Footer = () => {
    return (
       <div className={styles.footer}>
       <Link to="/" className={styles.logo}>
       <img alt="Sailing Logo" src="/images/sailing_logo.png" />
       </Link>
       <div className={styles.right}>
           @Sailing News {CURRENT_YEAR} -  All right reserved!
       </div>
       </div>
    );
};

export default Footer;