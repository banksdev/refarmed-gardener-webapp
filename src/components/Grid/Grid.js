import './Grid.css';
import React from 'react'

const Grid = (props) => {
    return (
        <div className="grid-container">
            <h1>Hello John</h1>
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
