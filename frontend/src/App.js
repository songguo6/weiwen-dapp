import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, logout, checkLogin } from './api/login';

import { Layout, Button } from 'antd';

import './App.css';

class App extends Component {

  componentDidMount(){
    this.props.checkLogin();
  }

  render() {
    const { account, login, logout } = this.props;
    const { Header, Content, Footer } = Layout;  

    return (
      <Layout>
        <Header>
          <div>微文</div>
          <Button
            type='primary'
            style={{float:'right', marginTop:15}}
            onClick={account ? logout: login }
          >
            {account ? '注销' : '登录'}
          </Button>
        </Header>
        <Content>
          EOS Account Name: {account}
        </Content>
        <Footer>
          微文 ©2019 Created by Songguo
        </Footer>
      </Layout>
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
      dispatch(login);  
    },
    logout(){
      dispatch(logout);  
    },
    checkLogin(){
      dispatch(checkLogin);
    },   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
