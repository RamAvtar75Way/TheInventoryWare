import type { SVGProps } from 'react';

const WaveBackground = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg viewBox="0 0 1440 320" className="w-full h-full object-cover" {...props}>
            <path fill="#6455c2" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,117.3C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
    );
};

export default WaveBackground;
