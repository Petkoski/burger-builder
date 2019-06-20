import React, { useState } from 'react'; //useState is the most important hook, used to manage state in a functional component
import './App.css';
import Person from './Person/Person';

//Since React 16.8, there is a way to manage STATE in functional components with a feature called React Hooks (collection of functions)
const app = (props) => {
  const [ personsState, setPersonsState ] = useState({
    persons: [
      { name: "Jovan", age: 24 },
      { name: "Eva", age: 23 },
      { name: "Manu", age: 25 }
    ],
    // otherState: "Some other value"
  }); //useState() returns an array with 2 elems: current state & function that allows us to update the state (such that React is aware of it and will re-render the component)
  /**
   * Main difference between setPersonsState function received from useState hook & class-based this.setState():
   * setPersonsState DOES NOT merge passed object to the old state, instead it FULLY REPLACES the old state with the passed object.
   */

  
  //You can have multiple useState() calls [whereas in class-based components there is only one state property]
  //Multiple useState() with different state slices, that's a more elegant way to manage state in a functional component (instead of one big state object that should be manually merged [line 34])
  const [ otherState, setOtherState ] = useState("some other val");

  console.log(personsState, otherState);

  const switchNameHandler = () => { //Function within function (possible in JS)
    setPersonsState({
      persons: [
        { name: "Jovan Petkoski", age: 24 },
        { name: "Eva", age: 23 },
        { name: "Manu", age: 27 }
      ],
      // otherState: personsState.otherState //When using useState hook, you have to manually make sure you include all old state properties (otherwise will be discarded)
      /**
       * On click, we will still have "some other val" because that state (otherState) 
       * is not toched by our call to setPersonsState()
       */
    });
  }

  return (
    <div className="App">
      <h1>Hello, I'm a React App</h1>
      <p>This is really working!</p>

      <button onClick={switchNameHandler}>Switch name</button>

      <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age} />
      <Person name={personsState.persons[2].name} age={personsState.persons[2].age}>Hobbies: Racing</Person>
    </div>
  );
}

export default app;