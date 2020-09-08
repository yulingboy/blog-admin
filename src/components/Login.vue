<template>
  <div class="login_container">
    <particles-bg type="custom" :config="config" :bg="true"/>
    <div class="login_box">
      <!-- <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div> -->
      <h3 class="login_title">雨凌的个人博客</h3>
      <!-- 登录表单区域 -->
      <el-form label-width="80px" class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <!-- 用户名 -->
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" v-model="loginForm.email"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密  码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" suffix-icon="el-icon-view"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <!-- <el-button type="info" @click="resetLoginForm">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import '../assets/js/global'
export default {
  data () {
    return {
      config: {
        num: [4, 7],
        rps: 0.1,
        radius: [5, 40],
        life: [1.5, 3],
        v: [2, 3],
        tha: [-30, 30],
        alpha: [0.6, 0],
        scale: [0.1, 0.4],
        position: 'all',
        cross: 'dead',
        random: 15
      },
      // 这是登录表单的数据绑定对象
      loginForm: {
        email: 'yuling@163.com',
        password: '123456'
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // this.$router.push('/home')
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) {
          return false
        }
        const { data: res } = await this.$http.post('login', this.loginForm)
        // console.log(res)
        if (res.status !== 200) {
          // console.log('登录失败')
          this.$message.error('登录失败！')
          return
        }
        // console.log('登录成功')
        this.$message.success('登录成功！')
        window.sessionStorage.setItem('token', res.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  // background-color: #2b4b6b;
  z-index: -99;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #f0f0f0;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .login_title {
    // margin: 0 auto;
    font-size: 30px;
    margin: 30px auto;
    text-align: center;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  // display: flex;
  // justify-content: flex-end;
  // width: 100% !important;
}
</style>
