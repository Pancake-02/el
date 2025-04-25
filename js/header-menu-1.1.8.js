var HerfJson = [{'url':'gdjy','name':'高等教育信息',
        'navSecond':[
            {'url':['gdjy/xj/show.action','gdjy/zp','gdjy/txcjm'],'name':'学籍信息/图像校对'},
            {'url':['gdjy/xl/show.action','gdjy/xl'],'name':'学历信息'},
            {'url':['gdjy/xw/show.action','gdjy/xw'],'name':'学位信息'},
            {'url':['gdjy/ky/show.action','gdjy/ky'],'name':'考研信息'}]
    },{'url':'bab','name':'在线验证报告',
        'navSecond':[
            {'url':['bab/index.action'],'name':'首页'},
            {'url':['bab/xj/show.action','bab/xj'],'name':'高等学籍'},
            {'url':['bab/xl/show.action','bab/xl'],'name':'高等学历'},
            {'url':['bab/xw/show.action','bab/xw'],'name':'学位'},
            {'url':['bab/agent/show.action','bab/agent'],'name':'协助申请'}]
    },{'url':'rzbg','name':'学历学位认证与成绩验证',
        'navSecond':[
            {'url':['rzbg/index.action'],'name':'首页'},
            {'url':['rzbg/showbind.action','rzbg/bindreport.action'],'name':'绑定报告'}]
    },{'url':'gjhz、xw、gdxw','name':'出国报告发送',
        'navSecond':[
        {'url':['gjhz/index.action','gdxw'],'name':'首页'},
        {'url':['gjhz/utf/index.action','gjhz/utf','gjhz/stripe'],'name':'传输费用'},
            {'url':['gjhz/foreign/index.action','gjhz/foreign','bab/xj/foreign','bab/xl/foreign','rzbg/foreign/xlrz','xw', 'rzbg/xw/ww'],'name':'英文翻译'}]
    },{'url':'survey、zytj、myd','name':'调查/投票',
    'navSecond':[
        {'url':['survey/index.action'],'name':'首页'},
        {'url':['survey/xsgz/show.action?from=archive-dctp-menu','survey/xsgz/show.action?from=archive-dctp','survey/xsgz/show.action','survey/xsgz'],'name':'跟踪调查'},
        {'url':['survey/jygz/lxdc.action?from=archive-dctp-menu','survey/jygz/lxdc.action','survey/cyfw/index.action','survey/cyfw','survey/jygz','survey/bygz/show.action','survey/bygz','survey/jygz'],'name':'就业跟踪'},
        {'url':['zytj/recommendContinue.action','zytj/userRecommend.action','zytj/recommendAdd!add.action'],'name':'专业推荐'},
        {'url':['myd/specAppraisalWelcome.action'],'name':'专业满意度'},
        {'url':['myd/schAppraisalWelcome.action'],'name':'院校满意度'}]
    }];

$(function(){
    selectMenu();
    supNavHover();
    setHref(); 
});
/**设置菜单选中状态 
 * modify huangh 20170713
 * @return {null}  返回空
 */
