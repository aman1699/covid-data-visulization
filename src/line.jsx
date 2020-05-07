// Step 1 - Include react
import React from "react";

// Step 2 - Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import Line from "fusioncharts/fusioncharts.charts";

// Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Line, FusionTheme);

const chartData =  [
    {
        label: "2005",
        value: "89.45"
    },
    {
        label: "2006",
        value: "89.87"
    },
    {
        label: "2007",
        value: "89.64"
    },
    {
        label: "2008",
        value: "90.13"
    },
    {
        label: "2009",
        value: "90.67"
    },
    {
        label: "2010",
        value: "90.54"
    },
    {
        label: "2011",
        value: "90.75"
    },
    {
        label: "2012",
        value: "90.8"
    },
    {
        label: "2013",
        value: "91.16"
    },
    {
        label: "2014",
        value: "91.37"
    },
    {
        label: "2015",
        value: "91.66"
    },
    {
        label: "2016",
        value: "91.8"
    }
];
const chartConfigs = {
    type: "line", // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Countries With Most Oil Reserves [2017-18]",
        //Set the chart subcaption
        subCaption: "In MMbbl = One Million barrels",
        //Set the x-axis name
        xAxisName: "Country",
        //Set the y-axis name
        yAxisName: "Reserves (MMbbl)",
            numberSuffix: "%",
            rotatelabels: "1",
            setadaptiveymin: "1",
        //Set the theme for your chart
        theme: "fusion"
      },
      // Chart Data
      data: chartData
    }
};
class L extends React.Component {
    render() {
      return (<ReactFC {...chartConfigs} />);
    }
  }
  
  export default L;