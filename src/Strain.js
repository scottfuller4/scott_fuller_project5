import React from 'react';

const Strain = (props) => {
    return(
        <div className="strain">
            <h3>{props.name}</h3>
            <p>Race: {props.race}</p>
            <ul>
                {
                    props.effects.map((effect) => {
                        return(
                            <li key={effect}>{effect}</li>
                        )
                    })
                }              
            </ul>
            <button onClick={ () => {props.handleClick(props.id, props.name, props.race, props.effects)}}>Add to favourites</button>
        </div>
    )
}

export default Strain;