import './App.css';
import Header from './components/Header/Header';
import Grid from './components/Grid/Grid'
import  firebase from './services/firebase';
import React, { useState, useEffect } from 'react';


function App() {

  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(false)

  const ref = firebase.firestore().collection("crops")

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

  return (
    <div className="App">
      <Header />
      <Grid crops={crops} />

    </div>
  );
}

export default App;
