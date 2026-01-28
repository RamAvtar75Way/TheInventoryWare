import { useState } from 'react';

import Header from '../../components/layout/Header';
import ProductTable from '../../components/inventory/ProductTable';
import { Plus, Search, Filter, Smartphone, Shirt, Home, Car, Sparkles, Dumbbell, Layers, Download } from 'lucide-react';
import { useProducts } from '../../hooks/inventory/useInventory';
import Select, { components, type OptionProps, type SingleValueProps, type GroupBase, type SingleValue } from 'react-select';
import { inventoryService } from '../../services/inventory.service';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ProductForm from '../../components/inventory/ProductForm';
import FilterPanel from '../../components/inventory/FilterPanel';
import type { Product } from '../../services/mockData';

interface CategoryOptionType {
    value: string;
    label: string;
    icon: React.ReactNode;
}

// Custom Option Component to show icon
const IconOption = (props: OptionProps<CategoryOptionType, false, GroupBase<CategoryOptionType>>) => {
    return (
        <components.Option {...props}>
            <div className="flex items-center gap-2">
                {props.data.icon}
                <span>{props.data.label}</span>
            </div>
        </components.Option>
    );
};

// Custom Value Component to show icon when selected
const IconSingleValue = (props: SingleValueProps<CategoryOptionType, false, GroupBase<CategoryOptionType>>) => {
    return (
        <components.SingleValue {...props}>
            <div className="flex items-center gap-2">
                {props.data.icon}
                <span>{props.data.label}</span>
            </div>
        </components.SingleValue>
    );
};

const CATEGORY_OPTIONS: CategoryOptionType[] = [
    { value: 'All', label: 'All Categories', icon: <Layers className="w-4 h-4 text-gray-500" /> },
    { value: 'Electronics', label: 'Electronics', icon: <Smartphone className="w-4 h-4 text-blue-500" /> },
    { value: 'Clothing', label: 'Clothing', icon: <Shirt className="w-4 h-4 text-purple-500" /> },
    { value: 'Home & Garden', label: 'Home & Garden', icon: <Home className="w-4 h-4 text-green-500" /> },
    { value: 'Automotive', label: 'Automotive', icon: <Car className="w-4 h-4 text-red-500" /> },
    { value: 'Beauty', label: 'Beauty', icon: <Sparkles className="w-4 h-4 text-pink-500" /> },
    { value: 'Sports', label: 'Sports', icon: <Dumbbell className="w-4 h-4 text-orange-500" /> },
];

