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

let localProducts = [...MOCK_PRODUCTS];

export const inventoryService = {
    getProducts: async ({ page = 1, limit = 10, search, category, minPrice, maxPrice, warehouse }: {
        page?: number;
        limit?: number;
        search?: string;
        category?: string;
        minPrice?: number;
        maxPrice?: number;
        warehouse?: string;
    }): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> => {
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network latency

        let filtered = [...localProducts];

        if (search) {
            const query = search.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.sku.toLowerCase().includes(query)
            );
        }

        if (category && category !== 'All') {
            filtered = filtered.filter(p => p.category === category);
        }

        if (minPrice !== undefined) {
            filtered = filtered.filter(p => p.price >= minPrice);
        }

        if (maxPrice !== undefined) {
            filtered = filtered.filter(p => p.price <= maxPrice);
        }

        if (warehouse && warehouse !== 'All') {
            filtered = filtered.filter(p => p.warehouse === warehouse);
        }

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
        return localProducts;
    },

    addProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate write delay
        const newProduct: Product = {
            id: (Math.random() * 10000).toString(),
            ...productData
        };
        localProducts = [newProduct, ...localProducts];
        return newProduct;
    },

    updateProduct: async (product: Product): Promise<Product> => {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate write delay
        localProducts = localProducts.map(p => p.id === product.id ? product : p);
        return product;
    },

    deleteProduct: async (id: string): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 600));
        localProducts = localProducts.filter(p => p.id !== id);
    }
};
