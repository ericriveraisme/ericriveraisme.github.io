import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './FF6PortfolioApp.jsx';
import './assets/styles.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
