import './Grid.css';
import React from 'react'

function Grid(props) {
    const badCrops = props.crops.filter(c => c.isBad);
    const badLevel = badCrops.length > 0 ? badCrops[0].layer : null;

    return (
        <div className="grid-container">
            <h1>{badCrops.length > 0 ? "Something is wrong at layer " + badLevel : "Hello John, \neverything looks good! 🌱" }</h1>
            <div className="crop-grid">
            {
                props.crops.map((crop) => (
                    <div key={crop.id} className="crop-box" style={{backgroundColor: crop.isBad ? "red" : "green"}}>
                        
                    </div>
                ))
            }
            </div>
        </div>

    );
}

export default Grid;
