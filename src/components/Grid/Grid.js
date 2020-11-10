import './Grid.css';
import React from 'react'

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

const buildCropLayer = (layer) => {
    console.log("building...", layer)
    return (
        <div className="crop-layer">
            <p>{`Layer ${layer[0]}`}</p>
            {
                layer[1].map(c => (
                    <div className="crop-box" style={{backgroundColor: c.isBad ? "red" : "green"}}>

                    </div>
                ))
            }
        </div>
    )
}

function Grid(props) {
    const badCrops = props.crops.filter(c => c.isBad);
    const badLevel = badCrops.length > 0 ? badCrops[0].layer : null;
    const cropsLayered = groupBy(props.crops, c => c.layer)
    console.log(cropsLayered);

    return (
        <div className="grid-container">
            <h1>{badCrops.length > 0 ? "Something is wrong at layer " + badLevel : "Hello John, \neverything looks good! 🌱" }</h1>

            <div className="crop-layers">
                {
                    Array.from(cropsLayered).map(buildCropLayer)
                }


            </div>
        </div>

    );
}

export default Grid;
