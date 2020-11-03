import './History.css'
import firebase from '../../services/firebase'
import React, { useState, useEffect } from 'react';
import Grid from '../../components/Grid/Grid';


function historyList(history) {
    return  history.map((hist) => (
                    <div className="hist-entry">
                        <h1>{hist.date.toDate().toDateString()}</h1>
                        {/* <h1>{new Date(hist.date.ti * 100 + hist.date.nanoseconds/1000000)}</h1> */}
                        <p>{`${hist.cropType} went bad next to ${hist.neighborCropType}`}</p>
                    </div>
                ));
}


function History() {


    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(false)

    const ref = firebase.firestore().collection("history").orderBy('date').limit(25)

    function getHistory() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setHistory(items);
            setLoading(false);
        });
    }

    useEffect(() => {
        getHistory();
    }, []);

    return (
        <div className="History" >
            <h1>Latest 25 events</h1>
            <div className="listContainer" style={{height: '600px', overflowY: "scroll" }}>
             { loading ? null : historyList(history) }
            </div>

        </div>
    )
}

export default History