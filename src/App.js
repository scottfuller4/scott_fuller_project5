import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Effect from './Effect';
// import Strain from './Strain';
import firebase from './firebase';
import Strains from './Strains'
// import SweetAlert from 'sweetalert-react';

const dbRef = firebase.database().ref();

class App extends Component {
  constructor(){
    super();
    this.state = {
      strains: [],
      positiveEffects: [],
      selectedEffects: [],
      matchedStrains: [],
      strainList: {},
      showSection: false
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

    if (matchedStrains.length === 0){
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

    const userSelectedEffects = Array.from(this.state.selectedEffects);

    if (e.target.checked) {
      userSelectedEffects.push(e.target.value);
    }  else if (e.target) {
      const indexOfUnselect = userSelectedEffects.indexOf(e.target.value);
      userSelectedEffects.splice(indexOfUnselect, 1);
    }
  

    this.setState({
      selectedEffects: userSelectedEffects
    })
  }



// Pushing strains to firebase
  handleClick = (id, name, race, positiveEffects) => {
    const favStrain = {
      id: id,
      name: name,
      race: race,
      effects: positiveEffects
    }
    dbRef.push(favStrain);
  }
  
  onClick = () => {
    let show = this.state.showSection;

    show = true;

    this.setState({
      showSection: show
    })
  }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  deleteStrain = (e) => {
    const firebaseKey = e.target.id;
    const strainRef = firebase.database().ref(`${firebaseKey}`);
    strainRef.remove();
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="wrapper">
            <h1>Marijuana strain recommendation</h1>
          </div>
        </header>
        <main>
            <section className="description">
              <div className="wrapper">
                <h2>About</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolorum numquam autem. Reiciendis quod, sequi numquam quibusdam rerum tenetur alias quas nulla, quidem illo incidunt voluptates voluptatibus nostrum soluta maiores laborum ut dolore consequatur molestiae magnam. Eveniet sit, rerum odio assumenda facilis harum fuga earum molestias voluptates maxime consectetur ea ratione doloribus provident nostrum tempore quam aut voluptas cumque deserunt adipisci illo illum. Eveniet, minima facilis? Placeat non expedita voluptatibus obcaecati maiores. Ducimus illum consequuntur repellendus voluptates eos. Inventore culpa dignissimos quae sed atque est suscipit deserunt iure dolores sapiente sint unde reiciendis, dicta impedit, dolorem porro architecto! Id, animi?</p>
              </div>
            </section>
            <section className="effectSelector">
              <div className="wrapper">
                <form onSubmit={this.handleSubmit} action="">
                  <div className="formContainer">
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
                  </div>
                  <input type="submit" value="Lets get high" onClick={this.onClick} />
                </form>
              </div>
            </section>

            {/* <section className={this.state.showSection ? 'matchedStrains' : 'hidden'}>
              <div className="wrapper">
                <h2>Matched strains</h2>
                <div className="strainContainer">
                  {
                    this.state.matchedStrains.map(matchedStrain => {
                        return(
                          <Strain 
                            key={matchedStrain.id}
                            id={matchedStrain.id}
                            name={matchedStrain.name}
                            race={matchedStrain.race}
                            effects={matchedStrain.positiveEffects}
                            handleClick={this.handleClick}
                            shuffleArray={this.shuffleArray}
                          />
                        )
                    })
                  }
                </div>
              </div>
            </section> */}

            {/* Refactored strains goes here */}
            <Strains 
                matchedStrains={this.state.matchedStrains}
                showSection={this.state.showSection}
                handleClick={this.handleClick}
                shuffleArray={this.shuffleArray}
              />

            <section className={this.state.showSection ? 'favStrains' : 'hidden'}>
              <div className="wrapper">
                  <h2>Favourite strains</h2>
                  <div className="strainContainer favStrainsContainer">
                    {
                      Object.entries(this.state.strainList).map((strain) => {
                        return (
                          <div className="strain" key={strain[0]}>
                            <h3>{strain[1].name}</h3>
                            <p>Positive Effects:</p>
                            <ul>
                              {
                                strain[1].effects.map((effect) => {
                                  return(
                                    <li key={effect}>{effect}</li>
                                  )
                                })
                              }
                            </ul>
                            <p>Race: {strain[1].race}</p>
                            <button onClick={this.deleteStrain} id={strain[0]}><i class="fas fa-times"></i></button>
                          </div>
                        )
                      })
                    }
                  </div>
              </div>
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

      result = result.data;

      const positiveEffects = result.filter(effect => {
        return effect.type === "positive";
      })

      this.setState({
        positiveEffects: positiveEffects
      })
    })

    dbRef.on('value', (snapshot) => {
      this.setState({
        strainList: snapshot.val()
      });
    });
  }
}

export default App;


