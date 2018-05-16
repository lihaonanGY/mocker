<template>
  <header class="header">
    <div class="container"><h1>
      <a href="/" class="router-link-active">Mocker模仿者</a></h1>
      <ul class="nav">
        <li class="nav-item"><a href="/" :class="{'active' : selectedMenu === '/'}">我的项目</a></li>
        <!-- <li class="nav-item"><a href="/client" :class="{'active' : selectedMenu === '/client'}">Client-Render</a></li>
        <li class="nav-item"><a href="/dynamic" :class="{'active' : selectedMenu === '/dynamic'}">Vue-Component-Dynamic</a></li> -->
      </ul>
      <div class="usercenter">
        <span class="user-name">{{userNickName}}</span>
        <el-button type="info" icon="el-icon-setting" circle plain></el-button>
      </div>
    </div>
  </header>
</template>
<style>
  @import "./header.css";
</style>
<script type="text/babel">
  import lsData from '../../../../../util/local-data'
  export default{
    data(){
      return {
        selectedMenu : '/'
      }
    },
    computed:{
      userNickName () {
        return lsData.get('nickName')
      }
    },
    mounted(){
      this.selectedMenu = window.location.pathname.toLowerCase();
    }
  }
</script>
