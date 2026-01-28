import { ArrowUp, ArrowDown, MoreVertical } from 'lucide-react';
import clsx from 'clsx';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
    title: string;
    value: string;
    change?: number;
    trend?: 'up' | 'down';
    data: number[];
}

const MetricCard = ({ title, value, change, trend, data }: MetricCardProps) => {
    const chartData = data?.map(d => ({ value: d })) || [];
    const isPositive = trend === 'up';

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-end justify-between">
                <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
                    {change !== undefined && (
                        <div className={clsx("flex items-center text-xs font-medium", isPositive ? "text-green-600" : "text-red-600")}>
                            {isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                            {Math.abs(change)}%
                            <span className="text-gray-400 ml-1 font-normal">vs last month</span>
                        </div>
                    )}
                </div>

                <div className="h-12 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0.1} />
                                    <stop offset="95%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={isPositive ? "#10B981" : "#EF4444"}
                                fill={`url(#gradient-${title})`}
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default MetricCard;
