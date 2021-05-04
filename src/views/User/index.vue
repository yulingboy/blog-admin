<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="searchUserForm" class="demo-form-inline">
        <el-form-item label="角色">
          <el-select v-model="searchUserForm.role" placeholder="请选择角色">
            <el-option
              v-for="item in userRole"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchUserForm.status" placeholder="请选择状态">
            <el-option
              v-for="item in userStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input
            v-model="searchUserForm.nickname"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <user-table
      :data="userInfo"
      :tableColumns="tableLabel"
      :tableOption="tableOption"
      :page="pageData.pageNum"
      :rows="pageData.pageSize"
      :total="pageData.total"
      @sizeChange="sizeChange"
      @pageChange="pageChange"
      @clickButton="clickButton"
    ></user-table>
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
import UserTable from '@/components/Table';
import api from '@/api/user';
export default {
  components: {
    UserTable
  },
  data() {
    return {
      // 初始数据请求参数
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      // 用户信息
      userInfo: [],
      // 页码信息
      pageData: {},
      // 筛选信息
      searchUserForm: {
        nickname: '',
        status: '',
        role: ''
      },
      // status 用户状态
      userStatus: [
        { label: '正常', value: 1 },
        { label: '封禁', value: 0 }
      ],
      // role 角色
      userRole: [
        { label: '管理员', value: 1 },
        { label: '普通', value: 0 }
      ],
      // 表头数据
      tableLabel: [
        {
          label: 'ID',
          param: '_id',
          isSwitch: 0
        },
        {
          label: '昵称',
          param: 'username',
          isSwitch: 0
        },
        {
          label: '邮箱',
          param: 'email',
          isSwitch: 0
        },
        {
          label: '状态',
          param: 'state',
          isTag: 1,
          isSwitch: 0,
          isImg: 0,
          render: row => {
            if (row.state === 0) {
              return '正常';
            } else if (row.sex === 1) {
              return '封禁';
            }
          }
        },
        {
          label: '角色',
          param: 'role',
          isTag: 1,
          isSwitch: 0,
          isImg: 0,
          render: row => {
            if (row.role === 0) {
              return '普通';
            } else if (row.role === 1) {
              return '管理员';
            } else if (row.role === 2) {
              return '超级管理员';
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
    this.getUserList();
  },
  methods: {
    // 获取用户列表
    getUserList() {
      api.getUsers(this.pageInfo).then(res => {
        if (res.meta.status === 200) {
          this.userInfo = res.data.users;
          this.pageData = res.data.pagition;
        } else {
          this.$message({
            message: '获取用户列表失败！',
            type: 'warning'
          });
        }
      });
    },
    // 搜索用户
    search() {},
    // 每页显示多少条数据
    sizeChange(val) {
      console.log(val);
      this.pageInfo.pageSize = val;
      this.pageInfo.pageNum = this.pageData.pageNum;
      console.log(this.pageInfo);
      this.getUserList();
    },
    // 查询第几页数据
    pageChange(val) {
      console.log(val);
      this.pageInfo.pageSize = this.pageData.pageSize;
      this.pageInfo.pageNum = val;
      console.log(this.pageInfo);
      this.getUserList();
    },
    // 修改数据
    async clickButton(val) {
      console.log(val);
      // 修改
      if (val.methods === 'edit') {
        await api.getUser(val.row._id).then(res => {
          if (res.meta.status === 200) {
            this.userForm = res.data;
            this.dialogFormVisible = true;
          }
        });
        console.log(this.userForm);
      }
      // 删除
      if (val.methods === 'del') {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            await api.deleteUser(val.row._id);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getUserList();
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
