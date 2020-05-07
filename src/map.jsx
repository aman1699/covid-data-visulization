import React, { Component } from 'react';
import L from 'leaflet';
import firebase from 'firebase';
import { Map, TileLayer,CircleMarker, Marker, Popup } from 'react-leaflet';
import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
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


var greenIcon = L.icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});
class Map11 extends Component {
  state = {
    outbreak: [],
    charData:[],
    tweet:[],
    lat: 20.5937,
    lng: 78.9629,
    zoom: 5
  }
  async componentDidMount() {
    const res = await axios.get("https://api.covid19india.org/raw_data.json"); // hitiing graph api
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
    
    const outref = firebase.database().ref('Outbreak'); //taking outbreak data from firebase
    outref.on('value', (snapshot) => {
      let obj = snapshot.val();
      let Outbreak = Object.keys(obj).map((key) => {
        const rd = obj[key];
        return rd;
      })

      let o = Outbreak[0]
      console.log(o)
      let o1 = o.replace('[', '')
      let o2 = o1.replace(']', '')
      let o4 = o2.replace(/(\r\n|\n|\r)/gm, '');
      console.log(o4)
      let o3 = o4.split('}, {')
      console.log(o3)
      for (let i = 0; i < o3.length; i++) {
          if( i !== o3.length - 1) {
            o3[i] = o3[i] + '}'
          }
          if(i !==0 ){
            o3[i] = '{' + o3[i]
          }
      }
      console.log(o3)
      let newState = [];
      for (let i = 0; i < o3.length; i++) {
        o3[i] = JSON.parse(o3[i]) //o3 now has whole data as JSON
          newState.push({
            ID: o3[i].ID,
            state: o3[i].State,
            total: o3[i]['Total_Confirmed_cases_Indian National'],
            coord: o3[i].Latitude,
            coord1: o3[i].Longitude,
            deaths: o3[i].Total_Confirmed_deaths,
            cured:o3[i].Total_case_cured
       });
      }

      this.setState({ outbreak: newState });
    })
   
    const tweet1 = firebase.database().ref('tweets'); //taking tweets from firebase
    tweet1.on('value', (snapshot) => {
        let tweet1 = snapshot.val();
        let tweet2 = Object.keys(tweet1).map((key) => {
            const rd = tweet1[key];
            console.log(rd);
            return rd;
        })
            let o1 = tweet2[0];
        //console.log(o2);
         console.log(o1)
            let newtweet = [];
        for (let i = 0; i < o1.length; i++) {
            let a = "https://twitframe.com/show?url="
            let b = a + o1[i];
            console.log({b});
            newtweet.push({
            url:a+o1[i]
                
            });
                
        }
        this.setState({ tweet: newtweet });
    })
    
}

  render() {
    const chartConfigs = {   // for graph 
      type: "column2d", // The chart type
      width: "100%", // Width of the chart
      height: "330", // Height of the chart
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
   
    const settings = {   //for react slick carousel
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      
  };

    return (
      <div>
        <h1 align="center" className="background">INDIA COVID-19 TRACKER</h1>
       
        <div className="row">
        <div className="col-2">
        <ul className="list-group scroller">
          {this.state.outbreak.map(out => <li key={out.id} className="list-group-item" style={{ cursor: "pointer" }}><span className="confirmed">{out.total}</span><span className="state">{out.state}</span></li>)}
          </ul>
        </div>
        
        
      <div className="col-7">
        <Map className="map" center={[20.5937, 78.9629]} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
              //"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.outbreak.map(tra =>
            <CircleMarker key={tra.id} center={[tra.coord, tra.coord1]} color="red"  radius={7* Math.log([tra.total] /12)}  fillOpacity={0.5}
            stroke={true}>
              <Popup>
               <h1 className="font">{tra.state}</h1> <hr className="bold"/> <br /> Total Cases = {tra.total}.<br/>Deaths = {tra.deaths} <br/> Cured = {tra.cured}
     </Popup>
            </CircleMarker>)}
          </Map>
      </div>
      
          <div className="col-3">
          <Slider {...settings}>
                     {this.state.tweet.map(o => <iframe frameborder="1" src={o.url}
                         width="100%"
                         height="350px"
                         id="myId"
                         className="myClassname"
                         display="initial"
                         position="relative" />)}
            </Slider>
            
            <div className="down ">
              <ReactFC {...chartConfigs} />
              </div>
          </div>
        </div>
        
   
    
   
       
    </div>);
  
  }
}

export default Map11;