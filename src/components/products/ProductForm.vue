<script setup lang="ts">
import { ref } from 'vue'
import { useProduct } from './composables/useProduct'
import { useBucket } from '@/composables/useBucket'
import SuccessfulCompo from '../common/SuccessfulCompo.vue'
import { UploadFilled } from '@element-plus/icons-vue'

const { addProduct, isLoading, categories, fetchCategories } = useProduct()
const { upload } = useBucket()

await fetchCategories()

const form = ref({
  productname: '',
  price: 0,
  stock: 0,
  categoryid: 0,
  productid: 0,
  picture: ''
})

const success = ref(false)

const successful = () => {
  success.value = false
}

const handleAddProduct = async () => {
  if (!form.value.picture) {
    alert('Please upload an image.')
    return
  }
  if (
    !form.value.productname ||
    !form.value.price ||
    !form.value.stock ||
    !form.value.categoryid ||
    !form.value.productid
  ) {
    alert('Please fill in all required fields.')
    return
  }
  await addProduct(form.value)
  success.value = true
}

const bucketPath = import.meta.env.VITE_BUCKET_PATH

const beforeUpload = async (file: File) => {
  const { path } = await upload(file)
  form.value.picture = `${bucketPath}/${path}`
  return false
}
</script>

<template>
  <SuccessfulCompo :on-update:dialog-visible="successful" />
  <el-form label-width="auto" style="max-width: 600px" label-position="top">
    <h1>Add Product</h1>
    <el-form-item label="Product Name">
      <el-input v-model="form.productname" />
    </el-form-item>
    <el-form-item label="Product ID">
      <el-input v-model="form.productid" />
    </el-form-item>
    <el-form-item label="Price">
      <el-input v-model="form.price" type="number" />
    </el-form-item>
    <el-form-item label="Stock">
      <el-input v-model="form.stock" type="number" />
    </el-form-item>
    <el-form-item label="Category">
      <el-select v-model="form.categoryid" placeholder="Select Category">
        <el-option
          v-for="(category, index) in categories"
          :key="index"
          :label="category.categoryname"
          :value="category.categoryid"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Upload Image">
      <el-upload
        class="upload-demo"
        :limit="1"
        drag
        :before-upload="beforeUpload"
        :on-success="successful"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        <template #tip>
          <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
        </template>
      </el-upload>
    </el-form-item>
    <el-button v-loading.fullscreen.lock="isLoading" type="primary" @click="handleAddProduct"
      >Add Product</el-button
    >
  </el-form>
</template>
