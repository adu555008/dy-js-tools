/**
 * 正则校验
 * 不传参数则为获取正则规则
 * */
export function idCardStrictValidate(val, flag = 'g') {
    /**
     * 身份证校验（严格模式）
     * */

    let idCardJudgeRule = new Map([
        [0, '1'],
        [1, '0'],
        [2, 'X'],
        [3, '9'],
        [4, '8'],
        [5, '7'],
        [6, '6'],
        [7, '5'],
        [8, '4'],
        [9, '3'],
        [10, '2']
    ]);

    // 校验码计算
    function idCardJudgeRules(idCardLength17) {
        let idCardCoefficient = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        let idCardProduct = [];
        for (let i = 0; i < idCardCoefficient.length; i++) {
            idCardProduct.push(parseInt(idCardLength17.substr(i, 1)) * idCardCoefficient[i])
        }
        let idCardSum = 0;
        for (let i = 0; i < idCardProduct.length; i++) {
            idCardSum += idCardProduct[i]
        }
        let idCardRemainder = idCardSum % 11;
        return idCardJudgeRule.get(idCardRemainder)
    }

    if (val.length === 15) {
        let idCardLength17 = val.substring(0, 6) + '19' + val.substring(6);
        val = idCardLength17 + idCardJudgeRules(idCardLength17)
    }
    if (val.length === 18) {
        let provinceListMap = new Map([
            ['11', {code: '11', name: '北京'}], ['12', {code: '12', name: '天津'}],
            ['13', {code: '13', name: '河北'}], ['14', {code: '14', name: '山西'}],
            ['15', {code: '15', name: '内蒙古'}], ['21', {code: '21', name: '辽宁'}],
            ['22', {code: '22', name: '吉林'}], ['23', {code: '23', name: '黑龙江'}],
            ['31', {code: '31', name: '上海'}], ['32', {code: '32', name: '江苏'}],
            ['33', {code: '33', name: '浙江'}], ['34', {code: '34', name: '安徽'}],
            ['35', {code: '35', name: '福建'}], ['36', {code: '36', name: '江西'}],
            ['37', {code: '37', name: '山东'}], ['41', {code: '41', name: '河南'}],
            ['42', {code: '42', name: '湖北'}], ['43', {code: '43', name: '湖南'}],
            ['44', {code: '44', name: '广东'}], ['45', {code: '45', name: '广西'}],
            ['46', {code: '46', name: '海南'}], ['50', {code: '50', name: '重庆'}],
            ['51', {code: '51', name: '四川'}], ['52', {code: '52', name: '贵州'}],
            ['53', {code: '53', name: '云南'}], ['54', {code: '54', name: '西藏'}],
            ['61', {code: '61', name: '陕西'}], ['62', {code: '62', name: '甘肃'}],
            ['63', {code: '63', name: '青海'}], ['64', {code: '64', name: '宁夏'}],
            ['65', {code: '65', name: '新疆'}], ['71', {code: '71', name: '台湾'}],
            ['81', {code: '81', name: '香港'}], ['82', {code: '82', name: '澳门'}],
            ['91', {code: '91', name: '国外'}]
        ]);
        let idCardProvince = val.substr(0, 2);
        if (!(idCardProvince === (provinceListMap.get(idCardProvince) && provinceListMap.get(idCardProvince).code))) {
            return {
                res: false,
                msg: '该身份证1-2位不合法'
            };
        }
        let idCardCity = parseInt(val.substr(2, 2));
        if (!((idCardCity >= 1 && idCardCity <= 20) || (idCardCity >= 21 && idCardCity <= 50) || (idCardCity >= 51 && idCardCity <= 70) || idCardCity === 90)) {
            return {
                res: false,
                msg: '该身份证3-4位不合法'
            };
        }
        let idCardCounty = parseInt(val.substr(4, 2));
        if (!((idCardCounty >= 1 && idCardCounty <= 20) || (idCardCounty >= 21 && idCardCounty <= 80) || (idCardCounty >= 81 && idCardCounty <= 99))) {
            return {
                res: false,
                msg: '该身份证5-6位不合法'
            };
        }
        let nowYear = new Date().getFullYear();
        let idCardYear = parseInt(val.substr(6, 4));
        if (!(idCardYear <= nowYear && idCardYear >= nowYear - 160)) {
            return {
                res: false,
                msg: '该身份证7-10位不合法'
            };
        }
        let idCardMonth = val.substr(10, 2);
        let monthList = [
            ['01', {month: '01', startDay: 1, endDay: 31}],
            ['02', {month: '02', startDay: 1, endDay: 28}],
            ['03', {month: '03', startDay: 1, endDay: 31}],
            ['04', {month: '04', startDay: 1, endDay: 30}],
            ['05', {month: '05', startDay: 1, endDay: 31}],
            ['06', {month: '06', startDay: 1, endDay: 30}],
            ['07', {month: '07', startDay: 1, endDay: 31}],
            ['08', {month: '08', startDay: 1, endDay: 31}],
            ['09', {month: '09', startDay: 1, endDay: 30}],
            ['10', {month: '10', startDay: 1, endDay: 31}],
            ['11', {month: '11', startDay: 1, endDay: 30}],
            ['12', {month: '12', startDay: 1, endDay: 31}]
        ];
        if (idCardYear % 4 === 0 && idCardYear % 100 !== 0 || idCardYear % 400 === 0) {
            monthList[1][1].endDay = 29
        }
        let monthListMap = new Map(monthList);
        if (!(idCardMonth === (monthListMap.get(idCardMonth) && monthListMap.get(idCardMonth).month))) {
            return {
                res: false,
                msg: '该身份证11-12位不合法'
            };
        }
        let idCardDay = parseInt(val.substr(12, 2));
        if (!(idCardDay >= monthListMap.get(idCardMonth).startDay && idCardDay <= monthListMap.get(idCardMonth).endDay)) {
            return {
                res: false,
                msg: '该身份证13-14位不合法'
            };
        }
        let idCardYMD = idCardYear + '-' + idCardMonth + '-' + (idCardDay < 10 ? '0' + idCardDay : idCardDay);
        let nowMonth = new Date().getMonth() + 1;
        let nowDay = new Date().getDate();
        let nowYMD = nowYear + '-' + (nowMonth < 10 ? '0' + nowMonth : nowMonth) + '-' + (nowDay < 10 ? '0' + nowDay : nowDay);
        if (!(new Date(idCardYMD).getTime() <= new Date(nowYMD).getTime())) {
            return {
                res: false,
                msg: '该身份证7-14位不合法'
            };
        }
        let idCardLength17 = val.substr(0, 17);
        let idCardLastNumber = val.substr(17, 1);
        if (!(idCardLastNumber.toLowerCase() === idCardJudgeRules(idCardLength17).toLowerCase())) {
            return {
                res: false,
                msg: '该身份证不合法'
            };
        }else{
            return {
                res: true,
                msg: '该身份证合法'
            };
        }
    }
    return {
        res: false,
        msg: '该身份证不合法'
    };
}

