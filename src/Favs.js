import React, { Component } from 'react';

class Favs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <section className={this.props.showSection ? 'favStrains' : 'hidden'}>
                {this.props.strainList ?
                    <div className="wrapper">
                        <h2>Favourite strains</h2>
                        <div className="strainContainer favStrainsContainer">
                            {
                                Object.entries(this.props.strainList).map((strain) => {
                                    return (
                                        <div className="strain" key={strain[0]}>
                                            <h3>{strain[1].name}</h3>
                                            <p>Positive Effects:</p>
                                            <ul>
                                                {
                                                    strain[1].effects.map((effect) => {
                                                        return (
                                                            <li key={effect}>{effect}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            <p>Race: {strain[1].race}</p>
                                            <button onClick={this.props.deleteStrain} id={strain[0]}><i class="fas fa-times"></i></button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div> :
                    <div classname="wrapper">
                        <h2>Favourite strains</h2>
                        <h3>You haven't added any favourite strains yet.</h3>
                    </div>
                }
            </section>
        )
    }
}

export default Favs;