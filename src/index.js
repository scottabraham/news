import React from 'react';
import ReactDOM from 'react-dom';
import './news.css';
import App from './App';


if('serviceWorker' in navigator){

    console.log('Service Workers are supported');

    try {
        navigator.serviceWorker.register('sw.js');
        console.log('Service Worker registered');
    } catch (error) {
        console.log.log('Service Worker registraton failed');
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

