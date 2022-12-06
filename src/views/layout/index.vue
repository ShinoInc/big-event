<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img :src="require('@/assets/images/logo.png')" alt="" />

      <!-- 右侧的菜单 -->
      <el-menu
        ref="tabMenu"
        mode="horizontal"
        background-color="#23262E"
        text-color="#FFFFFF"
        active-text-color="#409EFF"
        router
        @select="tabMenuSelect"
      >
        <!-- 个人中心 -->
        <!-- 包含子菜单的“一级菜单” -->
        <template v-for="(value, index) in menus">
          <el-submenu
            v-if="value.title === '个人中心'"
            :key="index"
            :index="value.indexPath"
          >
            <template #title>
              <el-avatar
                v-if="user_pic"
                class="avatar"
                :src="user_pic"
              ></el-avatar>
              <el-avatar v-else class="avatar">{{
                nickname ? nickname : username
              }}</el-avatar>
              <span>{{ value.title }}</span>
            </template>
            <!-- 循环渲染“二级菜单” -->
            <el-menu-item
              v-for="(child, childIndex) in value.children"
              :key="childIndex"
              :index="child.indexPath"
            >
              <i :class="child.icon"></i>
              <span>{{ child.title }}</span>
            </el-menu-item>
          </el-submenu>
        </template>

        <!-- 退出登录 -->
        <el-menu-item @click="dialogVisible = true">
          <i class="el-icon-switch-button"></i>
          <span>退出</span>
        </el-menu-item>
      </el-menu>
      <el-dialog :visible.sync="dialogVisible">
        <div slot="title">
          <p style="display: flex; align-items: center; line-height: 1">
            <i class="el-icon-info"></i>
            <span>提示</span>
          </p>
        </div>
        <span style="margin-left: 32px">确定要退出登录吗？</span>
        <div slot="footer" class="dialog-footer">
          <el-button class="dlgBtn" type="info" @click="dialogVisible = false"
            >取消</el-button
          >
          <el-button class="dlgBtn" type="primary" @click="logout"
            >确定</el-button
          >
        </div>
      </el-dialog>
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
          ref="leftMenu"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router
          @select="leftMenuSelect"
        >
          <!-- 不包含子菜单的“一级菜单” -->
          <template v-for="(value, index) in menus">
            <el-menu-item
              v-if="!value.children"
              :key="index"
              :index="value.indexPath"
            >
              <i :class="value.icon"></i>
              <span>{{ value.title }}</span>
            </el-menu-item>
          </template>
          <!-- 包含子菜单的“一级菜单” -->
          <template v-for="(value, index) in menus">
            <el-submenu
              v-if="value.children"
              :key="index"
              :index="value.indexPath"
            >
              <template #title>
                <i :class="value.icon"></i>
                <span>{{ value.title }}</span>
              </template>
              <!-- 循环渲染“二级菜单” -->
              <el-menu-item
                v-for="(child, childIndex) in value.children"
                :key="childIndex"
                :index="child.indexPath"
              >
                <i :class="child.icon"></i>
                <span>{{ child.title }}</span>
              </el-menu-item>
            </el-submenu>
          </template>
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
    ...mapGetters(['username', 'nickname', 'user_pic', 'menus'])
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  mounted () {
    this.tabMenuSelect()
  },
  methods: {
    ...mapActions(['user/logout']),
    async logout () {
      await this['user/logout']()
      this.$router.push('/login')
    },
    // 禁用右侧菜单高亮
    tabMenuSelect () {
      this.$refs.tabMenu.activeIndex = !'null'
    },
    leftMenuSelect (index) {
      if (index === '/home') {
        this.$refs.leftMenu.close('2')
        this.$refs.leftMenu.close('3')
      }
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

.el-header {
  /deep/ .el-menu-item,
  /deep/ .el-submenu__title {
    font-size: 15px;
  }
}

/deep/ .el-dialog {
  width: 410px;

  .el-dialog__header {
    .el-icon-info {
      margin-right: 8px;
      font-size: 24px;
      color: #4f81ff;
    }

    .el-dialog__headerbtn:focus .el-dialog__close,
    .el-dialog__headerbtn:hover .el-dialog__close {
      color: rgba(0, 0, 0, 0.4);
    }

    span {
      margin-bottom: 1px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.9);
    }
  }

  .dlgBtn {
    padding: 0 16px;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
  }
}

.el-button--primary {
  background-color: #4f81ff;
  border-color: #4f81ff;

  &:hover {
    background-color: #608dff;
    border-color: #608dff;
  }
}

.el-button--info {
  background-color: #eaecf5;
  border-color: #eaecf5;
  color: rgba(0, 0, 0, 0.9);

  &:hover {
    background-color: #f5f6fa;
    border-color: #f5f6fa;
  }
}
</style>
