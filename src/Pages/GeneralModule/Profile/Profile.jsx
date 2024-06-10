import React, { useState, useEffect } from 'react';
import './profile.css';
import profileImage from '../../../Assets/tourist.png';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        console.log('Stored data:', storedData);
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                console.log('Parsed data:', parsedData);
                setFormData(parsedData);
            } catch (error) {
                console.error('Error parsing stored data:', error);
            }
        }
    }, []);
    
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here, e.g., API call
        console.log(formData);
        window.alert('Profile information has been updated successfully.');
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <section className="profile">
            <div className="profileContainer">
                <div className="profileContent">
                    <h2>You're a Tourist</h2>
                    <div className="profileImage">
                        <img src={profileImage} alt="Profile" />
                    </div>
                </div>
                <div className="profileDetails">
                    <h1>Profile Details</h1>
                    <p>Update your profile information below.</p>
                    <form className="forgotPasswordForm" onSubmit={handleSubmit}>
                        <div className="formGroup">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Mario"
                                required
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="mario@gmail.com"
                                required
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="**********"
                                required
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="**********"
                                required
                            />
                        </div>
                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Profile;





// import React, { useState } from 'react';
// import './profile.css';
// import profileImage from '../../../Assets/tourist.png';

// const Profile = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Perform form submission logic here, e.g., API call
//         console.log(formData);
//         window.alert('Profile information has been updated successfully.');
//         setFormData({
//             name: '',
//             email: '',
//             password: '',
//             confirmPassword: ''
//         });
//     };

//     return (
//         <section className="profile">
//             <div className="profileContainer">
//                 <div className="profileContent">
//                     <h2>You're a Tourist</h2>
//                     <div className="profileImage">
//                         <img src={profileImage} alt="Profile" />
//                     </div>
//                 </div>
//                 <div className="profileDetails">
//                     <h1>Profile Details</h1>
//                     <p>Update your profile information below.</p>
//                     <form className="forgotPasswordForm" onSubmit={handleSubmit}>
//                         <div className="formGroup">
//                             <label htmlFor="name">Name</label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 placeholder="Mario"
//                                 required
//                             />
//                         </div>
//                         <div className="formGroup">
//                             <label htmlFor="email">Email Address</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 placeholder="mario@gmail.com"
//                                 required
//                             />
//                         </div>
//                         <div className="formGroup">
//                             <label htmlFor="password">Password</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 placeholder="**********"
//                                 required
//                             />
//                         </div>
//                         <div className="formGroup">
//                             <label htmlFor="confirmPassword">Confirm Password</label>
//                             <input
//                                 type="password"
//                                 id="confirmPassword"
//                                 name="confirmPassword"
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                                 placeholder="**********"
//                                 required
//                             />
//                         </div>
//                         <button type="submit">Save Changes</button>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Profile;
