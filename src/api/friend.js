import axios from '@/axios';
export default {
  // 获取分类列表
  getFriends(params = {}) {
    console.log(params);
    return axios.get('/friends', { params: params });
  },
  // 更具ID查询列表信息
  getFriend(params) {
    return axios.get('/friends/' + params);
  },
  // 修改分类信息
  editFriend(params) {
    return axios.put('/friends/' + params);
  },
  // 删除分类
  deleteFriend(params) {
    return axios.delete('/friends/' + params);
  },
  // 新增分类
  addFriend(params) {
    return axios.post('/friends', params)
  }
};
