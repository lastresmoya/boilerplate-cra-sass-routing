import React from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';


function Calendar({ events }) {
  return(
    <div>
      <BigCalendar
        events={events}
        startAccessor='startAt'
        endAccessor='endAt'
      />
    </div>
  )
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      startAt: PropTypes.object.isRequired,
      endAt: PropTypes.object.isRequired,
    })
  ).isRequired
}

export default Calendar;