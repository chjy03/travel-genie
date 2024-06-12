// import React, { useState } from 'react'; // Import useState from React
// import './app.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar/Navbar';
// import Footer from './Components/Footer/Footer';
// import Home from './Pages/Home/Home';
// import Package from './Pages/Package/Package';
// import Planning from './Pages/Planning/Planning';
// import Payment from './Pages/Payment/Payment';
// import Forum from './Pages/Forum/Forum';
// import SignUp from './Pages/GeneralModule/SignUp/SignUp';
// import ForgotPassword from './Pages/GeneralModule/ForgotPassword/ForgotPassword';
// import Profile from './Pages/GeneralModule/Profile/Profile';
// import Login from './Pages/GeneralModule/SignUp/logIn';
// import PackageListing, { Data } from './Pages/PackageListing/PackageListing'; // Import Data
// import PackageDetail from './Pages/PackageDetail/PackageDetail';
// import BookingPage from './Pages/BookingPage/BookingPage';
// import ManagePackage from './Pages/ManagePackage/ManagePackage';
// import Report from './Pages/GeneralModule/Report/Report';
// import HomeListing from './Pages/Home/HomeListing';

// import Card from './Pages/Card/Card';
// import Purchases from './Pages/Purchases/Purchases';

// const App = () => {
//     return (
//         <Router>
//             <div className="App">
//                 <Navbar />
//                 <Routes>
//                     {/* Set the default route to render Landing component */}
//                     <Route path="/" element={<Home />} />

//                     {/* Define other routes */}
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/package" element={<Package />} />
//                     <Route path="/planning" element={<Planning />} />
//                     <Route path="/payment" element={<Payment />} />
//                     <Route path="/forum" element={<Forum />} />
//                     <Route path="/signUp" element={<SignUp />} />
//                     <Route path="/forgotPassword" element={<ForgotPassword />} />
//                     <Route path="/profile" element={<Profile />} />
//                     <Route path="/logIn" element={<Login />} />

//                     <Route path="/package-listing" element={<PackageListing />} />
//                     <Route path="/package/:id" element={<PackageDetail data={Data} />} />
//                     <Route path="/booking/:id" element={<BookingPage />} />
//                     <Route path="/manage-package" element={<ManagePackage />} />
//                     <Route path="/report" element={<Report />} />
//                     <Route path="/home-listing" element={<HomeListing />} />

//                     <Route path="/card" element={<Card />} />
//                     <Route path="/purchases" element={<Purchases />} />

//                 </Routes>
//                 <Footer />
//             </div>
//         </Router>
//     );
// };

// export default App;
import React from 'react'; // No need to import useState here since it's not used in this file
import './app.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Package from './Pages/Package/Package';
import Planning from './Pages/Planning/Planning';
import Payment from './Pages/Payment/Payment';
import Forum from './Pages/Forum/Forum';
import SignUp from './Pages/GeneralModule/SignUp/SignUp';
import ForgotPassword from './Pages/GeneralModule/ForgotPassword/ForgotPassword';
import Profile from './Pages/GeneralModule/Profile/Profile';
import Login from './Pages/GeneralModule/SignUp/logIn';
import PackageListing from './Pages/PackageListing/PackageListing'; 
import PackageDetail from './Pages/PackageDetail/PackageDetail';
import BookingPage from './Pages/BookingPage/BookingPage';
import ManagePackage from './Pages/ManagePackage/ManagePackage';
import Report from './Pages/GeneralModule/Report/Report';
import HomeListing from './Pages/Home/HomeListing';
import PlanningDetail from "./Pages/Planning/PlanningDetails/PlanningDetail";
import Schedule from "./Pages/Planning/Schedule/Schedule";
import Card from './Pages/Card/Card';
import Purchases from './Pages/Purchases/Purchases';
import ResetPassword from './Pages/GeneralModule/ResetPassword/ResetPassword';

const App = () => {
    const isUserSignedIn = !!localStorage.getItem('token');

    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    {/* Set the default route to render Landing component */}
                    <Route path="/" element={<Home />} />

                    {/* Define other routes */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/package" element={<Package />} />
                    <Route path="/planning" element={<Planning />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/logIn" element={<Login />} />
                    <Route path="/resetPassword/:token" element={<ResetPassword />} />
                    <Route path="/package-listing" element={<PackageListing />} />
                    <Route path="/package/:id" element={<PackageDetail />} /> {/* Remove data prop */}
                    <Route path="/booking/:id" element={<BookingPage />} />
                    <Route path="/manage-package" element={<ManagePackage />} />
                    <Route path="/report" element={<Report />} />
                    <Route path="/home-listing" element={<HomeListing />} />
                    <Route path="/detail/:id" element={<PlanningDetail />} />
                    <Route path="/schedule" element={<Schedule />} />

                    <Route path="/card" element={<Card />} />
                    {isUserSignedIn && <Route path="/purchases" element={<Purchases />} />}
                    
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
