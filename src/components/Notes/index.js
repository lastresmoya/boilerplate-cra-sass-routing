import React from 'react';
import PropTypes from 'prop-types';

import NoteForm from './NoteForm';

function Notes({ list, handleChange,  handleSave, value}) {
  return(
    <div>
      <ul>
        {list.map(x => (
           <li key={x.id}>{x.body}</li>
        ))}
      </ul>
      <NoteForm
        handleSave={handleSave}
        handleChange={handleChange}
        value={value}
      />
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