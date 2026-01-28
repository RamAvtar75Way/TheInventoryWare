import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import { STATUS_COLOR_VARIANTS, type StatusColor } from '../../styles/variants';

interface StatusCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: StatusColor;
    subtitle?: string;
}

const StatusCard = ({ title, value, icon: Icon, color, subtitle }: StatusCardProps) => {
    const styles = STATUS_COLOR_VARIANTS[color];

    return (
        <div className={clsx("p-6 rounded-xl border", styles.bg, styles.border)}>
            <div className="flex items-center gap-4">
                <div className={clsx("p-3 rounded-lg", styles.iconBg, styles.text)}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <p className={clsx("text-sm font-medium", styles.text)}>{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                    {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
                </div>
            </div>
        </div>
    );
};

export default StatusCard;
