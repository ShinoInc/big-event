<template>
  <div id="cate">
    <el-card>
      <div slot="header" style="overflow: hidden;">
        <span style="font-size: 16px;font-weight: 500;line-height: 40px;">文章分类</span>
        <el-button class="addBtn" type="primary">添加分类</el-button>
      </div>
      <el-table :data="cateList" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="130">
        </el-table-column>
        <el-table-column prop="cate_name" label="项目名称" width="420">
        </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名" width="350">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" class="chgBtn" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button type="danger" class="chgBtn" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CateView',
  async created () {
    await this['cate/getCateList']()
  },
  computed: {
    ...mapGetters(['cateList'])
  },
  methods: {
    ...mapActions(['cate/getCateList']),
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
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
