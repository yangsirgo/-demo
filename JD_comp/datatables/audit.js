var url = "";
var list = [];
var draw = 1;
var table = null;
$(function() {
    $("#timescope").daterangepicker({
        startDate: moment().subtract('days', 1).format('YYYY/MM/DD HH:00'),
        endDate: moment().format('YYYY/MM/DD HH:00'),
        timePicker: true,
        timePicker24Hour: true,
        timePickerSeconds: false,
        timePicker12Hour:false,
        timePickerIncrement: 5,
        format: 'YYYY/MM/DD HH:mm'
    },function(start, end, label){
        $('#timestart').val(start.format('YYYY/MM/DD HH:mm'));
        $('#timeend').val(end.format('YYYY/MM/DD HH:mm'));
        table.search("").draw();
    });

    initDataTable();

    $("#sel_range").change(function(){
        var value = $(this).val();
        if("userdefined" == value){
            var dayBefore = moment().subtract('days', 1);
            $('#timestart').val(dayBefore.format('YYYY/MM/DD HH:mm'));
            $('#timeend').val(moment().format('YYYY/MM/DD HH:mm'));
            $("#timescope").val(dayBefore.format('YYYY/MM/DD HH:mm')+" - "+moment().format('YYYY/MM/DD HH:mm'));
            $("#timescope").removeClass("invisible");
        }else{
            $("#timescope").addClass("invisible");
        }
        table.search("").draw();
    });

    $("#operator").on("keyup", function(){
        table.search("").draw();
    });

    $("#operate").on("keyup", function(){
        table.search("").draw();
    });

    $("#timescope").on("change", function(){
        table.search("").draw();
    });

    $(".glasses").on("click", function(){
        table.search("").draw();
    });

    //全选处理
    $("#selectAll").on("change", function(){
        if($(this).is(':checked')){
            checkAll("log", 1);
            addData("all", null);
        }else{
            checkAll("log", 0);
            removeData("all", null);
        }
    });

    $("#del_btn").click(function(){
        deleteLogs();
    });

    $("#export_btn").click(function(){
        exportLogs();
    });

    $("#clear_btn").click(function(){
        clearAllLogs();
    });
});

//初始化dataTables
function initDataTable(){
    var csrf = $("input[name='_csrf']").val();
    table = $('#auditlog').DataTable({
        "order":[[ 1, 'desc' ]],
        "searching": true,
        "serverSide": true,
        "aLengthMenu": [[20, 30, 50, 100], ["20条", "30条", "50条", "100条"]],
        "filter":true,
        "scrollY":"auto",
        "bDestroy": true,
        "bRetrieve": true,
        "iDisplayStart": 0,
        "iCookieDuration": 1,
        "language": {
            "sZeroRecords": "没有数据"
        },
        "ajax": {
            "type":"post",
            //http://192.168.8.137/nocportal/auditLogList.do?_csrf=e1ca4a35-1118-42d4-b20c-6b0f792c5160
            "url": "/nocportal/auditLogList.do"+"?_csrf=e1ca4a35-1118-42d4-b20c-6b0f792c5160",
            "beforeSend": function(){
                loadingwindow(ctx, 200, 50, '正在加载...');
            },
            "data": function(){
                draw++;
                var start = 0;
                var length = 20;
                var sortColumn = "";
                var sortType = "";
                var order = null;
                var orderNum = 1;
                var sortType = "desc";
                if(table != null){
                    var page = table.page();
                    length = table.page.len();
                    var start = page*length;
                    order = table.order();
                    orderNum = order[0][0];
                    sortType = order[0][1];
                }
                return {
                    "range": $("#sel_range").val(),
                    "timeStart": $('#timestart').val(),
                    "timeEnd": $('#timeend').val(),
                    "operator": $.trim($("#operator").val()),
                    "operate": $.trim($("#operate").val()),
                    "draw": draw,
                    "orderNum": orderNum,
                    "sortType": sortType,
                    "length": length,
                    "start": start
                }
            },
            "complete": function(){
                closeLodingWindow();
            }
        },
        "columnDefs" : [
            {
                "name": "checkbox",
                "targets": 0,
                "width":"20px",
                "orderable": false,
                "render":function(data,type,full){
                    return "<input type='checkbox' name='log' id='"+data+"'/>";
                },
            },
            {
                "name": "time",
                "targets": 1,
                "width":"180px",
                "orderable": true,
            },
            {
                "name": "operator",
                "targets": 2,
                "width":"150px",
                "orderable": true,
            },
            {
                "name": "ip",
                "targets": 3,
                "width":"150px",
                "orderable": true,
            },
            {
                "name": "module",
                "targets": 4,
                "width":"250px",
                "orderable": true,
            },
            {
                "name": "operate",
                "targets": 5,
                "width":"250px",
                "orderable": true,
            },
            {
                "name": "objective",
                "targets": 6,
                "orderable": true,
            },
        ],
        "fnDrawCallback": function(){
            callBackFunction();
        }
    });
}

