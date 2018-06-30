import React from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';


function Calendar({ events, handleSelectMatter, handleSelectSlot }) {
  return(
    <div>
      <BigCalendar
        events={events}
        startAccessor='startAt'
        endAccessor='endAt'
        onSelectEvent={handleSelectMatter}
        onSelectSlot={handleSelectSlot}
        selectable={true}
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
  ).isRequired,
  handleSelectMatter: PropTypes.func.isRequired,
  handleSelectSlot: PropTypes.func.isRequired,
}

export default Calendar;