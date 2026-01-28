import Header from '../../components/layout/Header';
import MetricCard from '../../components/dashboard/MetricCard';
import RevenueChart from '../../components/dashboard/RevenueChart';
import { useMetrics } from '../../hooks/inventory/useInventory';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

const Dashboard = () => {
    const { data: metrics, isLoading } = useMetrics();
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <div>
            <Header title={`Welcome back, ${user?.name || 'User'}`} />

            {isLoading ? (
                <div className="text-center p-10 text-gray-500">Loading metrics...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {metrics?.map((metric) => (
                        <MetricCard key={metric.title} {...metric} />
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                    <RevenueChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
