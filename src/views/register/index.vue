<template>
  <div id="register">
    <el-card class="reg-card" shadow="always">
      <h2>后台管理系统</h2>
      <p class="link">
        <router-link to="/login">去登录</router-link>
      </p>
      <el-form ref="regForm" :model="regForm">
        <el-form-item>
          <span class="iptLabel">用户名</span>
          <el-input type="text" v-model="regForm.username" placeholder="请输入用户名" name="username"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="iptLabel">密码</span>
          <el-input type="password" v-model="regForm.password" placeholder="请输入密码" name="password"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="iptLabel">密码</span>
          <el-input type="password" v-model="password2" placeholder="请再次输入密码" name="password2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btnSubmit" type="primary" :loading="loading" native-type="submit">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data () {
    return {
      regForm: {
        username: '',
        password: ''
      },
      password2: '',
      loading: false
    }
  }
}
</script>

<style lang="less" scoped>
#register {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/login_bg.jpg') 100% no-repeat;
  background-size: 100%;

  .reg-card {
    width: 540px;

    h2 {
      text-align: center;
      font-size: 32px;
      font-weight: 400;
      color: #131523;
    }

    .link {
      text-align: center;

      a {
        text-decoration: none;
        color: #1E5EFF;

        &:hover {
          color: #4F81FF;
        }
      }
    }

    .iptLabel {
      font-size: 14px;
      color: #5A607F;
    }

    & :focus {
      border-color: #1E5EFF !important;
    }

    .btnSubmit {
      width: 100%;
      background-color: #4F81FF;
      border-color: #4F81FF;
      font-size: 16px;

      &:hover {
        background-color: #608DFF;
        border-color: #608DFF;
      }
    }
  }
}
</style>
