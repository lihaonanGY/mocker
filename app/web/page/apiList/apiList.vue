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
            <el-radio-button label="我创建的"></el-radio-button>
            <el-radio-button label="公共项目"></el-radio-button>
            <el-radio-button label="私有项目"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="container">
      <el-table
      :data="tableData5"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="商品 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="desc">
      </el-table-column>
    </el-table>
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
        projectId: '',
        project: '',
        type: '全部',
        tableData5: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
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
      jumpCreateUpdateApi () {
        window.location.href = `/createupdateapi?projectId=${this.projectId}`
      }
    },
    mounted() {
      this.projectId = this.$getQuery('projectId')
      this.loadProject(this.projectId)
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
    width: 50%;
  }
}
</style>
