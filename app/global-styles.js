import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    font-size: 62.5%;
  }

  :root {
    --color-bg-presentation: #80d0c7;
    --color-dark: #302a2e;
    --linear-gradient-bg: linear-gradient(
        135deg,
        rgba(102, 126, 234, 0.8) 0%,
        rgba(118, 75, 162, 0.8) 100%
      );
  }
  
  *,
  *::after,
  *::before,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  body {
    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    box-sizing: border-box;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
`;

export default GlobalStyle;
