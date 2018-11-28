import React from 'react';

const Effect = (props) => {
    return (
        <div>
            <input type="checkbox" name="positiveEffect" value={props.effectName} id={props.effectName}/>
            <label htmlFor={props.effectName}>{props.effectName}</label>
        </div>
    )
}

export default Effect;