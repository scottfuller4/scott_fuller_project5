import React, { Component } from 'react';

class Strains extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return (
            <section className={this.props.showSection ? 'matchedStrains' : 'hidden'}>
                <div className="wrapper">
                    <h2>Matched strains</h2>
                    <div className="strainContainer">
                        {
                            this.props.matchedStrains.slice(0,12).map(matchedStrain => {
                                return (
                                    <div className="strain" key={matchedStrain.id}>             
                                        <h3>{matchedStrain.name}</h3>            
                                        <p>Positive Effects:</p>
                                        <ul>               
                                            {
                                                matchedStrain.positiveEffects.map((effect) => {
                                                    return (
                                                        <li key={effect}>{effect}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        <p>Race: {matchedStrain.race}</p> 
                                        <button onClick={() => { this.props.handleClick(matchedStrain.id, matchedStrain.name, matchedStrain.race, matchedStrain.positiveEffects) }}><i class="far fa-heart"></i></button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default Strains;





