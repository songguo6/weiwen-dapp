import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Card, Divider, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import { fetchByPrimary } from '../../api/fetch'; 

class User extends Component {

  state = {
    user: {}
  }

  componentDidMount(){
    fetchByPrimary('usertable','account',this.props.account).then(res => {
      this.setState({user: res});
    });
  }

  render(){
    const { account } = this.props;
    const { user } = this.state;
    return (
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <div>
          <div className='avatar'>
            <img alt="" src='https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' />
            <div className='name'>{account}</div>
          </div>
          <Divider dashed />
          <Row gutter={48} className='user'>
            <Col lg={24} xl={12} className='item'>
              <Link to='/'>
                <span>微文 </span>{account ? user.post_num : ''}
              </Link>
            </Col>
            <Col lg={24} xl={12} className='item'>
              <Link to='/'>
                <span>获赞 </span>{account ? user.like_num : ''}
              </Link>
            </Col>
            <Col lg={24} xl={12} className='item'>
              <Link to='/'>
                <span>关注 </span>{account ? user.follow_num : ''}
              </Link>
            </Col>
            <Col lg={24} xl={12} className='item'>
              <Link to='/'>
                <span>粉丝 </span>{account ? user.fans_num : ''}
              </Link>
            </Col>
          </Row>
          <Divider style={{ marginTop: 20 }} dashed />
          <Row gutter={0} className='user'>
            <Col className='item'>
              <Link to='/'>
                <span>获得收益 </span>{account ? user.balance : ''} 
                <Avatar 
                  size="small" 
                  style={{marginLeft: 5 }}
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYWKv4dCST42_uNTYKoTiuPZ11GP5JXbSjOHQ7MgNNZ9zbqqGa'
                />
              </Link>
            </Col>
          </Row>
        </div>
      </Card>
    )
  }
}

const mapState = (state) => ({
  account: state.account,
});

export default connect(mapState, null)(User);