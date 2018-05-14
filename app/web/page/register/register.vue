<template>
  <layout>
    <div class="login-frame">
      <h1>注册</h1>
      <el-form :model="form" :rules="formRules" ref="form" label-width="85px" class="ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input placeholder="请输入昵称" v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordAgain">
          <el-input type="password" v-model="form.passwordAgain" auto-complete="off" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <div class="btn-group">
          <el-button type="primary" @click="register('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </div>
      </el-form>
    </div>
  </layout>
</template>
<script type="text/babel">
  export default {
    data () {
      var validatePassAgain = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.data.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return {
        form: {
          username: '',
          password: '',
          nickName: '',
          passwordAgain: ''
        },
        formRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { max: 20, message: '不得大于20个字符', trigger: 'blur' }
          ],
          nickName: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { max: 20, message: '不得大于20个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '不得小于6个字符', trigger: 'blur' },
            { max: 40, message: '不得大于40个字符', trigger: 'blur' }
          ],
          passwordAgain: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePassAgain, trigger: 'change' }
          ]
        }
      }
    },
    components: {},
    computed: {},
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      register (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(`${location.origin}/api/register`, {
              username: this.form.username,
              password: this.form.password,
              nick_name: this.form.nickName
            })
            .then(res=> {
              res.status = 200
              res.body = {
                message: 'ok'
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
      }
    },
    mounted() {

    }
  }
</script>
<style lang="scss" scoped>
  .login-frame {
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 60px auto;
    min-height: 100px;
    padding: 10px;
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
    .password, .username, .nickName {
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
  .login-frame:before{
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
  .login-frame:after{
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
</style>
