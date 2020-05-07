import React, { Component } from 'react';
import firebase from 'firebase';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Iframe from 'react-iframe';
class Tweet extends Component {
    state = {
       tweet:[]
    }
    
          
    componentDidMount() {
        const tweet1 = firebase.database().ref('tweets');
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
        const settings = {
            dots: true,
            fade: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            
        };
        return (
        <div className="col-3">
                 <Slider {...settings}>
                     
                    {this.state.tweet.map(o => <iframe frameBorder="1" src={o.url}
                        width="450px"
                        height="450px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative" />)}
                        
                        
        </Slider>
               </div>
                   
        );
    }
}
 
export default Tweet;