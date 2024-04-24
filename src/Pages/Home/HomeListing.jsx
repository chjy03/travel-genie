import React from "react";
import './homeListing.css';
import img1 from '../../Assets/img1.jpg';
import img2 from '../../Assets/img2.jpg';
import img3 from '../../Assets/img3.jpg';
import { Link } from 'react-router-dom';

export const Data = [
  {
    id: 1,
    imgSrc: img1,
    name: 'Destination 1', // Add a name property for each destination
  },
  {
    id: 2,
    imgSrc: img2,
    name: 'Destination 2',
  },
  {
    id: 3,
    imgSrc: img3,
    name: 'Destination 3',
  }
];

const HomeListing = () => {
    return (
        <section className="HomeListing container section">
            <div className="secTitle">
                <h3 className="title">
                    Most visited destinations
                </h3>
            </div>

            <div className="secContent grid">
                {
                    Data.map(({ id, imgSrc, name }) => {
                        return (
                            <div key={id} className="singleDestination">
                                <div className="imageDiv">
                                    <img src={imgSrc} alt={name} />
                                </div>
                                <div className="destinationInfo">
                                    <h4>{name}</h4>
                                    <Link to={`/destination/${id}`} className="detailsLink">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default HomeListing;
