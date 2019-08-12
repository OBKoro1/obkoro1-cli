'use strict';

var _rc = require('./utils/rc');

let config = async (action, key, value) => {
    switch (action) {
        case 'get':
            if (key) {
                let result = await (0, _rc.get)(key);
                console.log(result);
            } else {
                let obj = await (0, _rc.getAll)();
                Object.keys(obj).forEach(key => {
                    console.log(`${key}=${obj[key]}`);
                });
            }
            break;
        case 'set':
            (0, _rc.set)(key, value);
            break;
        case 'remove':
            (0, _rc.remove)(key);
            break;
        default:
            break;
    }
}; /*
    * Author: OBKoro1
    * Github: https://github.com/OBKoro1
    * Date: 2019-08-09 14:08:37
    * LastEditors: OBKoro1
    * LastEditTime: 2019-08-12 14:42:24
    * Description:  管理 .kororc 文件 (当前用户目录下) 增删改查
    */

module.exports = config;