'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _constants = require('./utils/constants');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * koro 命令行配置
 */
// 命令行工具
let actionMap = {
    init: {
        description: '从模板生成一个新项目',
        usages: ['下载的模板名字', '文件夹名字']
    },
    config: {
        alias: 'cfg',
        description: '配置 .kororc',
        usages: ['koro 配置设置  <k> <v>', 'koro 配置获取  <k>', 'koro 配置删除  <k>']

    }
    //other commands

    /**
     * koro命令行 处理/init
     */
}; /*
    * Author: OBKoro1
    * Github: https://github.com/OBKoro1
    * Date: 2019-08-09 15:17:13
    * LastEditors: OBKoro1
    * LastEditTime: 2019-08-12 14:36:30
    * Description: 项目入口
    */

Object.keys(actionMap).forEach(action => {
    let programParams = process.argv.slice(3); // 命令行参数数组
    _commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias) // 命令别名
    .action(() => {
        // 执行命令的回调
        switch (action) {
            case 'config':
                //配置
                (0, _index2.default)(action, ...programParams);
                break;
            case 'init':
                if (programParams[0]) {
                    (0, _index2.default)(action, ...programParams);
                } else {
                    console.log(_logSymbols2.default.error, _chalk2.default.red('项目名是必须的！'));
                }
                break;
            default:
                break;
        }
    });
});

// 帮助信息
function help() {
    console.log('\r\nUsage:');
    Object.keys(actionMap).forEach(action => {
        actionMap[action].usages.forEach(usage => {
            console.log('  - ' + usage);
        });
    });
    console.log('\r');
}

// .on 监听事件
_commander2.default.usage('<command> [options]'); // 帮助信息
_commander2.default.on('-h', help); // 帮助
_commander2.default.on('--help', help); // 帮助
// koro -V   VERSION 为 package.json 中的版本号
_commander2.default.version(_constants.VERSION, '-V --version').parse(process.argv); // 查看版本

// koro 不带参数时 即单独输入koro时
if (!process.argv.slice(2).length) {
    _commander2.default.outputHelp(make_green);
}
function make_green(txt) {
    return _chalk2.default.green(txt);
}