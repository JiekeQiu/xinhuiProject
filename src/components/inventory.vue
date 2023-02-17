<template>
  <div>
    <div>
      <h1>库存盘点</h1>
    </div>
    <el-main>
      <el-container>
        <el-header>
          <search/>
        </el-header>
        <el-main>
            <message/>
        </el-main>
      </el-container>
    </el-main>
  </div>
</template>
<script>
import search from "./search.vue";
import message from '../components/message.vue'
export default {
  components: {
    search,
    message
  }
};
</script>