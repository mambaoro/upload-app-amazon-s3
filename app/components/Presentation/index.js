/**
 *
 * Presentation
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

function Presentation() {
  return (
    <Section>
      <article>
        <h1>Hi, it&apos;s Mamadou Baoro</h1>
        <p>
          In this application you can upload multiple files to the powerful
          cloud storage Amazon S3. To avoid any extra cost I limited the file
          size to 15mb per file. When you upload a file you will get a link
          back, then you can use it wherever you want. Enjoy the demo!
        </p>
      </article>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  color: #fafafa;
  width: 25%;
  align-self: center;
  padding: 3.5rem;
  margin-right: 10rem;
  border-radius: 0.5rem;
  background: #80d0c7;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  min-width: 25rem;
  h1 {
    color: #302a2e;
    font-size: 2.588rem;
    margin-bottom: 1.5rem;
  }
  p {
    font-size: 1.599rem;
  }
`;

Presentation.propTypes = {};

export default Presentation;
