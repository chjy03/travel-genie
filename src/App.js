import React from 'react';
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
import PackageListing, { Data } from './Pages/PackageListing/PackageListing'; // Import Data
import PackageDetail from './Pages/PackageDetail/PackageDetail';
import BookingPage from './Pages/BookingPage/BookingPage';
import ManagePackage from './Pages/ManagePackage/ManagePackage';
import Report from './Pages/GeneralModule/Report/Report';
import HomeListing from './Pages/Home/HomeListing';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/package" element={<Package />} />
                    <Route path="/planning" element={<Planning />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/signUp" element={<SignUp/>} />
                    <Route path="/forgotPassword" element={<ForgotPassword/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/logIn" element={<Login/>} />
                    <Route path="/package-listing" element={<PackageListing />} />
                    <Route path="/package/:id" element={<PackageDetail data={Data} />} />
                    <Route path="/booking/:id" element={<BookingPage />} />
                    <Route path="/manage-package" element={<ManagePackage />} />
                    <Route path="/report" element={<Report />} />
                    <Route path="/home-listing" element={<HomeListing />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;




