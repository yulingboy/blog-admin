<template>
  <div>
    <el-table
      :data="data"
      border
      style="width: 100%"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      height="550px"
    >
      <el-table-column
        v-for="(item, index) in tableColumns"
        :key="index"
        :prop="item.param"
        :width="item.width ? item.width : ''"
        :label="item.label"
      >
        <!-- 因为有些参数需要判定比如性别所以判断一下 -->
        <template slot-scope="scope">
          <!-- 渲染tag标签 -->
          <el-tag v-if="item.render && item.isTag == 1 && item.isSwitch == 0 && item.isImg == 0" >{{item.render(scope.row) }}</el-tag>
          <!-- 渲染图片 -->
          <el-image v-else-if="item.render && item.isTag == 0 && item.isSwitch == 0 && item.isImg == 1" :src="scope.row[item.param]" :preview-src-list="[scope.row[item.param]]"></el-image>
          <!-- 渲染switch状态切换 -->
          <el-switch v-else-if="item.render && item.isTag == 0 && item.isSwitch == 1 && item.isImg == 0" v-model="scope.row[item.param]" :active-text="item.success" :inactive-text="item.fail" @change=clickSwitchChange(scope.row._id,item.param,scope.row[item.param])></el-switch>
          <!-- 渲染文字 -->
          <span v-else-if="item.render && item.isTag == 0 && item.isSwitch == 0 && item.isImg == 0">{{ item.render(scope.row) }}</span>
          <!-- 直接渲染 -->
          <span v-else>{{ scope.row[item.param] }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        v-if="tableOption.label"
        :label="tableOption.label"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in tableOption.options"
            :key="index"
            :type="item.type"
            :icon="item.icon"
            @click="handleButton(item.methods, scope.row, scope.$index)"
            size="mini"
          >
            {{ item.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="rows"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ['data', 'tableColumns', 'tableOption', 'page', 'rows', 'total'],
  data() {
    return {};
  },
  created() {
    console.log(this.data);
  },
  methods: {
    // 切换当前一页展示多少条
    handleSizeChange(val) {
      console.log(val);
      this.$emit('sizeChange', val);
    },
    // 翻页
    handleCurrentChange(val) {
      console.log(val);
      this.$emit('pageChange', val);
    },
    // 按钮点击事件
    // methods方法名 row当前点击列数据 index当前点击的index
    handleButton(methods, row, index) {
      this.$emit('clickButton', { methods: methods, row: row, index: index });
    },
    // 切换switch状态
    clickSwitchChange (id, key, val) {
      console.log(id, key, val);
      this.$emit('switchChange', id, key, val);
    }
  }
};
</script>
<style scoped>
.el-table {
  margin-top: 20px;
}
</style>
