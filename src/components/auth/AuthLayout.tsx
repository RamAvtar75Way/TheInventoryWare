import type { ReactNode } from 'react';
import ScrambledText from '../ui/reactbits/ScrambledText';

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="flex min-h-screen bg-white font-sans p-4">
            {/* Left Side - Brand Card */}
            <div className="hidden lg:flex w-1/2 bg-primary rounded-[40px] flex-col items-center justify-center relative overflow-hidden text-white p-12">
                <div className="relative z-10 text-center">
                    {/* Logo Placeholder - Matches Landing Page style roughly but simplified for Auth */}
                    <div className="mb-8 flex justify-center">
                        <img src="/logo.png" alt="TheInventoryWare" className="h-48 bg-white/10 p-4 rounded-2xl backdrop-blur-sm" />
                    </div>
                    <ScrambledText
                        className="scrambled-text-demo"
                        radius={100}
                        duration={1.2}
                        speed={0.5}
                        scrambleChars=".:"
                    >
                        TheInventoryWare
                    </ScrambledText>

                    <p className="max-w-[70%] m-auto text-center text-purple-100 text-2xl leading-relaxed">
                        Re-imagining inventory management experience with advance data analytics for optimum performance
                    </p>
                </div>

                {/* Subtle pattern or gradient overlay could go here */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
