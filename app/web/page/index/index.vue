<template>
  <Layout description="mocke server" keywords="mock, mock server, egg, mockjs">
    <div class="head">
      <div class="head-content">
        <div class="head-left">
          <i class="iconfont">&#xe607;</i>
          <div class="font-info">
            <h2>我的项目</h2>
            <span class="title">这里包含了你的所有项目,包括你的参与的项目和公共项目</span>
          </div>
        </div>
        <div class="btn-group">
          <el-button icon="el-icon-edit" size="small" @click="jumpAddProject">创建项目</el-button>
          <el-radio-group v-model="type" size="small">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="我创建的"></el-radio-button>
            <el-radio-button label="公共项目"></el-radio-button>
            <el-radio-button label="私有项目"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="project-item" v-for="project in projectList" :key="project._id" @click="jumpApiList($event, project)">
        <h3><i class="iconfont">&#xe607;</i>{{project.name}}</h3>
        <el-tag>{{project.description}}</el-tag>
        <el-tag type="info">{{project.is_public ? '公有项目' : '私有项目'}}</el-tag>
        <el-tag type="warning">创建者：{{project.create_user.nick_name}}</el-tag>
        <div class="btn-group">
          <el-button type="primary" icon="el-icon-edit" circle @click="jumpUpdateProject(project)"></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          <el-button icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="delProject(project)"></el-button>
        </div>
      </div>
    </div>
  </Layout>
</template>
<script type="text/babel">
  import lsData from '../../../util/local-data'
  export default {
    components: {

    },
    data(){
      return {
        projectList: [],
        type: '全部'
      }
    },
    computed: {
    },
    methods: {
      loadProject (type) {
        this.$fetch({
          method: 'get',
          url: `${location.origin}/api/get_projects?type=${type}&userId=${lsData.get('userId')}`
        })
        .then(res=> {
          if (res.data.success) {
            this.projectList = res.data.data
          }
        })
      },
      delProject (project) {
        this.$fetch({
          method: 'post',
          url: `${location.origin}/api/delete_project`,
          data: { id: project._id }
        })
        .then(res=> {
          if (res.data.success) {
            this.type = '全部'
            this.loadProject(1)
            this.$notify({
              message: res.data.data,
              type: 'success'
            })
          }
        })
      },
      jumpUpdateProject (project) {
        window.location.href = `/updateproject?projectId=${project._id}`
      },
      jumpAddProject () {
        window.location.href = '/addproject'
      },
      jumpApiList (e, project) {
        if (e.target.className.indexOf('el-button') !== -1 || e.target.className.indexOf('el-icon-edit') !== -1 || e.target.className.indexOf('el-icon-delete') !== -1) {
          return
        }
        window.location.href = `/apilist?projectId=${project._id}`
      }
    },
    mounted() {
      if (!lsData.get('token')) {
        window.location.href = '/login'
      }
      this.loadProject(1)
    },
    watch: {
      type(val){
        if (val === '全部') {
          this.loadProject(1)
        } else if (val === '我创建的') {
          this.loadProject(2)
        } else if (val === '公共项目') {
          this.loadProject(3)
        } else if (val === '私有项目') {
          this.loadProject(4)
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
  .project-item {
    display: inline-block;
    margin-right: 11px;
    width: 24%;
    background: #fff;
    padding: 20px 14px;
    box-shadow: 0 1px 5px #e5e5e5;
    border-radius: 4px;
    transition: all .3s;
    position: relative;
    margin-bottom: 20px;
    cursor: pointer;
    h3 {
      font-weight: 700;
      font-size: 16px;
      margin: 0 0 14px 0;
      .iconfont {
        margin-right: 8px;
      }
    }
  }
  .el-tag {
    width: 100%;
    margin-bottom: 14px;
  }
}
</style>
