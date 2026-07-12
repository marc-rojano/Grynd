import type { SVGProps } from 'react';

const BarbellIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M6 7v10" />
        <path d="M3 7h6" />
        <path d="M3 17h6" />
        <path d="M18 7v10" />
        <path d="M15 7h6" />
        <path d="M15 17h6" />
        <path d="M9 12h6" />
    </svg>
);

export default BarbellIcon;