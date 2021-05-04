<template>
  <el-menu
    background-color="#333744"
    text-color="#fff"
    active-text-color="#409eff"
    unique-opened
    :collapse="$store.state.isCollapse"
    :collapse-transition="false"
    router
  >
    <!-- <div class="collapse" @click="checkCollapse">|||</div> -->
    <el-menu-item v-for="item in menu" :key="item.path" :index="item.path">
      <i :class="item.meta.icon"></i>
      <span slot="title">{{ item.meta.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import menu from '../router/index';
export default {
  data() {
    return {
      // 判断左侧菜单是否收起
      isCollapse: false,
      //   菜单列表
      menu: []
    };
  },
  created() {
    this.filterMenu(menu.options.routes);
  },
  methods: {
    // 判断左侧菜单是否收起
    // checkCollapse() {
    //   this.isCollapse = !this.isCollapse;
    //   const data = this.isCollapse;
    //   this.$emit('changeIsCollapse', data);
    // },
    // 路由数据过滤
    filterMenu(data) {
      this.menu = data[1].children;
    }
  }
};
</script>

<style lang="less" scoped>
.collapse {
  color: #ffffff;
  background: #333;
  text-align: center;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  letter-spacing: 0.2em;
}
</style>
