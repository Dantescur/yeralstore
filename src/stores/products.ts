import type { Product } from "@/composables";
import { defineStore } from "pinia";
import { ref } from "vue";



export const useProductsStore = defineStore('products', () => {
    const currentPage = ref<number>(1)
    const totalPages = ref<number>(2)
    const products = ref<Product[]>([])

    return {
        // State
        currentPage,
        totalPages,
        products,

        // Getters

        // Actions
        setProducts(newProducts: Product[]) {
            products.value = newProducts
        },

        setPage(page: number) {
            if (currentPage.value == page) return;

            currentPage.value = page
        }

    }


})