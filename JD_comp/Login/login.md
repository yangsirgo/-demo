## 登录接口api说明 ##

1. 请求方式POST
2. 请求地址"/nocportal/login"
3. 返回接口格式参照login.json
	
    `
		{
		  "status": "error",
		  "details": {
		    "code": 1,
		    "msg": "用户名错误"
		  }
		}
	`
	
	- "status" 两种状态："error" "success"
	- "code" 是1密码错误。2是用户名错误
	- "msg" 错误信息
	


版本日志：
V1.0
- 新增功能：在文本框里按【回车】时自动执行登录操作
- 修复bug：
	- 用户文本框为空时，在密码框在里按【回车】，用户文本框应左右晃动
	-  用户名：1个汉字应该占2个字符，目前可以输入20个汉子，相当于40个字符
- IE 下显示有问题：![](https://i.imgur.com/akVzc8v.png)



