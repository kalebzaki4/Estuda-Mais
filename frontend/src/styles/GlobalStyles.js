import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #8A2BE2;
    --primary-dark: #6A1B9A;
    --secondary: #121212;
    --text-light: #FFFFFF;
    --text-gray: #AAAAAA;
    --error: #FF5252;
    --success: #4CAF50;
    --background-gradient: linear-gradient(135deg, #121212 0%, #2D1B4E 100%);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', 'Segoe UI', sans-serif;
  }

  body {
    background: var(--background-gradient);
    color: var(--text-light);
    min-height: 100vh;
  }

  button, input, textarea {
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;