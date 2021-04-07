import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PickPre from './components/model1';
import UpOff from './components/upOff';
import SignIn from './components/SignIn';
import { AuthProvider } from './components/Auth'
import DesPre from './components/model2';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/SignIn" component={SignIn}/>
        <Route path="/PickPre" component={PickPre} />
        <Route path="/DesPre" component={DesPre} />
        <Route path="/pickup-dropoff" component={UpOff} />
      </Switch>
    </BrowserRouter>
  </AuthProvider>, rootElement
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
