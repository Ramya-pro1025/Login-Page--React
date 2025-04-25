import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/Login.css'; // Optional: apply global styles

// Create root element and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
