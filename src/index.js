import React from 'react';
import { createRoot } from 'react-dom/client';

import './styles/style.scss';

import Header from './components/header.jsx';
import Card from './components/card.jsx';
import Attribution from './components/attribution.jsx';

const App = () => {
    return (
        <>
            <Header></Header>
            <Card></Card>
            <Attribution></Attribution>
        </>
    );
}

const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(<App />)