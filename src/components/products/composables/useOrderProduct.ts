// src/composables/useOrderProduct.ts
import { ref } from 'vue';
import { supabase } from '../../../lib/supabaseClient';
import type { Tables, TablesInsert, TablesUpdate } from '../../../lib/database.types';

export function useOrderProduct() {
    const orderProducts = ref<Tables<'order_product'>[]>([]);
    const error = ref<string | null>(null);

    const fetchOrderProducts = async () => {
        const { data, error: fetchError } = await supabase.from('order_product').select('*');
        if (fetchError) error.value = fetchError.message;
        else orderProducts.value = data;
    };

    const addOrderProduct = async (orderProduct: TablesInsert<'order_product'>) => {
        const { error: insertError } = await supabase.from('order_product').insert(orderProduct);
        if (insertError) error.value = insertError.message;
        else await fetchOrderProducts(); // Refresh list
    };

    const updateOrderProduct = async (orderProductId: number, orderProduct: TablesUpdate<'order_product'>) => {
        const { error: updateError } = await supabase.from('order_product').update(orderProduct).eq('orderid', orderProductId);
        if (updateError) error.value = updateError.message;
        else await fetchOrderProducts(); // Refresh list
    };

    const deleteOrderProduct = async (orderProductId: number) => {
        const { error: deleteError } = await supabase.from('order_product').delete().eq('orderid', orderProductId);
        if (deleteError) error.value = deleteError.message;
        else await fetchOrderProducts(); // Refresh list
    };

    return { orderProducts, error, fetchOrderProducts, addOrderProduct, updateOrderProduct, deleteOrderProduct };
}
