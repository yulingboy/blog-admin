<template>
  <!-- 主体区域 -->
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>雨凌的个人博客后台</span>
      </div>
      <el-button @click="layout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
        >
        <div class="collapse" @click="checkCollapse">|||</div>
          <!-- 用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <router-link to="/users">用户列表</router-link>
              </template>
            </el-menu-item>
            <el-menu-item index="1-2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <router-link to="/adduser">添加用户</router-link>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 文章管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="2-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <router-link to="/addarticle">发布文章</router-link>
              </template>
            </el-menu-item>
            <el-menu-item index="2-2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <router-link to="/articles">文章管理</router-link>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 评论管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>评论管理</span>
            </template>
            <el-menu-item index="3-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <router-link to="/comment">评论管理</router-link>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 分类管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>分类管理</span>
            </template>
            <el-menu-item index="4-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <router-link to="/classify">分类管理</router-link>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 友情链接 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>友情链接</span>
            </template>
            <el-menu-item index="5-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <router-link to="/friendly">链接管理</router-link>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 系统设置 -->
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="6-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>系统设置</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 判断左侧菜单是否收起
      isCollapse: false
    }
  },
  methods: {
    // 判断左侧菜单是否收起
    checkCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 退出
    layout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.collapse {
  // margin: 0 auto;
  color: #ffffff;
  background:#333;
  text-align: center;
  height: 40px;
  line-height: 40px;
  // width: 200px;
  cursor: pointer;
  letter-spacing: .2em;
}
.home-container {
  height: 100%;
}
.el-header {
  background: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background: #eaedf1;
}
</style>
