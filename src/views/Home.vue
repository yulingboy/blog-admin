<template>
  <!-- 主体区域 -->
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <home-header @changeIsCollapse="updateIsCollapse"></home-header>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 侧边栏菜单 -->
        <home-aside></home-aside>
      </el-aside>
      <!-- 主体区域 -->
      <el-main class="main-container">
        <!-- 面包屑导航 -->
        <creadcrumb-nav></creadcrumb-nav>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeHeader from '@/components/HomeHeader';
import HomeAside from '@/components/HomeAside';
import CreadcrumbNav from '@/components/Creadcrumb';
export default {
  components: {
    HomeHeader,
    HomeAside,
    CreadcrumbNav
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    updateIsCollapse(data) {
      this.isCollapse = data;
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
   overflow: hidden;
  .el-header {
    margin: 0;
    padding: 0;
    box-shadow: 10px 10px 5px #888888;
  }
}
.home-container {
  overflow: hidden;
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background: #eaedf1;
  // overflow-y: hidden;
  height: calc(100vh - 60px);
}
</style>
