# dy-js-tools

##### 安装
```
npm install --save dy-js-tools
```

##### 兼容性
```
npm install --save-dev 'babel-polyfill'
```

###### 在main.js里面引入
```
import 'babel-polyfill';
```

###### 在vue.config.js里面加入
```
...
module.exports = {
    ...,
    transpileDependencies: ['dy-js-tools'], // 默认babel-loader忽略node_modules，这里可增加例外的依赖包名
    ...
｝
```



##### 方式一：全局引用
###### 在main.js里面引入
```
// 引入
import dy from 'dy-js-tools';
// 注册
Vue.prototype.$dy = dy;
// 页面调用
this.$dy.log('hello world');
```

##### 方式二：局部引用
###### 在当前的vue文件里面引入
```
// 引入
import dy from 'dy-js-tools';
// 页面调用
dy.log('hello world');
```

#### 常用方法列表
| 函数名 | 参数说明 | 返回值说明 | 介绍 |
| ---- | ---- | ---- | ---- |
| friendTime(dateTime=now Date()) | 有效时间 | 返回友好时间提示（刚刚，1分钟前，1小时前，3个月前等） | 友好时间转换 |
| removeArrVal(arr, val) | 数组，要删除的值 | 无返回值 | 删除数组指定值 |
| removeStrVal(str, val, flag = 'g') | 原始字符串，正则 | 无返回值 | 删除字符串指定内容，可以写正则 |
| toDecimal(num,len=2) | 数字或能有效转换为数字的字符串,保留小数位数 | 保留为小数的字符串 | 精准保留小数点后len位，处理计算带来的误差，如0.1+0.2=0.30000000000000004 |
| debounce(fn, wait = 700) | 要执行的函数，间隔时间 | 无返回值 | 防抖,用户在一定时间内持续操作，用户操作完成后执行，如窗口改变，滚动条滚动 |
| throttle(fn, delay = 700) | 要执行的函数，间隔时间 | 无返回值 | 节流,用户在一定时间内持续操作，每间隔一定时间执行一次，如ajax请求 |
| judgeType(type) | any | 返回:无效,null,undefined,function,array,object,number,string,boolean | 精准判断数据类型 |
| dateToFormat(date=now Date(),format='YYYY-MM-DD hh:mm:ss') | 有效时间，有效时间格式： YYYY-MM-DD hh:mm:ss | 返回对应时间格式 | 格式化时间 |
| getIdcardMsg(idcard) | 有效有效身份证 | 返回 {age:'',birthday:'',sex:''}，object | 获取身份证信息（年龄，生日，性别） |
| createUuid() |  | 返回 uuid | 生成uuid |
| getUrlParams(url=location.href) | url地址 | 返回url参数，object | 获取url参数 |
| pwStrength(pwd) | 6-20位密码字符串 | 返回密码强度，（强，中，弱，非常弱） | 获取密码强度 |
| arrFindObj(arrObj, key, val) | obj要找的对象，对象在数组里的索引 | 返回 {obj,index} | 在数组对象里面获取某个属性值等于val的对象 |
| moneyToChinese(str) | 要转的金额 | 返回 大写的中文 | 金额转大写 |
| blobExport(flow, fileName, fileType = 'xls') | 文件流，文件名称，文件类型 | 返回 {obj,index} | 下载文件流 |
| codeHideMiddle(str,startStr=3, endStr=4, star='*') | any | 返回隐藏中间后的当前字符串：135*****008 | 字符隐藏，转* |
| toWinMsg({title, option, clickFn, closeFn, errorFn, deniedFn, defaultFn}) | {通知标题，配置，...回调函数} | 返回是否发送成功{n: null,code: -1,msg: ''} | 向windows发送通知 |

#### 验证方法列表
###### 参数统一为：val=要验证的内容，正则flag: g|i|gi，默认为: g
###### 如果不传参数，则为获取当前函数的正则

| 函数名 | 介绍 |
| ---- | ---- |
| idCardStrictValidate | 身份证校验（严格模式）,该函数返回: {res:false,msg:'该身份证1-2位不合法'}，object |
| idCardValidate | 身份证校验（正则模式） |
| emailValidate | 邮箱校验 |
| ipv4Validate | ipv4校验 |
| ipv6Validate | ipv6校验 |
| color16Validate | 16进制颜色校验 |
| phoneValidate | 手机号校验 |
| fixedPhoneValidate | 座机号校验 |
| unifiedSocialCreditCodeValidate | 统一社会信用代码校验 |
| cnValidate | 中文校验 |
| moneyValidate | 金额校验（最多两位小数） |
| carNumValidate | 车牌号校验 |
| newCarNumValidate | 新能源车牌号校验 |
| carNewCarNumValidate | 车牌号(新能源+非新能源)校验 |
| bankCodeValidate | 银行卡号（16或19位） |
| qqValidate | qq号校验 |
| vxValidate | 微信号校验 |
````````
