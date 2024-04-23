import {useState, useEffect} from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import {newsData} from "./news-data"
import './news.css';
import { clear } from '@testing-library/user-event/dist/clear';

const NewsAndPromotions = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slideLength = newsData.length;
    //slideLength = 1 2 3
    // current Slide = 0 1 2

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    };

    function auto(){
        slideInterval = setInterval(nextSlide, intervalTime)
    }

    useEffect(() => {
        setCurrentSlide(0);
    },[]);

    useEffect(() => {
        if(autoScroll){
            auto();
        }
        return() => clearInterval(slideInterval);
    },[currentSlide]);
    

    return (
        <div className="slider">
            <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide}/>
            <AiOutlineArrowRight className="arrow next" onClick={nextSlide}/>
        
            {newsData.map((slide, index) => {
                return (
                    <div className = {index === currentSlide ?
                    "slide current" : "slide"} key = {index}>
                        {index === currentSlide && (
                            <>
                                <img src={slide.image} alt="slide" />
                                <div className='content'>
                                    <h2>{slide.heading}</h2>
                                    <p>{slide.desc}</p>
                                    <hr/>
                                    <button className='btn' onClick={() => window.location.href = slide.url}>
                                        Get Started
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    );

}

export default NewsAndPromotions;
