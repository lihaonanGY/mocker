<template>
  <div>
    <LayoutHeader></LayoutHeader>
    <LayoutContent>
      <div slot="content">
        <slot name="main"></slot>
      </div>
    </LayoutContent>
  </div>
</template>
<style lang="css">
  body {
    margin: 0 0px;
    background: #f5f7fa;
  }
  a {
    text-decoration: none;
  }
  @font-face {
    font-family: 'iconfont';  /* project id 668187 */
    src: url('//at.alicdn.com/t/font_668187_atbr6n76qtexko6r.eot');
    src: url('//at.alicdn.com/t/font_668187_atbr6n76qtexko6r.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_668187_atbr6n76qtexko6r.woff') format('woff'),
    url('//at.alicdn.com/t/font_668187_atbr6n76qtexko6r.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_668187_atbr6n76qtexko6r.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  @import "../../../asset/css/global.css";
</style>
<script type="text/babel">
  import LayoutHeader from './header/header';
  import LayoutContent from './content/content';
  export default{
    components: {
      LayoutHeader,
      LayoutContent
    }
  }
</script>
