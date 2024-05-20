// src/composables/useSupplier.ts
import { ref } from 'vue';
import { supabase } from '../../../lib/supabaseClient';
import type { Tables, TablesInsert, TablesUpdate } from '../../../lib/database.types';

export function useSupplier() {
    const suppliers = ref<Tables<'supplier'>[]>([]);
    const error = ref<string | null>(null);

    const fetchSuppliers = async () => {
        const { data, error: fetchError } = await supabase.from('supplier').select('*');
        if (fetchError) error.value = fetchError.message;
        else suppliers.value = data;
    };

    const addSupplier = async (supplier: TablesInsert<'supplier'>) => {
        const { error: insertError } = await supabase.from('supplier').insert(supplier);
        if (insertError) error.value = insertError.message;
        else await fetchSuppliers(); // Refresh list
    };

    const updateSupplier = async (supplierId: number, supplier: TablesUpdate<'supplier'>) => {
        const { error: updateError } = await supabase.from('supplier').update(supplier).eq('supplierid', supplierId);
        if (updateError) error.value = updateError.message;
        else await fetchSuppliers(); // Refresh list
    };

    const deleteSupplier = async (supplierId: number) => {
        const { error: deleteError } = await supabase.from('supplier').delete().eq('supplierid', supplierId);
        if (deleteError) error.value = deleteError.message;
        else await fetchSuppliers(); // Refresh list
    };

    return { suppliers, error, fetchSuppliers, addSupplier, updateSupplier, deleteSupplier };
}
