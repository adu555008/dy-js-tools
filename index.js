import * as Rules from './src/rules'
import * as Fun from './src/function'

export default {
    install: function (Vue) {
        Vue.prototype.$dy = {
            fn: {},
            rules: {}
        };
        Object.keys(Fun).forEach(key => { // 全局注册方法
            Vue.prototype.$dy.fn[key] = Fun[key];
        });
        Object.keys(Rules).forEach(key => { // 全局注册方法
            Vue.prototype.$dy.rules[key] = Rules[key];
        });
    }
};
