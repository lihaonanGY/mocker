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
        <span class="user-name">精致的猪猪女孩</span>
        <el-button type="info" icon="el-icon-setting" circle plain></el-button>
      </div>
    </div>
  </header>
</template>
<style>
  @import "./header.css";
</style>
<script type="text/babel">
  export default{
    data(){
      return {
        selectedMenu : '/'
      }
    },
    computed:{
    },
    mounted(){
      this.selectedMenu = window.location.pathname.toLowerCase();
    }
  }
</script>
