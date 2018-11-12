import React, { PureComponent } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';

class App extends PureComponent {
  constructor(props) {
    super(props);
    // console.log('app.js constructor', props);
    this.state = {
      persons: [
        { id: 'a', name: "Frank", age: 32 },
        { id: 'b', name: "Sally", age: 23 },
        { id: 'c', name: "Sammie", age: 12 },
        { id: 'd', name: "Criee", age: 233 }
      ],
      showPersons: false,
      toggleClicked: 0
    }

  }

  componentWillMount() {
    // console.log('app.js willmount');
  }

  componentDidMount() {
    // console.log('app.js didmount');
  }

  componentWillReceiveProps(nextProps) {
    // console.log('app.js will recieve props', nextProps);
  }


  componentWillUpdate(nextProps) {
    // console.log("app.js will update");
  }

  nameChangedHandler = (e, id) => {
    const personIndex = this.state.persons.findIndex(per => {
      return per.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = e.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonHandler = (i) => {
    const persons = [...this.state.persons];
    persons.splice(i, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  render() {
    let persons = null;

    // console.log(this.state.persons);
    if (this.state.showPersons) {
      persons = (
        <div >
          <Persons
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            persons={this.state.persons} />
        </div>
      )
    }

    return (
      <>
        <button onClick={() => { this.setState({ showPersons: true }) }}>Show Persons</button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          toggle={this.togglePersonsHandler} />
        {persons}
      </>
    );
  }
}

export default withClass(App, classes.App);
