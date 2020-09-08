<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top: 15px;">
      <!-- 搜索区域 -->
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
      <!-- 文章列表区域 -->
      <div>
        <el-table :data="comments" stripe fit style="width: 100%" border :cell-style="rowClass" :header-cell-style="headClass">
          <el-table-column prop="uid.username" label="评论人"></el-table-column>
          <el-table-column prop="aid.title" label="评论文章"></el-table-column>
          <el-table-column prop="time" :formatter="dateFormat" label="评论时间"></el-table-column>
          <el-table-column prop="content" label="content"></el-table-column>
          <!-- <el-table-column prop="isPublish" label="是否发布">
            <template slot-scope="slot">
              <el-switch @change="changePublish(slot.row)" v-model="slot.row.isPublish" active-text="已发布" inactive-text="未发布"></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="isPublish" label="是否推荐">
            <template slot-scope="slot">
              <el-switch @change="changeHot(slot.row)" v-model="slot.row.isHot" active-text="已推荐" inactive-text="未推荐"></el-switch>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="editComment(scope.row._id)" type="primary" size="mini" icon="el-icon-edit">回复</el-button>
              <el-button @click="deleteComment(scope.row._id)" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 编辑用户区域弹框 -->
        <!-- 删除用户区域 -->
      </div>
      <!-- 分页 -->
      <el-pagination :current-page="currentPage" :page-sizes="[1, 2, 3, 4]" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total" @current-change="currentChange"></el-pagination>
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
      // 评论数据
      comments: [],
      // 分页当前页
      currentPage: 1,
      // 每页显示几条数据
      pageSize: 4,
      // 数据中暑
      total: 0,
      radio: '',
      // 修改用户框是否显示
      publishArticleDialogVisible: false,
      // 删除用户框是否显示
      deleteUserDialogVisible: false,
      publishValue: true,
      isPublish: ''
    }
  },
  created () {
    this.getCommentList()
  },
  methods: {
    // 格式化时间戳
    dateFormat: function (row, column) {
      const date = row[column.property]
      if (date === undefined) { return '' }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    // 获取文章列表
    async getCommentList () {
      const { data: res } = await this.$http.get('commentlist', { params: { currentPage: this.currentPage } })
      // console.log(res)
      this.total = res.count
      this.comments = res.comments
      // console.log(res.comments)
    },
    // 编辑文章
    editArticle: function (id) {
      console.log(id)
      this.$router.push('/editarticle?id=' + id)
    },
    // 删除文章
    deleteComment: function (id) {
      this.$confirm('您确定要删除该文章吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(async () => {
          await this.$http.delete('deletecomment', { params: { id: id } })
          this.getCommentList()
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
    // 数据表分页
    currentChange: function (currentPage) {
      // console.log(currentPage)
      this.currentPage = currentPage
      this.getCommentList()
    },
    // 是否发布
    async changePublish (row) {
      const { data: res } = await this.$http.put('changepublish', row)
      // console.log(res)
      if (res.status !== 200) {
        this.$message.error('切换失败')
      } else {
        this.$message.success('切换成功')
      }
      this.getArticleList()
    },
    // 是否推荐
    async changeHot (row) {
      const { data: res } = await this.$http.put('changehot', row)
      // console.log(res)
      if (res.status !== 200) {
        this.$message.error('切换失败')
      } else {
        this.$message.success('切换成功')
      }
      this.getArticleList()
    },
    // 表头样式设置
    headClass () {
      return 'text-align: center'
    },
    // 表格样式设置
    rowClass () {
      return 'text-align: center'
    }
  }
}
</script>

<style>
</style>
