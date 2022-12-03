<template>
  <div id="user_pic">
    <el-card>
      <div slot="header" style="overflow: hidden">
        <span style="font-size: 16px; font-weight: 500; line-height: 40px"
          >更换头像</span
        >
      </div>
      <el-form ref="avatar" :model="avatar" :rules="rules">
        <el-form-item prop="user_pic">
          <el-image
            :src="user_pic ? user_pic : baseUrl"
            fit="cover"
            style="width: 320px; height: 320px"
          ></el-image>
          <el-upload
            ref="upload"
            action=""
            accept="image/jpeg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :auto-upload="false"
            :file-list="fileList"
          >
            <el-button slot="trigger" class="upBtn" type="primary"
              ><i class="el-icon-plus"></i>选择头像</el-button
            >
            <el-button
              class="upBtn"
              type="info"
              style="margin-left: 10px"
              @click="submitUpload('avatar')"
              ><i class="el-icon-upload"></i>上传图片</el-button
            >
          </el-upload>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { updateAvatar } from '@/api'

export default {
  name: 'UserPic',
  data () {
    const isOld = (rule, value, callback) => {
      if (value !== this[rule.field]) {
        callback()
      } else {
        const props = { user_pic: '头像' }
        callback(new Error(`新旧${props[rule.field]}不能相同`))
      }
    }
    return {
      avatar: {
        user_pic: ''
      },
      rules: {
        user_pic: [
          { required: true, message: '请选择用户头像', trigger: 'blur' },
          { validator: isOld, trigger: 'blur' }
        ]
      },
      baseUrl: require('@/assets/images/avatar.jpg'),
      fileList: []
    }
  },
  computed: {
    ...mapGetters(['user_pic'])
  },
  methods: {
    ...mapActions(['user/getUserInfo']),
    submitUpload (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await updateAvatar(this.avatar.user_pic)
          await this['user/getUserInfo']()
        } else {
          return false
        }
      })
    },
    onChange (files, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      this.fileList = fileList
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files.raw)
      fileReader.onload = (event) => {
        this.avatar.user_pic = event.target.result
      }
    },
    handleRemove (file, fileList) {
      this.avatar.user_pic = ''
      this.$refs.avatar.validateField('user_pic')
    },
    handlePreview (file) {
      console.log(file)
    }
  },
  created () {
    this.avatar.user_pic = this.user_pic
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
  color: #0052d9;

  &:hover {
    background-color: #f5f6fa;
    border-color: #f5f6fa;
  }
}

.upBtn {
  padding: 0 16px;
  height: 32px;
  font-size: 14px;
  line-height: 32px;
}
</style>
