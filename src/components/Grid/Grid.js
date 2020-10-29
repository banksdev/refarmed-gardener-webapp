import './Grid.css';
import React from 'react'

const Grid = (props) => {
    return (
        <div className="crop-grid">
        {
            props.crops.map((crop) => (
            <div key={crop.id} className="crop-box" style={{backgroundColor: crop.isBad ? "red" : "green"}}>
                <h1>{crop.cropType}</h1>
                <p>{crop.isBad ? "BAD" : "GOOD"}</p>
            </div>
            ))
        }
    </div>
    );
}

export default Grid;
