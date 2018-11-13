import React, { PureComponent } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

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
      toggleClicked: 0,
      authenticated: false
    }

  }

  // DO NOT USE!
  // componentWillMount() {
  //   // console.log('app.js willmount');
  // }

  componentDidMount() {
    // console.log('app.js didmount');
  }

  //DO NOT USE!!
  // componentWillReceiveProps(nextProps) {
  //   // console.log('app.js will recieve props', nextProps);
  // }

  //DO NOT USE!
  // componentWillUpdate(nextProps) {
  //   // console.log("app.js will update");
  // }

  static getDerivedStateFromProps(nextProps, prevState) {

    console.log('app.js get drived state from props', nextProps, prevState);
    return prevState;
  }

  // Works with componentdidupdate. Save scroll position before adding list item in snapshot, then in didupdate move user to that position. Update list but user doesn't move.
  getSnapshotBeforeUpdate(nextProps, prevState) {

    console.log('app.js get SnapshotBeforeUpdate');
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

  loginHandler = () => {
    this.setState({ authenticated: true });
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
          toggle={this.togglePersonsHandler}
          login={this.loginHandler} />
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </>
    );
  }
}

export default withClass(App, classes.App);
