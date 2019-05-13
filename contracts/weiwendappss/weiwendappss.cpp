#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
#include <eosio/system.hpp>
#include <eosio/crypto.hpp>

#define TOKEN_SYMBOL symbol("WEI", 4)

using namespace eosio;

class random_gen {
private:
  static random_gen instance;
  uint64_t seed = 0;

public:
  static random_gen& get_instance(name account) {
    instance.seed = current_time_point().time_since_epoch().count() + account.value;
    return instance;
  }

  uint32_t range(uint32_t to) {
    checksum256 result = sha256((char *)&seed, sizeof(seed));
    auto arr = result.extract_as_byte_array();
    seed = arr[1];
    seed <<= 32;
    seed |= arr[0];
    return (uint32_t)(seed % to);
  }

  uint32_t range(uint32_t from, uint32_t to) {
    if(from == to){
      return from;
    }else if(from < to){
      return range(to - from + 1) + from;
    }
    return range(to);
  }
};

CONTRACT weiwendappss : public eosio::contract {

public:
  using contract::contract;

  /**
   * 每日签到领币
   */
  ACTION reward(name account) {
    require_auth(account);

    user_t users(_self, _self.value);    
    auto itr = users.find(account.value);
    
    if(itr == users.end()){
      itr = users.emplace(account, [&](auto& user){
        user.account = account;
        user.balance = asset(0, TOKEN_SYMBOL);
        user.follow_num = 0;   
        user.fans_num = 0;             
        user.post_num = 0;              
        user.like_num = 0;              
        user.last_reward_time = time_point_sec();
        user.last_like_time = time_point_sec();  
        user.like_times = 0;             
      });
    }
    
    if(!is_today(itr->last_reward_time.sec_since_epoch())){

      auto tokens = asset(get_reward(account)*10000, TOKEN_SYMBOL);
      issue_token(tokens);

      users.modify(itr, account, [&](auto& user){
        user.last_reward_time = time_point_sec(current_time_point()); 
        user.balance += tokens;
      }); 
    }
  }

  /**
   * 发微文
   */
  ACTION post(name author, const std::string& content, uint32_t attachtype, const std::string& attachment) {
    
  }

  /**
   * 评论
   */
  ACTION comment(name author, const std::string& content, uint64_t post_id, uint64_t pid = 0, name reply_to = name()) {

  }

  /**
   * 点赞
   */
  ACTION like(name author, uint32_t type, uint64_t type_id) {

  }

  /**
   * 关注
   */
  ACTION follow(name from, name to) {

  }

  /**
   * 取消关注
   */
  ACTION unfollow(name from, name to) {

  }

  /**
   * 提现
   */
  ACTION withdraw(name account, asset quantity) {
    require_auth(account);

    user_t users(_self, _self.value);    
    auto itr = users.find(account.value);

    check(quantity.amount > 0, "withdraw amount must be positive");
    check(itr->balance >= quantity, "overdrawn balance");

    transfer_token(account, quantity);
    users.modify(itr, account, [&](auto& user){
      user.balance -= quantity;
    });
  }

  /**
   * 充值
   */
  [[eosio::on_notify("weiwentokens::transfer")]] 
  void deposit(name from, name to, asset quantity, std::string memo) {
    if(to != _self) return;

    if(quantity.symbol == TOKEN_SYMBOL){
      user_t users(_self, _self.value);    
      auto itr = users.find(from.value);    

      if(itr != users.end()){
        users.modify(itr, _self, [&](auto& user){
          user.balance += quantity;
        });
      }    
    }
  }  

private:

  bool is_today(uint32_t last_time){
    return current_time_point().sec_since_epoch() / 86400 == last_time / 86400;
  }

  uint32_t get_reward(name account){
    uint32_t seconds = current_time_point().sec_since_epoch() - 1557590400;
    if(seconds <= 30*86400){
      return random_gen().get_instance(account).range(10000, 50000);
    }else if(seconds > 30*86400 && seconds <= 120*86400){
      return random_gen().get_instance(account).range(5000, 20000);
    }else if(seconds > 120*86400 && seconds <= 360*86400){
      return random_gen().get_instance(account).range(2000, 10000);
    }
    return random_gen().get_instance(account).range(1000, 5000);
  }

  void issue_token(asset quantity){
    action(
      permission_level{_self,"active"_n},
      "weiwentokens"_n,
      "issue"_n,
      std::make_tuple(_self, quantity, std::string("issue token"))
    ).send();
  }

  void transfer_token(name to, asset quantity){
    action(
      permission_level{_self,"active"_n},
      "weiwentokens"_n,
      "transfer"_n,
      std::make_tuple(_self, to, quantity, std::string("transfer token"))
    ).send();
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
    uint32_t like_times;            //当天已点赞次数

    uint64_t primary_key() const { return account.value; }
  };

  typedef multi_index<"usertable"_n, usertable> user_t;  

  //微文表
  TABLE posttable {
    uint64_t id;              //自增id
    name author;              //作者
    std::string content;      //内容
    uint32_t attachtype;      //附件类型 0=无 1=url 2=ipfs hash 3=file
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
    uint32_t type;            //点赞类型 1=微文点赞 2=评论点赞    
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