import React, { Component } from 'react';

class Effects extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <section className="effectSelector">
                <div className="wrapper contentContainer">
                    <form onSubmit={this.props.handleSubmit} action="">
                        <h2>How do you want to feel?</h2>
                        <div className="formContainer">
                            {
                                this.props.positiveEffects.map(positiveEffect => {
                                    return (
                                        <div className="effectContainer">
                                            <input onChange={this.props.handleChange} type="checkbox" name="positiveEffect" className="positiveEffect" value={positiveEffect.effect} id={positiveEffect.effect} />
                                            <label htmlFor={positiveEffect.effect} className="positiveEffectLabel">{positiveEffect.effect}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <input type="submit" value="Search for strains" onClick={this.props.onClick} />
                    </form>
                </div>
            </section>
        )
    }
}

export default Effects;