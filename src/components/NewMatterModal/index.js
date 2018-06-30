import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';



function NewMatterModal({ show, handleClose, startAt, endAt, handleChange, value, handleSave }) {
  return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{`Start date: ${startAt}`}</h4>
        <h4>{`End date: ${endAt}`}</h4>
        <input
          onChange={handleChange}
          value={value}
          id="newMatterInput"
          name="newMatterInput"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

NewMatterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  startAt: PropTypes.object,
  endAt: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired
}

export default NewMatterModal;