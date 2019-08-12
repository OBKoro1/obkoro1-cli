# 一个类似vue-cli的脚手架
> 通过命令行交互, 处理下载的模板

### 安装依赖

`npm install`

### 启动

`npm run watch`

### 注意事项： 

1. `.eosrc` 文件需要自己创建,并且使用以下API配置。

```js
// RC 配置下载模板的地方，给 github 的 api 使用
// https://api.github.com/users/YvetteLau/repos
```

2. 下载模板设置, 需要使用`eos config set registry YvetteLau`和下面一个来填充配置。用于下载模板

```js
export const DEFAULTS = {
    registry: 'YvetteLau',
    type: 'users'
}
// https://api.github.com/${type}/${registry}/repos
```

3. mac 要使用`sudo npm link`才能链接全局环境。

4. RC地址需要修改。

5. 更改package的bin属性即可更改命令名称


### 执行 `npm link`

此时就可以使用 `eos` 命令了。

- `eos init vue-template myVue`
- `eos config get`
- `eos config set type orgs`
- `eos config set registry vuejs-templates`

- `eos config set type users`
- `eos config set registry YvetteLau`

### 发布

开发完成后，即可发布至 npm.
