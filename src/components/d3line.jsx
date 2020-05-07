import React, { useRef, useEffect,useState } from 'react';
import { select, line, curveCardinal, axisBottom,axisRight, scaleLinear } from 'd3';
import './de.css';

function D31() {
    const [data, setData] = useState([25, 30, 45, 60, 20,65,75]);
    const svgRef = useRef(); 
   
    //will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);
        
        const xScale = scaleLinear()
            .domain([0, data.length - 1])
            .range([0, 285]);
        
        const yScale = scaleLinear()
            .domain([0, 150])
            .range([150, 0]);
        
        const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index=>index+1)
        svg
            .select(".x-axis")
            .style("transform","translateY(140px)")
            .call(xAxis)
        
        const yAxis = axisRight(yScale)
        svg
            .select(".y-axis")
            .style("transform","translateX(290px)")
            .call(yAxis)
        
        const myline = line() // generates "d" attribute of a path element
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(curveCardinal)
        //renders path element and attaches the "d" attribute from line generateor above
        svg
            .selectAll('.line')
            .data([data])
            .join('path')
            .attr("class","line")
            .attr("d", myline)
            .attr("fill", "none")
            .attr("stroke", "#ff073a99")
            .attr("stroke-width", 3)
           
            
        

    },[data])
    return (
        <div className="container">
            <svg  ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis"/>
            </svg>
            <br />
            <button onClick={() => setData(data.map(value => value + 5))}>Update data</button>
            <button onClick={()=>setData(data.filter(value=>value <=35))}>Filter data</button>
        </div>
    );
}
export default D31;