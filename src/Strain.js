import React from 'react';

const Strain = (props) => {
    return(
        <div>
            <h3>Name: {props.name}</h3>
            <p>Race: {props.race}</p>
            <ul>
                {
                    props.effects.map((effect) => {
                        return(
                            <li>{effect}</li>
                            //     <p>{effect}</p>
                            // </li>
                        )
                    })
                }
                
            </ul>
        </div>
    )
}

export default Strain;