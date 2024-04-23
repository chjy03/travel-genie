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
import SignUp from './Pages/GeneralModule/SignUp';
import PackageListing, { Data } from './Pages/PackageListing/PackageListing'; // Import Data
import PackageDetail from './Pages/PackageDetail/PackageDetail';
import BookingPage from './Pages/BookingPage/BookingPage';
import ManagePackage from './Pages/ManagePackage/ManagePackage';

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
                    <Route path="/package-listing" element={<PackageListing />} />
                    <Route path="/package/:id" element={<PackageDetail data={Data} />} />
                    <Route path="/booking/:id" element={<BookingPage />} />
                    <Route path="/manage-package" element={<ManagePackage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;




