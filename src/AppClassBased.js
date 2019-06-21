import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'; //Starting with uppercase letter (because it is a custom component)

/**
 * CLASS-BASED COMPONENT (extends Component)
 * Established way of creating components
 */
class App extends Component { //Component is like a custom html element (used to construct the app)
  //state property
  //Used for managing component-internal data
  //Managed from inside the component (available in classes that extend Component)
  //It is an object that can contain any data inside (whatever you want)
  state = {
    persons: [
      { name: "Jovan", age: 24 },
      { name: "Eva", age: 23 },
      { name: "Manu", age: 25 }
    ],
    otherState: "Some other value"
  }
  //state is a special property. State can be changed, but if it changes, it will lead React to re-render the DOM (re-render the modified element)

  switchNameHandler = (newName) => { //Add 'Handler' suffix to indicate that the method is an event handler (by convention)
    // this.state.persons[0].name = "Jovan Petkoski"; //WRONG, DON'T DO THIS! Do not mutate state directly. Use setState()

    this.setState({
      persons: [
        { name: "Jovan Petkoski", age: 24 },
        { name: newName, age: 23 },
        { name: "Manu", age: 27 }
      ]
    }); //It will MERGE whatever we define here in the existing state. Won't discard other properties in the state.
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
  
  render() {
    const buttonStyle = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    //JSX - this funny tag syntax is neither a string nor HTML. It is JS at the end, it gets compiled to JS (example below).
    return (
      <div className="App">
        <h1>Hello, I'm a React App</h1>
        <p>This is really working!</p>

        {/* Way #1 */}
        {/* + inline style */}
        <button onClick={this.switchNameHandler.bind(this, "Evana")} style={buttonStyle}>Switch name</button>

        {/* Way #2 (can be inefficient, not recommended) */}
        {/* <button onClick={() => this.switchNameHandler("Evana")}>Switch name</button> */}

        {/* Passing attributes, function references (& content in the third example) to our custom component */}
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />

        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, "Ema")} />
          {/* Better syntax (using bind() method):
          Passing a reference to this.switchNameHandler method in 
          this 'click' property (+ argument as 'newName') */}

        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age}
          change={this.nameChangedHandler}>
            Hobbies: Racing
        </Person>
      </div>
      /**
       * JSX restrictions (because it is syntax extension to JS):
       * className instead of class, since 'class' is a reserved word in JS
       * Typically, when returning, you must nest everything inside ONE single root element (div in our example, not multiple elements)
       */
    );

    //Both (above and below) are exact equivalents. Actually the code above is compiled to the one below.

    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Hello, I\'m a React App!'));


    //Two things lead React to update the DOM:
    //a) changing state
    //b) changing props
    //React updates the DOM to reflect the new state & props.
  }
}

export default App;

/**
 * Stateful vs Stateless components:
 * Stateful - manages state (either with state prop (class-based) or useState hook (functional)), also called smart or container components. Use few of these, so the app will be easier to maintain.
 * Stateless - no internal state management logic (good practice to create many of these (also called dumb or presentational components))
 */