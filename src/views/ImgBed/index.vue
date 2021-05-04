<template>
  <div>
    <Table
      :data="data"
      :tableColumns="tableLabel"
      :tableOption="tableOption"
      :page="pageData.pageNum"
      :rows="pageData.pageSize"
      :total="pageData.total"
      @sizeChange="sizeChange"
      @pageChange="pageChange"
      @clickButton="clickButton"
    ></Table>
  </div>
</template>

<script>
import api from '@/api/image.js';
import Table from '@/components/Table';
export default {
  components: {
    Table
  },
  data() {
    return {
      // 初始数据请求参数
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      // 文章列表
      data: [],
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
          label: '图片',
          param: 'img',
          isTag: 0,
          isSwitch: 0,
          isImg: 1,
          render: row => {
            return row;
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
    this.getImagesList();
  },
  methods: {
    getImagesList() {
      api.getImages(this.pageInfo).then(res => {
        console.log(res);
        if (res.meta.status === 200) {
          this.data = res.data.images;
          this.pageData = res.data.pagition;
          this.$message({
            message: '获取分类列表成功！',
            type: 'warning'
          });
        } else {
          this.$message({
            message: '获取分类列表失败！',
            type: 'warning'
          });
        }
      });
    },
    // 每页显示多少条数据
    sizeChange(val) {
      console.log(val);
      this.pageInfo.pageSize = val;
      this.pageInfo.pageNum = this.pageData.pageNum;
      console.log(this.pageInfo);
      this.getImagesList();
    },
    // 查询第几页数据
    pageChange(val) {
      console.log(val);
      this.pageInfo.pageSize = this.pageData.pageSize;
      this.pageInfo.pageNum = val;
      console.log(this.pageInfo);
      this.getImagesList();
    },
    // 修改数据
    async clickButton(val) {
      console.log(val);
      // 修改
      if (val.methods === 'edit') {
        await api.getImage(val.row._id).then(res => {
          console.log(res);
          if (res.meta.status === 200) {
            // this.userForm = res.data;
            // this.$router.push('/articles/edit/' + val.row._id);
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
            await api.deleteImage(val.row._id);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getImagesList();
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      }
    }
  }
};
</script>

<style></style>
