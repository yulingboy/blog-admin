<template>
  <div>
    <!-- <el-breadcrumb v-if="this.$route.matched" separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">统计</a></el-breadcrumb-item>
    </el-breadcrumb> -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in breadcrumb"
        :key="item.path"
        :to="item.path"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumb: []
    };
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      this.breadcrumb = this.$route.matched;
    }
  }
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>