const Products = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [advancedFilters, setAdvancedFilters] = useState<{ minPrice?: number; maxPrice?: number; warehouse?: string }>({});

    // Store the full option object for react-select, initialize with 'All'
    const [categoryOption, setCategoryOption] = useState<CategoryOptionType>(CATEGORY_OPTIONS[0]);

    // Selection State
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [selectAllMatching, setSelectAllMatching] = useState(false);

    // Ideally we would debounce search, but for mock data 250 records, direct update is fine.
    const { data, isLoading } = useProducts({
        page,
        limit: 10,
        search: searchQuery,
        category: categoryOption.value,
        ...advancedFilters
    });
    // ... (start of component continues)

    // ... (render)
    <div className="w-full md:w-64">
        <Select<CategoryOptionType, false, GroupBase<CategoryOptionType>>
            options={CATEGORY_OPTIONS}
            value={categoryOption}
            onChange={(option: SingleValue<CategoryOptionType>) => {
                if (option) {
                    setCategoryOption(option);
                    setPage(1);
                }
            }}
            components={{ Option: IconOption, SingleValue: IconSingleValue }}
            styles={{
                control: (base) => ({
                    ...base,
                    borderColor: '#E5E7EB',
                    borderRadius: '0.5rem',
                    paddingLeft: '4px',
                    height: '42px',
                    boxShadow: 'none',
                    '&:hover': {
                        borderColor: '#6455c2'
                    }
                }),
                option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? '#F3F4F6' : state.isFocused ? '#F9FAFB' : 'white',
                    color: state.isSelected ? '#111827' : '#374151',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                })
            }}
        />
    </div>

    const handleToggleSelect = (id: string) => {
        if (selectAllMatching) {
            setSelectAllMatching(false);
            setSelectedIds(new Set()); // Reset if breaking 'Select All'
            return;
        }
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleToggleSelectAllPage = () => {
        if (selectAllMatching) {
            setSelectAllMatching(false);
            setSelectedIds(new Set());
            return;
        }

        const currentPageIds = data?.products.map(p => p.id) || [];
        const allSelected = currentPageIds.every(id => selectedIds.has(id));

        if (allSelected) {
            // Deselect page
            const newSelected = new Set(selectedIds);
            currentPageIds.forEach(id => newSelected.delete(id));
            setSelectedIds(newSelected);
        } else {
            // Select page
            const newSelected = new Set(selectedIds);
            currentPageIds.forEach(id => newSelected.add(id));
            setSelectedIds(newSelected);
        }
    };

    const handleSelectAllMatching = () => {
        setSelectAllMatching(true);
    };

    const handleExport = async () => {
        // Determine what to export
        let productsToExport = [];

        const filters = {
            search: searchQuery,
            category: categoryOption.value
        };

        if (selectAllMatching) {
            // Fetch ALL matching current filters
            const all = await inventoryService.getProducts({ ...filters, limit: 10000 });
            productsToExport = all.products;
        } else if (selectedIds.size > 0) {
            // In a real app, send IDs to backend. For mock, fetch all matched and filter by ID.
            const all = await inventoryService.getProducts({ ...filters, limit: 10000 });
            productsToExport = all.products.filter(p => selectedIds.has(p.id));
        } else {
            alert('Please select items to export');
            return;
        }

        if (productsToExport.length === 0) return;

        const headers = ['ID', 'Name', 'SKU', 'Category', 'Price', 'Stocks', 'Status', 'Warehouse'];
        const csvContent = [
            headers.join(','),
            ...productsToExport.map(p =>
                [p.id, p.name, p.sku, p.category, p.price, p.quantity, p.status, p.warehouse].join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = selectAllMatching
            ? `inventory-all-matched.csv`
            : `inventory-export-${new Date().getTime()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const totalSelected = selectAllMatching ? (data?.total || 0) : selectedIds.size;
    const isPageFullySelected = data?.products.every(p => selectedIds.has(p.id)) || selectAllMatching;

    return (
        <div>
            <Header title="Inventory Management" />

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                {/* Simplified Inline Filter */}
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

                    <div className="w-full md:w-64">
                        <Select<CategoryOptionType, false, GroupBase<CategoryOptionType>>
                            options={CATEGORY_OPTIONS}
                            value={categoryOption}
                            onChange={(option: SingleValue<CategoryOptionType>) => {
                                if (option) {
                                    setCategoryOption(option);
                                    setPage(1);
                                }
                            }}
                            components={{ Option: IconOption, SingleValue: IconSingleValue }}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: '#E5E7EB',
                                    borderRadius: '0.5rem',
                                    paddingLeft: '4px',
                                    height: '42px',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        borderColor: '#6455c2'
                                    }
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected ? '#F3F4F6' : state.isFocused ? '#F9FAFB' : 'white',
                                    color: state.isSelected ? '#111827' : '#374151',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                })
                            }}
                        />
                    </div>

                    <button
                        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${isFiltersOpen ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Filter className="w-5 h-5" />
                        <span>More Filters</span>
                    </button>

                    {totalSelected > 0 && (
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover shadow-sm whitespace-nowrap"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export ({totalSelected})</span>
                        </button>
                    )}
                </div>

                <Button
                    onClick={() => {
                        setSelectedProduct(null);
                        setIsModalOpen(true);
                    }}
                    leftIcon={<Plus className="w-5 h-5" />}
                >
                    Add product
                </Button>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedProduct(null);
                    }}
                    title={selectedProduct ? 'Edit Product' : 'Add New Product'}
                >
                    <ProductForm
                        onSuccess={() => {
                            setIsModalOpen(false);
                            setSelectedProduct(null);
                        }}
                        onCancel={() => {
                            setIsModalOpen(false);
                            setSelectedProduct(null);
                        }}
                        initialData={selectedProduct}
                    />
                </Modal>
            </div>

            {/* Advanced Filters Panel */}
            <FilterPanel
                isOpen={isFiltersOpen}
                onClose={() => setIsFiltersOpen(false)}
                onApply={(filters) => {
                    setAdvancedFilters(filters);
                    setPage(1);
                }}
                onReset={() => {
                    setAdvancedFilters({});
                    setPage(1);
                }}
                initialFilters={advancedFilters}
            />

            {/* Bulk Selection Banners */}
            {
                isPageFullySelected && !selectAllMatching && (data?.total || 0) > 10 && (
                    <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-lg flex items-center justify-center gap-2">
                        <span>All {data?.products.length} products on this page are selected.</span>
                        <button
                            onClick={handleSelectAllMatching}
                            className="font-bold underline hover:text-blue-900"
                        >
                            Select all {data?.total} products matching current filter
                        </button>
                    </div>
                )
            }

            {
                selectAllMatching && (
                    <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-lg flex items-center justify-center gap-2">
                        <span>All {data?.total} products are selected.</span>
                        <button
                            onClick={() => { setSelectAllMatching(false); setSelectedIds(new Set()); }}
                            className="font-bold underline hover:text-blue-900"
                        >
                            Clear selection
                        </button>
                    </div>
                )
            }

            {/* Products Table */}
            <div className="mt-6">
                <ProductTable
                    products={data?.products || []}
                    isLoading={isLoading}
                    currentPage={data?.page || 1}
                    totalPages={data?.totalPages || 1}
                    onPageChange={setPage}
                    selectedIds={selectedIds}
                    onToggleSelect={handleToggleSelect}
                    onToggleSelectAll={handleToggleSelectAllPage}
                    isAllSelected={selectAllMatching}
                    onEdit={(product) => {
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                    }}
                />
            </div>
        </div >
    );
};

export default Products;
