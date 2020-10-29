import './App.css';
import Header from './components/Header/Header';
import Grid from './components/Grid/Grid'
import  firebase from './services/firebase';
import React, { useState, useEffect } from 'react';

import GoodBG from './resources/good-bg.svg'
import BadBG from './resources/bad-bg.svg'


const hasThings = []


function App() {

  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(false)

  const ref = firebase.firestore().collection("crops")

  // Initializes test data
  // function initialize() {
  //   hasThings.push(1)
  //   for (let i = 0; i < 25; i++) {
  //     ref.add({
  //       isBad: false
  
  //     })
  //   }
  // }

  // if (hasThings.length === 0) {
  //   console.log("INITIALIZING")
  //   initialize()
  // }
  

  function getCrops() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })
      setCrops(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getCrops();
  }, []);

  const hasBadCrops = crops.filter(c => c.isBad).length > 0

  return (
    <div className="App" >
      <Header />
      <Grid crops={crops} />

      <img className="backgroundImage" src={hasBadCrops ? BadBG : GoodBG}/>

    </div>
  );
}

export default App;
