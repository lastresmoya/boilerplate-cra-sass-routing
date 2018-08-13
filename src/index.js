import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CalendarPage from './pages/CalendarPage';


ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path='/' component={App}/>
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/calendar' component={CalendarPage} />
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
