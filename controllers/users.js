
var { Email } = require('../utils/config.js');
var UserModel = require('../models/users.js');

var login = async(req, res, next) => {

};
var register = async(req, res, next) => {
   var {username, password, email, verify} = req.body;
   if (email !== req.session.email || verify !== req.session.verify) {
      res.send({
         msg: '验证码错误',
         status: -1
      })
   }
   var result = await UserModel.save({
      username,
      password,
      email
   })
   if (result) {
      res.send({
         msg: '注册成功',
         status: 0
      })
   } else {
      res.send({
         msg: '注册失败',
         status: -2
      })
   }
};
var verify = async(req, res, next) => {
	var email = req.query.email;
   var verify = Email.verify;
   // session 单词拼错
   req.session.verify = verify;
   req.session.email = email;
   
   var mailOptions = {
      from: '喵喵网 574465317@qq.com', // sender address
      to: email, // list of receivers
      subject: "喵喵王邮箱验证", // Subject line
      text: "验证码" + verify // 只能使用verify,不然验证码就会不一样
   };
   
   var info = await Email.transporter.sendMail(mailOptions, err => {
      if (!err) {
         res.send({
            msg: '验证码发送成功',
            status: 0
         })
      } else {
         res.send({
            msg: '验证码发送失败',
            status: -1
         })
      }
   });
};
var logout = async(req, res, next) => {

};
var getUser = async(req, res, next) => {

};
var findPassword = async(req, res, next) => {

};

module.exports = {
	login,
	register,
	verify,
	logout,
	findPassword
}