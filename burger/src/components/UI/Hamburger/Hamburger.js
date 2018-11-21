import React from 'react';

import classes from './Hamburger.module.css';

const hamburger = (props) => {
    let attachedClasses = [[classes.line1, classes.stopped], [classes.line2, classes.stopped], [classes.line3, classes.stopped]];
    let containClasses = [classes.Contain];
    if (props.isOpen) {
        attachedClasses = [[classes.line1], [classes.line2], [classes.line3]];
        containClasses = [classes.Contain, classes.Active];
    }
    return (
        <div onClick={props.clicked} className={containClasses.join(' ')} >
            <div className={attachedClasses[0].join(' ')}></div>
            <div className={attachedClasses[1].join(' ')}></div>
            <div className={attachedClasses[2].join(' ')}></div>
        </div>
    );
}

export default hamburger;