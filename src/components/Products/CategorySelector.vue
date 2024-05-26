<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { Product } from '@/composables/useProduct'

// Define props
const props = defineProps<{
  product?: Product[]
  selectedCategories: string[]
}>()

const emit = defineEmits<{
  (e: 'update:selectedCategories', value: string[]): void
}>()

const localSelectedcategories = ref([...props.selectedCategories])

watch(localSelectedcategories, (newValue) => {
  emit('update:selectedCategories', newValue)
})

const categoryOptions = computed(() => {

  if (!props.product) {
    return []
  } else {
  return props.product
    .map((product) => product.category.categoryname)
    .filter((category, index, self) => category && self.indexOf(category) === index)
    .map((category) => ({
      value: category,
      label: category
    }))
  }

})
</script>

<template>
  <!--suppress HtmlUnknownTag -->
  <el-select-v2 multiple clearable v-model="localSelectedcategories" :options="categoryOptions"
    placeholder="Please select" style="width: 240px" />
</template>
