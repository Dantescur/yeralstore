import type { Tables } from "@/lib/database.types"
import { ref } from "vue"



export const useSupplier = () => {
    const suppliers = ref<Tables<'supplier'>[]>([])

    const error = ref<string | null>(null)

    const fetchProductsBySupplier = async (supplierid: Tables<'supplier'>) => {

    }
}