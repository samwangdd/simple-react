import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <h1 title='foo'>Hello</h1>;
};

const container = document.getElementById('root');
ReactDOM.render(<App />, container);
