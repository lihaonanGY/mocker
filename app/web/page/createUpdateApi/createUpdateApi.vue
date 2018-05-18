<template>
  <Layout description="mocke server" keywords="mock, mock server, egg, mockjs">
    <div class="head">
      <div class="head-content">
        <div class="head-left">
          <i class="iconfont">&#xe65f;</i>
          <div class="font-info">
            <h2>接口管理</h2>
            <span class="title">在这里你可以对你的接口进行各种操作，让我们配置出我们想要的API吧！</span>
          </div>
        </div>
        <div class="btn-group">
          <el-button icon="el-icon-refresh" size="small" @click="update()">更新</el-button>
          <el-button icon="el-icon-view" size="small">测试</el-button>
          <el-button icon="el-icon-upload2" size="small">保存并返回</el-button>
        </div>
      </div>
    </div>
    <div class="container">
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class="input-title">第{{node.level}}层</span>
          <div class="api-key">
            <span class="input-title">KEY:</span>
            <el-input
              :disabled="node.data.key === '根节点data'"
              placeholder="请输入KEY"
              v-model="node.data.key"
              clearable>
            </el-input>
          </div>
          <div class="api-value">
            <span class="input-title">期望value：</span>
            <el-cascader
              :disabled="node.data.key === '根节点data'"
              :options="node.data.valueOptions"
              v-model="node.data.valueRes"
              @change="handleChange(node.data.valueRes)">
            </el-cascader>
          </div>
          <div class="api-other">
             <el-input
              v-if="node.data.valueRes[1] === 'assignString'"
              placeholder="请输入指定字符串"
              v-model="node.data.valueRes[2]"
              clearable>
            </el-input>
            <el-input
              v-if="node.data.valueRes[1] === 'assignNumber'"
              placeholder="请输入指定数字"
              v-model="node.data.valueRes[2]"
              clearable>
            </el-input>
            <el-input
              v-if="node.data.valueRes[1] === 'ruleNumber'"
              placeholder="min, max, dmin, dmax"
              v-model="node.data.valueRes[2]"
              clearable>
            </el-input>
            <el-input
              v-if="node.data.valueRes[0] === 'Array'"
              placeholder="期待数组的项数"
              v-model="node.data.valueRes[1]"
              clearable>
            </el-input>
          </div>
          <span>
            <el-button type="primary" icon="el-icon-plus" circle v-if="node.data.valueRes[0] === 'Object' || (node.data.valueRes[0] === 'Array' && node.data.children.length == 0)"
              size="mini"@click="() => append(data)"></el-button>
            <el-button v-if="node.level !== 1" type="danger" icon="el-icon-delete" circle @click="() => remove(node, data)" size="mini"></el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </Layout>
