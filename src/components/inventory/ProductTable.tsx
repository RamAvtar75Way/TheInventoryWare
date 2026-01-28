import { Edit2, Trash2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import type { Product } from '../../services/mockData';

interface Props {
    products: Product[];
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    // Selection props
    selectedIds?: Set<string>;
    onToggleSelect?: (id: string) => void;
    onToggleSelectAll?: () => void;
    isAllSelected?: boolean; // Represents if "Select All" checkbox in header is checked (usually just current page)
}

const ProductTable = ({
    products,
    isLoading,
    currentPage,
    totalPages,
    onPageChange,
    selectedIds,
    onToggleSelect,
    onToggleSelectAll,
    isAllSelected
}: Props) => {
    if (isLoading) {
        return <div className="p-10 text-center text-gray-500">Loading inventory...</div>;
    }

    if (!products || products.length === 0) {
        return <div className="p-10 text-center text-gray-500">No products found</div>;
    }

    // Check if all visible products are selected (for page-level "select all" visual state)
    const isPageSelected = products.every(p => selectedIds?.has(p.id)) && products.length > 0;

    // If parent passes isAllSelected (true for "Select All Matching"), we prefer that, 
    // OR we fallback to checking if every visible item is in selectedIds.
    const headerChecked = isAllSelected || isPageSelected;

    const getStatusBadge = (status: Product['status']) => {
        switch (status) {
            case 'In Stock':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3" /> In Stock</span>;
            case 'Low Stock':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><AlertTriangle className="w-3 h-3" /> Low Stock</span>;
            case 'Out of Stock':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3" /> Out of Stock</span>;
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="p-4 w-10">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                    checked={headerChecked}
                                    onChange={onToggleSelectAll}
                                />
                            </th>
                            {['Product', 'SKU', 'Category', 'Warehouse', 'Price', 'Stock', 'Status', 'Actions'].map((header) => (
                                <th key={header} className="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((product) => {
                            const isSelected = isAllSelected || selectedIds?.has(product.id);
                            return (
                                <tr key={product.id} className={`hover:bg-gray-50 ${isSelected ? 'bg-purple-50/50' : ''}`}>
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-primary focus:ring-primary"
                                            checked={isSelected}
                                            onChange={() => onToggleSelect && onToggleSelect(product.id)}
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={product.image} alt={product.name} className="w-8 h-8 rounded-full bg-gray-100" />
                                            <span className="font-medium text-gray-900">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">{product.sku}</td>
                                    <td className="p-4 text-sm text-primary font-medium underline cursor-pointer">{product.category}</td>
                                    <td className="p-4 text-sm text-gray-600">{product.warehouse}</td>
                                    <td className="p-4 text-sm text-gray-600">${product.price}</td>
                                    <td className="p-4 text-sm text-gray-600">
                                        <div className="flex gap-2 items-center">
                                            <span className={product.quantity <= product.reorderLevel ? 'text-red-600 font-bold' : ''}>
                                                {product.quantity}
                                            </span>
                                            <span className="text-gray-400 text-xs">/ {product.reorderLevel} (Min)</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {getStatusBadge(product.status)}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="ghost"
                                                size="xs"
                                                onClick={() => toast.success(`Editing ${product.name}`)}
                                                className="text-primary hover:text-primary-hover h-8 w-8 p-0"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="xs"
                                                onClick={() => toast.error(`Deleted ${product.name}`)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum = i + 1;
                        if (totalPages > 5 && currentPage > 3) {
                            pageNum = currentPage - 2 + i;
                        }
                        if (pageNum > totalPages) return null;

                        return (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium flex items-center justify-center ${currentPage === pageNum
                                    ? 'bg-purple-50 text-primary'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default ProductTable;
