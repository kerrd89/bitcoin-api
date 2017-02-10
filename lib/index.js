//import very basic style sheets
require('./styles/reset');
require('./styles/main');

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';

ReactDOM.render(
  <Routes />, document.getElementById('root')
);
