<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(false)

const handleClose = () => {
  dialogVisible.value = false
}
</script>

<template>
  <el-dialog v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>
