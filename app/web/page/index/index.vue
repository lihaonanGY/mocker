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
          <el-button icon="el-icon-edit" size="small">创建项目</el-button>
          <el-button size="mini" type="primary">全部</el-button>
          <el-button size="mini" class="btn-tag">我创建的</el-button>
          <el-button size="mini" class="btn-tag">公共项目</el-button>
          <el-button size="mini" class="btn-tag">私有项目</el-button>
        </div>
      </div>
    </div>
    <div class="container">
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
      }
    },
    computed: {
    },
    methods: {
    },
    mounted() {
      if (!lsData.get('token')) {
        window.location.href = '/login'
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
</style>
