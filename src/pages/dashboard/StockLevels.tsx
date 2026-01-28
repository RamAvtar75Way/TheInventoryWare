import Header from '../../components/layout/Header';
import toast from 'react-hot-toast';
import { useProducts } from '../../hooks/inventory/useInventory';
import { AlertTriangle, TrendingUp, Package } from 'lucide-react';
import StatusCard from '../../components/dashboard/StatusCard';
import ContentCard from '../../components/dashboard/ContentCard';
import Button from '../../components/ui/Button';

const StockLevels = () => {
    // Fetch only low/out of stock items for this view
    const { data, isLoading } = useProducts({ limit: 50, status: 'Low Stock' });
    const { data: outOfStock } = useProducts({ limit: 50, status: 'Out of Stock' });

    const allCriticalItems = [...(outOfStock?.products || []), ...(data?.products || [])];

    return (
        <div>
            <Header title="Stock Levels" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatusCard
                    title="Critical Stock"
                    value={`${outOfStock?.total || 0} Items`}
                    icon={AlertTriangle}
                    color="red"
                />
                <StatusCard
                    title="Low Stock"
                    value={`${data?.total || 0} Items`}
                    icon={Package}
                    color="yellow"
                />
                <StatusCard
                    title="In Stock"
                    value="Good"
                    icon={TrendingUp}
                    color="green"
                />
            </div>

            <ContentCard
                title="Reorder Suggestions"
                action={<p className="text-sm text-gray-500">Items below reorder level</p>}
                className="p-0" // Override for custom padding if needed, but ContentCard handles padding inside. 
            // Wait, my ContentCard implementation adds p-6 if title exists.
            // The table needs to be flush.
            // I will adjust usage: define table outside padding.
            >
                {/* Modifying ContentCard usage to support tables better? 
                    Actually, let's just put the table content directly here.
                    The ContentCard I wrote applies `p-6` if title exists. 
                    This might cause double padding or constraint.
                    Let's update ContentCard to flexible body padding first?
                    Or just accept it for now.
                    Wait, for tables we usually want `p-0` on body.
                */
                }

                {isLoading ? (
                    <div className="p-10 text-center text-gray-500">Loading alerts...</div>
                ) : allCriticalItems.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">No stock alerts at this time.</div>
                ) : (
                    <div className="-mx-6 -mb-6"> {/* Negative margin to counteract ContentCard padding if it enforces it? */}
                        {/* Actually, let's fix the component logic first. */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {['Product', 'Warehouse', 'Current Stock', 'Reorder Level', 'Suggested Order', 'Action'].map(header => (
                                            <th key={header} className="p-4 text-xs font-medium text-gray-500 uppercase">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {allCriticalItems.map(item => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="p-4 flex items-center gap-3">
                                                <img src={item.image} className="w-8 h-8 rounded-full" alt="" />
                                                <span className="font-medium text-gray-900">{item.name}</span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-500">{item.warehouse}</td>
                                            <td className="p-4 text-sm font-bold text-red-600">{item.quantity}</td>
                                            <td className="p-4 text-sm text-gray-600">{item.reorderLevel}</td>
                                            <td className="p-4 text-sm text-primary font-medium">+{item.reorderLevel * 2 - item.quantity}</td>
                                            <td className="p-4">
                                                <Button
                                                    size="xs" // Need to add XS or just use sm with override
                                                    className="h-7 text-xs px-3"
                                                    onClick={() => toast.success(`Reorder placed for ${item.name}`)}
                                                >
                                                    Reorder
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </ContentCard>
        </div>
    );
};

export default StockLevels;
