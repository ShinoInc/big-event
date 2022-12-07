<template>
  <div id="article">
    <article-editor v-if="$route.hash === '#edit'"></article-editor>
    <el-card v-else>
      <div slot="header" style="overflow: hidden">
        <span style="font-size: 16px; font-weight: 500; line-height: 40px"
          >文章列表</span
        >
      </div>
      <el-form
        ref="srcForm"
        :inline="true"
        :model="params"
        class="demo-form-inline"
      >
        <el-form-item label="文章分类" prop="cate_id">
          <el-select v-model="params.cate_id" placeholder="请选择分类">
            <el-option
              v-for="cate in cateList"
              :key="cate.id"
              :label="cate.cate_name"
              :value="cate.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态" prop="state">
          <el-select v-model="params.state" placeholder="请选择状态">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            class="scrBtn"
            type="primary"
            @click="submitForm('srcForm')"
            >筛选</el-button
          >
          <el-button class="scrBtn" type="info" @click="resetForm('srcForm')"
            >重置</el-button
          >
        </el-form-item>
        <el-button class="addBtn" type="primary" @click="handleAdd"
          >发表文章</el-button
        >
      </el-form>
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column prop="title" label="文章标题"> </el-table-column>
        <el-table-column prop="cate_name" label="分类" width="120">
        </el-table-column>
        <el-table-column prop="pub_date" label="发表时间" width="200">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              class="chgBtn"
              @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              class="chgBtn"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="params.pagesize"
        :total="articleTotal"
        :current-page="params.pagenum"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="padding: 30px 5px 0"
      >
      </el-pagination>
    </el-card>
    <el-dialog :visible.sync="dialogVisible">
      <div slot="title">
        <p style="display: flex; align-items: center; line-height: 1">
          <i class="el-icon-info"></i>
          <span>提示</span>
        </p>
      </div>
      <span style="margin-left: 32px">确定要删除本条信息吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button class="dlgBtn" type="info" @click="dialogVisible = false"
          >取消</el-button
        >
        <el-button class="dlgBtn" type="danger" @click="deleteArticle"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { infoArticle } from '@/api'
import ArticleEditor from './ArticleEditor'

export default {
  name: 'ArticleView',
  components: {
    ArticleEditor
  },
  data () {
    return {
      params: {
        pagesize: 10,
        pagenum: 1,
        cate_id: '',
        state: ''
      },
      dialogVisible: false,
      id: ''
    }
  },
  async created () {
    await this['cate/getCateList']()
    await this.getArticleList()
  },
  computed: {
    ...mapGetters(['cateList', 'articleList', 'articleTotal']),
    pubDate () {
      return {}
    }
  },
  methods: {
    ...mapActions(['cate/getCateList', 'article/getArticleList']),
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.getArticleList()
        } else {
          return false
        }
      })
    },
    async resetForm (formName) {
      this.$refs[formName].resetFields()
      await this.getArticleList()
    },
    handleAdd () {
      this.$router.push({ hash: '#edit' })
    },
    handleEdit (row) {
      this.$router.push({ hash: '#edit', query: { id: row.id } })
    },
    handleDelete (row) {
      this.dialogVisible = true
      this.id = row.id
    },
    async deleteArticle () {
      await infoArticle({ id: this.id, method: 'delete' })
      await this.getArticleList()
      this.dialogVisible = false
      this.id = ''
    },
    async getArticleList () {
      const params = this.params
      params.cate_id === '' && delete params.cate_id
      params.state === '' && delete params.state
      await this['article/getArticleList'](params)
    },
    async handleSizeChange (val) {
      this.params.pagesize = val
      await this.getArticleList()
    },
    async handleCurrentChange (val) {
      this.params.pagenum = val
      await this.getArticleList()
    }
  },
  watch: {
    async $route (to, from) {
      if (to.hash === '#edit') {
        Object.assign(this.$data, this.$options.data())
        await this.getArticleList()
      }
      const oldTotal = this.articleTotal
      if (from.hash === '#edit') {
        await this.getArticleList()
        if (this.articleTotal !== oldTotal) {
          await this.handleCurrentChange(
            Math.ceil(this.articleTotal / this.params.pagesize)
          )
        }
      }
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

  /deep/ .el-input__inner {
    width: 240px;
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

.scrBtn {
  padding: 0;
  width: 60px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
}

.addBtn {
  padding: 0;
  float: right;
  width: 88px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
}

.chgBtn {
  padding: 0;
  width: 52px;
  height: 26px;
  font-size: 14px;
  line-height: 26px;
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
  color: #0052d9;

  &:hover {
    background-color: #f5f6fa;
    border-color: #f5f6fa;
  }
}

.el-button--danger {
  background-color: #f46c6c;
  border-color: #f46c6c;

  &:hover {
    background-color: #f38484;
    border-color: #f38484;
  }
}

/deep/ .cell {
  padding-left: 24px !important;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
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
</style>
