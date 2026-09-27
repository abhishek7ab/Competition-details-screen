import { registerRootComponent } from 'expo';
import App from './App';

// Inject modern Google Fonts, custom scrollbars, and luxury dark theme CSS
if (typeof document !== 'undefined') {
  // 1. Google Fonts Link
  if (!document.getElementById('feedants-fonts')) {
    const linkFont = document.createElement('link');
    linkFont.id = 'feedants-fonts';
    linkFont.rel = 'stylesheet';
    linkFont.href =
      'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap';
    document.head.appendChild(linkFont);
  }

  // 2. Global CSS Stylesheet
  const style = document.createElement('style');
  style.id = 'feedants-custom-styles';
  style.innerHTML = `
    * {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, .heading-font {
      font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif !important;
    }

    html, body, #root {
      background-color: #080C14 !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 100% !important;
      overflow-x: hidden !important;
      background-image: 
        radial-gradient(ellipse at 15% 10%, rgba(0, 212, 170, 0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 85% 90%, rgba(151, 71, 255, 0.06) 0%, transparent 45%),
        radial-gradient(ellipse at 50% 50%, rgba(255, 184, 0, 0.03) 0%, transparent 60%) !important;
      background-attachment: fixed !important;
    }

    /* Ultra-sleek custom scrollbars */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(8, 12, 20, 0.8);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 212, 170, 0.28);
      border-radius: 999px;
      transition: background 0.2s ease;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 212, 170, 0.6);
      box-shadow: 0 0 10px rgba(0, 212, 170, 0.5);
    }

    /* Keyframe Animations */
    @keyframes pulseGlow {
      0%, 100% {
        opacity: 0.6;
        transform: scale(1);
      }
      50% {
        opacity: 1;
        transform: scale(1.08);
      }
    }

    @keyframes shimmerMove {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    /* Interactive Hover Transitions on Web */
    [role="button"], button {
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
      cursor: pointer !important;
    }
    [role="button"]:hover, button:hover {
      filter: brightness(1.08);
    }
    [role="button"]:active, button:active {
      transform: scale(0.985);
    }
  `;
  document.head.appendChild(style);
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
registerRootComponent(App);

