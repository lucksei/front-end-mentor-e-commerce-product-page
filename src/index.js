import React from 'react';
import { createRoot } from 'react-dom/client';

import './styles/style.scss';

import Header from './components/header.jsx';
import Card from './components/card.jsx';
import Attribution from './components/attribution.jsx';
import { CartProvider } from './hooks/cart_provider.js';

const App = () => {
  return (
    <>
      <Header></Header>
      <div className="card-container">
        <Card></Card>
      </div>
      <Attribution></Attribution>
    </>
  );
}

const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(
  <CartProvider>
    <App />
  </CartProvider>
)