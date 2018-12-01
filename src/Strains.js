import React, { Component } from 'react';

class Strains extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }


    // shuffleArray = (array) => {
    //     for (let i = array.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [array[i], array[j]] = [array[j], array[i]];
    //     }
    // }

    // if matchedStrains has more than 10 strains
    //shuffle through the array and display 10 of them
    //else, display them as regular
    //stretch goal: display more than 10

    // shuffleArray = (array) => {
    //     for (let i = array.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [array[i], array[j]] = [array[j], array[i]];
    //     }
    // }
    // const cut = this.props.matchedStrains.slice(0, 10)

    render(){
        var shuffle = require('shuffle-array');
        shuffle(this.props.matchedStrains);

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
                                        <p>Race: {matchedStrain.race}</p>            
                                        <ul>                
                                            {
                                                matchedStrain.positiveEffects.map((effect) => {
                                                    return (
                                                        <li key={effect}>{effect}</li>
                                                    )
                                                })
                                            }
                                         </ul>
                                        <button onClick={() => { this.props.handleClick(matchedStrain.id, matchedStrain.name, matchedStrain.race, matchedStrain.positiveEffects) }}>Add to favourites</button>
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





