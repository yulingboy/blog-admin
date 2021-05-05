<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="更新记录" name="first">
      <update-record></update-record>
    </el-tab-pane>
    <el-tab-pane label="操作记录" name="second">
      <operation-record></operation-record>
    </el-tab-pane>
    <el-tab-pane label="访问记录" name="third">
      <visit-record></visit-record>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import UpdateRecord from './components/updateRecord.vue';
import OperationRecord from './components/operationRecord.vue';
import VisitRecord from './components/visitRecord.vue';
export default {
  components: {
    UpdateRecord,
    OperationRecord,
    VisitRecord
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {}
};
</script>
<style scoped></style>
