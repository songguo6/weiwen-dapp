import React, { Component } from 'react';

import { Row, Col, Card, Divider, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import { fetchByPrimary } from '../../api/fetch'; 

class User extends Component {

  componentDidMount(){
    console.log(fetchByPrimary('usertable','account','songguo12345'));
  }

  render(){
    return (
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <div>
          <div className='avatar'>
            <img alt="" src='https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' />
            <div className='name'>songguo55555</div>
          </div>
          <Divider dashed />
          <Row gutter={48} className='user'>
            <Col lg={24} xl={12} className='item'>
              <Link to='/'>
                <span>微文 </span>25
              </Link>
            </Col>
            <Col lg={24} xl={12} className='item'>
              <Link to='/'>
                <span>获赞 </span>25
              </Link>
            </Col>
            <Col lg={24} xl={12} className='item'>
              <Link to='/'>
                <span>关注 </span>25
              </Link>
            </Col>
            <Col lg={24} xl={12} className='item'>
              <Link to='/'>
                <span>粉丝 </span>25
              </Link>
            </Col>
          </Row>
          <Divider style={{ marginTop: 20 }} dashed />
          <Row gutter={0} className='user'>
            <Col className='item'>
              <Link to='/'>
                <span>获得收益 </span>25 
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

export default User;