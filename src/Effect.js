import React from 'react';

const Effect = (props) => {
    return (
        <div className="effectContainer">
            <input onChange={props.handleChange} type="checkbox" name="positiveEffect" className="positiveEffect" value={props.effectName} id={props.effectName}/>
            <label htmlFor={props.effectName} className="positiveEffectLabel">{props.effectName}</label>
        </div>
    )
}

export default Effect;

//add onChange to the input
//onChange={this.handleChange}