</template>
<script type="text/babel">
  const options = [{
    value: 'String',
    label: 'String',
    children: [{
      value: 'assignString',
      label: '指定字符串'
    }, {
      value: 'word',
      label: '单词',
      children: [{
        value: '@cword',
        label: '中文'
      }, {
        value: '@word',
        label: '英文'
      }]
    }, {
      value: 'sentence',
      label: '句子',
      children: [{
        value: '@csentence',
        label: '中文'
      }, {
        value: '@sentence',
        label: '英文'
      }]
    }, {
      value: 'paragraph',
      label: '段落',
      children: [{
        value: '@cparagraph',
        label: '中文'
      }, {
        value: '@paragraph',
        label: '英文'
      }]
    }, {
      value: 'article',
      label: '文章',
      children: [{
        value: '@cparagraph(4)',
        label: '中文'
      }, {
        value: '@paragraph(4)',
        label: '英文'
      }]
    }, {
      value: '/^1[0-9]{10}$/',
      label: '电话'
    }, {
      value: 'randomDateTime',
      label: '随机日期时间',
      children: [{
        value: '@datetime("yyyy-MM-dd HH:mm:ss")',
        label: 'yyyy-MM-dd HH:mm:ss'
      }, {
        value: '@datetime(yyyy-MM-dd)',
        label: 'yyyy-MM-dd'
      }, {
        value: '@datetime(HH:mm:ss)',
        label: 'HH:mm:ss'
      }]
    }, {
      value: 'nowDateTime',
      label: '当前日期时间',
      children: [{
        value: '@now("yyyy-MM-dd HH:mm:ss")',
        label: 'yyyy-MM-dd HH:mm:ss'
      }, {
        value: '@now(yyyy-MM-dd)',
        label: 'yyyy-MM-dd'
      }, {
        value: '@now(HH:mm:ss)',
        label: 'HH:mm:ss'
      }]
    }, {
      value: '@image(400x700, #894FC4, #FFF, png, Mocker)',
      label: '图片地址'
    }, {
      value: 'color',
      label: '颜色',
      children: [{
        value: '@hex',
        label: '十六进制'
      }, {
        value: '@rgb',
        label: 'rgb'
      }, {
        value: '@rgba',
        label: 'rgba'
      }]
    }, {
      value: 'name',
      label: '名字',
      children: [{
        value: '@cname',
        label: '中文'
      }, {
        value: '@name',
        label: '英文'
      }]
    }, {
      value: '@url',
      label: '网址'
    }, {
      value: '@email',
      label: '邮箱'
    }, {
      value: 'shenshix',
      label: '省市县地址',
      children: [{
        value: '@province',
        label: '省'
        }, {
        value: '@city',
        label: '市'
        }, {
        value: '@county',
        label: '区县'
        }, {
        value: '@city(true)',
        label: '省市'
        }, {
        value: '@county(true)',
        label: '省市县'
        }]
    }, {
      value: '@zip',
      label: '邮编'
    },]
  }, {
    value: 'Number',
    label: 'Number',
    children: [{
      value: 'assignNumber',
      label: '指定数字',
    },{
      value: 'ruleNumber',
      label: '按规则随机生成',
    }]
  }, {
    value: 'Boolean',
    label: 'Boolean',
    children: [{
      value: 'assignBoolean',
      label: '指定布尔值',
      children: [{
        value: '@boolean(1, 0, true)',
        label: 'true'
      }, {
        value: '@boolean(1, 0, false)',
        label: 'false'
      }]
    },{
      value: '@boolean()',
      label: '随机TrueFalse',
    }]
  }, {
    value: 'Object',
    label: 'Object'
  }, {
    value: 'Array',
    label: 'Array'
  }]
  import lsData from '../../../util/local-data'
  export default {
    components: {

    },
    data(){
      return {
        projectId: '',
        project: '',
        data: [{
          valueOptions: JSON.parse(JSON.stringify(options)),
          valueRes: ['Object'],
          key: '根节点data',
          children: [{
            key: '',
            valueOptions: JSON.parse(JSON.stringify(options)),
            valueRes: [],
            children: []
          }]
        }]
      }
    },
    computed: {
    },
    methods: {
      loadProject (projectId) {
        this.$fetch({
          method: 'get',
          url: `${location.origin}/api/get_projects?projectId=${projectId}`
        })
        .then(res=> {
          if (res.data.success) {
            this.project = res.data.data
          }
        })
      },
      append(data) {
        const newChild = {
          key: '',
          valueOptions: JSON.parse(JSON.stringify(options)),
          valueRes: [],
          children: []
        }
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
      update () {
        this.toMockJs()
      },
      toMockJs () {
        let obj = {}
        this.childrenToMockJs(obj, this.data[0].children, 'Object')
        console.log('最终结果', obj)
      },
      // 待解决问题
      // 1. 指定数字的时候实际上是一个字符串
      // 2. 加入❓提示完成复杂语法
      // 3.数组的children key是无意义的
      childrenToMockJs (obj, children, parentType) {
        if (parentType === 'Array') {
          const typeOrMock = children[0].valueRes[children[0].valueRes.length - 1]
          if (children[0].valueRes[0] === 'Object') {
            obj.push({})
            this.childrenToMockJs(obj[0], children[0]['children'], 'Object')
          } else if (children[0].valueRes[0] === 'Array') {
            obj.push([])
            this.childrenToMockJs(obj[0], children[0]['children'], 'Array')
          } else if (children[0].valueRes[1] === 'ruleNumber') {
            obj.push(`@float(${children[0].valueRes[2]})`)
          } else {
            if ( typeOrMock === '/^1[0-9]{10}$/') {
              obj.push(eval(typeOrMock))
            } else {
              obj.push(typeOrMock)
            }
          }
        } else {
          children.forEach(item => {
            if (item.valueRes[0] === 'Object') {
              obj[item['key']] = {}
              this.childrenToMockJs(obj[item['key']], item['children'], 'Object')
            } else if (item.valueRes[0] === 'Array') {
              const newKey = `${item['key']}|${item.valueRes[1]}`
              obj[newKey] = []
              if (item['children'].length === 0) return
              this.childrenToMockJs(obj[newKey], item['children'], 'Array')
            } else {
              if ( item.valueRes[item.valueRes.length - 1] === '/^1[0-9]{10}$/') {
                obj[item['key']] = eval(item.valueRes[item.valueRes.length - 1])
              } else if (item.valueRes[1] === 'ruleNumber') {
                obj[item['key']] = `@float(${item.valueRes[2]})`
              } else {
                obj[item['key']] = item.valueRes[item.valueRes.length - 1]
              }
            }
          })
        }
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      handleChange(value) {
        if (value[1] === 'assignString' || value[1] === 'assignNumber' || value[1] === 'ruleNumber' || value[0] === 'Array') {
          value.push('')
        }
      }
    },
    mounted() {
      this.projectId = this.$getQuery('projectId')
      this.loadProject(this.projectId)
    }
  }
</script>
<style lang="scss" scoped>
.head {
  height: 110px;
  width: 100%;
  background: url('../../asset/images/bg.jpg') repeat-x;
  color: #fff;
  .btn-group {
    font-size: 0;
    display: flex;
    align-items: center;
    .el-radio-group {
      padding-top: 5px;
    }
  }
  .head-content {
    display:flex;
    justify-content: space-between;
    width: 1140px;
    height: 100%;
    margin: 0 auto;
    padding: 0 30px;
  }
  .btn-tag {
    margin-left: 0;
  }
  .head-left {
    display: flex;
    .iconfont {
      font-size: 35px;
      line-height: 100px;
    }
    .font-info {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
    }
  }
  h2 {
    font-size: 22px;
    font-weight: 700;
    margin: 0;
    margin-top: 30px;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #9a9ca0;
    font-weight: 400;
  }
}
.container {
  padding-top: 30px;
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    .api-value {
      .el-cascader {
        width: 300px;
      }
    }
    .api-key {
      .el-input {
        width: 150px;
      }
    }
  }
}
</style>
<style>
.el-tree-node__content {
  height: 50px;
  display: flex;
}
.el-tree-node__content:hover {
  background-color: #edf7fe;
}
.el-tree-node:focus>.el-tree-node__content {
  background-color: #fff;
}
</style>
