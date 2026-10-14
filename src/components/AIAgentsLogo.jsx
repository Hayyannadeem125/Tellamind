import React from 'react';

export function AIAgentsLogo() {
  return (
    <svg
      className="ai-agents-service-logo"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ai-letter-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF2C4" />
          <stop offset="32%" stopColor="#F4D27B" />
          <stop offset="68%" stopColor="#D1AE5D" />
          <stop offset="100%" stopColor="#946521" />
        </linearGradient>
      </defs>
      <g stroke="#D1AE5D" strokeWidth="2" strokeLinecap="round">
        <path d="M14 10V5M21 10V5M27 10V5M34 10V5M14 38v5M21 38v5M27 38v5M34 38v5" />
        <path d="M10 14H5M10 21H5M10 27H5M10 34H5M38 14h5M38 21h5M38 27h5M38 34h5" />
      </g>
      <rect x="8" y="8" width="32" height="32" rx="6" fill="#211A10" stroke="#D1AE5D" strokeWidth="2.4" />
      <text x="24" y="31.2" textAnchor="middle" fill="#79531E" fontFamily="DM Sans, sans-serif" fontSize="16" fontWeight="900" letterSpacing="-0.7">AI</text>
      <text x="24" y="29.7" textAnchor="middle" fill="url(#ai-letter-gold)" stroke="#FFF0BB" strokeOpacity=".38" strokeWidth=".35" paintOrder="stroke" fontFamily="DM Sans, sans-serif" fontSize="16" fontWeight="900" letterSpacing="-0.7">AI</text>
    </svg>
  );
}
