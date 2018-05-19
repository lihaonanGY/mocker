<template>
  <Layout description="mocke server" keywords="mock, mock server, egg, mockjs">
    <div class="head">
      <div class="head-content">
        <div class="head-left">
          <i class="iconfont">&#xe740;</i>
          <div class="font-info">
            <h2>接口列表 —— {{project.name}}</h2>
            <span class="title">{{project.description}}</span>
          </div>
        </div>
        <div class="btn-group">
          <el-button icon="el-icon-edit" size="small" @click="jumpCreateUpdateApi">创建接口</el-button>
          <el-radio-group v-model="type" size="small">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="GET"></el-radio-button>
            <el-radio-button label="POST"></el-radio-button>
            <el-radio-button label="PUT"></el-radio-button>
            <el-radio-button label="DELETE"></el-radio-button>
            <el-radio-button label="PATCH"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="container">
      <el-tag>BaseUrl:</el-tag>
      <el-tag type="warning">{{baseurl}}</el-tag>
      <el-table
      border
      :data="apiList"
      style="width: 100%; margin-top:30px;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="Method:">
              <span>{{ props.row.method }}</span>
            </el-form-item>
            <el-form-item label="url:">
              <span>{{ props.row.url }}</span>
            </el-form-item>
            <el-form-item label="描述:">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="创建时间:">
              <span>{{ props.row.create_time }}</span>
            </el-form-item>
            <el-form-item label="项目ID:">
              <span>{{ props.row.project }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        width="110"
        label="Method"
        prop="method"
        align	="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.method === 'GET'">{{scope.row.method}}</el-tag>
          <el-tag v-if="scope.row.method === 'POST'" type="success">{{scope.row.method}}</el-tag>
          <el-tag v-if="scope.row.method === 'PATCH'" type="info">{{scope.row.method}}</el-tag>
          <el-tag v-if="scope.row.method === 'DELETE'" type="warning">{{scope.row.method}}</el-tag>
          <el-tag v-if="scope.row.method === 'PUT'" type="danger">{{scope.row.method}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="url"
        prop="url">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="description">
      </el-table-column>
      <el-table-column
        width="250"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle title="编辑接口" @click="jumpUpdateApi(scope.row._id)"></el-button>
          <el-button icon="el-icon-view" circle title="预览接口" @click="seeApi(scope.row.url)"></el-button>
          <el-button class="copy-url" type="success" icon="el-icon-share" circle title="复制接口地址" @click="copyUrl(scope.row.apiTestUrl)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle title="删除接口" @click="del(scope.row._id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </Layout>
</template>
<script type="text/babel">
  import lsData from '../../../util/local-data'
  import Clipboard from 'clipboard'
  export default {
    components: {

    },
    data(){
      return {
        projectId: '',
        project: '',
        type: '全部',
        apiList: [],
        apiTestUrl: ''
      }
    },
    computed: {
      baseurl () {
        return `${location.origin}/api/mock/${this.projectId}/`
      }
    },
    methods: {
      copyUrl (url) {
        const clipboard = new Clipboard('.copy-url', {
          text: () => {
            return url
          }
        })
        clipboard.on('success', (e) => {
          e.clearSelection()
          clipboard.destroy()
          this.$notify({
            message: '复制到剪切板',
            type: 'success'
          })
        })
      },
      seeApi (apiUrl) {
        window.open(`${location.origin}/api/mock/${this.projectId}/${apiUrl}`)
      },
      del (apiId) {
        this.$fetch({
          method: 'post',
          url: `${location.origin}/api/delete_api`,
          data: { id: apiId }
        })
        .then(res=> {
          if (res.data.success) {
            this.loadApi(this.projectId)
            this.$notify({
              message: res.data.data,
              type: 'success'
            })
          }
        })
      },
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
      loadApi (projectId, method) {
        if (method) {
          this.$fetch({
            method: 'get',
            url: `${location.origin}/api/get_api?projectId=${projectId}&method=${method}`
          })
          .then(res=> {
            console.warn(res)
            if (res.data.success) {
              res.data.data.forEach(item => {
                item.apiTestUrl = `${location.origin}/api/mock/${this.projectId}/${item.url}`
              })
              this.apiList = res.data.data
            }
          })
        } else {
          this.$fetch({
            method: 'get',
            url: `${location.origin}/api/get_api?projectId=${projectId}`
          })
          .then(res=> {
            console.warn(res)
            if (res.data.success) {
              res.data.data.forEach(item => {
                item.apiTestUrl = `${location.origin}/api/mock/${this.projectId}/${item.url}`
              })
              this.apiList = res.data.data
            }
          })
        }
      },
      jumpCreateUpdateApi () {
        window.location.href = `/createupdateapi?projectId=${this.projectId}`
      },
      jumpUpdateApi (apiId) {
        window.location.href = `/createupdateapi?apiId=${apiId}&&projectId=${this.projectId}`
      }
    },
    mounted() {
      this.projectId = this.$getQuery('projectId')
      this.loadProject(this.projectId)
      this.loadApi(this.projectId)
    },
    watch: {
      type(val){
        if (val === '全部') {
          this.loadApi(this.projectId)
        } else {
          this.loadApi(this.projectId, val)
        }
      }
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
}
</style>

