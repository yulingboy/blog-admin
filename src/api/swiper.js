import axios from '@/axios';
export default {
  // 获取轮播图列表
  getSwipers(params = {}) {
    return axios.get('/swipers', { params: params });
  },
  // 更具ID查询轮播图信息
  getSwiper(params) {
    return axios.get('/swipers/' + params);
  },
  // 修改轮播图信息
  editSwiper(params) {
    return axios.put('/swipers/' + params);
  },
  // 删除轮播图
  deleteSwiper(params) {
    return axios.delete('/swipers/' + params);
  },
  // 新增轮播图
  addSwiper(params) {
    return axios.post('/swipers', params);
  },
  // 切换轮播图状态
  changeSwiper(id, params) {
    return axios.patch('/swipers/' + id, params);
  }
};
