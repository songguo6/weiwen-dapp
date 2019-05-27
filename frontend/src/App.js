import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';

import { login, logout, checkLogin } from './api/login';
import { reward } from './api/service';

import User from './components/User';  
import Header from './components/Header'
import Posts from './components/Posts';

import './App.css';

class App extends Component {

  componentDidMount(){
    this.props.checkLogin();
  }

  render() {
    const { logged, login, logout, user, reward } = this.props;
    const { Content, Footer } = Layout;  

    return (
      <BrowserRouter>
        <Layout>
          <Header logged={logged} user={user} login={login} logout={logout} reward={reward}/>
          <Content>
            <Row>
              <Col lg={7} md={24}>
                <User logged={logged} user={user}/>
              </Col>
              <Col lg={17} md={24}>
                <Posts logged={logged}/>
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
    reward(){
      dispatch(reward);
    }, 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
