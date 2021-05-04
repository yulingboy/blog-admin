<template>
  <div>
    <el-card class="box-card">
      <el-form
        :inline="true"
        :model="searchArticleForm"
        class="demo-form-inline"
      >
        <el-form-item label="分类">
          <el-select
            v-model="searchArticleForm.classify"
            placeholder="请选择分类"
          >
            <el-option
              v-for="item in classifyList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="热门">
          <el-select
            v-model="searchArticleForm.hot"
            placeholder="请选择热门状态"
          >
            <el-option
              v-for="item in hotStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布">
          <el-select
            v-model="searchArticleForm.publish"
            placeholder="请选择发布状态"
          >
            <el-option
              v-for="item in publishStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input
            v-model="searchArticleForm.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addArticle">新增</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <article-table
      :data="articlesInfo"
      :tableColumns="tableLabel"
      :tableOption="tableOption"
      :page="pageData.pageNum"
      :rows="pageData.pageSize"
      :total="pageData.total"
      @sizeChange="sizeChange"
      @pageChange="pageChange"
      @clickButton="clickButton"
      @switchChange="switchChange"
    ></article-table>
  </div>
</template>

<script>
import api from '@/api/article.js';
import classifyApi from '@/api/classify.js';
import ArticleTable from '@/components/Table';
export default {
  components: {
    ArticleTable
  },
  data() {
    return {
      // 初始数据请求参数
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      // 搜索文章
      searchArticleForm: {
        classify: '',
        hot: '',
        publish: '',
        title: ''
      },
      // 分类列表
      classifyList: [],
      // 热门状态列表
      hotStatus: [
        { label: '热门', value: 1 },
        { label: '普通', value: 0 }
      ],
      // 发布状态列表
      publishStatus: [
        { label: '发布', value: 1 },
        { label: '保存', value: 0 }
      ],
      // 文章列表
      articlesInfo: [],
      // 页码信息
      pageData: [],
      // 表头数据
      tableLabel: [
        {
          label: 'ID',
          param: '_id',
          isSwitch: 0,
          isTag: 0
        },
        {
          label: '标题',
          param: 'title',
          isSwitch: 0,
          isTag: 0
        },
        {
          label: '分类',
          param: 'classify',
          isSwitch: 0,
          isTag: 0
        },
        {
          label: '热门状态',
          param: 'isHot',
          isSwitch: 1,
          isTag: 0,
          isImg: 0,
          success: '热门',
          fail: '普通',
          render: row => {
            if (row.isHot === true) {
              return '热门';
            } else if (row.isHot === false) {
              return '普通';
            }
          }
        },
        {
          label: '发布状态',
          param: 'isPublish',
          isSwitch: 1,
          isTag: 0,
          isImg: 0,
          success: '发布',
          fail: '草稿',
          render: row => {
            if (row.isPublish === true) {
              return '发布';
            } else if (row.isPublish === false) {
              return '草稿';
            }
          }
        }
      ],
      // 表格操作
      tableOption: {
        label: '操作',
        options: [
          {
            label: '修改',
            type: 'success',
            icon: 'el-icon-edit',
            methods: 'edit'
          },
          {
            label: '删除',
            type: 'danger',
            icon: 'el-icon-delete',
            methods: 'del'
          }
        ]
      }
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      api.getArticles(this.pageInfo).then(res => {
        console.log(res);
        if (res.meta.status === 200) {
          this.articlesInfo = res.data.articles;
          this.pageData = res.data.pagition;
        } else {
          this.$message({
            message: '获取用户列表失败！',
            type: 'warning'
          });
        }
      });
      classifyApi.getClassifyList().then(res => {
        console.log(res);
        this.classifyList = res.data.categories.map(item => {
          return {
            label: item.classify,
            value: item._id
          };
        });
      });
    },
    // 根据标题搜索文章
    search() {},
    // 新增文章
    addArticle() {
      this.$router.push('/articles/add');
    },
    // 每页显示多少条数据
    sizeChange(val) {
      console.log(val);
      this.pageInfo.pageSize = val;
      this.pageInfo.pageNum = this.pageData.pageNum;
      console.log(this.pageInfo);
      this.getArticleList();
    },
    // 查询第几页数据
    pageChange(val) {
      console.log(val);
      this.pageInfo.pageSize = this.pageData.pageSize;
      this.pageInfo.pageNum = val;
      console.log(this.pageInfo);
      this.getArticleList();
    },
    // 修改数据
    async clickButton(val) {
      console.log(val);
      // 修改
      if (val.methods === 'edit') {
        await api.getArticle(val.row._id).then(res => {
          console.log(res);
          if (res.meta.status === 200) {
            // this.userForm = res.data;
            console.log(val.row._id);
            this.$router.push('/articles/edit/' + val.row._id);
          }
        });
        // console.log(this.userForm);
      }
      // 删除
      if (val.methods === 'del') {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            await api.deleteArticle(val.row._id);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getArticleList();
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      }
    },
    // switch切换
    switchChange(id, key, val) {
      // console.log(id, key, val);
      // console.log(changeData)
      var params = {};
      params[key] = val;
      api.changeArticle(id, params).then(res => {
        console.log(res);
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '切换成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: '切换失败!'
          });
        }
        this.getArticleList();
      });
    }
  }
};
</script>

<style></style>
