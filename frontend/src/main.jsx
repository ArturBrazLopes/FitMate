import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Verificar se o elemento root existe
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; font-family: Arial;"><h1>Erro: Elemento root não encontrado</h1><p>Verifique se o index.html tem um elemento com id="root"</p></div>';
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('React app initialized successfully');
  } catch (error) {
    console.error('Error initializing React app:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial;">
        <h1>Erro ao inicializar aplicação</h1>
        <p>${error.message}</p>
        <p>Verifique o console para mais detalhes (F12)</p>
      </div>
    `;
  }
}
