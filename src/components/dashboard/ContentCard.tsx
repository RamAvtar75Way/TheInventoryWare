import type { ReactNode } from 'react';

interface ContentCardProps {
    title?: string;
    action?: ReactNode;
    children: ReactNode;
    className?: string; // Allow extra classes if needed
}

const ContentCard = ({ title, action, children, className = '' }: ContentCardProps) => {
    return (
        <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
            {(title || action) && (
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    {title && <h3 className="text-lg font-bold text-gray-900">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className={title ? "p-6" : ""}>
                {children}
            </div>
        </div>
    );
};

export default ContentCard;
