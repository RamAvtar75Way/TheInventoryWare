import type { ReactNode } from 'react';

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-purple-100 text-[#6455c2]">
                {icon}
            </div>
            <div>
                <h3 className="text-xl font-bold text-[#6455c2] mb-2">{title}</h3>
                <p className="text-gray-900 font-medium leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default FeatureCard;
