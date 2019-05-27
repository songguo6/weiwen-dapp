import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { Card, List, Avatar, Icon } from 'antd';
import { fetchAll } from '../api/fetch';
import { like, isLiked } from '../api/service';
import * as Utils from '../util/Utils';

class Posts extends Component {

  constructor(props){
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  state = {
    list: [],
  }

  async componentDidMount(){
    const res = await fetchAll('posttable');
    this.setState({list: res});
  }

  async handleLike(type, id){
    if(await isLiked(type, id)){
      Utils.msgError('已赞过该微文');
    }else{
      await like(type, id, (res) => {
        if(res.transaction_id){
          Utils.msgTx(res.transaction_id);    
        }else if(res.message){
          Utils.msgError(res.message);
        }
      });
      window.location.reload();
    }
  }

  handleComment(id){
    console.log(id);
  }

  render(){
    const IconText = ({ type, text, onClick }) => (
      <span onClick={onClick}>
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
                <IconText type="like-o" text={item.like_num} onClick={() => {this.handleLike(1, item.id)}} />,
                <IconText type="message" text={item.comment_num} onClick={() => {this.handleComment(item.id)}} />,
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
                  <Link to='/'>{item.author}</Link> 发布于&nbsp; 
                  <em>{moment(moment(item.time).valueOf()+8*3600000).format('YYYY-MM-DD HH:mm:ss')}</em>
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