import React, { useRef, useEffect,useState } from 'react';
import { select, axisBottom,axisRight, scaleLinear,scaleBand } from 'd3';
import './de.css';

function D33() {
    const [data, setData] = useState([25, 30, 45, 60, 20,65,75]);
    const svgRef = useRef(); 
   
    //will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);
        
        const xScale = scaleBand() //scale band gives particular width
            .domain(data.map((value,index)=>index))
            .range([0, 285])
            .padding(0.5)
        
        const yScale = scaleLinear()
            .domain([0, 150])
            .range([150, 0]);
           
        const colorScale = scaleLinear()           //giving colors to bar
            .domain([75, 150])
            .range(["green", "red"])      // green color is given to "75" and red color to "150"
            .clamp(true)                 //this makes sure that number<=75 remains green and number>=150 remains red
        
        const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index=>index+1)
        
        svg
            .select(".x-axis") 
            .style("transform","translateY(140px)")   //in svg  origin starts from above so it is height is 150 and it goes up so wee need to translate it down by 140px
            .call(xAxis)
        
        const yAxis = axisRight(yScale)
        
        svg
            .select(".y-axis")
            .style("transform","translateX(290px)")   //right is inn left so we are translating in right by 290px becoz width is 300px
            .call(yAxis)
        svg
            .selectAll("bar")
            .data(data)
            .join("rect")            //adding rectangle to each bar
            .attr("class", "bar")    //giving each unique class to the bars
            .attr("fill",colorScale) //coloring bar
            .style("transform","scale(1,-1)")
            .attr("x", (value, index) => xScale(index))
            .attr("y",-140)
            .attr("width", xScale.bandwidth())
            
            .on("mouseenter", (value, index) => {     //on hovering over mouse 
                svg
                
                    .selectAll(".tooltip")
                    .data([value])
                    //.join("text")
                    .join(enter => enter.append("text").attr("y",yScale(value)-4))
                    .attr("class", "tooltip")
                    .text(value)
                    .attr("x", xScale(index)+xScale.bandwidth()/2)
                    //.attr("y", yScale(value) - 8)
                    .attr("text-anchor","middle")
                    .transition()
                    .attr("y", yScale(value) - 8)
                    .attr("opacity", 1);
                
            })
            .on("mouseleave",()=>svg.select(".tooltip").remove()) //on leving the bar text disappears
            .transition()
            .attr("height", value => 140 - yScale(value))
         
       
},[data])
   
    
    return (
        <div className="container">
            <svg ref={svgRef}>
                
                <g className="x-axis" />  
                <g className="y-axis"/>
            </svg>
            <br />
            <button onClick={() => setData(data.map(value => value + 5))}>Update data</button>
            <button onClick={()=>setData(data.filter(value=>value <=35))}>Filter data</button>
        </div>
    );
}
export default D33;