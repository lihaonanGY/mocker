<template>
  <layout>
    <div class="login-frame">
      <h1>登录</h1>
      <el-form :model="form" :rules="formRules" ref="form" label-width="0px" class="ruleForm">
        <el-form-item  prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="login('form')">提交</el-button>
      </el-form>
    </div>
  </layout>
</template>
<script type="text/babel">
  export default {
    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        formRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
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
      login (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(`${location.origin}/api/login`, {
              username: this.form.username,
              password: this.form.password
            })
            .then(res=> {
              console.log(res)
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
