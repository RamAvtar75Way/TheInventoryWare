import { Calendar } from 'lucide-react';

const Header = ({ title }: { title: string }) => {
    return (
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
                {/* Date Filters */}
                <div className="flex bg-white border border-gray-200 rounded-lg p-1 shrink-0">
                    {['1d', '7d', '1m', '3m', '6m', '1y', '3y', '5y'].map((range) => (
                        <button
                            key={range}
                            className="px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors whitespace-nowrap"
                        >
                            {range}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                        <Calendar className="w-4 h-4" />
                        Select dates
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover shadow-sm whitespace-nowrap">
                        Add Metrics
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
