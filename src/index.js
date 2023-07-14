import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewSchedule from './screens/ViewSchedule';
import Admin from './components/Admin';
import SetSchedule from './components/SetSchedule';
import AdminViewSchedule from './screens/AdminViewSchedule';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Routes>
        <Route exact path='/' element={<App/>}/>
        <Route exact path='/admin' element={<Admin/>}/>
        <Route exact path='/admin/setschedule' element={<SetSchedule/>}/>
        <Route exact path='/viewschedule' element={<ViewSchedule/>}/>
        <Route exact path='/admin/viewschedule' element={<AdminViewSchedule/>}/>
      </Routes>
    </Router>
);
