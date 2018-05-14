<template>
  <layout>
    <div class="login-frame">
      <h1>注册</h1>
      <el-input
        placeholder="请输入用户名"
        v-model="userName"
        class="username">
      </el-input>
      <el-input
        placeholder="请输入密码"
        type="password"
        v-model="password"
        class="password">
      </el-input>
      <el-button type="primary" @click="register">注册</el-button>
    </div>
  </layout>
</template>
<script type="text/babel">
  export default {
    data () {
      return {
        userName: '',
        password: ''
      }
    },
    components: {},
    computed: {},
    methods: {
      register () {
        this.$http.post(`${location.origin}/api/register`, {
          username: this.userName,
          password: this.password
        })
        .then(res=> {
          res.status = 200
          res.body = {
            message: 'ok'
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
    width: 400px;
    margin: 60px auto;
    min-height: 100px;
    padding: 10px;
    position: relative;
    background: -webkit-gradient(linear, 0% 20%, 0% 100%, from(#fff), to(#fff), color-stop(.2, #f2f2f2));
    border: 1px solid #ccc;
    -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    .password, .username {
      margin-bottom: 20px;
    }
    h1{
      font-family: 'Open Sans', sans-serif;
      color: #5A5A5A ;
      font-size: 20px;
      font-weight: bold;
      margin-top: 5px; 
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
