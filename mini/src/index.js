import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux"
import App from './App';
import Store from './store/index';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
  integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
  crossorigin="anonymous"
/>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <Provider store={Store}><App/></Provider>);