export function idCardValidate(val, flag = 'g') {
    /**
     * 身份证校验
     * */
    let reg = new RegExp('^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function emailValidate(val, flag = 'g') {
    /**
     * 邮箱校验
     * */
    let reg = new RegExp('^\w+([-+.]\w+)@\w+([-.]\w+) .\w+([-.]\w+)*$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function ipv4Validate(val, flag = 'g') {
    /**
     * ipv4校验
     * */
    let reg = new RegExp('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function ipv6Validate(val, flag = 'g') {
    /**
     * ipv6校验
     * */
    let reg = new RegExp('(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]+|::(ffff(:0{1,4})?:)?((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9]))', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function color16Validate(val, flag = 'g') {
    /**
     * 16进制颜色校验
     * */
    let reg = new RegExp('^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function phoneValidate(val, flag = 'g') {
    /**
     * 手机号校验
     * */
    let reg = new RegExp('^1((3[\d])|(4[5679])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[189]))\d{8}$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function fixedPhoneValidate(val, flag = 'g') {
    /**
     * 座机号校验
     * */
    let reg = new RegExp('^(0\d{2,3}-)?\d{7,8}$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function unifiedSocialCreditCodeValidate(val, flag = 'g') {
    /**
     * 统一社会信用代码校验
     * */
    let reg = new RegExp('^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function cnValidate(val, flag = 'g') {
    /**
     * 中文校验
     * */
    let reg = new RegExp('^[\u4e00-\u9fa5]*$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function moneyValidate(val, flag = 'g') {
    /**
     * 金额校验（保留两位小数）
     * */
    let reg = new RegExp('^([1-9][0-9]{0,9})|([0]\.\d{1,2}|[1-9][0-9]{0,9}\.\d{1,2})$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function carNumValidate(val, flag = 'g') {
    /**
     * 非新能源车牌号校验
     * */
    let reg = new RegExp('^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function newCarNumValidate(val, flag = 'g') {
    /**
     * 新能源车牌号校验
     * */
    let reg = new RegExp('^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function carNewCarNumValidate(val, flag = 'g') {
    /**
     * 车牌号(新能源+非新能源)校验
     * */
    let reg = new RegExp('^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-HJ-NP-Z](([0-9]{5}[DF])|(DF[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳])$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function bankCodeValidate(val, flag = 'g') {
    /**
     * 银行卡号（16或19位）
     * */
    let reg = new RegExp('^([1-9])(\d{15}|\d{18})$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function qqValidate(val, flag = 'g') {
    /**
     * qq号校验
     * */
    let reg = new RegExp('^\d{5,10}$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}

export function vxValidate(val, flag = 'g') {
    /**
     * 微信号校验
     * */
    let reg = new RegExp('^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$', flag);
    if (val === undefined) {
        return reg;
    }
    return reg.test(val);
}