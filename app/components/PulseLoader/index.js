/**
 *
 * PulseLoader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { PulseLoader as Pulse } from 'react-spinners';

function PulseLoader({ isLoading, color }) {
  return <Pulse color={color || '#fafafa'} loading={isLoading} />;
}

PulseLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  color: PropTypes.string,
};

export default PulseLoader;
