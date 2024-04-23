// import React, { useState } from "react";
// import './managePackage.css';

// const ManagePackage = () => {
//     const [formData, setFormData] = useState({
//       id: '',
//       imgSrc: '',
//       title: '',
//       description: '',
//       price: '',
//       duration: '',
//       location: '',
//       dateAvailable: '',
//     });
  
//     const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       // Add your logic to submit the form data
//       console.log('Form submitted:', formData);
//     };
  
//     return (
//       <div className="managePackage"> {/* Add class here */}
//         <h2>Add Travel Package</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="id">ID:</label>
//             <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
//           </div>
//           <div>
//             <label htmlFor="imgSrc">Image URL:</label>
//             <input type="text" id="imgSrc" name="imgSrc" value={formData.imgSrc} onChange={handleChange} required />
//           </div>
//           <div>
//             <label htmlFor="title">Title:</label>
//             <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
//           </div>
//           <div>
//             <label htmlFor="description">Description:</label>
//             <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
//           </div>
//           <div>
//             <label htmlFor="price">Price:</label>
//             <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required />
//           </div>
//           <div>
//             <label htmlFor="duration">Duration:</label>
//             <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} required />
//           </div>
//           <div>
//             <label htmlFor="location">Location:</label>
//             <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
//           </div>
//           <div>
//                     <label htmlFor="dateAvailable">Date Available:</label> 
//                     <input type="date" id="dateAvailable" name="dateAvailable" value={formData.dateAvailable} onChange={handleChange} required />
//                 </div>
//           <button type="submit">Add Package</button>
//         </form>
//       </div>
//     );
//   };
  
//   export default ManagePackage;

import React, { useState } from "react";
import './managePackage.css';

const ManagePackage = () => {
    const [formData, setFormData] = useState({
        id: '',
        imgSrc: '',
        title: '',
        description: '',
        price: '',
        duration: '',
        location: '',
        numberOfDates: '', // Added numberOfDates field
        dateRanges: [], // Added dateRanges array
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
        } else if (name.includes('startDate') || name.includes('endDate')) {
            const index = parseInt(name.split('-')[1]);
            const updatedDateRanges = [...formData.dateRanges];
            updatedDateRanges[index] = {
                ...updatedDateRanges[index],
                [name.split('-')[0]]: value
            };
            setFormData({
                ...formData,
                dateRanges: updatedDateRanges
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to submit the form data
        console.log('Form submitted:', formData);
    };

    return (
        <div className="managePackage"> {/* Add class here */}
            <h2>Add Travel Package</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">ID:</label>
                    <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
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
                    <label htmlFor="price">Price:</label>
                    <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="duration">Duration:</label>
                    <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="numberOfDates">Number of Dates Available:</label> {/* Added numberOfDates field */}
                    <select id="numberOfDates" name="numberOfDates" value={formData.numberOfDates} onChange={handleChange} required >
                        <option value="">Select number of dates</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
                {formData.dateRanges.map((dateRange, index) => (
                    <div key={index}>
                        <label htmlFor={`startDate-${index}`}>Start Date:</label>
                        <input type="date" id={`startDate-${index}`} name={`startDate-${index}`} value={dateRange.startDate} onChange={handleChange} required />
                        <label htmlFor={`endDate-${index}`}>End Date:</label>
                        <input type="date" id={`endDate-${index}`} name={`endDate-${index}`} value={dateRange.endDate} onChange={handleChange} required />
                    </div>
                ))}
                <button type="submit">Add Package</button>
            </form>
        </div>
    );
};

export default ManagePackage;

