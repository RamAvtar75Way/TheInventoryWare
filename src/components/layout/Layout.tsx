import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex-1 flex flex-col h-full lg:ml-6 relative z-0 transition-all duration-300">
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="lg:hidden flex items-center mb-6">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <span className="ml-2 font-bold text-lg text-primary">TheInventoryWare</span>
                    </div>

                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
