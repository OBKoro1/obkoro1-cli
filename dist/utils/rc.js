'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = exports.set = exports.getAll = exports.get = undefined;

var _constants = require('./constants');

var _ini = require('ini');

var _util = require('util');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const exits = (0, _util.promisify)(_fs2.default.exists); // 格式转换
/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-08-09 14:08:37
 * LastEditors: OBKoro1
 * LastEditTime: 2019-08-12 13:32:56
 * Description: .kororc 文件的增删改查
 */

const readFile = (0, _util.promisify)(_fs2.default.readFile);
const writeFile = (0, _util.promisify)(_fs2.default.writeFile);

//RC 是配置文件
//DEFAULTS 是默认的配置
const get = exports.get = async key => {
    const exit = await exits(_constants.RC);
    let opts;
    if (exit) {
        opts = await readFile(_constants.RC, 'utf8');
        opts = (0, _ini.decode)(opts);
        return opts[key];
    }
    return '';
};

const getAll = exports.getAll = async () => {
    const exit = await exits(_constants.RC);
    let opts;
    if (exit) {
        opts = await readFile(_constants.RC, 'utf8');
        opts = (0, _ini.decode)(opts);
        return opts;
    }
    return {};
};

const set = exports.set = async (key, value) => {
    const exit = await exits(_constants.RC);
    let opts;
    let newOption = {};
    if (key && value) {
        newOption = {
            [key]: value
        };
    }

    if (exit) {
        opts = await readFile(_constants.RC, 'utf8');
        opts = (0, _ini.decode)(opts);
        if (!key) {
            console.log(_chalk2.default.red(_chalk2.default.bold('Error:')), _chalk2.default.red('key is required'));
            return;
        }
        if (!value) {
            console.log(_chalk2.default.red(_chalk2.default.bold('Error:')), _chalk2.default.red('value is required'));
            return;
        }
        opts = Object.assign(opts, newOption);
    } else {
        opts = Object.assign(_constants.DEFAULTS, newOption);
    }
    // npm install 之后会执行 package的 postinstall的：config set
    // 写文件 没有文件会创建文件
    await writeFile(_constants.RC, (0, _ini.encode)(opts), 'utf8');
};

const remove = exports.remove = async key => {
    const exit = await exits(_constants.RC);
    let opts;
    if (exit) {
        opts = await readFile(_constants.RC, 'utf8');
        opts = (0, _ini.decode)(opts);
        delete opts[key];
        await writeFile(_constants.RC, (0, _ini.encode)(opts), 'utf8');
    }
};