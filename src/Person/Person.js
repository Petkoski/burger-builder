/**
 * FUNCTIONAL COMPONENT (simple function that is exported)
 */

import React from 'react';
import './Person.css';

const person = (props) => {
    //props - object giving us access to all the attributes (& content) passed to the component

    // Outputting dynamic content 
    return (
        <div className="Person">
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>

            {/* Two-way binding */}
            <input type="text" onChange={props.change} value={props.name} />
        </div>
    );
}

export default person;