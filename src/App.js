import './App.css';
import Header from './components/Header/Header';
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

  function generateCropBox() {
    return (
      <div class="crop-box">

      </div>
    );
  }

  useEffect(() => {
    getCrops();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="crop-grid">
        {
          crops.map((crop) => (
            <div key={crop.id} className="crop-box" style={{backgroundColor: crop.isBad ? "red" : "green"}}>
              <h1>{crop.cropType}</h1>
              <p>{crop.isBad ? "BAD" : "GOOD"}</p>
            </div>
          ))
        }

      </div>
    </div>
  );
}

export default App;
