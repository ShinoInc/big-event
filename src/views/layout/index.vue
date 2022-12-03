<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />

      <!-- 右侧的菜单 -->
      <el-menu
        mode="horizontal"
        background-color="#23262E"
        text-color="#FFFFFF"
        active-text-color="#409EFF"
        router
      >
        <!-- 个人中心 -->
        <el-submenu index="TabUser">
          <template #title>
            <el-avatar
              v-if="user_pic"
              class="avatar"
              :src="user_pic"
            ></el-avatar>
            <el-avatar v-else class="avatar">{{
              nickname ? nickname : username
            }}</el-avatar>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/userinfo">
            <svg-icon icon-class="user_info"></svg-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/userpic">
            <svg-icon icon-class="user_pic"></svg-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/userpwd">
            <svg-icon icon-class="user_pwd"></svg-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-submenu>

        <!-- 退出登录 -->
        <el-menu-item @click="logout">
          <svg-icon icon-class="logout"></svg-icon>
          <span>退出</span>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 左侧边栏的用户信息 -->
      <el-aside width="200px">
        <div class="user-box">
          <el-avatar v-if="user_pic" class="avatar" :src="user_pic"></el-avatar>
          <el-avatar v-else class="avatar">{{
            nickname ? nickname : username
          }}</el-avatar>
          <span>欢迎 {{ nickname ? nickname : username }}</span>
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
            <svg-icon icon-class="home"></svg-icon>
            <span>首页</span>
          </el-menu-item>

          <!-- 包含子菜单的“一级菜单” -->
          <el-submenu index="Article">
            <!-- 循环渲染“二级菜单” -->
            <template #title>
              <svg-icon icon-class="article"></svg-icon>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/cate">
              <svg-icon icon-class="article_cate"></svg-icon>
              <span>文章分类</span>
            </el-menu-item>
            <el-menu-item index="/article">
              <svg-icon icon-class="article_list"></svg-icon>
              <span>文章列表</span>
            </el-menu-item>
            <el-menu-item index="/edit">
              <svg-icon icon-class="article_info"></svg-icon>
              <span>发表文章</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="User">
            <template #title>
              <svg-icon icon-class="user"></svg-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/userinfo">
              <svg-icon icon-class="user_info"></svg-icon>
              <span>基本资料</span>
            </el-menu-item>
            <el-menu-item index="/userpic">
              <svg-icon icon-class="user_pic"></svg-icon>
              <span>更换头像</span>
            </el-menu-item>
            <el-menu-item index="/userpwd">
              <svg-icon icon-class="user_pwd"></svg-icon>
              <span>重置密码</span>
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'my-layout',
  computed: {
    ...mapGetters(['username', 'nickname', 'user_pic'])
  },
  data () {
    return {}
  },
  created () {},
  methods: {
    ...mapActions(['user/logout']),
    async logout () {
      await this['user/logout']()
      this.$router.push('/login')
    }
  }
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
  margin-right: 10px;
  width: 35px;
  height: 35px;
  font-size: 12px;
  line-height: 35px;
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

.svg-icon {
  position: relative;
  top: 5px;
  width: 32px;
  height: 24px;
}

.el-header {
  /deep/ .el-menu-item,
  /deep/ .el-submenu__title {
    font-size: 15px;
  }
}
</style>
