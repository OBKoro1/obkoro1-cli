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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Author: OBKoro1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Github: https://github.com/OBKoro1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Date: 2019-08-09 14:08:37
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * LastEditors: OBKoro1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * LastEditTime: 2019-08-12 13:32:56
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Description: .kororc 文件的增删改查
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

// 格式转换


const exits = (0, _util.promisify)(_fs2.default.exists);
const readFile = (0, _util.promisify)(_fs2.default.readFile);
const writeFile = (0, _util.promisify)(_fs2.default.writeFile);

//RC 是配置文件
//DEFAULTS 是默认的配置
const get = exports.get = (() => {
    var _ref = _asyncToGenerator(function* (key) {
        const exit = yield exits(_constants.RC);
        let opts;
        if (exit) {
            opts = yield readFile(_constants.RC, 'utf8');
            opts = (0, _ini.decode)(opts);
            return opts[key];
        }
        return '';
    });

    return function get(_x) {
        return _ref.apply(this, arguments);
    };
})();

const getAll = exports.getAll = (() => {
    var _ref2 = _asyncToGenerator(function* () {
        const exit = yield exits(_constants.RC);
        let opts;
        if (exit) {
            opts = yield readFile(_constants.RC, 'utf8');
            opts = (0, _ini.decode)(opts);
            return opts;
        }
        return {};
    });

    return function getAll() {
        return _ref2.apply(this, arguments);
    };
})();

const set = exports.set = (() => {
    var _ref3 = _asyncToGenerator(function* (key, value) {
        const exit = yield exits(_constants.RC);
        let opts;
        let newOption = {};
        if (key && value) {
            newOption = {
                [key]: value
            };
        }

        if (exit) {
            opts = yield readFile(_constants.RC, 'utf8');
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
        yield writeFile(_constants.RC, (0, _ini.encode)(opts), 'utf8');
    });

    return function set(_x2, _x3) {
        return _ref3.apply(this, arguments);
    };
})();

const remove = exports.remove = (() => {
    var _ref4 = _asyncToGenerator(function* (key) {
        const exit = yield exits(_constants.RC);
        let opts;
        if (exit) {
            opts = yield readFile(_constants.RC, 'utf8');
            opts = (0, _ini.decode)(opts);
            delete opts[key];
            yield writeFile(_constants.RC, (0, _ini.encode)(opts), 'utf8');
        }
    });

    return function remove(_x4) {
        return _ref4.apply(this, arguments);
    };
})();