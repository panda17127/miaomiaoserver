var mongoose = require('mongoose');
const nodemailer = require("nodemailer");

var Mongoose = {
	url: 'mongodb://localhost:27017/miaomiao',
	connect() {
		mongoose.connect(this.url, { useNewUrlParser: true }, (err) => {
			if (err) {
				console.log('数据库连接失败');
			}
			console.log('数据库连接成功');
		})
	}
};
var Email = {
   config : {
      host: "smtp.qq.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
         user: "574465317@qq.com", // generated ethereal user
         pass: "gphihhoueznubcgd" // generated ethereal password
      }
   },
   get transporter() {
      return nodemailer.createTransport(this.config);
   },
   get verify() {
      return Math.random().toString().substring(2, 6);
   }
}

module.exports = {
	Mongoose,
   Email
}