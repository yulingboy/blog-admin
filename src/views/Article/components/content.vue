<template>
  <div>
    <!-- 编辑文章区域 -->
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
        <el-input
          style="margin-top: 15px;"
          placeholder="请输入内容"
          v-model="description"
        >
          <template slot="prepend">文章描述</template>
        </el-input>
        <!-- 文章封面 -->
        <el-input
          style="margin-top: 15px;"
          placeholder="请输入内容"
          v-model="cover"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-upload"
            @click="upImgDialogVisible = true"
          ></i>
          <template slot="prepend">文章封面</template>
        </el-input>
        <el-row :gutter="10">
          <!-- 文章标签  -->
          <el-col :span="14">
            <!-- 文章标签 -->
            <div class="tagForm">
              <span class="tag-title">标签</span>
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
                >{{ tag }}</el-tag
              >
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              ></el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ New Tag</el-button
              >
            </div>
          </el-col>
          <!-- 文章分类 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-select
                v-model="value"
                @change="getClassify"
                placeholder="请选择"
                style="margin-top: 15px;"
              >
                <el-option
                  v-for="item in options"
                  :key="item._id"
                  :label="item.classify"
                  :value="item.classify"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <!-- 是否发布 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-select
                v-model="isPublishValue"
                placeholder="是否发布"
                style="margin-top: 15px;"
              >
                <el-option
                  v-for="item in isPublish"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <!-- 提交 -->
          <el-col :span="2">
            <el-button type="primary" class="submitBtn" @click="addArticle"
              >提交</el-button
            >
          </el-col>
        </el-row>
      </div>
      <div class="btn-list">
        <el-button type="primary" id="fileImport" @click="clickLoad">导入</el-button>
        <input
          type="file"
          id="files"
          ref="refFile"
          style="display: none"
          v-on:change="getdata"
        />
      </div>
      <!-- 输入区域 -->
      <div class="rich-text-test">
        <vue-html5-editor
          :content="content"
          @change="updateData"
          :height="500"
          :z-index="1000"
          :auto-height="true"
          :show-module-name="false"
        ></vue-html5-editor>
      </div>
    </el-card>
    <!-- 上传图片 -->
    <el-dialog title="上传图片" :visible.sync="upImgDialogVisible" width="50%">
      <up-img @getImg="getImg"></up-img>
    </el-dialog>
  </div>
</template>

<script>
import classifyApi from '@/api/classify';
import ArticleApi from '@/api/article';
import UpImg from '@/components/UpImg.vue';
export default {
  components: {
    UpImg
  },
  data() {
    return {
      // 文章标题
      title: '',
      // 默认封面
      cover:
        'http://images.bianxiaofeng.com/ced846eab08578468670a87333e05b5f.jpg',
      // 文章描述
      description: '',
      options: [],
      // 是否发布
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
      // 分类
      classify: '',
      // 标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      // 文章内容
      content: '测试',
      // 上传图片区域是否显示
      upImgDialogVisible: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 获取分类列表
    async init() {
      console.log(this.$route.params);
      await classifyApi.getClassifyList().then(res => {
        if (res.meta.status === 200) {
          this.options = res.data.categories;
        }
      });
      if (this.$route.params.id) {
        console.log(this.$route);
        var id = this.$route.params.id
        console.log(id)
        await ArticleApi.getArticle(id)
          .then(res => {
            console.log(res);
            if (res.meta.status === 200) {
              this.title = res.data.title;
              this.cover = res.data.cover;
              this.description = res.data.description;
              this.content = res.data.content;
              this.dynamicTags = res.data.tag;
              this.value = res.data.classify;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 添加文章
    addArticle: async function() {
      const addForm = {
        title: this.title,
        cover: this.cover,
        description: this.description,
        content: this.content,
        tag: this.dynamicTags,
        classify: this.classify,
        isPublish: Boolean(this.isPublishValue)
      };
      console.log(addForm);
      await ArticleApi.addArticle(addForm).then(res => {
        console.log(res);
        this.title = '';
        this.cover = '';
        this.description = '';
        this.content = '';
        this.dynamicTags = '';
        this.value = '';
        if (res.meta.status === 200) {
          this.$message.success('发表成功！');
          this.$router.push('/articles/list');
        } else {
          this.$message.error('发表失败！');
        }
      });

      //   if (res.status !== 200) {
      //     this.$message.error('发表失败！');
      //     return;
      //   }
      //   console.log('登录成功');
      //   this.$message.success('发表成功！');
      //   this.$router.push('/articles');
    },
    // 选择分类
    getClassify(e) {
      this.classify = e;
      console.log(e);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      const inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    updateData(e) {
      this.content = e;
    },
    getImg(obj) {
      console.log(obj);
      this.upImgDialogVisible = false;
      this.cover = obj.img;
    },
    clickLoad() {
      this.$refs.refFile.dispatchEvent(new MouseEvent('click'));
    },
    getdata(e) {
      const selectedFile = this.$refs.refFile.files[0];
      console.log(this.$refs.refFile.files[0].path);
      var reader = new FileReader();
      reader.readAsText(selectedFile);
      // console.log(reader.readAsText(selectedFile))
      var _this = this;
      reader.onload = function() {
        console.log(this.result);
        _this.content = this.result;
      };
    }
  }
};
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
  overflow-y: auto;
}
.submitBtn {
  margin-top: 15px !important;
}
.btn-list {
  margin-top: 10px;
}
#fileImport{}
</style>
