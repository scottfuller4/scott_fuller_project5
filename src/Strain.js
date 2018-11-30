import React from 'react';

const Strain = (props) => {
    return(
        <div className="matchedStrain">
            <h3>{props.name}</h3>
            <p>Race: {props.race}</p>
            <ul>
                {
                    props.effects.map((effect) => {
                        return(
                            <li>{effect}</li>
                        )
                    })
                }              
            </ul>
        </div>
    )
}

export default Strain;