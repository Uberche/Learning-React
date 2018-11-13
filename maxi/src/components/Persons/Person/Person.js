import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Person.module.css';
import withClass from '../../../hoc/withClass';
import { AuthContext } from '../../../containers/App';

class Person extends Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.inputElement = React.createRef();
    }

    // componentWillMount() {
    // console.log('person.js willmount');
    // }

    componentDidMount() {
        // console.log('person.js didmount');
    }

    focus() {
        this.inputElement.current.focus();
    }
    render() {
        // console.log("person.js render");
        return (
            <>
                <AuthContext.Consumer>
                    {auth => auth ? <p>I'm Authentic!</p> : null}
                </AuthContext.Consumer>
                <p onClick={this.props.click}>People Everywhere like {this.props.name} who is {this.props.age}.</p>
                <p>{this.props.children}</p>
                <input
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name}
                    ref={this.inputElement} />
            </>
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);