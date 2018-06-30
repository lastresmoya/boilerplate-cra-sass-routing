import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { ActionCableProvider } from 'react-actioncable-provider';

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
        <ActionCableProvider url={process.env.REACT_APP_ACTION_CABLE_URL}>
          <Console />
        </ActionCableProvider>,
      </div>
    );
  }
}

export default App;
