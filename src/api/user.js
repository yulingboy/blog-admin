import axios from '@/axios';
export default {
  // 获取全部用户信息
  getUsers(params) {
    return axios.get('/users', { params: params });
  },
  // 更具ID查询用户信息
  getUser(params) {
    return axios.get('/users/' + params);
  },
  // 修改用户信息
  editUser(params) {
    return axios.put('/users/' + params);
  },
  // 删除用户
  deleteUser(params) {
    return axios.delete('/users/' + params);
  }
};
