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
      background-color: #F5F7FA !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 100% !important;
      overflow-x: hidden !important;
    }

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #F1F5F9;
    }
    ::-webkit-scrollbar-thumb {
      background: #CBD5E1;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94A3B8;
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
