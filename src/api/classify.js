import axios from '@/axios';
export default {
  // 获取分类列表
  getClassifyList(params = {}) {
    console.log(params);
    return axios.get('/categories', { params: params });
  },
  // 更具ID查询列表信息
  getClassify(params) {
    return axios.get('/categories/' + params);
  },
  // 修改分类信息
  editClassify(params) {
    return axios.put('/categories/' + params);
  },
  // 删除分类
  deleteClassify(params) {
    return axios.delete('/categories/' + params);
  },
  // 新增分类
  addClassify(params) {
    return axios.post('/categories', params)
  }
};
