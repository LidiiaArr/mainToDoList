import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AppWithReducer from "./AppWithReducer";
import AppWithRedux from "./AppWithRedux";
import {store} from "./store/store";
import {Provider} from "react-redux";

ReactDOM.render(<Provider store={store}>
    <AppWithRedux/>
</Provider>, document.getElementById('root'));
//Даём доступ компонентам к store, используя Provider
// Чтобы react (то есть наши компоненты) могли обращаться к этому store, мы должны положить наше приложение внутрь компонента Provider, с переданным ему store


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
