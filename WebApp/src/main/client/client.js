import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {App} from '../app/app';
import './client.scss';

hydrate((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById("root"));
