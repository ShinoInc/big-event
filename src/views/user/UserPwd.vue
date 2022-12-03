<template>
  <div id="user_info">
    <el-card>
      <div slot="header" style="overflow: hidden">
        <span style="font-size: 16px; font-weight: 500; line-height: 40px"
          >重置密码</span
        >
      </div>
      <el-form ref="pwdForm" :model="pwdForm" :rules="rules" label-width="auto">
        <el-form-item label="原密码" prop="old_pwd">
          <el-input
            type="password"
            v-model="pwdForm.old_pwd"
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input
            type="password"
            v-model="pwdForm.new_pwd"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="re_pwd">
          <el-input
            type="password"
            v-model="pwdForm.re_pwd"
            placeholder="请再次输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submitBtn"
            type="primary"
            @click="submitForm('pwdForm')"
            >修改密码</el-button
          >
          <el-button class="submitBtn" type="info" @click="resetForm('pwdForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updatePwd } from '@/api'

export default {
  name: 'UserInfo',
  data () {
    const validateRepassword = (rule, value, callback) => {
      if (value === this.pwdForm.new_pwd) {
        callback()
      } else {
        callback(new Error('两次密码不一致，请重新输入'))
      }
    }
    const isOld = (rule, value, callback) => {
      if (value !== this.pwdForm.old_pwd) {
        callback()
      } else {
        const props = { new_pwd: '密码' }
        callback(new Error(`新旧${props[rule.field]}不能相同`))
      }
    }

    return {
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      rules: {
        old_pwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '原密码长度应在6-15位字符之间，请重新输入',
            trigger: 'blur'
          }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '新密码长度应在6-15位字符之间，请重新输入',
            trigger: 'blur'
          },
          { validator: isOld, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '确认密码长度应在6-15位字符之间，请重新输入',
            trigger: 'blur'
          },
          { validator: validateRepassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await updatePwd(this.pwdForm)
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
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
