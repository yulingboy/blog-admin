<template>
  <div class="home-header">
    <!-- logo -->
    <div class="home-header-title">
      后台管理
      <i class="el-icon-s-fold home-header-icon" @click="checkCollapse"></i>
    </div>
    <!-- 个人信息 -->
    <div class="home-header-user">
      <div class="user-index">欢迎登陆，{{ $store.state.user.username }}</div>
      <div class="user-more">
        <div class="user-info">个人信息</div>
        <div class="user-layout" @click="layout">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 判断左侧菜单是否收起
      isCollapse: false
    };
  },
  methods: {
    // 退出登录
    layout() {
      this.$confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('layout');
          this.$router.push('/login');
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
    },
    // 判断左侧菜单是否收起
    checkCollapse() {
      this.$store.state.isCollapse = !this.isCollapse
      this.isCollapse = !this.isCollapse;
      const data = this.isCollapse;
      this.$emit('changeIsCollapse', data);
    }
  }
};
</script>

<style lang="less" scoped>
.home-header {
  z-index: 999;
  padding: 0 20px;
  line-height: 60px;
  background: #409eff;
  display: flex;
  justify-content: space-between;
  box-shadow: 10px 10px 5px #888888;
  .home-header-title {
    width: 200px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    .home-header-icon {
      position: absolute;
      left: 200px;
      top: 20px;
      cursor: pointer;
    }
  }
  .home-header-user {
    position: relative;
    z-index: 999;
    cursor: pointer;
    &:hover .user-more {
      display: block;
    }
    .user-index {
      color: pink;
      cursor: pointer;
      &:hover {
        color: #eee;
      }
    }
    .user-more {
      display: none;
      position: absolute;
      top: 60px;
      left: 0;
      div {
        background-color: #eee;
        width: 120px;
        text-align: center;
        &:hover {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
