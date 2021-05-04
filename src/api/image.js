import axios from '@/axios';
export default {
  // 获取图片列表
  getImages(params = {}) {
    console.log(params);
    return axios.get('/images', { params: params });
  },
  // 更具ID查询图片信息
  getImage(params) {
    return axios.get('/images/' + params);
  },
  // 修改图片信息
  editImage(params) {
    return axios.put('/images/' + params);
  },
  // 删除图片
  deleteImage(params) {
    return axios.delete('/images/' + params);
  },
  // 新增图片
  addImage(params) {
    return axios.post('/images', params)
  },
  // 上传图片
  newImage(params) {
    return axios.post('/image', params)
  }
};
