import { registerRootComponent } from 'expo';
import App from './App';

// Professional typography and clean styling
if (typeof document !== 'undefined') {
  if (!document.getElementById('feedants-fonts')) {
    const linkFont = document.createElement('link');
    linkFont.id = 'feedants-fonts';
    linkFont.rel = 'stylesheet';
    linkFont.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(linkFont);
  }

  const style = document.createElement('style');
  style.id = 'feedants-custom-styles';
  style.innerHTML = `
    * {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    html, body, #root {
      background-color: #0F1623 !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 100% !important;
      overflow-x: hidden !important;
    }

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #1A202C;
    }
    ::-webkit-scrollbar-thumb {
      background: #2D3748;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #4A5568;
    }

    [role="button"], button {
      transition: opacity 0.2s ease !important;
      cursor: pointer !important;
    }
    [role="button"]:active, button:active {
      opacity: 0.8 !important;
    }
  `;
  document.head.appendChild(style);
}

registerRootComponent(App);
