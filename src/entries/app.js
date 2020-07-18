import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';

import App from '../pages/App';

const container = document.getElementById('app');

render(<App />, container);
