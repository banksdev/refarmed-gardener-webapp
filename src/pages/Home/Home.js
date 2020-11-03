import './Home.css'
import  firebase from '../../services/firebase';
import React, { useState, useEffect } from 'react';

import Grid from '../../components/Grid/Grid';
import GoodBG from '../../resources/good-bg.svg'
import BadBG from '../../resources/bad-bg.svg'

function Home(props) {
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
            if(items) {
                setCrops(items);
            }
            setLoading(false);
        });
    }

    useEffect(() => {
        getCrops();
    }, []);

  const hasBadCrops = crops.filter(c => c.isBad).length > 0

  return (
      <div className="Home">
          {  loading ? null : <Grid crops={crops} /> }
          
          { loading ? null : <img className="backgroundImage" src={hasBadCrops ? BadBG : GoodBG} alt=''/> }
      </div>

  )

}

export default Home;