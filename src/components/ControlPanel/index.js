import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
 width: 25%;
 height: 100vh;
 position: fixed;
 top: 0px;
 right: 0px;
 background-color: white;
`;

function ControlPanel({ children, handleClose }) {
  return(
    <Wrapper>
      <a onClick={handleClose}>Close</a>
      {children}
    </Wrapper>
  )
}

ControlPanel.propTypes = {
  children: PropTypes.oneOfType(
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element)
  ).isRequired,
  handleClose: PropTypes.func.isRequired
}

export default ControlPanel;