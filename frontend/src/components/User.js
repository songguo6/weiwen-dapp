import React, { Component } from 'react';

import { Row, Col, Card, Divider, Avatar, Popover, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';

class User extends Component {

  constructor(props){
    super(props);
    this.handleDeposit = this.handleDeposit.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  state = {
    popoverVisible: false,
  };

  renderCol(label, value){
    return (
      <Col lg={24} xl={12} className='item'>
        <Link to='/'>
          <span>{label} </span>{this.props.user.account ?  value : ''}
        </Link>
      </Col>
    );
  }

  handleDeposit(){
    this.setState({popoverVisible: false});
  };

  handleWithdraw(){
    this.setState({popoverVisible: false});
  }

  handleVisibleChange(visible){
    this.setState({ popoverVisible:visible });
  };

  render(){
    const { logged, user } = this.props;
    return (
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <div>
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
        </div>
      </Card>
    )
  }
}

export default User;