function selectMenu() {
    var requestUrl = window.location.href.replace(/[\<\>\"\'\[\]\(\)]/g, ''),newRul='';
    if(requestUrl.indexOf('check')!==-1 || requestUrl.indexOf('auth')!==-1 || requestUrl.indexOf('zybh')!==-1){ //核验身份相关页面,或者授权页面，专业变换查询页面
        $('.sub_nav').hide();
        $('.sub_nav_mian').children('li').removeClass('active');
        return false;
    }
    
    var whIndex = requestUrl.lastIndexOf('?');
    if(whIndex>-1){
        newRul  = requestUrl.substring(0,whIndex);
    }else{
        newRul = requestUrl;
    } 
    var myIndex = newRul.indexOf('/archive/'),
        rulLength = newRul.length;
    if(myIndex>-1){ //学信档案
        newRul = newRul.substring(myIndex+9,rulLength);
    }else{
        var gkIndex = newRul.indexOf('/zyzsk/');
        if(gkIndex>-1){
            newRul = newRul.substring(gkIndex+7,rulLength);
        }
    }
    var index = newRul.indexOf("/");
    if ( index == -1 ) {
        $('.sub_nav').hide();
        $('.homePage-nav a').addClass('active');
        return;
    }
    var liInfo = newRul.substring(0, index);
    if ( null == liInfo || "" == liInfo ) {
        $('.sub_nav').hide();
        $('.homePage-nav a').addClass('active');
        return;
    }
    setCurSelect(liInfo,newRul);
}
/**设置选中状态
 * @param {string} id  一级菜单的id值
 * @param {string} url 当前页面的url截取值
 * @author huangh
 * @date   2016.10.18
 */
function setCurSelect(id , url){
    $('.homePage-nav a').removeClass('active');
    var url = url || '',id = id||'';
    var $firstNav = $('#nav-first');
    $firstNav.find('dt').removeClass('active').find('.sanjiao').hide();
    //获取一级菜单序列号
    var firstIndex = getFirstIndex(id);
    var $first = $firstNav.find('dl:eq('+firstIndex+')');
    $first.addClass('active').find('.sanjiao').show();
    var $sbuUl = $('#nav-second').find('ul');
    $sbuUl.hide();
    var newUrl = '';
    if(url.indexOf('/')==url.lastIndexOf('/')){//只有一个“/”
        newUrl = url;
    }else{
        newUrl = url.substring(0,url.lastIndexOf('/'));
    }
    var secondIndex = getSecondIndex(newUrl,firstIndex)||0;
    var _curHref = window.location.href.replace(/[\<\>\"\'\[\]\(\)]/g, '');
    //学历认证与成绩验证的绑定菜单单独处理下    
    if(firstIndex===2&&_curHref.indexOf('tab')!==-1){
        secondIndex = 2;
    }
    if(_curHref.indexOf('foreign')!==-1 || _curHref.indexOf('/ww')!==-1){ //翻译相关页面放在国际合作的英文翻译页面
        firstIndex =3;
        secondIndex = 2;
        $firstNav.find('dl').removeClass('active').find('.sanjiao').hide();
        $firstNav.find('dl:eq('+firstIndex+')').addClass('active').find('.sanjiao').show();
    }
    $sbuUl.eq(firstIndex).show().find('li:eq('+secondIndex+')').addClass('active');     
    
    
}
/**获取一级菜单序列号
 * @param  {string} id 当前访问地址的中“archive/”后面的第一个单词
 * @return {Number}    返回一级菜单序列号
 * @author huangh
 * @date   2016.10.27
 */
function getFirstIndex(id){
    var length  = HerfJson.length;
    for(var i=0,j=HerfJson.length;i<j;i++){
        if(HerfJson[i].url.indexOf(id)!=-1){
            return i;
        }
    }
    return 0;
}
/**获取二级菜单选中的序列号
 * @param  {string} url 当前页面的url截取值
 * @param  {int}   n    一级菜单选中的序列号
 * @return {int}        返回二级菜单选中的顺序号
 * @author huangh 
 * @date   2016.10.18
 */
function getSecondIndex (url,n){
    var n = n ||0;
    var second = HerfJson[n].navSecond;
    for(var i=0;i<second.length;i++){
        var urlArr = second[i].url;
        for(var j=0;j<urlArr.length;j++){
            if(url.indexOf(urlArr[j])!=-1){
                return i;
            }
        }
        
    }
    return 0;
}

/**设置一级菜单hover菜单数据，添加一级菜单鼠标移上效果
 * @return {null} 返回空
 * @author huangh 
 * @date   2016.10.18
 */
function supNavHover(){
    var $clone = $('#nav-second ul').clone() || '';
    var $supNav = $('#nav-first');
    var $supDetial = $supNav.find('dd') || '';
    if($supDetial!=''){
        //克隆二级菜单数据给hover中的显示菜单
        for(i=0,j=$supDetial.length;i<j;i++){
            //高等教育信息，图像校对和学籍信息分开显示
            if(i==0){
                var $gdjy = $clone.eq(i);
                var $li =  $gdjy.find('li:eq(0)');
                $li.html('图像校对');
                var $newli = $li.clone();
                $newli.html('学籍信息');
                $gdjy.prepend($newli);
            }
            $clone.eq(i).appendTo($supDetial.eq(i));
        }
        //设置hover菜单中ul显示，但是dd是隐藏，所以hover菜单默认不显示
        $supDetial.find('ul').show();
    }
    //一级菜单鼠标以上效果
    $("#nav-first").mouseover(function(){
       $(this).find('dd').show();
       $('.header-nav-bg').show();
    }).mouseout(function(){
       $(this).find('dd').hide();
       $('.header-nav-bg').hide();
    });
    //个人中心鼠标以上效果
    $(".nav-userinfo").mouseover(function(){
        var $btngroup = $(this).find('.btn-group');
        $btngroup.addClass('open')
                .find('.caret').addClass('animated flip')

    }).mouseout(function(){
        var $btngroup = $(this).find('.btn-group');
        $btngroup.removeClass('open')
                .find('.caret').removeClass('animated flip');
    });
}    
/**设置菜单click事件，添加href
 * @return {null} 返回空
 * @author huangh
 * @date   2016.10.18
 */
function setHref(){
    $('.sub_nav_mian li').click(function(){
        var $this = $(this);
        var liIndex = $this.index();
        var $parent = $this.parents('dl');
        if($parent.length <= 0){
            $parent = $this.parent('ul');
        }
        var ulIndex = $parent.index();
        liIndex = liIndex<0?0:liIndex;
        ulIndex = ulIndex<0?0:ulIndex;
        //高等教育信息，图像校对和学籍信息分开显示
        if(ulIndex==0&& $this.parent().parent().is('dd')){
            liIndex -= 1;
            liIndex = liIndex<0 ? 0 :liIndex;
        }
        if(ulIndex<5){
            window.location.href = getHref(ulIndex,liIndex);
        }
    });
    $('#nav-first dt').click(function(){
        var $this = $(this);
        var dlIndex = $this.parent('dl').prevAll('dl').length ||0;
         if(dlIndex < 5){   
            window.location.href = getHref(dlIndex,0);
        }
    })
}
/**获取href链接
 * @param  {int} firstIndex  HerfJson中一级菜单的序列号 
 * @param  {int} secondIndex HerfJson中二级菜单的序列号
 * @return {string}          返回完整的href参数
 */
function getHref(firstIndex,secondIndex){
    var  href = HerfJson[firstIndex].navSecond[secondIndex].url[0];
    href += href.indexOf('?')>-1 ? '&':'?';
    href += "trnd="+new Date().getTime();
    if(typeof(SpathMy) == "undefined"){
        SpathMy = 'https://my.chsi.com.cn/archive/';
    }
    if(typeof(SpathGaoKao) == "undefined"){
        SpathGaoKao = 'https://my.chsi.com.cn/zyzsk/';
    }
    if(href.indexOf('http')==0){
        return href;
    }else{
        if(firstIndex==4&&secondIndex>2){
            return SpathGaoKao+href;//高考项目中的链接
        }else{
            return SpathMy+href;
        } 
    } 
}

