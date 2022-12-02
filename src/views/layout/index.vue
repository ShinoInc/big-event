<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />

      <!-- 右侧的菜单 -->

      <!-- 个人中心 -->

      <!-- 退出登录 -->
    </el-header>
    <el-container>
      <!-- 左侧边栏的用户信息 -->
      <el-aside width="200px">
        <div class="user-box">
          <img src="../../assets/images/head.png" alt="" />
          <span>欢迎博学谷用户</span>
        </div>
        <!-- 左侧导航菜单 -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router
        >
          <!-- 不包含子菜单的“一级菜单” -->
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>

          <!-- 包含子菜单的“一级菜单” -->
          <el-submenu index="JavaScript:;">
            <!-- 循环渲染“二级菜单” -->
            <template #title>
              <i class="el-icon-menu"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/cate">
              <i class="el-icon-s-order"></i>
              <span>文章分类</span>
            </el-menu-item>
            <el-menu-item index="/article">
              <i class="el-icon-medal"></i>
              <span>文章列表</span>
            </el-menu-item>
            <el-menu-item index="/edit">
              <i class="el-icon-star-off"></i>
              <span>发表文章</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 页面主体区域 -->
        <!-- 二级路由挂载点 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'my-layout',
  computed: {},
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;

  .el-header,
  .el-aside {
    background-color: #23262e;
  }

  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }

  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}

// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }

  span {
    color: white;
    font-size: 12px;
  }
}

// 侧边栏菜单的样式
.el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }

  /deep/ .el-menu-item,
  /deep/ .el-submenu__title {
    padding-left: 35px !important;
    font-size: 15px;
  }

  /deep/ .el-menu--inline .el-menu-item {
    padding-left: 50px !important;
  }
}
</style>
