import React, { Component } from 'react';

import { Layout, Button, Modal } from 'antd';

import * as Utils from '../util/Utils';

class HeaderWrapper extends Component {

  constructor(props){
    super(props);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  state = {
    visible: false,
    confirmLoading: false,
  };

  postButton(){
    const { logged, user } = this.props;

    if(logged.name && user.account === logged.name){
      return (
        <Button
          shape='round'
          icon='edit'
          className='edit-btn'
          onClick={this.showModal}  
        >
          写微文
        </Button>
      );
    }
    return '';
  }

  showModal(){
    this.setState({visible: true});
  }

  handleOk(){
    this.setState({confirmLoading: true});
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel(){
    this.setState({visible: false});
  };

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

  render(){
    const { visible, confirmLoading } = this.state;
    const { logged, login, logout } = this.props;

    return (
      <Layout.Header>
        <div>微文</div>
        <Modal
          title='写微文'
          visible={visible}
          confirmLoading={confirmLoading}
          okText='提交'
          cancelText='取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{'aaa'}</p>
        </Modal>
        {this.postButton()}
        <Button
          type='primary'
          className='login-btn'
          onClick={logged.name ? logout: login }
        >
          {logged.name ? '注销' : '登录'}
        </Button>
        {this.signButton()}
      </Layout.Header>
    );
  }
}

export default HeaderWrapper;