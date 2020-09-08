<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章编辑</span>
      </div>
      <div>
        <!-- 文章标题 -->
        <el-input placeholder="请输入内容" v-model="title">
          <template slot="prepend">文章标题</template>
        </el-input>
        <!-- 文章描述 -->
        <el-input style="margin-top: 15px;" placeholder="请输入内容" v-model="description">
          <template slot="prepend">文章描述</template>
        </el-input>
        <!-- 文章封面 -->
        <el-input style="margin-top: 15px;" placeholder="请输入内容" v-model="cover">
          <template slot="prepend">文章封面</template>
        </el-input>
        <el-row :gutter="10">
          <!-- 文章标签  -->
          <el-col :span="14">
            <!-- 文章标签 -->
            <div class="tagForm">
              <span class="tag-title">标签</span>
              <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </div>
          </el-col>
          <!-- 文章分类 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-select v-model="value" @change="getClassify" placeholder="请选择" style="margin-top: 15px;">
                <el-option v-for="item in options" :key="item._id" :label="item.classify" :value="item.classify"></el-option>
              </el-select>
            </div>
          </el-col>
          <!-- 是否发布 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-select v-model="isPublishValue" placeholder="是否发布" style="margin-top: 15px;">
                <el-option v-for="item in isPublish" :key="item.value" :label="item.label" :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <!-- 提交 -->
          <el-col :span="2">
             <el-button type="primary" class="submitBtn" @click="addArticle">提交</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 输入区域 -->
      <div class="rich-text-test">
        <vue-html5-editor :content="content" @change="updateData" :height="500" :z-index="1000" :auto-height="true" :show-module-name="false"></vue-html5-editor>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      cover: '',
      description: '',
      options: [],
      isPublish: [
        {
          value: 1,
          label: '发布'
        },
        {
          value: 0,
          label: '保存'
        }
      ],
      isPublishValue: '是否发布',
      value: '分类',
      classify: '',
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      content: '测试'
    }
  },
  created () {
    this.getClassifyList()
  },
  methods: {
    // 获取分类列表
    async getClassifyList () {
      const { data: res } = await this.$http.get('classifylist')
      this.options = res.classifylist
      // console.log(res)
    },
    addArticle: async function () {
      const addForm = {
        title: this.title,
        cover: this.cover,
        description: this.description,
        content: this.content,
        tag: this.dynamicTags,
        classify: this.classify,
        isPublish: Boolean(this.isPublishValue)
      }
      console.log(addForm)
      const { data: res } = await this.$http.post('article', addForm)
      console.log(addForm)
      if (res.status !== 200) {
        // console.log('登录失败')
        this.$message.error('发表失败！')
        return
      }
      console.log('登录成功')
      this.$message.success('发表成功！')
      // window.sessionStorage.setItem('token', res.token)
      // this.$router.push('/home')
    },
    // 选择分类
    getClassify (e) {
      this.classify = e
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    updateData (e) {
      this.content = e
      // console.log(e)
    }
  }
}
</script>

<style lang="less" scroped>
  .tagForm {
    margin-top: 15px;
    height: 40px;
    line-height: 40px;
    .tag-title {
      margin-right: 10px;
    }
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px !important;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px !important;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .rich-text-test {
    height: 400px;
  }
  .vue-html5-editor {
    height: 100%;
    margin-top: 15px;
  }
  .submitBtn {
    margin-top: 15px !important;
  }
</style>
