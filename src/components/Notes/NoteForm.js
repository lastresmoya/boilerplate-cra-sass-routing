import React from 'react';
import PropTypes from 'prop-types';


function NoteForm({ handleSave, value, handleChange }) {
  return(
    <div>
      <input
        value={value}
        onChange={handleChange}
        id="note"
        name="note"
      />
      <button
        onClick={handleSave}
      >Save</button>
    </div>
  )
}

NoteForm.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default NoteForm;