// //Connect to MongoDB 
// import React, { useState } from "react";
// import './managePackage.css';
// import axios from 'axios'; // Import axios

// const ManagePackage = () => {
//     const [formData, setFormData] = useState({
//         id: '',
//         imgSrc: '',
//         title: '',
//         description: '',
//         price: '',
//         duration: '',
//         location: '',
//         numberOfDates: '', 
//         dateRanges: [], 
//     });
   
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === "numberOfDates") {
//             setFormData({
//                 ...formData,
//                 [name]: value,
//                 dateRanges: Array.from({ length: parseInt(value, 10) }, () => ({
//                     startDate: '',
//                     endDate: ''
//                 }))
//             });
//         } else if (name.includes('startDate') || name.includes('endDate')) {
//             const index = parseInt(name.split('-')[1]);
//             const updatedDateRanges = [...formData.dateRanges];
//             updatedDateRanges[index] = {
//                 ...updatedDateRanges[index],
//                 [name.split('-')[0]]: value
//             };
//             setFormData({
//                 ...formData,
//                 dateRanges: updatedDateRanges
//             });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:5000/api/manage-package', formData);// Use axios to make a POST request
//             console.log('Manage package added successfully!');
//             alert('Package submitted successfully! Please wait for admin approval.');
//             // Clear form after successful submission
//             setFormData({
//                 id: '',
//                 imgSrc: '',
//                 title: '',
//                 description: '',
//                 price: '',
//                 duration: '',
//                 location: '',
//                 numberOfDates: '', 
//                 dateRanges: [],
//             });
//         } catch (error) {
//             console.error('Error adding manage package:', error);
//         }
//     };

//     return (
//         <div className="managePackage">
//             <h2>Add Manage Package</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="id">ID:</label>
//                     <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label htmlFor="imgSrc">Image URL:</label>
//                     <input type="text" id="imgSrc" name="imgSrc" value={formData.imgSrc} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label htmlFor="title">Title:</label>
//                     <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label htmlFor="description">Description:</label>
//                     <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label htmlFor="price">Price:</label>
//                     <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label htmlFor="duration">Duration:</label>
//                     <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label htmlFor="location">Location:</label>
//                     <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label htmlFor="numberOfDates">Number of Dates Available:</label>
//                     <select id="numberOfDates" name="numberOfDates" value={formData.numberOfDates} onChange={handleChange} required >
//                         <option value="">Select number of dates</option>
//                         {[1, 2, 3, 4, 5].map((num) => (
//                             <option key={num} value={num}>{num}</option>
//                         ))}
//                     </select>
//                 </div>
//                 {formData.dateRanges.map((dateRange, index) => (
//                     <div key={index}>
//                         <label htmlFor={`startDate-${index}`}>Start Date:</label>
//                         <input type="date" id={`startDate-${index}`} name={`startDate-${index}`} value={dateRange.startDate} onChange={handleChange} required />
//                         <label htmlFor={`endDate-${index}`}>End Date:</label>
//                         <input type="date" id={`endDate-${index}`} name={`endDate-${index}`} value={dateRange.endDate} onChange={handleChange} required />
//                     </div>
//                 ))}
//                 <button type="submit">Add Package</button>
//             </form>
//         </div>
//     );
// };

// export default ManagePackage;


//upgrade version
import React, { useState } from "react";
import './managePackage.css';
import axios from 'axios';

const ManagePackage = () => {
    const [formData, setFormData] = useState({
        id: '',
        imgSrc: '',
        title: '',
        description: '',
        price: '',
        dayDuration: '',
        nightDuration: '',
        location: '',
        numberOfDates: '',
        dateRanges: [],
        itinerary: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "numberOfDates") {
            setFormData({
                ...formData,
                [name]: value,
                dateRanges: Array.from({ length: parseInt(value, 10) }, () => ({
                    startDate: '',
                    endDate: ''
                }))
            });
        } else if (name.includes('startDate')) {
            const index = parseInt(name.split('-')[1]);
            const updatedDateRanges = [...formData.dateRanges];
            updatedDateRanges[index] = {
                ...updatedDateRanges[index],
                startDate: value,
                endDate: calculateEndDate(value, formData.dayDuration)
            };
            setFormData({
                ...formData,
                dateRanges: updatedDateRanges
            });
        } else if (name === 'dayDuration' || name === 'nightDuration') {
            const updatedData = { ...formData, [name]: value };
            const updatedDateRanges = formData.dateRanges.map(range => ({
                ...range,
                endDate: calculateEndDate(range.startDate, updatedData.dayDuration)
            }));
            setFormData({
                ...updatedData,
                dateRanges: updatedDateRanges,
                itinerary: generateItinerary(parseInt(updatedData.dayDuration, 10))
            });
        } else if (name.includes('itinerary')) {
            const index = parseInt(name.split('-')[1]);
            const updatedItinerary = [...formData.itinerary];
            updatedItinerary[index] = value;
            setFormData({
                ...formData,
                itinerary: updatedItinerary
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const calculateEndDate = (startDate, days) => {
        if (!startDate || !days) return '';
        const start = new Date(startDate);
        start.setDate(start.getDate() + parseInt(days, 10) - 1);
        return start.toISOString().split('T')[0];
    };

    const generateItinerary = (days) => {
        return Array.from({ length: days }, () => '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await axios.post('http://localhost:5000/api/manage-package', formData);
            console.log('Manage package added successfully!');
            alert('Package submitted successfully!');
            setFormData({
                id: '',
                imgSrc: '',
                title: '',
                description: '',
                price: '',
                dayDuration: '',
                nightDuration: '',
                location: '',
                numberOfDates: '',
                dateRanges: [],
                itinerary: [],
            });
        } catch (error) {
            if (error.response) {
                // The server responded with a status other than 2xx
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
                alert('Failed to submit package. Server responded with an error.');
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request data:', error.request);
                alert('Failed to submit package. No response from server.');
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error message:', error.message);
                alert('Failed to submit package. An error occurred while setting up the request.');
            }
            console.error('Error config:', error.config);
        }
    };
    

    const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    return (
        <div className="managePackage">
            <h2>Add Manage Package</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">ID:</label>
                    <input type="number" id="id" name="id" value={formData.id} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="imgSrc">Image URL:</label>
                    <input type="text" id="imgSrc" name="imgSrc" value={formData.imgSrc} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="price">Price (RM):</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="dayDuration">Duration:</label>
                    <div className="durationInput">
                        <select id="dayDuration" name="dayDuration" value={formData.dayDuration} onChange={handleChange} required>
                            <option value="">Days</option>
                            {[...Array(31).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                            ))}
                        </select>
                        <select id="nightDuration" name="nightDuration" value={formData.nightDuration} onChange={handleChange} required>
                            <option value="">Nights</option>
                            {[...Array(Math.max(0, parseInt(formData.dayDuration || 0, 10) - 1)).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="numberOfDates">Number of Dates Available:</label>
                    <select id="numberOfDates" name="numberOfDates" value={formData.numberOfDates} onChange={handleChange} required>
                        <option value="">Select number of dates</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
                {formData.dateRanges.map((dateRange, index) => (
                    <div key={index}>
                        <label htmlFor={`startDate-${index}`}>Start Date:</label>
                        <input type="date" id={`startDate-${index}`} name={`startDate-${index}`} min={getTomorrowDate()} value={dateRange.startDate} onChange={handleChange} required />
                        <label htmlFor={`endDate-${index}`}>End Date:</label>
                        <input type="date" id={`endDate-${index}`} name={`endDate-${index}`} value={dateRange.endDate} readOnly />
                    </div>
                ))}
                <div>
                    <label>Itinerary:</label>
                    {formData.itinerary.map((_, index) => (
                        <div key={index}>
                            <label htmlFor={`itinerary-${index}`}>Day {index + 1}:</label>
                            <textarea id={`itinerary-${index}`} name={`itinerary-${index}`} value={formData.itinerary[index]} onChange={handleChange} required />
                        </div>
                    ))}
                </div>
                <button type="submit">Add Package</button>
            </form>
        </div>
    );
};

export default ManagePackage;
