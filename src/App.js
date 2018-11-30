import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Effect from './Effect';
import Strain from './Strain';
// import SweetAlert from 'sweetalert-react';

class App extends Component {
  constructor(){
    super();
    this.state = {
      strains: [],
      positiveEffects: [],
      selectedEffects: [],
      matchedStrains: []
    }
  }

  //on submit of the form
  //stop the default form behaviour
  //using the includes() Array method, compare the stored values with the this.state.strains array
  //print the matched strains to the page
  //clear the values of the form
  handleSubmit = (e) => {
    e.preventDefault();

    let matchedStrains = Array.from(this.state.strains);

    this.state.selectedEffects.forEach(effect => {
      matchedStrains = matchedStrains.filter(strain => {
        return strain.positiveEffects.includes(effect);
      })
    })

    console.log(matchedStrains);

    if (matchedStrains.length === 0){
      console.log("no match");
      alert("No strains match your search parameter. Update your selection and try again.")
    }

    this.setState({
      matchedStrains: matchedStrains,
      // selectedEffects: []
    })
  }

  //store the values of the checked variables into an array
  //if the variable is unchecked, remove it from the array
  handleChange = (e) => {
    console.log(e.target.value)

    const userSelectedEffects = Array.from(this.state.selectedEffects);

    if (e.target.checked) {
      userSelectedEffects.push(e.target.value);
    }  else if (e.target) {
      const indexOfUnselect = userSelectedEffects.indexOf(e.target.value);
      userSelectedEffects.splice(indexOfUnselect, 1);
    }
    
    console.log(userSelectedEffects);

    this.setState({
      selectedEffects: userSelectedEffects
    })
  }
  
  render() {
    return (
      <div className="App">
        <header>
          <h1>Marijuana strain recommendation</h1>
        </header>
        <main>
          <section>
            <form onSubmit={this.handleSubmit} action="">
              {
                this.state.positiveEffects.map(positiveEffect => {
                  return(
                    <Effect 
                      key={positiveEffect.effect}
                      effectName={positiveEffect.effect}
                      handleChange={this.handleChange} 
                    />
                  )
                })
              }
              <input type="submit" value="Lets get high" />
            </form>
          </section>
          <section>
            <h2>Matched strains</h2>
            {
              this.state.matchedStrains.map(matchedStrain => {
                return(
                  <Strain 
                    key={matchedStrain.id}
                    name={matchedStrain.name}
                    race={matchedStrain.race}
                    effects={matchedStrain.positiveEffects}
                  />
                )
              })
            }
          </section>
        </main>
        <footer>
          <p>© 2018 Scott Fuller</p>
        </footer>
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
