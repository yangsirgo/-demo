# moment.js # 

## 介绍 ##

是一款强大的日期格式化处理插件。

在用版本version: 1.3.6

兼容IE9+

## 常用的用法 ##

会有个全局方法moment（）；


    `
	moment().format('YYYY-MM-DD HH:mm:ss')//当前时间2016-06-28 14:45:02;
	moment().add(-1,'year').format('YYYY-MM-DD HH:mm:ss')//当前时间  前一年
	moment().add(-1,'month').format('YYYY-MM-DD HH:mm:ss') //当前时间  前一月
	moment().add(-1,'week').format('YYYY-MM-DD HH:mm:ss')//当前时间  前一周
	moment().add(-1,'days').format('YYYY-MM-DD HH:mm:ss')//当前时间  前一天
	moment().add(-1,'hour').format('YYYY-MM-DD HH:mm:ss')//当前时间  前一小时

	`

## 文档地址： ##

以上不能满足需求，请查看详细文档：
http://momentjs.cn/docs/#/manipulating/


# daterangepiker.js #

## 介绍 ##

日期选择插件，可能涉及到日期的格式化操作，请引入moment.js。

兼容IE9+
## 基本使用 ##

引入文件：

    `
	<link href="http://10.10.17.5/tsa/skin/blue/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="http://10.10.17.5/tsa/skin/blue/css/daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css">
    <script src="http://10.10.17.5/tsa/js/jquery-1.11.0.min.js"></script>
    <script src="http://10.10.17.5/tsa/js/timepicker/moment.js"></script>
    <script src="http://10.10.17.5/tsa/js/timepicker/daterangepicker.js"></script>
	`


html部分：
    `
	<input type="text" id="timescope" value="" readonly="readonly" style="width:250px;">
	`

JS部分：

    `
	$("#timescope").daterangepicker({},function(start, end, label){});	
	`

## 参数详解 ##
### startDate ###
   
设置默认的开始日期 

格式：MM/DD/YYYY

示例："startDate":"10/14/2017"

比如需求里面设置当前时间的前一天：
    
	`
	startDate: moment().subtract('days', 1).format('YYYY/MM/DD HH:00'),//上一天的时间
	`

### endDate ###

设置默认的结束日期

格式：MM/DD/YYYY

示例："endDate":"10/22/2017"
设置结束日期是：

	`
	moment().format('YYYY/MM/DD HH:00')//今天的时间
	`
### singleDatePicker ###

设置为单个的datepicker，而不是有区间的datepicker

　　可选值：true（单个的datepicker） false（有区间的datepicker）

　　默认值：false

### timePicker ###

可选中时分

　　可选值：true false

　　默认值：false

　　为了获取对应格式的时间需要的代码：

![选中时分的图片](https://i.imgur.com/rfhkWgd.png)

   为了获取对应格式的时间需要的代码：

	 `"locale": {
      format: 'YYYY-MM-DD hh:mm:ss',
      }
	`

### timePicker24Hour ###

设置小时为24小时制

### timePickerSeconds ###

可选中秒

### timePicker12Hour ###

timePicker12Hour:false,可以关闭AM PM选项

### timePickerIncrement ###

timePickerIncrement：5 时间增量是5，如下图：

![时间增量是5](https://i.imgur.com/1cF5fsQ.png)

### format ###

全局设置日期格式

    `format: 'YYYY/MM/DD HH:mm'`

参考项目：NOC。
代码贡献者：李洋。