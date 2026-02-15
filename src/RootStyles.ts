import { createGlobalStyle } from "styled-components";

export const RootStyles = createGlobalStyle`
  :root {
    --font-base: 'Inter', system-ui, sans-serif;
    
    /* Colors */
    --primary: #FE4E9A;
    --secondary: #6ABAE5;
    --black: #0C1015;
    --muted: #465a6a;
    --border: #EBEBEB;
    --surface: #FAFAFA;

    /* Semantic Spacing & Sizing */
    --radius: 12px;
    --container-max: 1200px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-base);
    background: #fff;
    color: var(--black);
    font-size: 14px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  button, input, textarea {
    font: inherit;
    color: inherit;
    border: none;
    outline: none;
    background: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

`;
