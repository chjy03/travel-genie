import { useState, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import './news.css';
import axios from 'axios'; // Import axios for HTTP requests

const NewsAndPromotions = () => {
    const [newsData, setNewsData] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = newsData.length;

    // Function to fetch news data from MongoDB Atlas
    const fetchNewsData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/news'); // Replace with your MongoDB Atlas fetch URL
            setNewsData(response.data); // Assuming response.data is an array of news items
        } catch (error) {
            console.error('Error fetching news data:', error);
        }
    };

    useEffect(() => {
        fetchNewsData(); // Fetch data when component mounts
    }, []);

    useEffect(() => {
        setCurrentSlide(0); // Reset currentSlide when newsData changes
    }, [newsData]);

    // Slider functionality
    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    };

    // Auto scroll functionality
    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
    };

    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [currentSlide]);

    return (
        <div className="slider">
            <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
            <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
        
            {newsData.map((slide, index) => (
                <div className={index === currentSlide ? 'slide current' : 'slide'} key={index}>
                    {index === currentSlide && (
                        <>
                            <img src={slide.image} alt="slide" />
                            <div className="content">
                                <h2>{slide.heading}</h2>
                                <p>{slide.desc}</p>
                                <hr />
                                <button className="btn" onClick={() => window.location.href = slide.url}>
                                    Get Started
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NewsAndPromotions;

