/**
 * FUNCTIONAL COMPONENT (simple function that is exported)
 */

import React from 'react';
// import Radium from 'radium';
// import './Person.css'; //Importing regular stylesheet (not a module [no .module in front of .css])
import styles from './Person.module.css'; //Object that gives access to a string version of defined css styles (adjusted to be unique to this file where they are imported)

const person = (props) => {
    //props - object giving us access to all the attributes (& content) passed to the component

    // const style = {
    //     '@media (min-width: 500px)': { //Possible with Radium
    //         width: '450px'
    //     }
    // };

    // Outputting dynamic content 
    return (
        // <div className="Person" style={style}> 
        <div className={styles.Person}> 
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>

            {/* Two-way binding */}
            <input type="text" onChange={props.change} value={props.name} />
        </div>
    );
}

// export default Radium(person);
export default person;