import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import './index.css';
import AboutUS from './components/AboutUS';
import ContactUs from './components/ContactUs';
import DonorList from './components/DonorList';
import SearchDonor from './components/SearchDonor';
import Layout from './components/Layout';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/login';
import RequestReceived from './components/RequestReceived'
import RequestPage from "./components/RequestPage"
import Profile from './components/Profile';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUS />} />
            <Route path="contactus" element={<ContactUs />} />
            <Route path="searchdonor" element={<SearchDonor />} />
            <Route path="donorlist" element={<DonorList />} />
            <Route path="registration" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="request-received" element={<RequestReceived/>} />
            <Route path="requestPage" element={<RequestPage/>} />
            <Route path="profile" element={<Profile/>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
