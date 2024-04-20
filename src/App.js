import React from 'react';
import './app.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Packages from './Pages/Packages/Packages';
import Planning from './Pages/Planning/Planning';
import Payment from './Pages/Payment/Payment';
import Forum from './Pages/Forum/Forum';
import SignUp from './Pages/GeneralModule/SignUp';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/planning" element={<Planning />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/signUp" element={<SignUp/>} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;




