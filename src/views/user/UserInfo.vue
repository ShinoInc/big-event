<template>
  <div id="user_info">
    <el-card>
      <div slot="header" style="overflow: hidden">
        <span style="font-size: 16px; font-weight: 500; line-height: 40px"
          >基本资料</span
        >
      </div>
      <el-form
        ref="infoForm"
        :model="infoForm"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item label="登录名称" prop="username">
          <el-input v-model="infoForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input
            v-model="infoForm.nickname"
            placeholder="请输入昵称"
            @keyup.enter.native="upEnter($event, 'submit')"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input
            v-model="infoForm.email"
            placeholder="请输入邮箱"
            @keyup.enter.native="upEnter($event, 'submit')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            ref="submit"
            class="submitBtn"
            type="primary"
            @click="submitForm('infoForm')"
            @keyup.enter.native="submitForm('infoForm')"
            >提交修改</el-button
          >
          <el-button class="submitBtn" type="info" @click="resetForm"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { putUserInfo } from '@/api'

export default {
  name: 'UserInfo',
  data () {
    return {
      infoForm: {
        username: '',
        nickname: '',
        email: ''
      },
      rules: {
        username: [{}],
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '用户昵称长度应在1-10位字符之间，请重新输入',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          {
            type: 'email',
            message: '请正确输入邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    ...mapActions(['user/getUserInfo']),
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await putUserInfo(this.infoForm)
          await this['user/getUserInfo']()
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.infoForm = { ...this.userInfo }
    },
    upEnter (event, ref) {
      event.target.blur()
      this.$refs[ref].$el.click()
    }
  },
  created () {
    this.resetForm()
  }
}
</script>

<style lang="less" scoped>
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

.submitBtn {
  padding: 0 16px;
  height: 32px;
  font-size: 14px;
  line-height: 32px;
}
</style>
