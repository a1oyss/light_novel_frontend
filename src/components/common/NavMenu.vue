<template>
  <el-menu
      :default-active="activeIndex"
      router
      mode="horizontal"
      background-color="white"
      text-color="#222"
      active-text-color="red"
      style="min-width: 1300px">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">LightNovel - 在线轻小说</span>
  </el-menu>
</template>

<script>
export default {
  name: "NavMenu",
  data(){
    return{
      activeIndex: this.$route.path,
      navList:[
        {name:'/index',navItem:'首页'},
        {name:'/blog',navItem:'开发日志'},
        {name:'/library',navItem:'图书馆'},
        {name:'/admin',navItem:'个人中心'}
      ]
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}

span {
  pointer-events: none;
}
</style>