import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  
  :root {
    --primary: #8A2BE2;
    --primary-dark: #6A1CB2;
    --primary-light: #9D4EE9;
    --secondary: #4A0080;
    --accent: #FF00FF;
    --accent-secondary: #00E5FF;
    --background-dark: #0A0118;
    --background-light: #1E1E1E;
    --card-bg: rgba(30, 30, 40, 0.7);
    --text-light: #F5F5F5;
    --text-gray: #AAAAAA;
    --error: #FF3B30;
    --success: #34C759;
    --warning: #FFCC00;
    --background-gradient: linear-gradient(135deg, #2b1a3d 0%, #1a1a2e 100%);
    --glass-gradient: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    --glass-border: 1px solid rgba(255, 255, 255, 0.18);
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    --neon-shadow: 0 0 10px rgba(138, 43, 226, 0.5), 0 0 20px rgba(138, 43, 226, 0.3), 0 0 30px rgba(138, 43, 226, 0.1);
    --card-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    --button-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    --transition-fast: 0.2s all ease;
    --transition-normal: 0.3s all ease;
    --transition-slow: 0.5s all ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--background-dark);
    color: var(--text-light);
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 90% 80%, rgba(138, 43, 226, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.05) 0%, transparent 50%);
    background-attachment: fixed;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: var(--transition-fast);
  }

  button {
    cursor: pointer;
    font-family: inherit;
    transition: var(--transition-fast);
  }

  input, button, textarea, select {
    font: inherit;
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(30, 30, 40, 0.5);
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-light);
  }
  
  /* Selection styling */
  ::selection {
    background-color: var(--primary);
    color: white;
  }
  
  /* Animation keyframes */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(138, 43, 226, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(138, 43, 226, 0); }
    100% { box-shadow: 0 0 0 0 rgba(138, 43, 226, 0); }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes glow {
    0% { filter: drop-shadow(0 0 2px rgba(138, 43, 226, 0.6)); }
    50% { filter: drop-shadow(0 0 5px rgba(138, 43, 226, 0.9)); }
    100% { filter: drop-shadow(0 0 2px rgba(138, 43, 226, 0.6)); }
  }
`;

export default GlobalStyles;