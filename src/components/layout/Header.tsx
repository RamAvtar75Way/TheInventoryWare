import { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const Header = ({ title }: { title: string }) => {
    const [activeRange, setActiveRange] = useState('7d');
    const [showDateModal, setShowDateModal] = useState(false);
    const [showMetricsModal, setShowMetricsModal] = useState(false);

    // Date Modal State
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Metrics Modal State
    const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['Revenue', 'Stock']);
    const AVAILABLE_METRICS = ['Revenue', 'Stock', 'Profit', 'Expenses', 'Orders', 'Returns', 'Customer Satisfaction'];

    const handleDateSubmit = () => {
        toast.success(`Date range set: ${startDate} to ${endDate}`);
        setShowDateModal(false);
    };

    const handleMetricsSubmit = () => {
        toast.success(`Dashboard updated with ${selectedMetrics.length} metrics`);
        setShowMetricsModal(false);
    };

    const toggleMetric = (metric: string) => {
        if (selectedMetrics.includes(metric)) {
            setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
        } else {
            setSelectedMetrics([...selectedMetrics, metric]);
        }
    };

    return (
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
                <div className="flex bg-white border border-gray-200 rounded-lg p-1 shrink-0">
                    {['1d', '7d', '1m', '3m', '6m', '1y', '3y', '5y'].map((range) => (
                        <button
                            key={range}
                            onClick={() => {
                                setActiveRange(range);
                                toast.success(`Time range set to ${range}`);
                            }}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeRange === range
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={() => setShowDateModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                    >
                        <Calendar className="w-4 h-4" />
                        Select dates
                    </button>

                    <button
                        onClick={() => setShowMetricsModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover shadow-sm whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" />
                        Add Metrics
                    </button>
                </div>
            </div>

            {/* Date Range Modal */}
            <Modal isOpen={showDateModal} onClose={() => setShowDateModal(false)} title="Select Custom Date Range">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setShowDateModal(false)}>Cancel</Button>
                        <Button onClick={handleDateSubmit}>Apply Range</Button>
                    </div>
                </div>
            </Modal>

            {/* Metrics Selection Modal */}
            <Modal isOpen={showMetricsModal} onClose={() => setShowMetricsModal(false)} title="Customize Dashboard Metrics">
                <div className="space-y-4">
                    <p className="text-sm text-gray-500">Select the key performance indicators you want to display on your dashboard.</p>
                    <div className="grid grid-cols-2 gap-3">
                        {AVAILABLE_METRICS.map(metric => (
                            <label key={metric} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={selectedMetrics.includes(metric)}
                                    onChange={() => toggleMetric(metric)}
                                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                                />
                                <span className="text-sm font-medium text-gray-700">{metric}</span>
                            </label>
                        ))}
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setShowMetricsModal(false)}>Cancel</Button>
                        <Button onClick={handleMetricsSubmit}>Save Preferences</Button>
                    </div>
                </div>
            </Modal>
        </header>
    );
};

export default Header;
