import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: "Jovan", age: 24 },
      { name: "Eva", age: 23 },
      { name: "Manu", age: 25 }
    ],
    otherState: "Some other value",
    showPersons: false
  }
  
  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: "Jovan Petkoski", age: 24 },
        { name: newName, age: 23 },
        { name: "Manu", age: 27 }
      ]
    });
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: "Jovan", age: 24 },
        { name: "Eva", age: 23 },
        { name: event.target.value, age: 25 }
      ]
    });
  }

  togglePersonsHandler = () => {
    //Purposely using an arrow function because 'this' keyword inside this method will always point to the class.

    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow }); //Merges the state. Old properties (persons, otherState) remain as before.
  }
  
  render() {
    const buttonStyle = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let personsDiv = null;
    if(this.state.showPersons) {
      //Outsourcing the check to a variable outside of the return()
      personsDiv = (
        <div>
          <Person 
            name={this.state.persons[0].name} 
            age={this.state.persons[0].age} />

          <Person 
            name={this.state.persons[1].name} 
            age={this.state.persons[1].age}
            click={this.switchNameHandler.bind(this, "Ema")} />

          <Person 
            name={this.state.persons[2].name} 
            age={this.state.persons[2].age}
            change={this.nameChangedHandler}>
              Hobbies: Racing
          </Person>
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hello, I'm a React App</h1>
        <p>This is really working!</p>

        <button onClick={this.togglePersonsHandler} style={buttonStyle}>Toggle Persons</button>

        {/* Rendering content conditionally: */}
        {/* { 
          // Simple ternary operator
          this.state.showPersons === true ? 
            <div>
              <Person 
                name={this.state.persons[0].name} 
                age={this.state.persons[0].age} />

              <Person 
                name={this.state.persons[1].name} 
                age={this.state.persons[1].age}
                click={this.switchNameHandler.bind(this, "Ema")} />

              <Person 
                name={this.state.persons[2].name} 
                age={this.state.persons[2].age}
                change={this.nameChangedHandler}>
                  Hobbies: Racing
              </Person>
            </div>
          : null 
        } */}

        {/* More elegant solution: */}
        { personsDiv }

      </div>
    );
  }
}

export default App;