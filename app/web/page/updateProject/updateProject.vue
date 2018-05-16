<template>
  <layout>
    <div class="head">
      <div class="head-content">
        <div class="head-left">
          <i class="iconfont">&#xe62d;</i>
          <div class="font-info">
            <h2>修改项目</h2>
            <span class="title">可以在这里管理你的项目基本信息哟～～～</span>
          </div>
        </div>
        <div class="btn-group">
          <!-- <el-button icon="el-icon-edit" size="small">创建项目</el-button> -->
        </div>
      </div>
    </div>
    <div class="box-wrap-frame">
      <el-form :model="form" :rules="formRules" ref="form" label-width="85px" class="ruleForm">
        <el-form-item label="项目名" prop="projectName">
          <el-input placeholder="请输入项目名称" v-model="form.projectName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input placeholder="请输入昵称" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="项目类型" prop="isPublic">
          <el-radio v-model="form.isPublic" :label="true">公有项目</el-radio>
          <el-radio v-model="form.isPublic" :label="false">私有项目</el-radio>
        </el-form-item>
        <el-form-item label="项目成员" prop="members" v-if="form.isPublic === false || form.isPublic === 'false'">
          <el-autocomplete
            v-for="(member, index) in members"
            :key="index"
            v-model="member.username"
            :fetch-suggestions="queryUser"
            placeholder="请输入成员用户名"
          ></el-autocomplete>
          <el-button type="primary" icon="el-icon-plus" circle @click="addMember"></el-button>
        </el-form-item>
        <div class="btn-group">
          <el-button type="primary" @click="update('form')">更新</el-button>
        </div>
      </el-form>
    </div>
  </layout>
</template>
<script type="text/babel">
import lsData from '../../../util/local-data'
import _ from 'lodash'
  export default {
    data () {
      return {
        form: {
          projectName: '',
          description: '',
          isPublic: ''
        },
        members: [{ username: '' }],
        projectId: '',
        formRules: {
          projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入项目描述', trigger: 'blur' }
          ],
          isPublic: [
            { required: true, message: '请选择项目类型', trigger: 'blur' }
          ],
        }
      }
    },
    components: {},
    computed: {},
    methods: {
      update (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const members = this.members.map(item => {
              return item.username
            })
            const uniqMembers =  _.uniq(members)
            if (uniqMembers.length !== members.length) {
              this.$notify({
                message: '团队成员中有重复的成员，请修改',
                type: 'warning'
              })
              return false
            }
            this.$fetch({
              method: 'put',
              url: `${location.origin}/api/update_project/${this.projectId}`,
              data: {
                name: this.form.projectName,
                description: this.form.description,
                is_public: this.form.isPublic,
                members: members
              }
            })
            .then(res=> {
              if (res.data.success) {
                window.location.href='/';
              }
            })
          } else {
            this.$notify({
              message: '请确认正确完成表单',
              type: 'warning'
            })
            return false;
          }
        });
      },
      queryUser (queryString, cb) {
        this.$fetch({
          method: 'get',
          url: `${location.origin}/api/get_users?q=${queryString}`
        })
        .then(res=> {
          let users = res.data.data.map(item => {
            return {
              id: item._id,
              value: item.username,
              username: item.username
            }
          })
          cb(users)
        })
      },
      addMember () {
        this.members.push({ user: '' })
      },
      loadProject (projectId) {
        this.$fetch({
          method: 'get',
          url: `${location.origin}/api/get_projects?projectId=${projectId}`
        })
        .then(res=> {
          if (res.data.success) {
            let data = res.data.data
            console.log(data)
            this.form.projectName = data.name
            this.form.description = data.description
            this.form.isPublic = data.is_public
            this.members = data.members.map(item => {
              return { username: item.username }
            })
          }
        })
      }
    },
    mounted() {
      this.projectId = this.$getQuery('projectId')
      this.loadProject(this.projectId)
    }
  }
</script>
<style lang="scss" scoped>
  .box-wrap-frame {
    display: flex;
    flex-direction: column;
    width: 900px;
    margin: 30px auto 0;
    min-height: 100px;
    padding: 50px 50px 50px 40px;
    position: relative;
    background: -webkit-gradient(linear, 0% 20%, 0% 100%, from(#fff), to(#fff), color-stop(.2, #f2f2f2));
    border: 1px solid #ccc;
    -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    .ruleForm {
      display: flex;
      flex-direction: column;
      .btn-group {
        display: flex;
        justify-content: center;
      }
    }
    .password, .projectName, .description {
      margin-bottom: 20px;
    }
    h1{
      font-family: 'Open Sans', sans-serif;
      color: #5A5A5A ;
      font-size: 20px;
      font-weight: bold;
      margin-top: 5px; 
      margin-bottom: 20px;
      text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    }
  }
  .box-wrap-frame:before{
    content: '';
    width: 50px;
    height: 50px;
    top:0; right:0;
    position:absolute;
    z-index: -1;
    -webkit-box-shadow: 10px -10px 8px rgba(0, 0, 0, 0.2);
    -webkit-transform: rotate(2deg)
                        translate(-14px,20px)
                        skew(-20deg);
  }
  .box-wrap-frame:after{
    content: '';
    width: 50px;
    height: 50px;
    top:0; left:0;
    position:absolute;
    z-index:-1;
    display: inline-block;
    -webkit-box-shadow: -10px -10px 10px rgba(0, 0, 0, 0.2);
    -webkit-transform: rotate(2deg)
                        translate(12px,25px)
                           skew(20deg);
  }
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
