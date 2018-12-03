import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import firebase from './firebase';
import Header from './Header';
import About from './About';
import Effects from './Effects';
import Strains from './Strains';
import Photo from './Photo';
import Favs from './Favs';
import Footer from './Footer';


const dbRef = firebase.database().ref();
const scrollToElement = require('scroll-to-element');
// var SweetAlert = require('react-bootstrap-sweetalert');

class App extends Component {
  constructor(){
    super();
    this.state = {
      strains: [],
      positiveEffects: [],
      selectedEffects: [],
      matchedStrains: [],
      strainList: {},
      showSection: false,
      hideAlert: true
    }
  }

  //on submit of the form
  //stop the default form behaviour
  //using the includes() Array method, compare the stored values with the this.state.strains array
  //print the matched strains to the page
  handleSubmit = (e) => {
    e.preventDefault();

    let matchedStrains = Array.from(this.state.strains);

    this.state.selectedEffects.forEach(effect => {
      matchedStrains = matchedStrains.filter(strain => {
        return strain.positiveEffects.includes(effect);
      })
    })

    if (matchedStrains.length === 0){
      alert("No strains match your search. Update your selection and try again.");
      return;
      // <SweetAlert title="Here's a message!" onConfirm={this.hideAlert} />
      // SweetAlert('success');
    }

    var shuffle = require('shuffle-array');
    shuffle(matchedStrains);

    this.setState({
      matchedStrains: matchedStrains,
      // selectedEffects: []
    })

    scrollToElement('.matchedStrains', {
      offset: -99,
      duration: 700
    });
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

    scrollToElement('.favStrains', {
      duration: 1200
    });

  }
  
  onClick = () => {
    let show = this.state.showSection;

    show = true;

    this.setState({
      showSection: show
    })

  }

  deleteStrain = (e) => {
    const firebaseKey = e.target.id;
    const strainRef = firebase.database().ref(`${firebaseKey}`);
    strainRef.remove();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
            <About />
            <Effects 
              handleSubmit={this.handleSubmit}
              positiveEffects = {this.state.positiveEffects}
              handleChange={this.handleChange}
              onClick={this.onClick}
            />
            <Strains 
                matchedStrains={this.state.matchedStrains}
                showSection={this.state.showSection}
                handleClick={this.handleClick}
                shuffleArray={this.shuffleArray}
              />
            <Photo 
              showSection={this.state.showSection}
            />
            <Favs 
              showSection={this.state.showSection}
              strainList={this.state.strainList}
              deleteStrain={this.deleteStrain}
            />
        </main>
        <Footer />
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


