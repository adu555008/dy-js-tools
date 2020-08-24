/**
 * 常用js函数库
 * */

import {idCardValidate} from './rules'

export function friendTime(dateTime) {
    /**
     * 身份证校验（严格模式）
     * */
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let month = day * 30;
    let timeNow = new Date().getTime(); //当前的时间戳
    let timePrev = new Date(dateTime).getTime(); //指定时间的时间戳
    let timeNum = timeNow - timePrev;

    let result = dateTime;
    if (timeNum < 0) {
        result = "--";
    } else if (timeNum / month >= 1) {
        result = Math.floor(timeNum / month) + "月前";
    } else if (timeNum / week >= 1) {
        result = Math.floor(timeNum / week) + "周前";
    } else if (timeNum / day >= 1) {
        result = Math.floor(timeNum / day) + "天前";
    } else if (timeNum / hour >= 1) {
        result = Math.floor(timeNum / hour) + "小时前";
    } else if (timeNum / minute >= 1) {
        result = Math.floor(timeNum / minute) + "分钟前";
    } else {
        result = "刚刚";
    }
    return result;
}

export function toDecimal(num, len = 2) {
    /**
     * 精准保留小数
     * */
    if (isNaN(num * 1)) {
        return NaN;
    }
    len = parseInt(len);
    let pow = Math.pow(10, len);
    let f = Math.round(num * pow) / pow;
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0 && len > 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + len) {
        s += '0';
    }
    return s;
}

export function judgeType(type) {
    /**
     * 精准判断数据类型
     * */
    if (arguments.length === 0) {
        return '无效';//无参数传入
    }
    if (type === null) {
        return 'null'
    }
    if (type === undefined && arguments.length > 0) {
        return 'undefined'
    }
    if (type instanceof Function) {
        return 'function'
    }
    if (type instanceof Array) {
        return 'array'
    }
    if (type instanceof Object) {
        return 'object'
    }
    if (type instanceof Number || typeof type == 'number') {
        return 'number'
    }
    if (type instanceof String || typeof type == 'string') {
        return 'string'
    }
    if (type instanceof Boolean || typeof type == 'boolean') {
        return 'boolean'
    }
}

export function moneyToChinese(val) {
    /**
     * 金额转中文大写
     * */
    let num = Math.abs(val); // 取绝对值
    if (isNaN(num)) {
        return NaN;
    }
    let strOutput = "",
        strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    num += "00";
    let intPos = num.indexOf('.');
    if (intPos >= 0) {
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    }
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (let i = 0; i < num.length; i++) {
        strOutput += '零壹贰叁肆伍陆柒捌玖'
            .substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
    }
    return strOutput
        .replace(/零角零分$/, '整')
        .replace(/零[仟佰拾]/g, '零')
        .replace(/零{2,}/g, '零')
        .replace(/零([亿|万])/g, '$1')
        .replace(/零+元/, '元')
        .replace(/亿零{0,3}万/, '亿')
        .replace(/^元/, "零元");
}

export function dateToFormat(date, format = 'YYYY-MM-DD hh:mm:ss') {
    /**
     * 格式化时间
     * */
    if (date) {
        date = new Date(date);
    } else {
        date = new Date();
    }
    let o = {
        "M+": date.getMonth() + 1,
        "D+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "w+": date.getDay(),
    };
    if (/(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

export function getIdcardMsg(idcard) {
    /**
     * 获取身份证信息
     * */
    let idcardMsg = {};
    if (!idCardValidate(idcard)) {
        return {
            msg: '身份证不合法'
        };
    }

    //获取性别
    idcardMsg.sex = parseInt(idcard.substr(16, 1)) % 2;
    idcardMsg.birthday = idcard.substr(6, 4) + "-" + idcard.substr(10, 2) + "-" + idcard.substr(12, 2); // 获取生日

    let birthDate = new Date(idcardMsg.birthday);
    let nowDateTime = new Date();
    let age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() === birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
    }
    //得到年龄
    idcardMsg.age = age;
    return idcardMsg;
}

export function createUuid() {
    /**
     * 生成uuid
     * */
    let uuid;

    /**
     * @return {string}
     */
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    uuid = (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    return uuid;
}

export function getUrlParams(url) {
    /**
     * 获取url参数
     * */
    url = url || location.href;
    let theRequest = {};
    if (url.indexOf("?") !== -1) {
        let str = url.substr(1);
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

export function pwStrength(pwd) {
    /**
     * 密码强度
     * */

    if (pwd.length < 6) {
        return '非常弱';
    }

    let strongRegex = new RegExp("^(?=.{8,20})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"); //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强

    let mediumRegex = new RegExp("^(?=.{6,20})(((?=.*[A-Z])(?=.*\\W))|((?=.*[a-z])(?=.*\\W))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[0-9])(?=.*\\W))).*$", "g"); //密码为六位及以上并且字母、数字、特殊字符三项中有两项，强度是中等

    let enoughRegex = new RegExp("(?=.{6,20}).*", "g"); //密码小于六位的时候
    if (strongRegex.test(pwd)) {
        return '强';
    } else if (mediumRegex.test(pwd)) {
        return '中';
    } else if (enoughRegex.test(pwd)) {
        return '弱';
    } else {
        return '';
    }

}

export function codeHideMiddle(str, startStr = 3, endStr = 4, star = '*') {
    /**
     * 字符隐藏，转*
     * */
    if (!str) {
        return '';
    }
    let middleStr = ('' + str).length - startStr - endStr;
    if (middleStr <= 0) {
        return str;
    }
    let reg = new RegExp('([\\d|\\D]{' + startStr + '})[\\d|\\D]{' + middleStr + '}([\\d|\\D]{' + endStr + '})');
    let x = '';
    for (let i = 0; i < middleStr; i++) {
        x += star
    }
    return str.replace(reg, '$1' + x + '$2');
}


export function fullWindowScreen(){
    let docElm = document.documentElement;
    if(docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    else if(docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    else if(docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
    else if(elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    else if (typeof window.ActiveXObject !== "undefined") {
        let wsSript = new ActiveXObject("WScript.Shell");
        if (wsSript != null) {
            wsSript.SendKeys("{F11}");
        }
    }
}

export function exitWindowScreen(){
    let docElm = document;
    if(docElm.exitFullscreen) {
        docElm.exitFullscreen();
    }
    else if(docElm.mozCancelFullScreen) {
        docElm.mozCancelFullScreen();
    }
    else if(docElm.webkitCancelFullScreen) {
        docElm.webkitCancelFullScreen();
    }
    else if(docElm.msExitFullscreen) {
        docElm.msExitFullscreen();
    }
    else if (typeof window.ActiveXObject !== "undefined") {
        let wsSript = new ActiveXObject("WScript.Shell");
        if (wsSript != null) {
            wsSript.SendKeys("{F11}");
        }
    }
}