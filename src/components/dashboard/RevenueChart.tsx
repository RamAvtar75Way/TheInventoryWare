import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RevenueChart = () => {
    // Simulated data
    const data = [
        { name: 'Jan', revenue: 4000, inventory: 2400 },
        { name: 'Feb', revenue: 3000, inventory: 1398 },
        { name: 'Mar', revenue: 2000, inventory: 9800 },
        { name: 'Apr', revenue: 2780, inventory: 3908 },
        { name: 'May', revenue: 1890, inventory: 4800 },
        { name: 'Jun', revenue: 2390, inventory: 3800 },
        { name: 'Jul', revenue: 3490, inventory: 4300 },
        { name: 'Aug', revenue: 4000, inventory: 2400 },
        { name: 'Sep', revenue: 3000, inventory: 1398 },
        { name: 'Oct', revenue: 5000, inventory: 9800 }, // Peak
        { name: 'Nov', revenue: 2780, inventory: 3908 },
        { name: 'Dec', revenue: 3490, inventory: 4300 },
    ];

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Monthly Sales Vs Inventory Analysis</h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#6455c2]"></span>
                        <span className="text-xs text-gray-500">Gross Sales Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FB923C]"></span>
                        <span className="text-xs text-gray-500">Inventory Value</span>
                    </div>
                </div>
            </div>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barGap={8}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis hide />
                        <Tooltip
                            cursor={{ fill: '#F3F4F6' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Bar dataKey="revenue" fill="#60A5FA" radius={[4, 4, 0, 0]}>
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill="#6455c2" />
                            ))}
                        </Bar>
                        <Bar dataKey="inventory" fill="#FB923C" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueChart;
