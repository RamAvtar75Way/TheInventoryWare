import { useQuery } from '@tanstack/react-query';
import { inventoryService, type ProductFilters } from '../../services/inventory.service';

export const useProducts = (filters: ProductFilters = {}) => {
    return useQuery({
        queryKey: ['products', filters],
        queryFn: () => inventoryService.getProducts(filters),
    });
};

export const useMetrics = () => {
    return useQuery({
        queryKey: ['metrics'],
        queryFn: inventoryService.getMetrics,
    });
};
