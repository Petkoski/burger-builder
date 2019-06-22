import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium'; // Radium - a popular React package that allows using inline styles with pseudo selectors & media queries
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: "1", name: "Jovan", age: 24 },
      { id: "2", name: "Eva", age: 23 },
      { id: "3", name: "Manu", age: 25 }
    ],
    otherState: "Some other value",
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personInd = this.state.persons.findIndex(p => p.id === id); //Will hold the index
    const updatedPerson = { //Spread operator to create a new object with the same properties (so we won't mutate the original one)
        ...this.state.persons[personInd]
    };

    //Other approach:
    // const person2 = Object.assign({}, this.state.persons[personInd]);

    updatedPerson.name = event.target.value;

    const allPersons = [...this.state.persons]; //Create a copy array of all persons (from the state)
    allPersons[personInd] = updatedPerson; //Replace the updated one

    this.setState({ persons: allPersons }); //Set the new state
  }

  deletePersonHandler = (personInd) => {
    // const persons = this.state.persons; //In JS objects and arrays are reference types. Here, we are getting a pointer to the original persons object (to the original state). We shouldn't mutate the ORIGINAL data.
    // const persons = this.state.persons.slice(); //Creating a copy of the original array with slice() [no args] method.
    const persons = [...this.state.persons]; //Or using an ES6 feature, spread out elements of the array into a new arr
    persons.splice(personInd, 1); 
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    //Purposely using an arrow function because 'this' keyword inside this method will always point to the class.

    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow }); //Merges the state. Old properties (persons, otherState) remain as before.
  }
  
  render() {
    const buttonStyle = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': { //Works because Radium is added
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let personsDiv = null;
    if(this.state.showPersons) {
      //Outsourcing the check to a variable outside of the return()
      personsDiv = (
        <div>
          {
            this.state.persons.map((person, ind) => {
              return (
                <Person 
                  name={person.name} 
                  age={person.age} 
                  click={() => this.deletePersonHandler(ind)}
                  change={(event) => this.nameChangedHandler(event, person.id)}
                  key={person.id} />
                // React expects to find a 'key' property on an element (custom or built-in elem) which is rendered through a list
                // This property helps React update the list efficiently (to keep track of individual elements) [to compare elements of the future with elements from the past when re-rendering]
              );
            })
          }
        </div>
      );

      //Setting the button color dynamically
      buttonStyle.backgroundColor = 'darkred';
      buttonStyle[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      };
    }

    const classes = []; //Class styles defined in App.css
    if(this.state.persons.length <= 2) {
      classes.push('darkred');
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        {/* StyleRoot is a Radium component. We need to wrap the entire app with it when using media queries, keyframes etc (advanced features). For pseudo-selectors - don't need to do that */}
        
        <div className="App">
          <h1>Hello, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p> 
          {/* ^ Setting className dynamically */}

          <button 
            onClick={this.togglePersonsHandler} 
            style={buttonStyle}>
              Toggle Persons
          </button>

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
      </StyleRoot>
    );
  }
}

export default Radium(App); //A higher order component (component wrapping our component, kind of injecting some extra funcs)