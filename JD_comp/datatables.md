## 介绍 ##

Datatables是一款jquery表格插件。它是一个高度灵活的工具，可以将任何HTML表格添加高级的交互功能。

- 分页，即时搜索和排序
- 几乎支持任何数据源：DOM， javascript， Ajax 和 服务器处理
- 支持不同主题 DataTables, jQuery UI, Bootstrap, Foundation
- 丰富多样的option和强大的API

## 安装 ##
在你的项目中使用 DataTables，只需要引入三个文件即可，jQuery库，一个DT的核心js文件和一个DT的css文件， 完成以以下三步即可看到如下效果：

    `
<link rel="stylesheet" type="text/css" href="http://cdn.datatables.net/1.10.15/css/jquery.dataTables.css">

<script type="text/javascript" charset="utf8" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
 
<script type="text/javascript" charset="utf8" src="http://cdn.datatables.net/1.10.15/js/jquery.dataTables.js"></script>
 
<link rel="stylesheet" type="text/css" href="DataTables-1.10.15/media/css/jquery.dataTables.css">
 
<script type="text/javascript" charset="utf8" src="DataTables-1.10.15/media/js/jquery.js"></script>

<script type="text/javascript" charset="utf8" src="DataTables-1.10.15/media/js/jquery.dataTables.js"></script>
 

<table id="table_id_example" class="display">
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Row 1 Data 1</td>
            <td>Row 1 Data 2</td>
        </tr>
        <tr>
            <td>Row 2 Data 1</td>
            <td>Row 2 Data 2</td>
        </tr>
    </tbody>
</table>
	`
	`
$(document).ready( function () {
    $('#table_id_example').DataTable();
} );

	`

## 下一步 ##
定制你需要的 DataTables：
### 默认排序 ###
在datatables初始化时你可以使用order选项指定列怎么排序，order可以接受多个二维数组数据，数组第一个位置为第几列，第二个位置为标示asc(升序)或desc(降序)；
    `
$(document).ready(function() {
              $('#example').dataTable( {
              //跟数组下标一样，第一列从0开始，这里表格初始化时，第四列默认降序
                "order": [[ 3, "desc" ]]
              } );
            } );
	`

### 是否允许Datatables开启本地搜索 ###
此选项用来开启、关闭Datatables的搜索功能
    
	`
	$('#example').dataTable( {
  		"searching": true
	} );

	`