import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Layout, Button, Row, Col } from 'antd';

import { login, logout, checkLogin } from './api/login';
import { reward } from './api/service';

import User from './pages/user';  
import * as Utils from './util/Utils';

import './App.css';

class App extends Component {

  componentDidMount(){
    this.props.checkLogin();
  }

  signButton(){
    const { logged, user } = this.props;

    if((logged.name && user.account === logged.name && !Utils.isToday(user.last_reward_time))
      || (logged.name && user.account !== logged.name) ){ 

      return (
        <Button
          type='danger'
          className='sign-btn'
          onClick={this.props.reward}
        >
          签到领币  
        </Button>
      );
    }
    return '';
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
              className='login-btn'
              onClick={logged.name ? logout: login }
            >
              {logged.name ? '注销' : '登录'}
            </Button>
            {this.signButton()}
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
    reward(){
      dispatch(reward);
    }, 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
