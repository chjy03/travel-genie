import React from 'react';
import './home.css';
import image1 from '../../Assets/scenery1.jpg';
import image2 from '../../Assets/scenery2.jpg';
import image3 from '../../Assets/scenery3.jpg';
import video from '../../Assets/video.mp4';

const Home = () => {
    return (
        <section className='home'>
            <div className="setContainer container">
                <div className="homeText">
                    <h1 className="welcome">WELCOME TO</h1>
                    <p className="subTitle">TravelGenie Website!</p>
                    <video src={video} muted autoPlay loop></video>
                    <h1 className="title">Plan Your Trip With Travel</h1>
                    <p className="subTitle">Travel to your favourite city with respect for the environment!</p>
                </div>

                <div className="imageRow">
                    <img src={image1} alt="Image 1" className="homeImage" />
                    <img src={image3} alt="Image 2" className="homeImage" />
                    <img src={image2} alt="Image 3" className="homeImage" />
                </div>
            </div>
        </section>
    );
};

export default Home;
