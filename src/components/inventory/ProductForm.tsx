import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryService } from '../../services/inventory.service';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import type { Product } from '../../services/mockData';

const productSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    sku: z.string().min(3, 'SKU is required'),
    category: z.string().min(1, 'Category is required'),
    price: z.number().min(0, 'Price must be positive'),
    quantity: z.number().min(0, 'Quantity must be positive'),
    reorderLevel: z.number().min(0, 'Reorder Level must be positive'),
    warehouse: z.string().min(1, 'Warehouse is required'),
    status: z.enum(['In Stock', 'Low Stock', 'Out of Stock']),
    image: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type ProductInput = z.infer<typeof productSchema>;

interface ProductFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    initialData?: Product | null;
}

export default function ProductForm({ onSuccess, onCancel, initialData }: ProductFormProps) {
    const queryClient = useQueryClient();
    const isEditMode = !!initialData;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProductInput>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            status: 'In Stock',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200',
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name,
                sku: initialData.sku,
                category: initialData.category,
                price: initialData.price,
                quantity: initialData.quantity,
                reorderLevel: initialData.reorderLevel,
                warehouse: initialData.warehouse,
                status: initialData.status,
                image: initialData.image,
            });
        } else {
            reset({
                status: 'In Stock',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200',
            });
        }
    }, [initialData, reset]);

    const createMutation = useMutation({
        mutationFn: inventoryService.addProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product added successfully');
            onSuccess();
        },
        onError: () => {
            toast.error('Failed to add product');
        },
    });

    const updateMutation = useMutation({
        mutationFn: inventoryService.updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product updated successfully');
            onSuccess();
        },
        onError: () => {
            toast.error('Failed to update product');
        },
    });

    const onSubmit = (data: ProductInput) => {
        if (isEditMode && initialData) {
            updateMutation.mutate({
                ...initialData,
                ...data,
                image: data.image || initialData.image,
            });
        } else {
            createMutation.mutate({
                ...data,
                image: data.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200',
                weight: '0.5kg',
                lastUpdated: new Date().toISOString().split('T')[0],
            });
        }
    };

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        {...register('name')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        placeholder="e.g. Wireless Mouse"
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">SKU</label>
                    <input
                        {...register('sku')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        placeholder="e.g. TEC-001"
                    />
                    {errors.sku && <p className="text-xs text-red-500">{errors.sku.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <select
                        {...register('category')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
                    >
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Audio">Audio</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                    {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Warehouse</label>
                    <select
                        {...register('warehouse')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
                    >
                        <option value="">Select Warehouse</option>
                        <option value="New York Hub">New York Hub</option>
                        <option value="Los Angeles Depot">Los Angeles Depot</option>
                        <option value="Chicago Center">Chicago Center</option>
                    </select>
                    {errors.warehouse && <p className="text-xs text-red-500">{errors.warehouse.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Price ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('price', { valueAsNumber: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                    {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="number"
                        {...register('quantity', { valueAsNumber: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                    {errors.quantity && <p className="text-xs text-red-500">{errors.quantity.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Reorder Level</label>
                    <input
                        type="number"
                        {...register('reorderLevel', { valueAsNumber: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                    {errors.reorderLevel && <p className="text-xs text-red-500">{errors.reorderLevel.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <select
                        {...register('status')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
                    >
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Image URL</label>
                <input
                    {...register('image')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="https://..."
                />
                {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" isLoading={isLoading}>
                    {isEditMode ? 'Update Product' : 'Add Product'}
                </Button>
            </div>
        </form>
    );
}
