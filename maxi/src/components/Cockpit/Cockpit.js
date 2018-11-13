import React from 'react';
import classes from './Cockpit.module.css';

const Cockpit = (props) => {
    let btnClass = classes.Button;
    let assignedClasses = [];

    if (props.showPersons) {
        btnClass = [classes.Button, classes.red].join(' ');
    }

    if (props.persons.length <= 2) {
        assignedClasses = [classes.red].join(' ');
    }

    if (props.persons.length <= 1) {
        assignedClasses = [classes.red, classes.bold].join(' ');
    }

    return (
        <>
            <h1>{props.appTitle}</h1>
            <p className={assignedClasses}>Working like a boss</p>
            <button
                className={btnClass}
                onClick={props.toggle}>Switch Name</button>
            <button onClick={props.login}>Login</button>
        </>
    )
};

export default React.memo(Cockpit);