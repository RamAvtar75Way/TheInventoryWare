import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 lg:ml-6 p-4 md:p-8">
                {/* Mobile Header Toggle */}
                <div className="lg:hidden flex items-center mb-6">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="ml-2 font-bold text-lg text-primary">The UnityWare</span>
                </div>

                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
