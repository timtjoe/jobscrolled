import { createGlobalStyle } from "styled-components";


export const RootStyles = createGlobalStyle`
  :root {
    /* Font family variables */
    --font-base: 'Inter', 'Poppins', 'Open Sans', 'Roboto', 'Segoe UI', Tahoma, sans-serif;

    /* Width variables */
    --width-sm: 430px;
    --width-md: 693px;
    --width-lg: 1366px;

    /* Font sizes */
    --font-xxs: 10px;
    --font-xs: 0.75em;
    --font-sm: 0.875em;
    --font-md: 1.0625em;
    --font-lg: 1.25em;
    --font-xl: 1.75em;

    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 12px;
    --spacing-lg: 16px;
    --spacing-xl: 24px;

    /* Border radius */
    --radius-sm: 8px;
    --radius-md: 17px;
    --radius-lg: 21px;

    /* Colors */
    --bg-white: #FFFFFF;
    --bg-grey: #FAFAFA;
    --bg-black: #0C1015;
    
    --text-black: #0C1015;
    --text-muted: #465a6a;
    --text-grey: #757A80;
    --text-red: #eb3b5a;

    --border-light: #EBEBEB;
    --border-subtle: #e0e2ec;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-base);
    background-color: var(--bg-white);
    color: var(--text-black); 
    font-size: var(--font-sm);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input,
  textarea {
    font-family: var(--font-base);
    outline: none;
    border: 1px solid var(--border-subtle);
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: var(--width-sm)) {
    body {
      font-size: var(--font-sm);
    }
  }

  /* globals.css or App.css */
.vaul-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.vaul-content {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 16px 16px 0 0;
  max-height: 90vh;
  overflow: hidden;
  z-index: 1001;
  display: flex;
  flex-direction: column;
}

.vaul-header {
  padding: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.vaul-close {
  border: none;
  background: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  color: #6b7280;
  
  &:hover {
    background: #f3f4f6;
  }
}

.vaul-body {
  flex: 1;
  overflow-y: auto;
}

.vaul-footer {
  padding: 24px;
  border-top: 1px solid #e5e7eb;
}

`;