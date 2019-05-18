import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from './store/actionCreator';

class App extends Component {
  render() {
    const { account, login, logout } = this.props;
    return (
      <div>
        <div>
          <button onClick={account ? logout: login }>
            {account ? '注销' : '登录'}
          </button>
        </div>
        <div>EOS Account Name: {account}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account : state.account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login(){
      dispatch(actionCreator.changeLoginStatus("songguo55555"));  
    },
    logout(){
      dispatch(actionCreator.changeLoginStatus(""));  
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
