import "normalize.css";
import "./css/main.css";
import React from 'react';
import ReactDOM from 'react-dom';
import BaseLayout from './components/BaseLayout';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <BaseLayout />,
    rootElement
);