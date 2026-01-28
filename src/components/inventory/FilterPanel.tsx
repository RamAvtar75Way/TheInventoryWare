import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { X } from 'lucide-react';

interface FilterPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: { minPrice?: number; maxPrice?: number; warehouse?: string }) => void;
    onReset: () => void;
    initialFilters: { minPrice?: number; maxPrice?: number; warehouse?: string };
}

const WAREHOUSES = ['New York Hub', 'Los Angeles Depot', 'Chicago Center', 'Houston Warehouse', 'Miami Storage'];

export default function FilterPanel({ isOpen, onClose, onApply, onReset, initialFilters }: FilterPanelProps) {
    const [minPrice, setMinPrice] = useState<string>(initialFilters.minPrice?.toString() || '');
    const [maxPrice, setMaxPrice] = useState<string>(initialFilters.maxPrice?.toString() || '');
    const [warehouse, setWarehouse] = useState<string>(initialFilters.warehouse || '');

    useEffect(() => {
        setMinPrice(initialFilters.minPrice?.toString() || '');
        setMaxPrice(initialFilters.maxPrice?.toString() || '');
        setWarehouse(initialFilters.warehouse || '');
    }, [initialFilters, isOpen]);

    const handleApply = () => {
        onApply({
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            warehouse: warehouse || undefined
        });
    };

    const handleReset = () => {
        setMinPrice('');
        setMaxPrice('');
        setWarehouse('');
        onReset();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-gray-100 bg-gray-50/50"
                >
                    <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        {/* Price Range */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">Min Price</label>
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                placeholder="0"
                                className="w-full px-3 py-2 h-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">Max Price</label>
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                placeholder="1000"
                                className="w-full px-3 py-2 h-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        {/* Warehouse */}
                        <div className="space-y-1 md:col-span-1">
                            <label className="text-xs font-medium text-gray-500">Warehouse</label>
                            <select
                                value={warehouse}
                                onChange={(e) => setWarehouse(e.target.value)}
                                className="w-full px-3 py-2 h-10 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="">All Warehouses</option>
                                {WAREHOUSES.map(w => (
                                    <option key={w} value={w}>{w}</option>
                                ))}
                            </select>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <Button onClick={handleApply} className="flex-1">
                                Apply Filters
                            </Button>
                            <Button variant="outline" onClick={handleReset} className="px-3">
                                Reset
                            </Button>
                            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
