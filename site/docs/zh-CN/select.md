## Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

### 基础用法

适用广泛的基础单选

:::demo `v-model`的值为当前被选中的`el-option`的 value 属性值
```js
const data = {
  options: [{
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶'
  }, {
    value: '选项3',
    label: '蚵仔煎'
  }, {
    value: '选项4',
    label: '龙须面'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }],
  value: ''
};

<Select value={data.value}>
  {
    data.options.map(el => {
      return <Select.Option key={el.value} label={el.label} value={el.value} />
    })
  }
</Select>
```
:::

### 有禁用选项

:::demo 在`el-option`中，设定`disabled`值为 true，即可禁用该选项
```js
const data = {
  options: [{
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶',
    disabled: true
  }, {
    value: '选项3',
    label: '蚵仔煎'
  }, {
    value: '选项4',
    label: '龙须面'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }],
  value: ''
};

<Select value={data.value} placeholder="请选择">
  {
    data.options.map(el => {
      return <Select.Option key={el.value} label={el.label} value={el.value} disabled={el.disabled} />
    })
  }
</Select>
```
:::

### 禁用状态

选择器不可用状态

:::demo 为`el-select`设置`disabled`属性，则整个选择器不可用
```js
const data = {
  options: [{
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶'
  }, {
    value: '选项3',
    label: '蚵仔煎'
  }, {
    value: '选项4',
    label: '龙须面'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }],
  value: ''
};

<Select value={data.value} placeholder="请选择" disabled={true}>
  {
    data.options.map(el => {
      return <Select.Option key={el.value} label={el.label} value={el.value} />
    })
  }
</Select>
```
:::

### 可清空单选

包含清空按钮，可将选择器清空为初始状态

:::demo 为`el-select`设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。
```js
const data = {
  options: [{
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶'
  }, {
    value: '选项3',
    label: '蚵仔煎'
  }, {
    value: '选项4',
    label: '龙须面'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }],
  value: ''
};

<Select value={data.value} placeholder="请选择" clearable={true}>
  {
    data.options.map(el => {
      return <Select.Option key={el.value} label={el.label} value={el.value} />
    })
  }
</Select>
```
:::

### 基础多选

适用性较广的基础多选，用 Tag 展示已选项

:::demo 为`el-select`设置`multiple`属性即可启用多选，此时`v-model`的值为当前选中值所组成的数组
```js
const data = {
  options: [{
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶'
  }, {
    value: '选项3',
    label: '蚵仔煎'
  }, {
    value: '选项4',
    label: '龙须面'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }],
  value: []
};

<Select value={data.value} placeholder="请选择" multiple={true}>
  {
    data.options.map(el => {
      return <Select.Option key={el.value} label={el.label} value={el.value} />
    })
  }
</Select>
```
:::

### 自定义模板

可以自定义备选项

:::demo 将自定义的 HTML 模板插入`el-option`的 slot 中即可。
```js
const data = {
  cities: [{
    value: 'Beijing',
    label: '北京'
  }, {
    value: 'Shanghai',
    label: '上海'
  }, {
    value: 'Nanjing',
    label: '南京'
  }, {
    value: 'Chengdu',
    label: '成都'
  }, {
    value: 'Shenzhen',
    label: '深圳'
  }, {
    value: 'Guangzhou',
    label: '广州'
  }],
  value: []
};

<Select value={data.value} placeholder="请选择" multiple={true}>
  {
    data.cities.map(el => {
      return (
        <Select.Option key={el.value} label={el.label} value={el.value}>
          <span style={{float: 'left'}}>{el.label}</span>
          <span style={{float: 'right', color: '#8492a6', fontSize: 13}}>{el.value}</span>
        </Select.Option>
      )
    })
  }
</Select>
```
:::

### 分组

备选项进行分组展示

:::demo 使用`el-option-group`对备选项进行分组，它的`label`属性为分组名
```js
const data = {
  options: [{
    label: '热门城市',
    options: [{
      value: 'Shanghai',
      label: '上海'
    }, {
      value: 'Beijing',
      label: '北京'
    }]
  }, {
    label: '城市名',
    options: [{
      value: 'Chengdu',
      label: '成都'
    }, {
      value: 'Shenzhen',
      label: '深圳'
    }, {
      value: 'Guangzhou',
      label: '广州'
    }, {
      value: 'Dalian',
      label: '大连'
    }]
  }],
  value: ''
};

<Select value={data.value} placeholder="请选择">
  {
    data.options.map(group => {
      return (
        <Select.OptionGroup key={group.label} label={group.label}>
          {
            group.options.map(el => {
              return (
                <Select.Option key={el.value} label={el.label} value={el.value}>
                  <span style={{float: 'left'}}>{el.label}</span>
                  <span style={{float: 'right', color: '#8492a6', fontSize: 13}}>{el.value}</span>
                </Select.Option>
              )
            })
          }
        </Select.OptionGroup>
      )
    })
  }
</Select>
```
:::

### 可搜索

可以利用搜索功能快速查找选项

:::demo 为`el-select`添加`filterable`属性即可启用搜索功能。默认情况下，Select 会找出所有`label`属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个`filter-method`来实现。`filter-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。
```js
const data = {
  options: [{
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶'
  }, {
    value: '选项3',
    label: '蚵仔煎'
  }, {
    value: '选项4',
    label: '龙须面'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }],
  value: []
};

<Select value={data.value} placeholder="请选择" filterable={true}>
  {
    data.options.map(el => {
      return <Select.Option key={el.value} label={el.label} value={el.value} />
    })
  }
</Select>
```
:::

### 远程搜索

从服务器搜索数据，输入关键字进行查找

:::demo 为了启用远程搜索，需要将`filterable`和`remote`设置为`true`，同时传入一个`remote-method`。`remote-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。需要注意的是，如果`el-option`是通过`v-for`指令渲染出来的，此时需要为`el-option`添加`key`属性，且其值需具有唯一性，比如此例中的`item.value`。
```html
<Select value={this.state.value} placeholder="请选择" multiple={true} filterable={true} remote={true} remoteMethod={this.onSearch.bind(this)} loading={this.state.loading}>
  {
    this.state.options.map(el => {
      return <Select.Option key={el.value} label={el.label} value={el.value} />
    })
  }
</Select>
```
:::

### Select Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| clearable | 单选时是否可以清空选项 | boolean | — | false |
| name | select input 的 name 属性 | string | — | — |
| placeholder | 占位符 | string | — | 请选择 |
| filterable | 是否可搜索 | boolean | — | false |
| filter-method | 自定义过滤方法 | function | — | — |
| remote | 是否为远程搜索 | boolean | — | false |
| remote-method | 远程搜索方法 | function | — | — |
| loading | 是否正在从远程获取数据 | boolean | — | false |

### Select Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 选中值发生变化时触发 | 目前的选中值 |

### Option Group Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 分组的组名 | string | — | — |
| disabled | 是否将该分组下所有选项置为禁用 | boolean | — | false |

### Option Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 选项的值 | string/number/object | — | — |
| label | 选项的标签，若不设置则默认与 `value` 相同 | string/number | — | — |
| disabled | 是否禁用该选项 | boolean | — | false |
