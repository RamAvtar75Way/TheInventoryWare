import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import type { RootState } from '../../store/store';
import {
    LayoutDashboard,
    ShoppingCart,
    Warehouse,
    Package,
    Settings,
    LifeBuoy,
    FileText,
    X
} from 'lucide-react';
import clsx from 'clsx';
import SearchIcon from '../svgs/SearchIcon';
import LogoutIcon from '../svgs/LogoutIcon';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isActive = (path: string) => location.pathname === path;

    // Navigation items based on design
    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'Inventory', icon: ShoppingCart, path: '/inventory' },
        { label: 'Warehouses', icon: Warehouse, path: '/warehouses' },
        { label: 'Stock Levels', icon: Package, path: '/stock' },
        { label: 'Reports', icon: FileText, path: '/reports' },
    ];

    const bottomItems = [
        { label: 'Support', icon: LifeBuoy, path: '/support' },
        { label: 'Settings', icon: Settings, path: '/settings' },
    ];

    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/50 z-20 transition-opacity lg:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside className={clsx(
                "w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 overflow-y-auto z-30 transition-transform duration-300 lg:translate-x-0 lg:static",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-4 flex items-center justify-between m-auto">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <img src="/logo1.png" alt="TheInventoryWare Logo" className="h-8 md:h-12" />
                    </h1>
                    <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {/* ... search and nav items ... */}
                    <div className="mb-4">
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                            />
                            <SearchIcon className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>

                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            onClick={() => onClose && onClose()}
                            className={clsx(
                                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                isActive(item.path)
                                    ? 'bg-purple-50 text-primary'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5", isActive(item.path) ? "text-primary" : "text-gray-500")} />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100 space-y-1">
                    {bottomItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            onClick={() => onClose && onClose()}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                            <item.icon className="w-5 h-5 text-gray-500" />
                            {item.label}
                        </Link>
                    ))}

                    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                        </div>
                        <button
                            onClick={() => {
                                dispatch(logout());
                                navigate('/login');
                            }}
                            className="text-gray-400 hover:text-gray-600"
                            title="Logout"
                        >
                            <LogoutIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
