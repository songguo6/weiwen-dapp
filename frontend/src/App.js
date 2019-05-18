import React, { Component } from 'react';
import store from './store';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <input />
          <button>提交</button>
        </div>
        <div>EOS Account Name: </div>
      </div>
    );
  }
}

export default App;
