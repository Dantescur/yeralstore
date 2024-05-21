// src/composables/useCategory.ts
import { ref } from 'vue'
import { supabase } from '../../../lib/supabaseClient'
import type { Tables } from '../../../lib/database.types'

export function useCategory() {
  const categories = ref<Tables<'category'>[]>([])
  const error = ref<string | null>(null)

  const fetchCategories = async () => {
    const { data, error: fetchError } = await supabase.from('category').select('*')
    if (fetchError) error.value = fetchError.message
    else categories.value = data
  }

  const addCategory = async (category: Tables<'category'>['Insert']) => {
    const { error: insertError } = await supabase.from('category').insert(category)
    if (insertError) error.value = insertError.message
    else await fetchCategories() // Refresh list
  }

  const updateCategory = async (categoryId: number, category: Tables<'category'>['Update']) => {
    const { error: updateError } = await supabase
      .from('category')
      .update(category)
      .eq('categoryid', categoryId)
    if (updateError) error.value = updateError.message
    else await fetchCategories() // Refresh list
  }

  const deleteCategory = async (categoryId: number) => {
    const { error: deleteError } = await supabase
      .from('category')
      .delete()
      .eq('categoryid', categoryId)
    if (deleteError) error.value = deleteError.message
    else await fetchCategories() // Refresh list
  }

  return { categories, error, fetchCategories, addCategory, updateCategory, deleteCategory }
}
