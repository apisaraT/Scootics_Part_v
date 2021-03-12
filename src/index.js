import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Predict from './components/Predict';
import UpOff from './components/upOff';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
  <Switch>
    <Route exact path ="/" component={App}/>
    <Route path ="/prediction" component={Predict}/>
    <Route path ="/pickup-dropoff" component={UpOff}/>
  </Switch>
  </BrowserRouter>,
  rootElement
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
