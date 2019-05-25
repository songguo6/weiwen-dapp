import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { login, logout, checkLogin } from './api/login';

import { Layout, Button, Row, Col } from 'antd';
import User from './pages/user';  

import './App.css';

class App extends Component {

  componentDidMount(){
    this.props.checkLogin();
  }

  render() {
    const { logged, login, logout, user } = this.props;
    const { Header, Content, Footer } = Layout;  

    return (
      <BrowserRouter>
        <Layout>
          <Header>
            <div>微文</div>
            <Button
              type='primary'
              style={{float:'right', marginTop:15}}
              onClick={logged ? logout: login }
            >
              {logged ? '注销' : '登录'}
            </Button>
          </Header>
          <Content>
            <Row>
              <Col lg={7} md={24}>
                <User logged={logged} user={user}/>
              </Col>
              <Col lg={17} md={24}>

              </Col>
            </Row>          
          </Content>
          <Footer>
            微文 ©2019 Created by Songguo
          </Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logged: state.logged,
    user : state.user,
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
