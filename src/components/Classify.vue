<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索区域 -->
      <div slot="header">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-input placeholder="请输入内容" v-model="classifyValue" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-button type="primary" @click="addClassify">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <!-- 数据表格区域 -->
        <el-table :data="classifyData" stripe style="width: 100%" border :cell-style="rowClass" :header-cell-style="headClass">
          <el-table-column prop="_id" label="id"></el-table-column>
          <el-table-column prop="time" :formatter="dateFormat" label="创建时间"></el-table-column>
          <el-table-column prop="classify" label="类名"></el-table-column>
          <!-- <el-table-column prop="state" label="状态"></el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="getClasify(scope.row._id)" type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
              <el-button @click="deleteClassify(scope.row._id)" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 编辑用户区域弹框 -->
        <el-dialog title="修改文章分类" :visible.sync="editUserDialogVisible" width="50%">
          <div>
            <el-form ref="form" :model="classifyForm" label-width="80px">
              <el-form-item label="id">
                <el-input v-model="classifyForm._id" disabled></el-input>
              </el-form-item>
              <el-form-item label="分类">
                <el-input v-model="classifyForm.classify"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editUserDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editClasify">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      // 添加分类输入值
      classifyValue: '',
      // 文章分类数据
      classifyData: [],
      // 修改文章分类数据
      classifyForm: {},
      // 修改用户框是否显示
      editUserDialogVisible: false
    }
  },
  created () {
    this.getClassifyList()
  },
  methods: {
    // 获取用户列表
    async getClassifyList () {
      const { data: res } = await this.$http.get('classifylist')
      console.log(res)
      this.classifyData = res.classifylist
    },
    // 获取需要修改文章分类
    getClasify: async function (id) {
      this.editUserDialogVisible = true
      const { data: res } = await this.$http.get('getclassify', { params: { id: id } })
      console.log(res)
      if (res.status !== 200) {
        this.$message.error('获取分类信息失败')
      } else {
        this.classifyForm = res.classify
      }
    },
    // 修改文章分类
    editClasify: async function (id) {
      this.editUserDialogVisible = false
      const { data: res } = await this.$http.put('editclassify', this.classifyForm)
      this.getClassifyList()
      if (res.status !== 200) {
        this.$message.error('修改分类失败')
      } else {
        this.$message.success('修改分类成功')
      }
      // const { data: res } = await this.$http.get('getclassify', { params: { id: id } })
      // console.log(res)
      // if (res.status !== 200) {
      //   this.$message.error('获取分类信息失败')
      // } else {
      //   this.classifyForm = res.classify
      // }
    },
    // 删除分类
    deleteClassify: function (id) {
      this.$confirm('您确定要删除该分类吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(async () => {
          await this.$http.delete('deleteclassify', { params: { id: id } })
          this.getClassifyList()
          // console.log(id)
          this.$message({
            type: 'info',
            message: '删除成功'
          })
        })
        .catch(action => {
          this.$message({
            type: 'primary',
            message: action === 'cancel'
              ? '取消'
              : '2'
          })
        })
    },
    // 添加分类
    addClassify: async function () {
      const { data: res } = await this.$http.post('classify', { classify: this.classifyValue })
      this.classifyValue = ''
      this.getClassifyList()
      if (res.status !== 200) {
        this.$message.error('添加分类失败')
      } else {
        this.$message.success('添加分类成功')
      }
    },
    // 表头样式设置
    headClass () {
      return 'text-align: center'
    },
    // 表格样式设置
    rowClass () {
      return 'text-align: center'
    },
    // 格式化时间戳
    dateFormat: function (row, column) {
      const date = row[column.property]
      if (date === undefined) { return '' }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style>
</style>
