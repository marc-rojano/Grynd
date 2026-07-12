import type { SVGProps } from 'react';

const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 20s-6.5-4.35-8.3-8.2A5.2 5.2 0 0 1 12 6.3a5.2 5.2 0 0 1 8.3 5.5C18.5 15.65 12 20 12 20Z" />
    </svg>
);

export default HeartIcon;