import React, { Component } from 'react';

import { 
  Row, Col, Card, Divider, Avatar, Popover,
  Modal, Button, InputNumber, Icon, 
} from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { withdraw } from '../api/service';
import { contract } from '../api/config';
import * as Utils from '../util/Utils';

var QRCode = require('qrcode.react');

class User extends Component {

  constructor(props){
    super(props);
    this.handleDeposit = this.handleDeposit.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  state = {
    popoverVisible: false,
    modalVisible: false,
    confirmLoading: false,
    quantity: '',
  }

  renderCol(label, value){
    return (
      <Col lg={24} xl={12} className='item'>
        <Link to='/'>
          <span>{label} </span>{this.props.user.account ?  value : ''}
        </Link>
      </Col>
    );
  }

  handleWithdraw(){
    this.setState({
      popoverVisible: false,
      modalVisible: true,
    });
  }

  handleDeposit(){
    this.setState({ popoverVisible: false });
    Modal.info({
      title: '充值账户二维码',
      okText: '知道了',
      bodyStyle: {marginLeft: 0},
      content: (
        <div style={{textAlign: 'center', paddingTop: 40}}>
          <QRCode value={contract} />
          <CopyToClipboard 
            text={contract}
            onCopy={() => {Utils.msgSuccess('已复制')}}
          >
            <p style={{color: '#1da1f2', fontSize: 20, marginTop: 20}}>
              {contract}&nbsp;<Icon type='copy'/>
            </p>
          </CopyToClipboard>            
        </div>
      ),
    });
  }

  handleVisibleChange(visible){
    this.setState({ popoverVisible:visible });
  }

  async handleOk(){
    const { quantity } = this.state;
    let balance = this.props.user.balance;

    if(!quantity){
      Utils.msgError('请输入提现数量，最小0.0001');
      return;
    }
    balance = parseFloat(balance.slice(0, balance.length-4));
    if(quantity > balance){
      Utils.msgError('余额不足');
      return;
    }

    this.setState({confirmLoading: true});
    await withdraw(quantity.toFixed(4).toString()+' WEI');
    this.setState({
      modalVisible: false,
      confirmLoading: false,
    });
  }

  handleCancel(){
    this.setState({modalVisible: false});
  }

  onInputChange(value){
    this.setState({quantity: value});
  }

  render(){
    const { logged, user } = this.props;
    const { modalVisible, confirmLoading } = this.state;
    return (
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <Modal
          title='提现'
          visible={modalVisible}
          confirmLoading={confirmLoading}
          okText='确定'
          cancelText='取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          提现数量：
          <InputNumber min={0} step={0.0001} onChange={this.onInputChange} style={{width: 200}}/>
          &nbsp;WEI
        </Modal>
        <div className='avatar'>
          <img alt="" src='https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' />
          <div className='name'>{logged.name}</div>
        </div>
        <Divider dashed />
        <Row gutter={48} className='user'>
          {this.renderCol('微文', user.post_num)}
          {this.renderCol('获赞', user.like_num)}
          {this.renderCol('关注', user.follow_num)}
          {this.renderCol('粉丝', user.fans_num)}
        </Row>
        <Divider style={{ marginTop: 20 }} dashed />
        <Row gutter={0} className='user'>
          <Col className='item'>
            <Popover
              content={
                <div>
                  <Button style={{margin: '0 10px'}} onClick={this.handleDeposit}>充值</Button>
                  <Button style={{margin: '0 10px'}} onClick={this.handleWithdraw}>提现</Button>    
                </div>
              }
              title={user.account ? user.balance : 'WEI'} 
              trigger='click'
              visible={this.state.popoverVisible}
              onVisibleChange={this.handleVisibleChange}
            >
              <Link to='/'>
                <span>获得收益 </span>{user.account ? user.balance : ''} 
                <Avatar 
                  size="small" 
                  style={{marginLeft: 5 }}
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYWKv4dCST42_uNTYKoTiuPZ11GP5JXbSjOHQ7MgNNZ9zbqqGa'
                />
              </Link>
            </Popover>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default User;