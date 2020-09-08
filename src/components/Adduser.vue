<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加用户</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加用户区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加用户</span>
      </div>
      <div>
        <el-input placeholder="请输入内容" v-model="input3">
          <template slot="prepend">用户名</template>
        </el-input>
        <el-input style="margin-top: 15px;" placeholder="请输入内容" v-model="input3">
          <template slot="prepend">邮箱</template>
        </el-input>
        <el-input style="margin-top: 15px;" placeholder="请输入内容" v-model="input3">
          <template slot="prepend">密码</template>
        </el-input>
        <el-row :gutter="20" style="margin-top: 15px;">
          <el-col :span="6">
            <el-select v-model="roleValue" placeholder="请选择">
              <el-option
                v-for="item in role"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="stateValue" placeholder="请选择">
              <el-option
                v-for="item in state"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <my-cropper></my-cropper>
    </el-card>
  </div>
</template>

<script>
import Cropper from '../components/Newcropper'
export default {
  components: {
    'my-cropper': Cropper
  },
  data () {
    return {
      role: [
        {
          value: 1,
          label: '管理员'
        },
        {
          value: 2,
          label: '超级管理员'
        }
      ],
      roleValue: '权限',
      state: [
        {
          value: 1,
          label: '启用'
        },
        {
          value: 2,
          label: '禁用'
        }
      ],
      stateValue: '状态'
    }
  }
}
</script>

<style>
</style>
