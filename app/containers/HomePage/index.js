/*
 * HomePage
 *
 */

import React from 'react';
import styled from 'styled-components';
import Presentation from '../../components/Presentation/Loadable';
import Upload from '../../components/Upload/Loadable';
import space from '../../video/Space.mp4';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  min-height: 100vh;
  min-width: 100vw;
  .video-wrapper {
    position: fixed;
    min-width: 100vw;
    min-height: 100vh;
  }
  .bg {
    background-image: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.8) 0%,
      rgba(118, 75, 162, 0.8) 100%
    );
    position: fixed;
    min-width: 100vw;
    min-height: 100vh;
  }
`;

function Homepage() {
  return (
    <Container>
      <div className="video-wrapper">
        <video autoPlay loop muted>
          <source src={space} />
        </video>
      </div>
      <div className="bg" />
      <Presentation />
      <Upload />
    </Container>
  );
}

export default Homepage;
