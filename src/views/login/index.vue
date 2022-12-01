<template>
  <div id="login">
    <el-image class="logo" :src="require('@/assets/images/login_logo.png')" fit="contain"></el-image>
    <el-card class="reg-card" shadow="always">
      <h2>后台管理系统</h2>
      <p class="link">
        <router-link to="/register">去注册</router-link>
      </p>
      <el-form ref="lgnForm" :model="lgnForm" :rules="rules">
        <el-form-item prop="username">
          <template #label>
            <span class="iptLabel">用户名</span>
          </template>
          <el-input type="text" v-model="lgnForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <template #label>
            <span class="iptLabel">密码</span>
          </template>
          <el-input type="password" v-model="lgnForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btnSubmit" type="primary" :loading="loading" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginView',
  data () {
    return {
      lgnForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]+$/, message: '用户名只能包含字母和数字，请重新输入', trigger: 'change' },
          { min: 1, max: 10, message: '用户名长度应在1-10位字符之间，请重新输入', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度应在6-15位字符之间，请重新输入', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    ...mapActions(['user/login']),
    login () {
      this.$refs.lgnForm.validate(async valid => {
        if (valid) {
          this.loading = true
          await this['user/login'](this.lgnForm)
          this.$router.push('/')
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/login_bg.jpg') 100% no-repeat;
  background-size: 100%;

  .logo {
    position: absolute;
    left: 55px;
    top: 33px;
  }

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
