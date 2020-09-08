<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>友情链接</el-breadcrumb-item>
      <el-breadcrumb-item>链接管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索区域 -->
      <div slot="header">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-input placeholder="请输入网站名称" v-model="title" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-input placeholder="请输入网站地址" v-model="url" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-button type="primary" @click="addFriendly">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <!-- 数据表格区域 -->
        <el-table :data="friendlyData" stripe style="width: 100%" border :cell-style="rowClass" :header-cell-style="headClass">
          <el-table-column prop="_id" label="id"></el-table-column>
          <el-table-column prop="time" :formatter="dateFormat" label="创建时间"></el-table-column>
          <el-table-column prop="title" label="网站"></el-table-column>
          <el-table-column prop="url" label="地址"></el-table-column>
          <el-table-column label="编辑">
            <template slot-scope="scope">
              <el-button @click="editFriendly(scope.row._id)" type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
              <el-button @click="deleteFriendly(scope.row._id)" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 编辑链接区域弹框 -->
        <el-dialog title="修改友情链接" :visible.sync="editFriendlyDialogVisible" width="50%">
          <div>
            <el-form ref="form" :model="friendlyForm" label-width="80px">
              <el-form-item label="id">
                <el-input v-model="friendlyForm._id" disabled></el-input>
              </el-form-item>
              <el-form-item label="网站">
                <el-input v-model="friendlyForm.title"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="friendlyForm.url"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editFriendlyDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateFriendly">确 定</el-button>
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
      // 搜索框输入值
      input: '',
      // 获取数据
      friendlyData: [],
      // 修改用户框是否显示
      editFriendlyDialogVisible: false,
      // 需要修改的链接信息
      friendlyForm: [],
      title: '',
      url: ''
    }
  },
  created () {
    this.getFriendlyList()
  },
  methods: {
    // 获取链接列表
    async getFriendlyList () {
      const { data: res } = await this.$http.get('friendlylist')
      console.log(res)
      this.friendlyData = res.friendly
    },
    // 获取链接列表
    async editFriendly (id) {
      const { data: res } = await this.$http.get('getfriendly', { params: { id: id } })
      if (res.status !== 200) {
        this.$message.error('获取友情链接信息失败！')
      }
      this.$message.success('获取友情链接信息成功！')
      // this.getFriendlyList()
      console.log(res)
      this.friendlyForm = res.friendly
      this.editFriendlyDialogVisible = true
    },
    // 修改链接信息
    updateFriendly: async function () {
      this.editFriendlyDialogVisible = false
      const { data: res } = await this.$http.put('updatefriendly', this.friendlyForm)
      if (res.status !== 200) {
        this.$message.error('更新友情链接信息失败！')
      }
      this.$message.success('更新友情链接信息成功！')
      this.getFriendlyList()
    },
    // 删除链接信息
    deleteFriendly: function (id) {
      this.$confirm('您确定要删除该分类吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(async () => {
          await this.$http.delete('deletefriendly', { params: { id: id } })
          this.getFriendlyList()
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
    addFriendly: async function () {
      const { data: res } = await this.$http.post('friendly', { title: this.title, url: this.url })
      this.title = ''
      this.url = ''
      this.getFriendlyList()
      if (res.status !== 200) {
        this.$message.error('添加友情链接失败')
      } else {
        this.$message.success('添加友情链接成功')
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
      return moment(date).format('YYYY-MM-DD HH:MM:ss')
    }
  }
}
</script>

<style>
</style>
