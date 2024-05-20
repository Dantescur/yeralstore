// src/composables/useProductSupplier.ts
import { ref } from 'vue';
import { supabase } from '../../../lib/supabaseClient';
import type { Tables } from '../../../lib/database.types';

export function useProductSupplier() {
    const productSuppliers = ref<Tables<'product_supplier'>[]>([]);
    const error = ref<string | null>(null);

    const fetchProductSuppliers = async () => {
        const { data, error: fetchError } = await supabase.from('product_supplier').select('*');
        if (fetchError) error.value = fetchError.message;
        else productSuppliers.value = data;
    };

    const addProductSupplier = async (productSupplier: Tables<'product_supplier'>['Insert']) => {
        const { error: insertError } = await supabase.from('product_supplier').insert(productSupplier);
        if (insertError) error.value = insertError.message;
        else await fetchProductSuppliers(); // Refresh list
    };

    const updateProductSupplier = async (productSupplierId: number, productSupplier: Tables<'product_supplier'>['Update']) => {
        const { error: updateError } = await supabase.from('product_supplier').update(productSupplier).eq('productid', productSupplierId);
        if (updateError) error.value = updateError.message;
        else await fetchProductSuppliers(); // Refresh list
    };

    const deleteProductSupplier = async (productSupplierId: number) => {
        const { error: deleteError } = await supabase.from('product_supplier').delete().eq('productid', productSupplierId);
        if (deleteError) error.value = deleteError.message;
        else await fetchProductSuppliers(); // Refresh list
    };

    return { productSuppliers, error, fetchProductSuppliers, addProductSupplier, updateProductSupplier, deleteProductSupplier };
}
