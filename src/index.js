import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import LoginPage from './pages/LoginPage';


ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path='/' component={App}/>
            <Route path='/login' component={LoginPage} />
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
