import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { Card, List, Avatar, Icon } from 'antd';
import { fetchAll } from '../api/fetch';

class Posts extends Component {

  state = {
    list: [],
  }

  componentDidMount(){
    fetchAll('posttable', {}).then(res => {
      this.setState({list: res});
    })
  }

  render(){
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <List
          size="large"
          rowKey="id"
          itemLayout="vertical"
          dataSource={this.state.list}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <IconText type="pay-circle" text={item.balance} />,
                <IconText type="like-o" text={item.like_num} />,
                <IconText type="message" text={item.comment_num} />,
              ]}
            >
              <div>
                <div className='item-content'>{item.content}</div>
                {
                  item.attachtype ? 
                  <div className='item-attach'>
                    <a href={item.attachment}>
                      <IconText type='link' text={item.attachment} />
                    </a> 
                  </div> : ''
                }
                <div className='item-extra'>
                  <Avatar src='https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' size="small" />
                  <Link>{item.author}</Link> 发布于 
                  <em>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</em>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    )
  }
}

export default Posts;