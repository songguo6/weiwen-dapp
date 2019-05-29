import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { Card, List, Avatar, Icon, Modal, Input, Divider } from 'antd';
import { fetchAll } from '../api/fetch';
import { like, isLiked, comment } from '../api/service';
import * as Utils from '../util/Utils';

class Posts extends Component {

  constructor(props){
    super(props);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onTextareaChange = this.onTextareaChange.bind(this);
  }

  state = {
    list: [],
    currentPost: {},
    commentContent: '',
    commentList: [],
    modalVisible: false,
    confirmLoading: false,
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

  async showModal(item){
    this.setState({
      modalVisible: true,
      currentPost: item,
    });
    const res = await fetchAll('commenttable', {
      index_position: 2,
      lower_bound: item.id,
      upper_bound: item.id,
    });
    this.setState({commentList: res});
  }

  handleCancel(){
    this.setState({
      modalVisible: false,
      currentPost: {},
    });
  }

  handleOk(){
    const { logged } = this.props;
    const { commentList, commentContent, currentPost } = this.state;

    if(!commentContent){
      Utils.msgError('回复内容不能为空');
      return;
    }

    this.setState({confirmLoading: true});

    comment(commentContent, currentPost.id, (res) => {
      if(res.transaction_id){
        Utils.msgTx(res.transaction_id);
        let newCommentList = [...commentList];
        newCommentList.splice(0, 0, {
          author: logged.name,
          content: commentContent, 
        });
        this.setState({
          confirmLoading: false,
          commentContent: '',
          commentList: newCommentList,
        });
      }else if(res.message){
        Utils.msgError(res.message);
        this.setState({
          modalVisible: false,
          confirmLoading: false,
        });
      }
    });
  }

  onTextareaChange(e){
    this.setState({commentContent: e.target.value});
  }

  render(){
    const IconText = ({ type, text, onClick }) => (
      <span onClick={onClick}>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    const { list, modalVisible, confirmLoading, currentPost, commentList } = this.state;
    return (
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <Modal
          title={'回复 ' + currentPost.author}
          visible={modalVisible}
          confirmLoading={confirmLoading}
          okText='回复'
          cancelText='取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {currentPost.content}
          <Divider/>
          <List
            size='small'
            rowKey='id'
            itemLayout='vertical'
            dataSource={commentList}
            style={{marginBottom: 25}}
            split={false}
            renderItem={item => (
              <List.Item key={item.id}>
                {item.author + ': ' + item.content}
              </List.Item>
            )}
          />
          <Input.TextArea 
            autosize={{ minRows: 4, maxRows: 10 }}
            onChange={this.onTextareaChange}  
          />
        </Modal>
        <List
          size='large'
          rowKey='id'
          itemLayout='vertical'
          dataSource={list}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <IconText type='pay-circle' text={item.balance} />,
                <IconText type='like-o' text={item.like_num} onClick={() => {this.handleLike(1, item.id)}} />,
                <IconText type='message' text={item.comment_num} onClick={() => {this.showModal(item)}} />,
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