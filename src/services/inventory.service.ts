import { MOCK_PRODUCTS, MOCK_METRICS, type Product, type Metric } from './mockData';

export interface ProductsResponse {
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
}

export interface ProductFilters {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
    warehouse?: string;
}

export const inventoryService = {
    getProducts: async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let filtered = [...MOCK_PRODUCTS];

        if (filters.search) {
            const search = filters.search.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(search) ||
                p.sku.toLowerCase().includes(search)
            );
        }

        if (filters.category && filters.category !== 'All') {
            filtered = filtered.filter(p => p.category === filters.category);
        }

        if (filters.status && filters.status !== 'All') {
            filtered = filtered.filter(p => p.status === filters.status);
        }

        if (filters.warehouse && filters.warehouse !== 'All') {
            filtered = filtered.filter(p => p.warehouse === filters.warehouse);
        }

        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const total = filtered.length;
        const totalPages = Math.ceil(total / limit);
        const start = (page - 1) * limit;
        const end = start + limit;

        return {
            products: filtered.slice(start, end),
            total,
            page,
            totalPages
        };
    },

    getMetrics: async (): Promise<Metric[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_METRICS;
    },

    getAllProducts: async (): Promise<Product[]> => {
        return MOCK_PRODUCTS;
    }
};
