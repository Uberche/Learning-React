import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <a href="/"><img src={burgerLogo} alt="Burger Logo" /></a>
    </div >
);

export default logo;