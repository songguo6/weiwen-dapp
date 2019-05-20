import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, logout } from './api/login';

import { Layout, Button } from 'antd';

import './App.css';

class App extends Component {
  render() {
    const { account, login, logout } = this.props;
    const { Header, Content, Footer } = Layout;  

    return (
      <Layout>
        <Header>
          <div style={{float:'left', color:'white', width:200, fontSize:28 }}>微文</div>
          <Button
            type='primary'
            style={{float:'right', marginTop:15}}
            onClick={account ? logout: login }
          >
            {account ? '注销' : '登录'}
          </Button>
        </Header>
        <Content style={{textAlign: 'center'}}>
          EOS Account Name: {account}
        </Content>
        <Footer style={{textAlign: 'center'}}>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
