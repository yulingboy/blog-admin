<template>
  <div class="login-wrapper">
    <el-card class="box-card login-box">
      <div slot="header" class="clearfix login-box-title">管理员登录</div>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
        <!-- 邮箱 -->
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 登录 -->
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="submitForm('loginForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import api from '../../api/login';
export default {
  data() {
    const EmailReg = /^[\w-]+@[\w.-]+.com$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      }
      if (EmailReg.test(value)) {
        return callback();
      } else {
        return callback(new Error('邮箱格式不正确！'));
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: 'test111@qq.com',
        password: '123456'
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      }
    };
  },
  methods: {
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.login(this.loginForm).then(res => {
            console.log(res);
            if (res.meta.status === 200) {
              this.$store.dispatch('setUserInfo', {
                ...res.data.user,
                token: res.data.token
              });
              this.$message({
                showClose: true,
                message: res.meta.message,
                type: 'success'
              });
              this.$router.push('/');
            } else {
              this.$message({
                showClose: true,
                message: res.meta.message,
                type: 'error'
              });
            }
          });
        } else {
          console.log('fail');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/backgorand.jpg') no-repeat center;
  .login-box {
    width: 500px;
    height: 280px;
    max-width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .login-box-title {
      font-weight: bold;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
