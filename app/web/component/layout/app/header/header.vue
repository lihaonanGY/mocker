<template>
  <header class="header">
    <div class="container">
      <h1>
        <a href="" class="router-link-active">Mocker模仿者</a>
      </h1>
      <ul class="nav">
        <li class="nav-item"><a href="/app" :class="{'active' : selectedMenu === '/app'}">aaaaaaaaaaa</a></li>
        <li class="nav-item"><a href="/" :class="{'active' : selectedMenu === '/'}">bbbbbb</a></li>
      </ul>
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
        selectedMenu : '/app'
      }
    },
    computed:{

    },
    mounted(){
      this.selectedMenu = window.location.pathname.toLowerCase().replace(/\/$/,'');
    }
  }
</script>
