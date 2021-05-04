<template>
  <div>
    <el-upload
      ref="upload"
      :http-request="httpRequest"
      action="#"
      :file-list="fileList"
      list-type="picture-card"
      :auto-upload="false"
      :accept="'.jpg, .png, .jpeg'"
      :before-upload="beforeUploadFile"
      :on-change="fileChange"
      :class="{ disabled: isDisabled }"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
        <span class="el-upload-list__item-actions">
          <!-- 图片删除按钮 -->
          <span class="el-upload-list__item-delete" @click="handleRemove()">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
      <!-- 文字提示 -->
      <div slot="tip" class="el-upload__tip">
        <p v-if="tip">只能上传 jpg , png格式的文件，且不超过10MB</p>
        <p v-else>双击下方文字更改图片名字</p>
      </div>
    </el-upload>
    <!-- 只有当上传列表中有图片时，才显示 -->
    <div v-if="isDisabled">
      <el-input
        class="filename"
        v-model="name"
        @change="changeFileName"
        v-if="isChangeImgName"
      ></el-input>
      <p
        @dblclick="changeFileName"
        :class="['img-name', isChangeImgName ? 'is-disabled' : '']"
      >
        {{ name }}
      </p>
      <!-- 上传按钮 -->
      <el-button
        size="small"
        type="success"
        @click="submitUpload"
        class="submit-btn"
        >上传</el-button
      >
    </div>
  </div>
</template>

<script>
import axios from '@/axios';
export default {
  data() {
    return {
      formData: '', // 上传服务器数据
      fileList: [], // 上传文件列表
      // 加号方框是否显示
      isDisabled: false,
      // 图片名称
      name: '',
      // 图片类型
      fileType: '',
      // 更改图片名字
      isChangeImgName: false,
      // 提示文字是否更改
      tip: true
    };
  },
  methods: {
    // 文件状态改变时的钩子,判断数组中是否有图片，如果有图片，加号方框被隐藏
    fileChange(file, fileList) {
      this.name = file.name.split('.')[0];
      this.fileType = file.name.split('.')[1];
      this.fileList = fileList;
      if (fileList.length > 0) {
        this.isDisabled = true;
        this.tip = false;
      }
    },
    // 判断标题是否可编辑
    changeFileName() {
      this.isChangeImgName = true;
    },
    // 上传图片
    httpRequest(params) {
      this.formData = new FormData();
      var imgname = this.name + '.' + this.fileType;
      this.formData.append('file', params.file);
      this.formData.append('imgname', imgname);
      axios
        .post('http://127.0.0.1:3000/api/admin/v2/image', this.formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res);
          if (res.meta.status === 200) {
            this.$emit('getImg', res.data);
            this.$message({
              message: '图片上传成功！',
              type: 'success'
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            message: '图片上传失败！',
            type: 'error'
          });
        });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 判断图片是否满足要求
    beforeUploadFile(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpg';
      const isLt10M = file.size / 1024 / 1024 < 2;
      console.log(isLt10M);
      if (!isJPG) {
        this.$message.error('上传的图片不符合样式!');
      }
      if (!isLt10M) {
        this.$message.error('上传的图片大小不能超过10MB!');
      }
      this.fileList = [];
      this.isDisabled = false;
      this.tip = true;
      return isJPG && isLt10M;
    },
    // 删除图片
    handleRemove() {
      this.fileList = [];
      this.isDisabled = false;
      this.tip = true;
    }
  }
};
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
.el-upload.el-upload--picture-card {
  width: 100%;
}
.el-upload-list--picture-card .el-upload-list__item {
  width: 100%;
  height: 100%;
}
.el-upload-list__item.is-ready {
  font-size: 0;
}
.filename {
  margin: 20px 0;
}
.submit-btn {
  width: 100%;
}
.img-name {
  cursor: pointer;
  margin: 20px 0;
  height: 20px;
  line-height: 20px;
}
.is-disabled {
  display: none;
}
</style>
