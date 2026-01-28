import { useState } from 'react';
import Header from '../../components/layout/Header';
import { useProducts } from '../../hooks/inventory/useInventory';
import { Warehouse, MapPin, Download } from 'lucide-react';
import ProductTable from '../../components/inventory/ProductTable';
import { inventoryService } from '../../services/inventory.service';

const WAREHOUSES = ['New York Hub', 'Los Angeles Depot', 'Chicago Center', 'Houston Warehouse', 'Miami Storage'];

const Warehouses = () => {
    const [selectedWarehouse, setSelectedWarehouse] = useState(WAREHOUSES[0]);
    const [page, setPage] = useState(1);

    // Selection State
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [selectAllMatching, setSelectAllMatching] = useState(false);

    // Fetch products for selected warehouse
    const { data, isLoading } = useProducts({ page, limit: 10, warehouse: selectedWarehouse });

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
        // We technically don't need to populate selectedIds if logic uses selectAllMatching flag
        // but for visual consistency on current page we might want to ensure they look checked.
    };

    const handleExport = async () => {
        // Determine what to export
        let productsToExport = [];

        if (selectAllMatching) {
            // Fetch ALL for this warehouse
            const all = await inventoryService.getProducts({ warehouse: selectedWarehouse, limit: 10000 }); // Mock large limit
            productsToExport = all.products;
        } else if (selectedIds.size > 0) {
            // Fetch all and filter (or calling an ID-based endpoint in real app)
            // For mock, we'll just fetch all for warehouse and filter by ID
            const all = await inventoryService.getProducts({ warehouse: selectedWarehouse, limit: 10000 });
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
            ? `inventory-${selectedWarehouse.replace(/\s+/g, '-').toLowerCase()}-all.csv`
            : `inventory-export-${new Date().getTime()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        // Reset selection after export? Maybe not.
    };

    // Calculate selection stats
    const totalSelected = selectAllMatching ? (data?.total || 0) : selectedIds.size;
    const isPageFullySelected = data?.products.every(p => selectedIds.has(p.id)) || selectAllMatching;

    return (
        <div>
            <Header title="Warehouse Management" />

            {/* Warehouse Selector / Tabs */}
            <div className="flex overflow-x-auto pb-4 gap-4 mb-6">
                {WAREHOUSES.map(wh => (
                    <button
                        key={wh}
                        onClick={() => {
                            setSelectedWarehouse(wh);
                            setPage(1);
                            setSelectedIds(new Set());
                            setSelectAllMatching(false);
                        }}
                        className={`flex items-center gap-3 p-4 rounded-xl border min-w-[200px] transition-all ${selectedWarehouse === wh
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-primary/50'
                            }`}
                    >
                        <div className={`p-2 rounded-lg ${selectedWarehouse === wh ? 'bg-white/20' : 'bg-gray-100'}`}>
                            <Warehouse className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-medium truncate">{wh}</p>
                            <p className={`text-xs mt-0.5 font-medium px-2 py-0.5 rounded-full inline-block ${selectedWarehouse === wh ? 'bg-white/20 text-white' : 'text-gray-400'}`}>Active</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Warehouse Details & Actions */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{selectedWarehouse} Inventory</h2>
                        <div className="flex items-center gap-2 text-gray-500 mt-1">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">Location ID: {selectedWarehouse.substring(0, 3).toUpperCase()}-001</span>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                                {data?.total || 0} items
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {totalSelected > 0 && (
                            <span className="text-sm font-medium text-primary bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
                                {totalSelected} Selected
                            </span>
                        )}
                        <button
                            onClick={handleExport}
                            disabled={totalSelected === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Download className="w-4 h-4" />
                            {selectAllMatching ? 'Bulk Export All' : 'Export Selected'}
                        </button>
                    </div>
                </div>

                {/* Bulk Select Banner */}
                {isPageFullySelected && !selectAllMatching && (data?.total || 0) > 10 && (
                    <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-lg flex items-center justify-center gap-2">
                        <span>All {data?.products.length} products on this page are selected.</span>
                        <button
                            onClick={handleSelectAllMatching}
                            className="font-bold underline hover:text-blue-900"
                        >
                            Select all {data?.total} products in this warehouse
                        </button>
                    </div>
                )}

                {selectAllMatching && (
                    <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-lg flex items-center justify-center gap-2">
                        <span>All {data?.total} products in {selectedWarehouse} are selected.</span>
                        <button
                            onClick={() => { setSelectAllMatching(false); setSelectedIds(new Set()); }}
                            className="font-bold underline hover:text-blue-900"
                        >
                            Clear selection
                        </button>
                    </div>
                )}
            </div>

            {/* Inventory Table for Warehouse */}
            <ProductTable
                products={data?.products || []}
                isLoading={isLoading}
                currentPage={data?.page || 1}
                totalPages={data?.totalPages || 1}
                onPageChange={setPage}
                // Selection Props
                selectedIds={selectedIds}
                onToggleSelect={handleToggleSelect}
                onToggleSelectAll={handleToggleSelectAllPage}
                isAllSelected={selectAllMatching}
            />
        </div>
    );
};

export default Warehouses;