//全选
function checkAll(name, flg){
    if(flg){
        $("input[name='"+name+"']").each(function(){
            $(this).prop("checked", true);
        });
    }else{
        $("input[name='"+name+"']").each(function(){
            $(this).prop("checked", false);
        });
    }
}

//判断是否全选中
function isAllCheck(name){
    var flg = true;
    var dom = $("input[name='"+name+"']");
    if(dom.length == 0){
        flg = false;
    }
    $("input[name='"+name+"']").each(function(){
        if(!$(this).is(':checked')){
            flg = false;
        }
    });
    return flg;
}

//回调函数
function callBackFunction(){
    $("#selectAll").prop("checked", false);

    $("input[name='log']").on("change", function(){
        if(!$(this).is(':checked')){
            $("#selectAll").prop("checked", false);
            removeData("single", $(this));
        }else{
            if(isAllCheck("log")){
                $("#selectAll").prop("checked", true);
            }
            addData("single", $(this));
        }
    });
}

//添加数据
function addData(mark, element){
    if(mark == "all"){
        $("input[name='log']:checked").each(function(){
            var id = $(this).attr("id");
            var flg = 1;
            for(var i=0;i<list.length;i++){
                if(id == list[i]){
                    flg = 0;
                    break;
                }
            }
            if(flg){
                list.push(id);
            }
        });
    }else if(mark == "single"){
        var id = $(element).attr("id");
        var flg = 1;
        for(var i=0;i<list.length;i++){
            if(id == list[i]){
                flg = 0;
                break;
            }
        }
        if(flg){
            list.push(id);
        }
    }
}

//移除数据
function removeData(mark, element){
    if(mark == "all"){
        /*$('#auditlog').DataTable().data().each(function(array){
         var id = $(array[0]).attr("id");
         var flg = 0;
         var k = 0;
         for(var i=0;i<list.length;i++){
         if(id == list[i]){
         flg = 1;
         k = i;
         break;
         }
         }
         if(flg){
         list.splice(k, 1);
         }
         });*/
        list = [];
    }else if(mark == "single"){
        var id = $(element).attr("id");
        var flg = 0;
        var k = 0;
        for(var i=0;i<list.length;i++){
            if(id == list[i]){
                flg = 1;
                k = i;
                break;
            }
        }
        if(flg){
            list.splice(k, 1);
        }
    }
}

//删除日志
function deleteLogs(){
    var csrf = $("input[name='_csrf']").val();
    if(list.length > 0){
        openquestionwindow("确认删除", "您确定要删除吗?", "");
        $(".enturebtn").click(function(){
            var str = "";

            for(var i=0;i<list.length;i++){
                if(i == (list.length - 1)){
                    str += list[i];
                }else{
                    str += list[i]+",";
                }
            }

            $.ajax({
                type:"post",
                url: "./audit/deleteLogs.do?_csrf=" + csrf,
                data: {
                    "idList": str
                },
                beforeSend: function(){
                    loadingwindow(ctx, 200, 50, '正在删除...');
                },
                success: function(data) {
                    closeLodingWindow();
                    successtip("删除成功");
                    list = [];
                    table.search("").draw();
                },
                error: function(){
                    closeLodingWindow();
                    errortip("删除失败");
                }
            });
        });
    }else{
        infotip("请至少选择一条日志");
    }
}

//导出日志
function exportLogs(){
    var csrf = $("input[name='_csrf']").val();
    $.ajax({
        type:"post",
        url: "./audit/exportLogs.do?_csrf=" + csrf,
        data: {
            "range": $("#sel_range").val(),
            "timeStart": $('#timestart').val(),
            "timeEnd": $('#timeend').val(),
            "operator": $.trim($("#operator").val()),
            "operate": $.trim($("#operate").val())
        },
        success: function(data) {
            var fileName = encodeURI(data);
            window.location.href = "./audit/doDownloadFile.do?fileName="+fileName;
        },
        error: function(){
            errortip("导出失败");
        }
    });
}

//清空所有
function clearAllLogs(){
    openquestionwindow("确认清空", "您确定要清空所有日志吗?", "");
    $(".enturebtn").click(function(){
        $.ajax({
            type:"get",
            url: "./audit/clearAllLogs.do?",
            beforeSend: function(){
                loadingwindow(ctx, 200, 50, '正在删除...');
            },
            success: function(data) {
                closeLodingWindow();
                successtip("清空日志成功");
                table.search("").draw();
                list = [];
            },
            error: function(){
                closeLodingWindow();
                errortip("清空日志失败");
            }
        });
    });
}