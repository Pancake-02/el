function photoQueryCheck(xjId, type, tab) {
    $.ajax( {
        url : '/archive/gdjy/zp/zzk/checkqueryphoto.action',
        type:'POST',
        data : {
            xjId : xjId,
            type : type
        },
        success : function(dataValue) {
            var jsonResult = eval('(' + dataValue + ')');
            if ( null != jsonResult && 0 == jsonResult.status ) {
                var zzkAvaliable = jsonResult.result.zzkAvaliable;
                var photoInfoExist = jsonResult.result.photoInfoExist;
                if ( zzkAvaliable ) {
                    if ( photoInfoExist ) {
                        $("#pic_tips_" + tab).html( "<span style='text-align:center'>没有照片？</span><a class='green-btn mid-btn' onclick='queryphoto(&quot;"+xjId+"&quot;,&quot;"+type+"&quot;,&quot;"+tab+"&quot;)'>找找看</a>");
                    } else {
                        $("#pic_tips_" + tab).html( "<span>没有照片？请联系就读院校学籍管理部门协助处理！</span>");
                    }
                    
                    if ( null != jsonResult.result.pvLogData ) {
                        var pvValue = jsonResult.result.pvLogData.choosedResult;
                        var pvTips = "";
                        pvTips   +="<div class='jd_result clearfix'>";  
                        if ( pvValue == 0 ) {
                            pvTips   +="<div class='left'><span class='jd_tip'>查找学历照片：</span><span class='jd_text'>已找到学历照片</span></div>";  
                            pvTips   +="<div class='right'><a href='javascript:;' onclick='querychoosedphoto(&quot;"+xjId+"&quot;)' class='big-btn photo_right' style='width:184px'>查看您选择的学历照片</a></div>"; 
                        }else {
                            pvTips   +="<div class='left'><span class='jd_tip'>查找学历照片：</span><span class='jd_text'>未找到学历照片</span></div>";  
                            pvTips   +="<div class='right'><a href='javascript:;'  onclick='querychoosedphoto(&quot;"+xjId+"&quot;,2)' class='big-btn photo_right'>查看反馈</a></div>"; 
                        }
                        pvTips +="</div>";  
                        
                        $("#pic_query_result_"+tab).html(pvTips);
                       // setRight();
                    }
                }
            }
        }
    });
}

function queryphoto(xjid,type,tb){
    var id = xjid;
    $.post(
        '/archive/gdjy/zp/zzk/query.action',
        {'xjId':id,'tb':tb,type:type},
        function (html) {
            $("#myModal .modal-title").html("查找学历照片"); 
            $("#myModal .modal-body").html(html);
            $('#myModal').modal('show');
            
        }
    );
    return false;
}

function querychoosedphoto(xjid,type){
    var tit ="",id = xjid;
    $.post(
        '/archive/gdjy/zp/zzk/querychoosedphoto.action',
        {'xjId':id},
        function (html) {
            if(type==1){
                tit ="查找学历照片";
            }else{
                tit ="学历照片查找结果";
            }   
            $("#myModal .modal-title").html(tit);
            $("#myModal .modal-body").html(html);
            $('#myModal').modal('show');
        }
    );
}