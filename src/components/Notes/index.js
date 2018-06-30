import React from 'react';
import PropTypes from 'prop-types';

import NoteForm from './NoteForm';

function Notes({ list, handleChange,  handleSave, value, notesListLoading, handleDelete}) {
  return(
    <div>
      { notesListLoading ?
        <p>Loading..</p>
        :
        <ul>
          {list.map(x => (
             <li key={x.id}>{x.body} <a id={`delete_${x.id}`} onClick={handleDelete}>Delete</a></li>
          ))}
        </ul>
      }
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
    ).isRequired,
    notesListLoading: PropTypes.bool.isRequired,
    handleDelete: PropTypes.func.isRequired
}

export default Notes;