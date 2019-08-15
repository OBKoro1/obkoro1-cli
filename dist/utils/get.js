'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.downloadLocal = undefined;

var _rc = require('./rc');

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Author: OBKoro1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Github: https://github.com/OBKoro1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Date: 2019-08-09 14:08:37
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * LastEditors: OBKoro1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * LastEditTime: 2019-08-15 16:32:54
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Description: 从远程下载模板
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
// download-git-repo 支持从 Github、Gitlab 下载远程仓库到本地


const downloadLocal = exports.downloadLocal = (() => {
    var _ref = _asyncToGenerator(function* (projectName) {
        // download-git-repo 下载仓库
        // GitHub - github: owner / name or simply owner / name
        // GitLab - gitlab: owner / name
        // Bitbucket - bitbucket: owner / name
        let config = yield (0, _rc.getAll)();
        let repoSite = `${config.registry}/${config.templateName}`;
        console.log('仓库地址、项目名', repoSite, projectName);
        return new Promise(function (resolve, reject) {
            // downloadGit 下载命令行
            (0, _downloadGitRepo2.default)(repoSite, projectName, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    });

    return function downloadLocal(_x) {
        return _ref.apply(this, arguments);
    };
})();