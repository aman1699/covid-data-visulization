import React, { useState } from 'react';
import data from "./custom.geo.json";
import "./App.css";
import GeoChart from './components/GeoChart';

function App() {
    const [property, setProperty] = useState("pop_est");
    console.log(data.features);
    return (
        <div>
            <h2>World map</h2>
            <GeoChart data={data} property={property}/>
            <h2>SElect property</h2>
            <select value={property} onChange={event => setProperty(event.target.value)}>
                <option value="pop_est">Population</option>
                <option value="name_len">NAme</option>
                <option value="gdp_md_est">GDP</option>
            </select>
        </div>
    )

}
export default App;