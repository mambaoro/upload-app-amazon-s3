/* eslint-disable no-unused-expressions */
/**
 *
 * Upload
 *
 */

import React, { useState } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { PulseLoader } from 'react-spinners';
import v4 from 'uuid/v4';

function Upload() {
  const [currentFiles, setFiles] = useState([]);
  const [limit, setLimit] = useState(false);
  const [warning, setWarning] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const [responseList, setResponseList] = useState([]);
  const handleFile = ({ target: { files } }) => {
    const aboveLimit = Object.values(files).some(
      file => file && file.size > 15728640,
    );
    aboveLimit && setLimit(true);
    !aboveLimit && setLimit(false);
    setFiles(files);
    aboveLimit &&
      setWarning(
        'One or multiple files are too large. 15 megabytes is the maximum size allowed.',
      );
    !aboveLimit && setWarning(null);
  };
  return (
    <Section>
      <div>
        <form
          encType="multipart/form-data"
          onSubmit={async e => {
            e.preventDefault();
            try {
              setLoading(true);
              const data = new FormData();
              if (currentFiles) {
                Object.values(currentFiles).map(file =>
                  data.append('uploadList', file, file.name),
                );
                const response = await axios.post('/uploadMultiple', data, {
                  headers: {
                    // eslint-disable-next-line prettier/prettier
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${
                      // eslint-disable-next-line no-underscore-dangle
                      data._boundary
                    }`,
                  },
                });
                setLoading(false);
                response.status !== 200 &&
                  response.data.error &&
                  setResponseError(true);
                response.status === 200 && setResponseError(false);
                response.data && setResponseList(response.data.files);
              }
            } catch (err) {
              err && setResponseError(true);
              err && setLoading(false);
            }
          }}
        >
          <div>
            <input
              type="file"
              id="file"
              required
              onChange={handleFile}
              name="files"
              multiple
            />
            <label htmlFor="file" className="file">
              Select files
            </label>
          </div>
          {currentFiles.length > 0 && !limit && !isLoading && (
            <button type="submit" disabled={limit}>
              Upload
            </button>
          )}
        </form>
        {currentFiles.length > 0 && (
          <div className="currentFiles">
            <h2>Selected files</h2>
            <ul>
              {Object.values(currentFiles).map(file => (
                <li key={v4()}>
                  <p>{file.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="spinner">
          <PulseLoader color="#fafafa" loading={isLoading} />
        </div>
        {responseError && <div>An error occurred, try to upload again.</div>}
        {responseList && (
          <ul className="data-list">
            {responseList.map(file => (
              <li key={v4()}>
                <p>{file.originalname || 'Unknown file name'}</p>
                <a
                  href={
                    file.location ||
                    'For an unknown reason the download link is not displaying at all.'
                  }
                  download
                >
                  {file.location}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      {warning && <p className="warning">{warning}</p>}
    </Section>
  );
}

const cssSharedButton = css`
  background: #302a2e;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: 'Poppins', sans-serif;
  font-size: inherit;
  font-weight: 600;
  margin-bottom: 1rem;
  outline: none;
  padding: 1rem 50px;
  position: relative;
  transition: all 0.3s;
  vertical-align: middle;
`;

const Section = styled.section`
  position: relative;
  max-width: 30rem;
  min-width: 30rem;
  align-self: center;
  font-size: 1.599rem;
  background-color: #80d0c7;
  padding: 3.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  color: #fafafa;
  text-align: center;
  .warning {
    color: crimson;
    margin-top: 1.5rem;
  }
  .spinner {
    margin: 0 auto;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .currentFiles {
    margin: 0 auto;
    margin-top: 2.5rem;
    h2 {
      color: #302a2e;
      margin-bottom: 1rem;
    }
    li {
      list-style: none;
      margin-top: 1rem;
      border-bottom: 1px dotted #302a2e;
    }
  }
  .data-list {
    li {
      list-style: none;
    }
    a {
      color: #302a2e;
      :hover {
        color: rgba(102, 126, 234, 0.8);
      }
    }
  }
  form {
    [type='file'] {
      opacity: 0;
      display: none;
    }
    .file {
      ${cssSharedButton}
      display: block;
      margin: 0 auto;
      text-align: center;
    }
    button {
      ${cssSharedButton}
      display: block;
      margin: 0 auto;
      background: linear-gradient(
        135deg,
        rgba(102, 126, 234, 0.8) 0%,
        rgba(118, 75, 162, 0.8) 100%
      );
      border-radius: 50px;
      overflow: hidden;
      margin-top: 2rem;
      transition: transform 0.2s ease-in-out;
      :hover {
        transform: translateY(-0.3rem);
      }
    }
  }
`;

Upload.propTypes = {};

export default Upload;
