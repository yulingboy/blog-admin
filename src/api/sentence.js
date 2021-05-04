import axios from '@/axios';
export default {
  // 获取分类列表
  getSentences(params = {}) {
    console.log(params);
    return axios.get('/sentences', { params: params });
  },
  // 更具ID查询列表信息
  getSentence(params) {
    return axios.get('/sentences/' + params);
  },
  // 修改分类信息
  editSentence(params) {
    return axios.put('/sentences/' + params);
  },
  // 删除分类
  deleteSentence(params) {
    return axios.delete('/sentences/' + params);
  },
  // 新增分类
  addSentence(params) {
    return axios.post('/sentences', params)
  }
};
