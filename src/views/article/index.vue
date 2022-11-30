<template>
  <div id="article">
    <el-card>
      <div slot="header" style="overflow: hidden;">
        <span style="font-size: 16px;font-weight: 500;line-height: 40px;">文章列表</span>
      </div>
      <el-form ref="screen" :inline="true" :model="screen" class="demo-form-inline">
        <el-form-item label="文章分类">
          <el-select v-model="screen.cate_id" placeholder="请选择分类">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态">
          <el-select v-model="screen.state" placeholder="请选择状态">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="scrBtn" type="primary" @click="onSubmit">筛选</el-button>
          <el-button class="scrBtn" type="info" @click="resetForm">重置</el-button>
        </el-form-item>
        <el-button class="addBtn" type="primary">发表文章</el-button>
      </el-form>
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column prop="id" label="文章标题">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类" width="120">
        </el-table-column>
        <el-table-column prop="cate_alias" label="发表时间" width="200">
        </el-table-column>
        <el-table-column prop="cate_alias" label="状态" width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" class="chgBtn" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button type="danger" class="chgBtn" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :page-size="pagesize" :total="articleTotal" :current-page="pagenum"
        layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30, 40]" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" style="padding: 30px 5px 0;">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ArticleView',
  data () {
    return {
      pagesize: 10,
      pagenum: 1,
      cate_id: '',
      state: '',
      screen: {
        cate_id: '',
        state: ''
      }
    }
  },
  async created () {
    await this.getArticleList()
  },
  computed: {
    ...mapGetters(['articleList', 'articleTotal'])
  },
  methods: {
    ...mapActions(['article/getArticleList']),
    onSubmit () {
      console.log('submit!')
    },
    resetForm () {
      console.log(this.$refs.screen.$el.innerText)
      this.$refs.screen.resetFields()
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    async getArticleList () {
      await this['article/getArticleList']({
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
    },
    async handleSizeChange (val) {
      this.pagesize = val
      await this.getArticleList()
    },
    async handleCurrentChange (val) {
      this.pagenum = val
      await this.getArticleList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form-item {
  /deep/ .el-form-item__label {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.40);
  }

  /deep/ .el-input__inner {
    width: 240px;
    height: 40px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.26);
  }

  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: #ECF2FE;
    color: #0052D9;
  }
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
  background-color: #4F81FF;
  border-color: #4F81FF;

  &:hover {
    background-color: #608DFF;
    border-color: #608DFF;
  }
}

.el-button--info {
  background-color: #EAECF5;
  border-color: #EAECF5;
  color: #0052D9;

  &:hover {
    background-color: #F5F6FA;
    border-color: #F5F6FA;
  }
}

.el-button--danger {
  background-color: #F46C6C;
  border-color: #F46C6C;

  &:hover {
    background-color: #F38484;
    border-color: #F38484;
  }
}

/deep/ .cell {
  padding-left: 24px !important;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
}
</style>
