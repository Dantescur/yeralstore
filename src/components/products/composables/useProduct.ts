// src/composables/useProduct.ts
import { ref } from 'vue';
import { supabase } from '../../../lib/supabaseClient';
import type { Tables, TablesInsert, TablesUpdate } from '../../../lib/database.types';

export function useProduct() {
    const products = ref<Tables<'product'>[] | null>([]);

    const error = ref<string | null>(null);

    const fetchProducts = async () => {
        const { data, error: fetchError } = await supabase.from('product').select('*');
        if (fetchError) error.value = fetchError.message;
        else products.value = data;
    };

    const addProduct = async (product: TablesInsert<'product'>) => {
        const { error: insertError } = await supabase.from('product').insert(product);
        if (insertError) error.value = insertError.message;
        else await fetchProducts(); // Refresh list
    };

    const updateProduct = async (productId: number, product: TablesUpdate<'product'>) => {
        const { error: updateError } = await supabase.from('product').update(product).eq('productid', productId);
        if (updateError) error.value = updateError.message;
        else await fetchProducts(); // Refresh list
    };

    const deleteProduct = async (productId: number) => {
        const { error: deleteError } = await supabase.from('product').delete().eq('productid', productId);
        if (deleteError) error.value = deleteError.message;
        else await fetchProducts(); // Refresh list
    };

    return { products, error, fetchProducts, addProduct, updateProduct, deleteProduct };
}
