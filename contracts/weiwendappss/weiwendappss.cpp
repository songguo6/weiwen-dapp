#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>

using namespace eosio;

CONTRACT weiwendappss : public eosio::contract {

public:
  using contract::contract;


  ACTION reward(name account){

  }

  ACTION deposit(name account, asset quantity){

  }

  ACTION withdraw(name account, asset quantity){

  }

  ACTION post(name author, const std::string& content, uint8_t attachtype, const std::string& attachment){
    
  }

  ACTION comment(name author, const std::string& content, uint64_t post_id, uint64_t pid = 0, name reply_to = name()){

  }

  ACTION like(name author, uint8_t type, uint64_t type_id){

  }

  ACTION follow(name from, name to){

  }

  ACTION unfollow(name from, name to){

  }

private:

  void issue_token(name to, asset quantity){
    action(
      permission_level{get_self(),"active"_n},
      "weiwentokens"_n,
      "issue"_n,
      std::make_tuple(get_self(), quantity, std::string("issue token"))
    ).send();
  }

  void add_balance(name account, asset quantity){

  }

  void sub_balance(name account, asset quantity){

  }

  //用户表
  TABLE usertable {
    name account;                   //EOS账户
    asset balance;                  //代币余额
    uint32_t follow_num;            //关注数
    uint32_t fans_num;              //粉丝数
    uint32_t post_num;              //微文数
    uint32_t like_num;              //获赞数
    time_point_sec last_reward_time;//上次领币时间
    time_point_sec last_like_time;  //上次点赞时间
    uint8_t like_times;             //当天已点赞次数

    uint64_t primary_key() const { return account.value; }
  };

  typedef multi_index<"usertable"_n, usertable> user_t;  

  //微文表
  TABLE posttable {
    uint64_t id;              //自增id
    name author;              //作者
    std::string content;      //内容
    uint8_t attachtype;       //附件类型 0=无 1=url 2=ipfs hash 3=file
    std::string attachment;   //附件
    time_point_sec time;      //创建时间
    asset balance;            //获得代币数
    uint32_t like_num;        //获得赞数
    uint32_t comment_num;     //评论数

    uint64_t primary_key() const { return id; }
    uint64_t get_secondary_1() const { return author.value; }
  };

  typedef multi_index<"posttable"_n, posttable, 
    indexed_by<"byauthor"_n, const_mem_fun<posttable, uint64_t, &posttable::get_secondary_1>>
  > post_t;

  //评论表
  TABLE commenttable {
    uint64_t id;              //自增id
    uint64_t post_id;         //微文id
    name author;              //评论者
    time_point_sec time;      //创建时间
    asset balance;            //获得代币数
    uint32_t like_num;        //获得赞数
    uint64_t pid;             //父级评论id
    name reply_to;            //回复 @账户名：xxx 

    uint64_t primary_key() const { return id; }
    uint64_t get_secondary_1() const { return post_id; }
    uint64_t get_secondary_2() const { return author.value; }
  };
    
  typedef multi_index<"commenttable"_n, commenttable, 
    indexed_by<"bypost"_n, const_mem_fun<commenttable, uint64_t, &commenttable::get_secondary_1>>,
    indexed_by<"byauthor"_n, const_mem_fun<commenttable, uint64_t, &commenttable::get_secondary_2>>
  > comment_t;

  //点赞表
  TABLE liketable {
    uint64_t id;              //自增id
    uint8_t type;             //点赞类型 1=微文点赞 2=评论点赞    
    uint64_t type_id;         //微文或评论的id
    name author;              //点赞者

    uint64_t primary_key() const { return id; }
    uint64_t get_secondary_1() const { return type_id; }
    uint64_t get_secondary_2() const { return author.value; }
  };

  typedef multi_index<"liketable"_n, liketable, 
    indexed_by<"bytypeid"_n, const_mem_fun<liketable, uint64_t, &liketable::get_secondary_1>>,
    indexed_by<"byauthor"_n, const_mem_fun<liketable, uint64_t, &liketable::get_secondary_2>>
  > like_t;

  //关注表
  TABLE followtable {
    uint64_t id;              //自增id
    name from;                //关注者
    name to;                  //被关注者

    uint64_t primary_key() const { return id; }
    uint64_t get_secondary_1() const { return from.value; }
    uint64_t get_secondary_2() const { return to.value; }    
  };

  typedef multi_index<"followtable"_n, followtable, 
    indexed_by<"byfrom"_n, const_mem_fun<followtable, uint64_t, &followtable::get_secondary_1>>,
    indexed_by<"byto"_n, const_mem_fun<followtable, uint64_t, &followtable::get_secondary_2>>
  > follow_t;

};