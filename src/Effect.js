import React from 'react';

const Effect = (props) => {
    return (
        <div>
            <input onChange={props.handleChange} type="checkbox" name="positiveEffect" value={props.effectName} id={props.effectName}/>
            <label htmlFor={props.effectName}>{props.effectName}</label>
        </div>
    )
}

export default Effect;

//add onChange to the input
//onChange={this.handleChange}