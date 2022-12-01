<template>
  <div id="cate">
    <el-card>
      <div slot="header" style="overflow: hidden;">
        <span style="font-size: 16px;font-weight: 500;line-height: 40px;">文章分类</span>
        <el-button class="addBtn" type="primary" @click="handleAdd">添加分类</el-button>
      </div>
      <el-table :data="cateList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="130">
        </el-table-column>
        <el-table-column prop="cate_name" label="项目名称" width="420">
        </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名" width="350">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" class="chgBtn" @click="handleInfo(scope.row)">修改</el-button>
            <el-button type="danger" class="chgBtn" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="cateDialog">
      <div slot="title">
        <p style="display: flex;align-items: center;line-height: 1;">
          <i class="el-icon-info"></i>
          <span>{{ dialogTitle }}</span>
        </p>
      </div>
      <span v-if="isDel" style="margin-left: 32px;">确定要删除本条信息吗？</span>
      <el-form v-else ref="addCate" :model="data" :rules="rules" label-width="auto">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="data.cate_name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="data.cate_alias" placeholder="请输入别名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="dlgBtn" type="info" @click="cancel">取消</el-button>
        <el-button class="dlgBtn" type="primary" @click="submitCate">{{ dialogFooter }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { addCate, infoCate, delCate } from '@/api'

export default {
  name: 'CateView',
  data () {
    return {
      cateDialog: false,
      dialogTitle: '',
      isDel: false,
      dialogFooter: '',
      submitCate: '',
      data: {
        cate_name: '',
        cate_alias: ''
      },
      cate_id: '',
      rules: {
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 10, message: '分类名称长度应在1-10位字符之间，请重新输入', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]+$/, message: '分类别名只能包含字母和数字，请重新输入', trigger: 'change' },
          { min: 1, max: 15, message: '分类别名长度应在1-15位字符之间，请重新输入', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    await this['cate/getCateList']()
  },
  computed: {
    ...mapGetters(['cateList'])
  },
  methods: {
    ...mapActions(['cate/getCateList']),
    handleAdd () {
      this.dialogTitle = '添加分类'
      this.dialogFooter = '添加'
      this.submitCate = this.addCate
      this.cateDialog = true
    },
    handleInfo (row) {
      this.dialogTitle = '修改文章分类'
      this.dialogFooter = '确认修改'
      this.submitCate = this.infoCate
      this.cateDialog = true
      this.$nextTick(() => {
        this.data.cate_name = row.cate_name
        this.data.cate_alias = row.cate_alias
        this.cate_id = row.id
      })
    },
    handleDel (row) {
      this.dialogTitle = '提示'
      this.isDel = true
      this.dialogFooter = '确认删除'
      this.submitCate = this.delCate
      this.cateDialog = true
      this.$nextTick(() => {
        this.cate_id = row.id
      })
    },
    cancel () {
      this.cateDialog = false
      this.$refs.addCate.resetFields()
    },
    addCate () {
      this.$refs.addCate.validate(async valid => {
        if (valid) {
          await addCate(this.data)
          this.cateDialog = false
          this.$refs.addCate.resetFields()
          await this['cate/getCateList']()
        }
      })
    },
    infoCate () {
      this.$refs.addCate.validate(async valid => {
        if (valid) {
          const data = this.data
          data.id = this.cate_id
          await infoCate(data)
          this.cateDialog = false
          this.$refs.addCate.resetFields()
          await this['cate/getCateList']()
        }
      })
    },
    async delCate () {
      await delCate(this.cate_id)
      this.cateDialog = false
      await this['cate/getCateList']()
    }
  }
}
</script>

<style lang="less" scoped>
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
  color: rgba(0, 0, 0, 0.90);

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

/deep/ .el-dialog {
  width: 410px;

  .el-dialog__header {
    .el-icon-info {
      margin-right: 8px;
      font-size: 24px;
      color: #4F81FF;
    }

    span {
      margin-bottom: 1px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.90);
    }

  }

  .el-form-item {
    margin-bottom: 8px;
  }

  .el-form-item__label {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.90);

  }

  .el-input__inner {
    height: 32px;
    font-size: 14px;
    color: #999999;
  }

  .dlgBtn {
    padding: 0 16px;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
  }
}
</style>
