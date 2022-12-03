<template>
  <div id="edit">
    <el-card>
      <div slot="header" style="overflow: hidden">
        <span style="font-size: 16px; font-weight: 500; line-height: 40px"
          >发表文章</span
        >
      </div>
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input
            v-model="editForm.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select v-model="editForm.cate_id" placeholder="请选择分类">
            <el-option
              v-for="cate in cateList"
              :key="cate.id"
              :label="cate.cate_name"
              :value="cate.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <quill-editor
            ref="myQuillEditor"
            v-model="editForm.content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          />
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <el-image
            :src="editForm.cover_img ? editForm.cover_img : baseUrl"
            fit="cover"
            style="width: 320px; height: 200px"
          ></el-image>
          <el-upload
            action=""
            accept="image/*"
            :on-remove="handleRemove"
            :on-change="onChange"
            :auto-upload="false"
            :file-list="fileList"
          >
            <div slot="trigger">
              <i class="el-icon-plus"></i>
              <span>选择封面</span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submitBtn"
            type="primary"
            @click="submitForm('editForm', '已发布')"
            >发布</el-button
          >
          <el-button
            class="submitBtn"
            type="info"
            @click="submitForm('editForm', '草稿')"
            >存为草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { addArticle, infoArticle } from '@/api'

// quillEditor
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'EditView',
  components: {
    quillEditor
  },
  data () {
    return {
      fileList: [],
      data: new FormData(),
      baseUrl: '',
      editForm: {
        id: '',
        title: '',
        cate_id: '',
        content: '这里可以填写内容',
        cover_img: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          {
            min: 1,
            max: 30,
            message: '文章标题长度应在1-30位字符之间，请重新输入',
            trigger: 'blur'
          }
        ],
        cate_id: [
          { required: true, message: '请选择文章分类', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        cover_img: [
          { required: true, message: '请选择文章封面', trigger: 'blur' }
        ]
      },
      editorOption: {
        // Some Quill options...
      }
    }
  },
  async created () {
    await this['cate/getCateList']()
    if (this.$route.query.id) {
      const { id, title, cate_id, content, cover_img } = await infoArticle({
        id: this.$route.query.id
      })
      this.editForm.id = id
      this.editForm.title = title
      this.editForm.cate_id = cate_id
      this.editForm.content = content
      this.editForm.cover_img = `http://big-event-vue-api-t.itheima.net${cover_img}`
    }
    this.baseUrl = require('@/assets/images/cover.jpg')
  },
  computed: {
    ...mapGetters(['cateList']),
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    ...mapActions(['cate/getCateList']),
    onChange (files, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      this.fileList = fileList
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files.raw)
      fileReader.onload = (event) => {
        this.editForm.cover_img = event.target.result
      }
    },
    handleRemove (file, fileList) {
      this.editForm.cover_img = ''
    },
    onEditorBlur (quill) {},
    onEditorFocus (quill) {},
    onEditorReady (quill) {},
    onEditorChange ({ quill, html, text }) {
      this.content = html
    },
    submitForm (formName, state) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.editForm.id !== '') {
            this.data.append('id', this.editForm.id)
          }
          this.data.append('title', this.editForm.title)
          this.data.append('cate_id', this.editForm.cate_id)
          this.data.append('content', this.editForm.content)
          this.data.append('state', state)
          if (this.fileList.length > 0) {
            this.data.append('cover_img', this.fileList[0].raw)
          }
          if (this.$route.query.id) {
            await infoArticle({ method: 'put', data: this.data })
          } else {
            await addArticle(this.data)
          }
          this.$router.push('/article')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-form-item {
  /deep/ .el-form-item__label {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.4);
  }

  /deep/ .el-select {
    width: 100%;
  }

  /deep/ .el-input__inner {
    height: 40px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.9);
  }
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #ecf2fe;
  color: #0052d9;
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

.submitBtn {
  padding: 0 16px;
  height: 32px;
  font-size: 14px;
  line-height: 32px;
}
</style>
