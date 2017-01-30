import React, {Component} from 'react';
import { Link  } from 'react-router';
import styles from './Header.css';

function Header(props) {
    return (
            <header className={styles.header}>
                <h1> MI primera app</h1>
                <nav role="navigation">
                    <Link to="/">Home</Link>
                    <a href="http://google" target="_blank">google</a>
                </nav>
                
            </header>
        );
}


export default Header;