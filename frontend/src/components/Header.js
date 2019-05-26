import React, { Component } from 'react';

import { Layout, Button, Modal, Input, Radio, Select } from 'antd';

import * as Utils from '../util/Utils';

class Header extends Component {

  constructor(props){
    super(props);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  state = {
    modalVisible: false,
    confirmLoading: false,
    lableVisible: false,
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
    this.setState({modalVisible: true});
  }

  handleOk(){
    this.setState({confirmLoading: true});
    setTimeout(() => {
      this.setState({
        modalVisible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel(){
    this.setState({modalVisible: false});
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

  onRadioChange(e){
    this.setState({lableVisible: e.target.value});
  }

  render(){
    const { modalVisible, confirmLoading, lableVisible } = this.state;
    const { logged, login, logout } = this.props;

    return (
      <Layout.Header>
        <div>微文</div>
        <Modal
          title='写微文'
          visible={modalVisible}
          confirmLoading={confirmLoading}
          okText='提交'
          cancelText='取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input.TextArea autosize={{ minRows: 8, maxRows: 15 }} />
          <div class='modal-label'>附件类型：</div>
          <Radio.Group name='attachtype' defaultValue={0} onChange={this.onRadioChange}>
            <Radio value={0}>无</Radio>
            <Radio value={1}>链接</Radio>
            <Radio value={2}>IPFS哈希值</Radio>
            <Radio value={3}>图片</Radio>
            <Radio value={4}>视频</Radio>
            <Radio value={5}>其他文件</Radio>
          </Radio.Group>
          {lableVisible ? <div class='modal-label'>附件：</div> : ''}
          {lableVisible ?
          <Input 
            addonBefore={
              <Select defaultValue="Https://" style={{ width: 90 }}>
                <Select.Option value="Http://">Http://</Select.Option>
                <Select.Option value="Https://">Https://</Select.Option>
              </Select>}
          /> : ''}
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

export default Header;