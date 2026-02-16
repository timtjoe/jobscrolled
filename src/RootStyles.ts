import { createGlobalStyle } from "styled-components";

export const RootStyles = createGlobalStyle`
  :root {
    --font-base: 'Inter', system-ui, sans-serif;

    --font-lg: 20px;
    --font-xm: 17px;
    --font-md: 15px;
    --font-sm: 14px;
    --font-xs: 13px;
    --font-xxs: 11px;
    
    /* Backgrounds */
    --bg-primary: #1d9bf0;
    --bg-accent: #1d9bf040;
    --bg-dark: #16181c;
    --bg-navy: #02113d;
    --bg-black: #000000;
    --bg-overlay: #000000a6;
    --bg-surface: #fafafa;

    /* Text */
    --text-white: #ffffff;
    --text-main: #eff3f4;
    --text-sub: #e7e9ea;
    --text-link: #1d9bf0;
    --text-muted: #71767b;
    --text-lavender: #9e9eff;

    /* Borders */
    --border-light: #4b4e52;
    --border-main: #333639;
    --border-dim: #2f3336;
    --border-pale: #ebebeb;

    /* Semantic Spacing & Sizing */
    --radius: 12px;
    --container-max: 1200px;
  }

  /* --- Scrollbar Styling --- */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    /* Firefox Support */
    scrollbar-width: thin;
    scrollbar-color: var(--border-main) transparent;
  }

  /* Chrome, Edge, Safari Support */
  ::-webkit-scrollbar {
    width: 6px; /* Vertical scrollbar width */
    height: 6px; /* Horizontal scrollbar height */
  }

  ::-webkit-scrollbar-track {
    background: transparent; /* No background for the track */
  }

  ::-webkit-scrollbar-thumb {
    background: var(--border-main);
    border-radius: 10px;
    border: 1px solid transparent; /* Acts as padding */
    background-clip: padding-box;
    
    &:hover {
      background: var(--border-light);
      background-clip: padding-box;
    }
  }

  body {
    font-family: var(--font-base);
    background: var(--bg-black);
    color: var(--text-sub);
    font-size: var(--font-sm);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
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