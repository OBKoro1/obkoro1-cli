/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-08-09 14:08:37
 * LastEditors: OBKoro1
 * LastEditTime: 2019-08-09 16:28:35
 * Description: 主的流程控制
 */
// 引入文件 执行命令行 对应的函数
let apply = (action, ...args) => {
    //babel-env
    require(`./${action}`)(...args);
};

export default apply;