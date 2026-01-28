import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import FeatureCard from '../components/landing/FeatureCard';
import InventoryIcon from '../components/svgs/landing/InventoryIcon';
import StockLevel from '../components/svgs/landing/StockLevel';
import Report from '../components/svgs/landing/Report';
import Businesses from '../components/svgs/landing/Businesses';

import ArrowRightIcon from '../components/svgs/ArrowRightIcon';
import WaveBackground from '../components/svgs/landing/WaveBackground';
import CircularText from '../components/ui/reactbits/CircularText';


const Landing = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="h-screen bg-white flex flex-col font-sans overflow-hidden">
            <nav className="flex items-center justify-between px-8 md:px-16 py-6 w-full z-20 relative">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="TheInventoryWare Logo" className="h-10 md:h-16" />
                </div>
                <Link
                    to="/login"
                    className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-hover transition-all shadow-lg hover:shadow-xl flex items-center gap-2 text-lg"
                >
                    Sign in
                    <ArrowRightIcon className="text-white" />
                </Link>
            </nav>

            <main className="flex-1 w-full relative px-8 md:px-16 pb-12 flex flex-col justify-center">
                {/* Background Wave */}
                <div className="absolute top-0 left-0 w-full h-[50vh] pointer-events-none opacity-10 z-0">
                    <WaveBackground />
                </div>

                {/* Hero Header */}
                <div className="text-center w-full mb-4 lg:mb-12 relative z-10">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#000000] mb-4 leading-tight">
                        Technology doesn't have to feel like a different language
                    </h1>
                    <p className="text-lg md:text-xl text-primary font-medium max-w-4xl mx-auto">
                        Simplified inventory management to drive business growth and strategically scale operations
                    </p>
                </div>

                {/* Content Section: Features Left, Image Right */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10 w-full h-full max-h-[60vh]">
                    {/* Left: Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                        <FeatureCard
                            icon={<InventoryIcon className="w-10 h-10 text-primary" />}
                            title="Inventory Management"
                            description="Easily add and organize products, categories, and suppliers to keep your inventory structured and accessible."
                        />

                        <FeatureCard
                            icon={<StockLevel className="w-10 h-10 text-primary" />}
                            title="Stock Level Tracking"
                            description="Monitor real-time stock levels and get alerts when items are running low to prevent stockouts."
                        />

                        <FeatureCard
                            icon={<Report className="w-10 h-10 text-primary" />}
                            title="Detailed Reporting"
                            description="Gain actionable insights with automated reports on sales performance, inventory valuation, and trends."
                        />

                        <FeatureCard
                            icon={<Businesses className="w-10 h-10 text-primary" />}
                            title="Small Business Optimized"
                            description="A user-friendly dashboard tailored for small business needs, removing the complexity of enterprise tools."
                        />
                    </div>

                    {/* Right: Dashboard Preview Image */}
                    <div className="relative h-full flex items-center justify-center">
                        <img
                            src="/landing.png"
                            alt="Dashboard Preview"
                            className="max-h-full w-auto object-contain"
                        />
                    </div>
                </div>
            </main>

            <footer className="absolute bottom-4 hidden lg:block left-36 transform -translate-x-1/2 text-center text-sm text-primary font-medium z-20">
                <CircularText
                    text="© THEINVETORYWARE * 2026 * "
                    onHover="speedUp"
                    spinDuration={20}
                    className="text-primary"
                />
            </footer>
        </div>
    );
};

export default Landing;
