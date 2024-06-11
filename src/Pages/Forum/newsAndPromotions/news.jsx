import React, { useState, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import './news.css';
import axios from 'axios';

const NewsAndPromotions = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [newsData, setNewsData] = useState([]);
    const slideLength = newsData.length;
    const autoScroll = true;
    let slideInterval;
    const intervalTime = 5000;

    // Function to fetch news data from backend
    const fetchNewsData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/news');
            console.log(response.data); // Add this line for debugging
            setNewsData(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    // Function to handle next slide
    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    };

    // Function to handle previous slide
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    };

    // Function to start auto scrolling
    const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
    };

    useEffect(() => {
        fetchNewsData(); // Fetch news data when component mounts

        setCurrentSlide(0); // Initialize current slide index

        if (autoScroll) {
            auto(); // Start auto scrolling if enabled
        }

        return () => {
            clearInterval(slideInterval); // Clean up interval on component unmount
        };
    }, []); // Empty dependency array means this effect runs only once, on mount

    return (
        <div className="slider-container">
            <div className="slider">
                <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
                <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

                {newsData.length === 0 ? (
                    <div className="slide current">
                        <p>Loading...</p>
                    </div>
                ) : (
                    newsData.map((slide, index) => (
                        <div className={index === currentSlide ? 'slide current' : 'slide'} key={index}>
                            {index === currentSlide && (
                                <>
                                    <img src={slide.image} alt="slide" className="slide-image" />
                                    <div className="content">
                                        <h2>{slide.heading}</h2>
                                        <p>{slide.desc}</p>
                                        <a className="btn" href={slide.url} target="_blank" rel="noopener noreferrer">
                                            Get Started
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NewsAndPromotions;
