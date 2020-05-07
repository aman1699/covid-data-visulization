import React, { Component } from 'react';
import ReactFC from "react-fusioncharts";

// Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from 'axios';

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


class Patient extends Component {
    state = {  
        charData:[],
    }
    async componentDidMount() {
        const res = await axios.get("https://api.covid19india.org/raw_data.json");
        console.log(res.data);
        var char = res.data.raw_data;
        console.log(char);
        let newstate = [];
        for ( let i = 0; i < char.length; i++) {
            newstate.push({
                label: char[i].dateannounced,
                value: char[i].patientnumber
            });
            
        }
        this.setState({ charData: newstate });
       
    }
    

    render() { 
        const chartConfigs = {
            type: "column2d", // The chart type
            width: "700", // Width of the chart
            height: "400", // Height of the chart
            dataFormat: "json", // Data type
            dataSource: {
              // Chart Configuration
              chart: {
                //Set the chart caption
                caption: "Covid-19 Record",
                //Set the chart subcaption
                subCaption: "Read",
                //Set the x-axis name
                xAxisName: "DATES",
                //Set the y-axis name
                yAxisName: "PATIENT",
                    numberSuffix: "",
                   //plottooltext: "<b></b> $label{br}<b>Value:</b> $value",
                   // canvaspadding: "20",
                //Set the theme for your chart
                theme: "fusion"
              },
              // Chart Data
              data: this.state.charData
            }
          };
        return (<ReactFC {...chartConfigs} />  );
    }
}

export default Patient;