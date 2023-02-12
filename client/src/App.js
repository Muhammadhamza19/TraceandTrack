import React from 'react';
import './App.scss';
//import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Region from './loginPages/Regional';
import Manufacturer from './loginPages/Manufacturer'
import Distributer from './loginPages/Distributer'
import Transporter from './loginPages/Transporter'
import User from './loginPages/User'
import Login from './loginPages/Userlogin'
import UserDash from "./dashboards/userDashboard"
import ManuDash from "./dashboards/manufacturerDashboard"
import TranDash from "./dashboards/transporterDashboard"
import RegionDash from "./dashboards/regionDashboard"
import DistDash from "./dashboards/distributorDashboard"



function App() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<AppLayout />}>
                    <Route index element={<Manufacturer />} />
                    <Route path='/transporter' element={<Transporter />} />
                    <Route path='/distributor' element={<Distributer />} />
                    <Route path='/user' element={<User />} />
                    <Route path='/region' element={<Region />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/udashboard' element={<UserDash />} />
                    <Route path='/mdashboard' element={<ManuDash />} />
                    <Route path='/tdashboard' element={<TranDash />} />
                    <Route path='/ddashboard' element={<DistDash />} />
                    <Route path='/rdashboard' element={<RegionDash />} />


                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
