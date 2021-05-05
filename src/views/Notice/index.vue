<template>
  <div>
    <!-- <router-view></router-view> -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="轮播图" name="swiper">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="友链管理" name="friend">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="图片管理" name="images">
          <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="佳句管理" name="centences">
          <router-view></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'swiper'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.$router.push(tab.name)
    }
  }
};
</script>

<style></style>
