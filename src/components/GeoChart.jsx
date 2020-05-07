import React, { useRef, useEffect,useState } from 'react';
import { select,geoPath,geoOrthographic,min,max,scaleLinear } from "d3";

function GeoChart({ data, property }) {
    const sensitivity = 75;
    const svgRef = useRef();
    const [selectedCountry,setSelectedCountry]=useState(null)

    useEffect(() => {
        const svg = select(svgRef.current)
        const minprop = min(data.features, feature => feature.properties[property])
        const maxprop = max(data.features, feature => feature.properties[property])
        const colorScale = scaleLinear()
           .domain([minprop, maxprop])
            .range(["#ccc","red"])
        console.log(minprop,maxprop)
        
        const projection = geoOrthographic()//project geo-coord into 2d or 3d plane

        //takes geojson data
        //transform that into the d attribute of path element
        const pathGenerator = geoPath().projection(projection)
        
        svg
            .selectAll(".country")
            .data(data.features)
            .on("click", feature => {
                setSelectedCountry(feature)
            })
            .join("path")
            .attr("class", "country")
            .transition()
            .attr("fill",feature=>colorScale(feature.properties[property]))
            .attr("d", feature => pathGenerator(feature))
        
           /* setInterval(function(elapsed) {        //use to rotate globe automatically on ot own
                const rotate = projection.rotate()
                const k = sensitivity / projection.scale()
                projection.rotate([
                  rotate[0] - 1 * k,
                  rotate[1]
                ])
                const pathGenerator = geoPath().projection(projection)
                svg.selectAll("path").attr("d", pathGenerator)
              },10) //10 is time for rotating the globe*/
            
            
            
        //render text
        

        svg
            .selectAll(".label")
            .data([selectedCountry])
            .join("text")
            .attr("class","label")
            .text(feature => feature && feature.properties.name + ":" + feature.properties[property].toLocaleString())
            .attr("x", 10)
            .attr("y", 25)
        
          
           
    
    }, [data,property]);


    return (
        <div className="container">
            <svg ref={svgRef}></svg>
        </div>
    )
}
export default GeoChart;