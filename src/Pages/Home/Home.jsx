import React from 'react'
import './home.css'
import Footer from '../../Components/Footer/Footer'
import video from '../../Assets/video.mp4'
import image from '../../Assets/image.png'

const Home = () => {
    return (

        <section className='home'>
            <div className="setContainer container">
                <div className="homeText">

                    <h1 className="welcome">Welcome to </h1>
                    <p className="subTitle">TravelGenie Website!</p>

                    <video src={video} muted autoPlay loop></video> 
                    
                    <h1 className="title">Plan Your Trip With Travel</h1>
                    <p className="subTitle">Travel to your favourite city with respectful of the environment!</p>
                    
                    <div className="homeCard grid">
                    <div className="locationDiv">
                        <h1>Welcome</h1>
                    </div>
                </div>
                    

                </div>

                

                

            </div>
            
           
            
           

        </section>
    )
}

export default Home;