import React from 'react';
import PropTypes from 'prop-types';


function Notes({ list }) {
  return(
    <div>
      <ul>
        {list.map(x => (
           <li key={x.id}>{x.body}</li>
        ))}
      </ul>
    </div>
  )
}

Notes.propTypes = {
  list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
      })
    ).isRequired
}

export default Notes;