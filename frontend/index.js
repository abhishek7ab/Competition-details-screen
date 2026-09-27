import { registerRootComponent } from 'expo';
import App from './App';

// Ensure body and html background are dark on web platforms
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    html, body, #root {
      background-color: #080C14 !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 100% !important;
      overflow-x: hidden !important;
    }
  `;
  document.head.appendChild(style);
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
registerRootComponent(App);
