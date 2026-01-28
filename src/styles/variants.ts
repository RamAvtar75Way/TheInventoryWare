export const STATUS_COLOR_VARIANTS = {
    red: {
        bg: 'bg-red-50',
        border: 'border-red-100',
        iconBg: 'bg-red-100',
        text: 'text-red-600'
    },
    yellow: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-100',
        iconBg: 'bg-yellow-100',
        text: 'text-yellow-600'
    },
    green: {
        bg: 'bg-green-50',
        border: 'border-green-100',
        iconBg: 'bg-green-100',
        text: 'text-green-600'
    },
    blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        iconBg: 'bg-blue-100',
        text: 'text-blue-600'
    },
    purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-100',
        iconBg: 'bg-purple-100',
        text: 'text-purple-600'
    }
} as const;

export type StatusColor = keyof typeof STATUS_COLOR_VARIANTS;
