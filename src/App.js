import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import {
  Console,
} from './pages';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class App extends Component {
  render() {
    return (
      <div className="App">
        <Console />
      </div>
    );
  }
}

export default App;
