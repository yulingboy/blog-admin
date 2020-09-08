<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索框  -->
      <div slot="header">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-button type="primary">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 用户列表  -->
      <div>
        <el-table :data="userData" stripe style="width: 100%" border :cell-style="rowClass" :header-cell-style="headClass">
          <el-table-column prop="_id" label="id"></el-table-column>
          <el-table-column prop="role" label="权限">
            <template slot-scope="slot">
              <el-tag type="primary">{{slot.row.role == '0' ? '普通用户' : '管理员'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="slot">
              <el-tag type="primary">{{slot.row.state == '0' ? '启用' : '禁用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="编辑">
            <template slot-scope="scope">
              <el-button @click="editUser(scope.row._id)" type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
              <el-button @click="deleteUser(scope.row._id)" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 编辑用户区域弹框 -->
        <el-dialog title="编辑用户" :visible.sync="editUserDialogVisible" width="50%">
          <div>
            <el-form ref="form" :model="userForm" label-width="80px">
              <el-form-item label="id">
                <el-input v-model="userForm._id" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" >
                <el-input v-model="userForm.email" @change="changeemail"></el-input>
              </el-form-item>
              <el-form-item label="用户名" >
                <el-input v-model="userForm.username"></el-input>
              </el-form-item>
              <el-form-item label="权限">
                <el-select v-model="userForm.role">
                  <el-option label="普通用户" value="0"></el-option>
                  <el-option label="管理员" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="userForm.state">
                  <el-option label="启用" value="0"></el-option>
                  <el-option label="禁用" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editUserDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateUser">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 分页 -->
      <el-pagination :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize"  layout="total, prev, pager, next, jumper" :total="total" @current-change="currentChange"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 搜索框输入值
      input: '',
      // 模拟用户数据
      userData: [],
      // 分页当前页
      currentPage: 1,
      // 每页显示几条数据
      pageSize: 4,
      // 数据总数
      total: 0,
      // 修改用户框是否显示
      editUserDialogVisible: false,
      // 获取到的用户信息
      userForm: {}
    }
  },
  created () {
    // 获取数据列表
    this.getUserList()
  },
  methods: {
    // 获取用户列表
    async getUserList () {
      const { data: res } = await this.$http.get('userlist', { params: { currentPage: this.currentPage } })
      // console.log(res)
      this.total = res.count
      this.userData = res.users
      console.log(res.users)
    },
    // 获取需要修改修改用户的数据
    async editUser (id) {
      this.editUserDialogVisible = true
      const { data: res } = await this.$http.get('getuser', { params: { id: id } })
      if (res.status !== 200) {
        return this.$message.error('获取用户信息失败')
      }
      // res.user.role = res.user.role == '0' : '普通用户' ? '管理员'
      this.userForm = res.user
      if (this.userForm.role === 0) {
        this.userForm.role = '普通用户'
      } else {
        this.userForm.role = '管理员'
      }
      if (this.userForm.state === 0) {
        this.userForm.state = '启用'
      } else {
        this.userForm.state = '禁用'
      }
      console.log(this.userForm)
    },
    // 修改用户信息
    async updateUser () {
      this.editUserDialogVisible = false
      console.log(this.userForm)
      if (this.userForm.role === '普通用户') {
        this.userForm.role = 0
      } else {
        this.userForm.role = 1
      }
      if (this.userForm.state === '启用') {
        this.userForm.state = 0
      } else {
        this.userForm.state = 1
      }
      const { data: res } = await this.$http.put('updateuser', this.userForm)
      if (res.status !== 200) {
        this.$message.error('更新用户信息失败')
      }
      this.getUserList()
      // console.log(res)
    },
    // 删除用户
    deleteUser: function (id) {
      this.$confirm('您确定要删除用户吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(async () => {
          await this.$http.delete('deleteuser', { params: { id: id } })
          this.getUserList()
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
    // 数据页面跳转
    currentChange: function (currentPage) {
      // console.log(currentPage)
      this.currentPage = currentPage
      this.getUserList()
    },
    // 表头样式设置
    headClass () {
      return 'text-align: center'
    },
    // 表格样式设置
    rowClass () {
      return 'text-align: center'
    },
    changeemail: function (e) {
      console.log(e)
      console.log(this.userForm)
    }
  }
}
</script>

<style>
</style>
