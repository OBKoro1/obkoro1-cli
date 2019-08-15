'use strict';

var _get = require('./utils/get');

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Author: OBKoro1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Github: https://github.com/OBKoro1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Date: 2019-08-09 14:08:37
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * LastEditors: OBKoro1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * LastEditTime: 2019-08-15 17:05:19
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Description: 模板 init 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
// loading 动画
// 向用户提出问题，接收用户的输入并作出相应的处理


/**
 * 下载模板
 * @param {string} templateName 哪个模板项目
 * @param {string} projectName 模板的文件夹名
 */
let init = (() => {
    var _ref = _asyncToGenerator(function* (projectName) {
        //项目不存在
        if (!_fs2.default.existsSync(projectName)) {
            //命令行交互
            // 更多示例：https://blog.csdn.net/qq_26733915/article/details/80461257
            _inquirer2.default.prompt([{
                type: 'checkbox',
                message: '这是message', // title
                name: 'checkboxList', // key
                choices: [new _inquirer2.default.Separator(' = 自定义分隔符 = '), // 可以自定义分隔符
                {
                    name: 'Router', // 选项
                    checked: true // 默认选中
                }, {
                    name: 'Vuex'
                }, {
                    name: 'TypeScript'
                }, new _inquirer2.default.Separator(' = 又是一个分隔符 ='), {
                    name: 'axios'
                }, {
                    name: 'ESLint'
                }, {
                    name: 'CSS预处理器' // 选择css预处理器
                }],
                validate(answer) {
                    if (answer.length < 1) {
                        return '你必须至少选择一个.';
                    }
                    return true;
                }
            }, {
                type: 'list',
                name: 'cssValue',
                message: '你选择哪个Css预处理器？',
                choices: [new _inquirer2.default.Separator('在你选了CSS预处理器才有该选项'), 'SCSS/SASS', 'LESS'],
                // 当选了某个选项后 才显示这个
                when: function (answer) {
                    let checkboxList = answer.checkboxList;
                    return checkboxList.includes('CSS预处理器');
                }
            }, {
                type: 'rawlist',
                name: 'eslintValue', // answer的key
                message: '选择Eslint代码验证规则',
                choices: ['ESLint + Airbnb config', 'ESLint + Standard config', 'ESLint + Prettier']
            }, {
                name: 'description',
                message: '请输入项目描述: '
            }, {
                name: 'author',
                message: '输入作者名: '
            }]).then((() => {
                var _ref2 = _asyncToGenerator(function* (answer) {
                    console.log('你的选项：', answer); // 根据选项对项目进行操作
                    //下载模板 选择模板
                    //通过配置文件，获取模板信息
                    let loading = (0, _ora2.default)('下载模板 ...');
                    loading.start();
                    (0, _get.downloadLocal)(projectName).then(function (res) {
                        // 下载完成 do something
                        const fileName = `${projectName}/answer.txt`;
                        const answerString = JSON.stringify(answer);
                        _fs2.default.writeFileSync(fileName, `演示文件，根据用户选项，使用node想做什么都可以，天空才是你的极限！\n${answerString}`, 'utf-8');
                        // 下载完成
                        loading.succeed();
                    }, function (err) {
                        // console.log('报错：', err)
                        loading.fail();
                    });
                });

                return function (_x2) {
                    return _ref2.apply(this, arguments);
                };
            })());
        } else {
            // 项目已经存在
            console.log(_logSymbols2.default.error, _chalk2.default.red('项目已经存在'));
        }
    });

    return function init(_x) {
        return _ref.apply(this, arguments);
    };
})();

module.exports = init;