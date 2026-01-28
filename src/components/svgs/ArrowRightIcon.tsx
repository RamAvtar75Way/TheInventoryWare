import type { SVGProps } from 'react';

const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="47" height="16" viewBox="0 0 47 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M1 8H46M46 8L39 1M46 8L39 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default ArrowRightIcon;
