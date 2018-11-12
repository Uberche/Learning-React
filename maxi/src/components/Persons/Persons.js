import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    constructor(props) {
        super(props);
        this.lastPersonRef = React.createRef()
    }

    componentWillMount() {
        // console.log('persons.js willmount');
    }

    componentDidMount() {
        // console.log('persons.js didmount');
        this.lastPersonRef.current.focus();
    }

    componentWillReceiveProps(nextProps) {
        // console.log('person.js will recieve props', nextProps);
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log("here");
    }

    render() {
        return this.props.persons.map((person, i) => {
            return <Person
                key={person.id}
                name={person.name}
                age={person.age}
                position={i}
                ref={this.lastPersonRef}
                click={() => this.props.clicked(i)}
                changed={(e) => this.props.changed(e, person.id)} />
        });

    }
}

export default Persons;