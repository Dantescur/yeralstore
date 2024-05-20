// src/composables/useOrder.ts
import { ref } from 'vue';
import { supabase } from '../../../lib/supabaseClient';
import type { Tables } from '../../../lib/database.types';

export function useOrder() {
    const orders = ref<Tables<'Order'>[]>([]);
    const error = ref<string | null>(null);

    const fetchOrders = async () => {
        const { data, error: fetchError } = await supabase.from('Order').select('*');
        if (fetchError) error.value = fetchError.message;
        else orders.value = data;
    };

    const addOrder = async (order: Tables<'Order'>['Insert']) => {
        const { data, error: insertError } = await supabase.from('Order').insert(order);
        if (insertError) error.value = insertError.message;
        else {
            await fetchOrders(); // Refresh list
        }
    };

    const updateOrder = async (orderId: number, order: Tables<'Order'>['Update']) => {
        const { error: updateError } = await supabase.from('Order').update(order).eq('orderid', orderId);
        if (updateError) error.value = updateError.message;
        else await fetchOrders(); // Refresh list
    };

    const deleteOrder = async (orderId: number) => {
        const { error: deleteError } = await supabase.from('Order').delete().eq('orderid', orderId);
        if (deleteError) error.value = deleteError.message;
        else await fetchOrders(); // Refresh list
    };

    return { orders, error, fetchOrders, addOrder, updateOrder, deleteOrder };
}
