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
	
