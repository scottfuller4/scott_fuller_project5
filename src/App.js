import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Effect from './Effect';

class App extends Component {
  constructor(){
    super();
    this.state = {
      strains: [],
      positiveEffects: []
    }
  }
  
  render() {
    return (
      <div className="App">
        <header>
          <h1>Marijuana strain recommendation</h1>
        </header>
        <main>
          <section>
            <form action="">
              {
                this.state.positiveEffects.map(positiveEffect => {
                  return(
                    <Effect effectName={positiveEffect.effect} />
                  )
                })
              }
              <input type="submit" value="Lets get high" />
            </form>
          </section>
        </main>
      </div>
    );
  }

  componentDidMount(){
    const apiKey = 'XIsOTBG'
    axios({
      method: 'GET',
      url: `https://strainapi.evanbusse.com/${apiKey}/strains/search/all`,
    }).then((res) => {
      // console.log(res)
      res = Object.entries(res.data)

      const strainArray = res.map(strain => {
        return (
          {
            name: strain[0],
            race: strain[1].race,
            positiveEffects: strain[1].effects.positive,
            id: strain[1].id
          }
        )
      })

      this.setState({
        strains: strainArray
      })
    })
    axios({
      method: 'GET',
      url: `https://strainapi.evanbusse.com/${apiKey}/searchdata/effects`,
    }).then((result) => {
      // console.log(result.data);

      result = result.data;

      const positiveEffects = result.filter(effect => {
        return effect.type === "positive";
      })

      // console.log(positiveEffects);
      this.setState({
        positiveEffects: positiveEffects
      })
    })
  }
}

export default App;
