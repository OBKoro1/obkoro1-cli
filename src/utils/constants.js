/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-08-09 14:08:37
 * LastEditors: OBKoro1
 * LastEditTime: 2019-08-12 15:00:48
 * Description: 静态变量
 */

import {version} from '../../package.json';

//当前 package.json 的版本号
export const VERSION = version;

// 用户的根目录
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

// 配置文件目录
// TODO: RC
// export const RC = `${HOME}/.kororc`;
export const RC = `./.kororc`;

// 模板下载地址可配置
export const DEFAULTS = {
    registry: 'OBKoro1', // 用户
    templateName: 'Brush_algorithm' // 用户的项目
}
