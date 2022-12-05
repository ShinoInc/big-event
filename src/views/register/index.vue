<template>
  <div id="register">
    <el-image
      class="logo"
      :src="require('@/assets/images/login_logo.png')"
      fit="contain"
    ></el-image>
    <el-card class="reg-card" shadow="always">
      <h2>后台管理系统</h2>
      <p class="link">
        <router-link to="/login">去登录</router-link>
      </p>
      <el-form ref="regForm" :model="regForm" :rules="rules">
        <el-form-item prop="username">
          <template #label>
            <span class="iptLabel">用户名</span>
          </template>
          <el-input
            type="text"
            v-model="regForm.username"
            placeholder="请输入用户名"
            @keyup.enter.native="upEnter($event, 'register')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <template #label>
            <span class="iptLabel">密码</span>
          </template>
          <el-input
            type="password"
            v-model="regForm.password"
            placeholder="请输入密码"
            @keyup.enter.native="upEnter($event, 'register')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <template #label>
            <span class="iptLabel">密码</span>
          </template>
          <el-input
            type="password"
            v-model="regForm.repassword"
            placeholder="请再次输入密码"
            @keyup.enter.native="upEnter($event, 'register')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            ref="register"
            class="btnSubmit"
            type="primary"
            :loading="loading"
            @click="register"
            @keyup.enter.native="register"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { register } from '@/api'

export default {
  name: 'RegisterView',
  data () {
    const validateRepassword = (rule, value, callback) => {
      if (value === this.regForm.password) {
        callback()
      } else {
        callback(new Error('两次密码不一致，请重新输入'))
      }
    }

    return {
      regForm: {
        username: '',
        password: '',
        repassword: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: '用户名只能包含字母和数字，请重新输入',
            trigger: 'change'
          },
          {
            min: 1,
            max: 10,
            message: '用户名长度应在1-10位字符之间，请重新输入',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '密码长度应在6-15位字符之间，请重新输入',
            trigger: 'blur'
          }
        ],
        repassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '确认密码长度应在6-15位字符之间，请重新输入',
            trigger: 'blur'
          },
          { validator: validateRepassword, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    register () {
      this.$refs.regForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            await register(this.regForm)
            this.$router.push('/login')
          } finally {
            this.loading = false
          }
        }
      })
    },
    upEnter (event, ref) {
      event.target.blur()
      this.$refs[ref].$el.click()
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
  background: url("@/assets/images/login_bg.jpg") 100% no-repeat;
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
        color: #1e5eff;

        &:hover {
          color: #4f81ff;
        }
      }
    }

    .iptLabel {
      font-size: 14px;
      color: #5a607f;
    }

    & :focus {
      border-color: #1e5eff !important;
    }

    .btnSubmit {
      width: 100%;
      background-color: #4f81ff;
      border-color: #4f81ff;
      font-size: 16px;

      &:hover {
        background-color: #608dff;
        border-color: #608dff;
      }
    }
  }
}
</style>
