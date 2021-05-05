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
      @switchChange="switchChange"
    ></Table>
    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="userForm">
        <el-form-item>
          <el-input v-model="userForm._id" readonly>
            <template slot="prepend">ID</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="userForm.email">
            <template slot="prepend">邮箱</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="userForm.username">
            <template slot="prepend">昵称</template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-select v-model="form.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Table from '@/components/Table';
import api from '@/api/swiper';
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
      // 数据信息
      data: [],
      // 页码信息
      pageData: {},
      // 表头数据
      tableLabel: [
        {
          label: '图片',
          param: 'img',
          isTag: 0,
          isSwitch: 0,
          isImg: 1,
          render: row => {
            return row;
          }
        },
        {
          label: 'Title',
          param: 'description',
          isSwitch: 0
        },
        {
          label: '链接',
          param: 'url',
          isSwitch: 0
        },
        {
          label: '状态',
          param: 'status',
          success: '正常',
          fail: '封禁',
          isTag: 0,
          isSwitch: 1,
          isImg: 0,
          render: row => {
            if (row.status === 1) {
              return true;
            } else {
              return false;
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
      },
      // 切换弹窗
      dialogFormVisible: false,
      // 个人用户信息
      userForm: {}
    };
  },
  created() {
    this.getSwipersList();
  },
  methods: {
    // 获取用户列表
    getSwipersList() {
      api.getSwipers(this.pageInfo).then(res => {
        console.log(res);
        if (res.meta.status === 200) {
          this.data = res.data.swipers;
          this.pageData = res.data.pagition;
          console.log(res.data.swipers);
        } else {
          this.$message({
            message: '获取轮播列表失败！',
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
      this.getSwipersList();
    },
    // 查询第几页数据
    pageChange(val) {
      console.log(val);
      this.pageInfo.pageSize = this.pageData.pageSize;
      this.pageInfo.pageNum = val;
      console.log(this.pageInfo);
      this.getSwipersList();
    },
    // 修改数据
    async clickButton(val) {
      console.log(val);
      // 修改
      if (val.methods === 'edit') {
        await api.getSwiper(val.row._id).then(res => {
          if (res.meta.status === 200) {
            this.userForm = res.data;
            this.dialogFormVisible = true;
          }
        });
        console.log(this.userForm);
      }
      // 删除
      if (val.methods === 'del') {
        this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            await api.deleteSwiper(val.row._id);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getSwipersList();
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
      api.changeSwiper(id, params).then(res => {
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
        this.getSwipersList();
      });
    }
  }
};
</script>

<style></style>
