import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    outline: 0;
  }

  body {
    background: #FAD144;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
  }

  #root {
    display: flex;
    /* justify-content: center;
    align-items: center;
    height: 100vh; */
  }

  button: {
    cursor: pointer;
  }
`;