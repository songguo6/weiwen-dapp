import React from 'react';
import './App.css';

import store from './store';

function App() {
  return (
    <div>Hello EOS：{store.getState().account}</div>
  );
}

export default App;
