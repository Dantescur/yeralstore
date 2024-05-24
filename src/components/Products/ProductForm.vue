<script setup lang="ts">
import { ref } from 'vue'
import { useProduct } from '@/composables'
import { useBucket } from '@/composables'
import type { UploadInstance } from 'element-plus'
import { showError } from '@/helpers/authError'
import { showSuccess } from '@/helpers/successMessage'

const { addProduct, categories, fetchCategories, error: productError } = useProduct()
const { upload, remove } = useBucket()

const isLoading = ref(false)
const uploadRef = ref<UploadInstance>()

await fetchCategories()

const form = ref({
  productname: '',
  price: 0,
  stock: 0,
  categoryid: 0,
  picture: ''
})

const handleAddProduct = async () => {
  let filePath: string | undefined = undefined
  if (!form.value.productname || !form.value.price || !form.value.stock || !form.value.categoryid) {
    showError('Please fill in all required fields.')
    return
  }

  try {
    isLoading.value = true
    if (uploadRef.value?.fileList[0]) {
      console.log('Uploading file...')
      console.log(uploadRef.value.fileList)
      const bucketPath = import.meta.env.VITE_BUCKET_PATH
      filePath = await upload(uploadRef.value.fileList[0].raw)
      if (filePath === undefined) {
        showError('Failed to upload file.')
        return
      } else {
        form.value.picture = `${bucketPath}/${filePath}`
      }
      await addProduct(form.value)
      showSuccess('Product added successfully', 'success')
      resetForm()
    } else {
      showError('Please select a file.')
      return
    }
  } catch (error) {
    if (filePath) {
      await remove([filePath])
    }
    showError((error as Error).message)
    if (error === typeof productError) {
      showError(productError.value)
    }
  } finally {
    isLoading.value = false
    uploadRef.value?.clearFiles()
  }
}

const resetForm = () => {
  form.value = {
    productname: '',
    price: 0,
    stock: 0,
    categoryid: 0,
    picture: ''
  }
}
</script>

<template>
  <el-form label-width="auto" style="max-width: 600px" label-position="top">
    <h1>Add Product</h1>
    <el-form-item label="Product Name">
      <el-input v-model="form.productname" />
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
      <el-upload class="upload-demo" :limit="1" ref="uploadRef">
        <template #trigger>
          <el-button>select file</el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
        </template>
      </el-upload>
    </el-form-item>
    <el-button v-loading.fullscreen.lock="isLoading" type="primary" @click="handleAddProduct">
      Add Product
    </el-button>
  </el-form>
</template>
