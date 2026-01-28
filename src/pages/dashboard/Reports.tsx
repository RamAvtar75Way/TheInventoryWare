import Header from '../../components/layout/Header';
import ContentCard from '../../components/dashboard/ContentCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Download, Share2 } from 'lucide-react';
import { useProducts } from '../../hooks/inventory/useInventory';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';

// Mock Data for Charts
const SALES_DATA = [
    { name: 'Jan', sales: 4000, stock: 2400 },
    { name: 'Feb', sales: 3000, stock: 1398 },
    { name: 'Mar', sales: 2000, stock: 9800 },
    { name: 'Apr', sales: 2780, stock: 3908 },
    { name: 'May', sales: 1890, stock: 4800 },
    { name: 'Jun', sales: 2390, stock: 3800 },
    { name: 'Jul', sales: 3490, stock: 4300 },
];

const Reports = () => {
    const { data: products } = useProducts({ limit: 1000 }); // Get all for export simulation

    const handleExport = () => {
        if (!products?.products) return;

        const headers = ['ID', 'Name', 'SKU', 'Category', 'Price', 'Stocks', 'Status', 'Warehouse'];
        const csvContent = [
            headers.join(','),
            ...products.products.map(p =>
                [p.id, p.name, p.sku, p.category, p.price, p.quantity, p.status, p.warehouse].join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'inventory-report.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <Header title="Reports & Analytics" />
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => toast.success('Downloading PDF report...')}
                        leftIcon={<Share2 className="w-4 h-4" />}
                    >
                        Export PDF
                    </Button>
                    <Button
                        onClick={handleExport}
                        leftIcon={<Download className="w-4 h-4" />}
                    >
                        Export CSV
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ContentCard title="Sales vs Stock Trends">
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={SALES_DATA}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6455c2" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#6455c2" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="sales" stroke="#6455c2" fillOpacity={1} fill="url(#colorSales)" />
                                <Area type="monotone" dataKey="stock" stroke="#10B981" fillOpacity={0} strokeDasharray="5 5" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </ContentCard>

                <ContentCard title="Warehouse Distribution">
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={SALES_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" fill="#6455c2" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ContentCard>
            </div>

            <ContentCard
                title="Recent Transactions"
                action={<Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover hover:scale-105 transition-transform p-0 h-auto">View All</Button>}
            >
                <div className="overflow-x-auto -mx-6 -mb-6">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                {['Transaction ID', 'Date', 'Product', 'Status', 'Quantity', 'Amount'].map(header => (
                                    <th key={header} className="p-4 text-xs font-medium text-gray-500 uppercase">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="p-4 text-sm font-medium text-gray-900">#TRX-{1000 + i}</td>
                                    <td className="p-4 text-sm text-gray-500">Oct 24, 2024</td>
                                    <td className="p-4 text-sm text-gray-900">Wireless Headphones</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Completed</span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">24</td>
                                    <td className="p-4 text-sm font-medium text-gray-900">$1,200.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ContentCard>
        </div>
    );
};

export default Reports;
