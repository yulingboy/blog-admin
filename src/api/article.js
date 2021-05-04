import axios from '@/axios';
export default {
  // 获取文章列表
  getArticles(params) {
    return axios.get('/articles', { params: params });
  },
  // 更具ID查询文章信息
  getArticle(params) {
    return axios.get('/articles/' + params);
  },
  // 修改文章信息
  editArticle(params) {
    return axios.put('/articles/' + params);
  },
  // 删除文章
  deleteArticle(params) {
    return axios.delete('/articles/' + params);
  },
  // 修改文章状态
  changeArticle(id, params) {
    return axios.patch('/articles/' + id, params);
  },
  // 新增文章
  addArticle(params) {
    return axios.post('/articles', params)
  }
};
