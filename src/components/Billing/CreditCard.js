import React from 'react';

export default () => (
  <div className="interactive-credit-card interactive-credit-card__inner">
    <div className="interactive-credit-card interactive-credit-card__front">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 424 265"
        id="interactiveCardFront"
      >
        <defs>
          <linearGradient id="a" x1="0%" y1="13.779%" y2="86.221%">
            <stop offset="0%" stopColor="#FFF" stopOpacity=".796" />
            <stop offset="100%" stopColor="#FFF" stopOpacity={0} />
          </linearGradient>
          <filter
            id="shadow"
            width="111.9%"
            height="458.3%"
            x="-6%"
            y="-179.2%"
            filterUnits="objectBoundingBox"
          >
            <feOffset dy={5} in="SourceAlpha" result="shadowOffsetOuter1" />
            <feGaussianBlur
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
              stdDeviation={3}
            />
            <feColorMatrix
              in="shadowBlurOuter1"
              result="shadowMatrixOuter1"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0833151224 0"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g fill="none" fillRule="evenodd">
          <rect
            width={423}
            height={264}
            x=".5"
            y=".5"
            fill="#F8F8F8"
            stroke="#E5E5E5"
            rx={12}
          />
          <path
            fill="url(#a)"
            d="M114 1l199.677 263H411c6.627 0 12-5.373 12-12V13c0-6.627-5.373-12-12-12H114z"
          />
          <g transform="translate(32 40)">
            <rect width={69} height={50} fill="#E5E5E5" rx={6} />
            <path
              fill="#F8F8F8"
              d="M0 11h38a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6H0V11z"
            />
          </g>
          <g
            stroke="none"
            strokeWidth={1}
            fill="none"
            fillRule="evenodd"
            transform="translate(323 56), scale(0.8)"
          >
            {/**/} {/**/} {/**/}
          </g>
          <g fill="#B1B1B1" transform="translate(32 126)" id="cardNumber">
            <g className="input-field-dots">
              <circle cx={6} cy={6} r={6} /> <circle cx={102} cy={6} r={6} />
              <circle cx={26} cy={6} r={6} /> <circle cx={122} cy={6} r={6} />
              <circle cx={46} cy={6} r={6} /> <circle cx={142} cy={6} r={6} />
              <circle cx={66} cy={6} r={6} /> <circle cx={162} cy={6} r={6} />
              <circle cx={198} cy={6} r={6} /> <circle cx={218} cy={6} r={6} />
              <circle cx={238} cy={6} r={6} /> <circle cx={258} cy={6} r={6} />
              <circle cx={294} cy={6} r={6} /> <circle cx={314} cy={6} r={6} />
              <circle cx={334} cy={6} r={6} /> <circle cx={354} cy={6} r={6} />
            </g>
          </g>
          <text
            fill="#B1B1B1"
            fontFamily="AmericanTypewriter-Semibold, American Typewriter"
            fontSize={18}
            fontWeight={500}
          >
            <tspan x={32} y={215}>
              HOLDER NAME
            </tspan>
          </text>
          <g id="expiryMonth" fill="#B1B1B1" className="input-field-dots">
            <circle cx={306} cy={212} r={6} />
            <circle cx={326} cy={212} r={6} />
          </g>
          <g id="expiryYear" fill="#B1B1B1" className="input-field-dots">
            <circle cx={366} cy={212} r={6} />
            <circle cx={386} cy={212} r={6} />
          </g>
          <path d="M340 204.884h12v16h-12z" />
          <path
            fill="#E5E5E5"
            d="M349.677 204.896l.939.54-8.677 14.985-.939-.54z"
          />
          <text
            fill="#B1B1B1"
            fontFamily="ProximaNova-Regular, Proxima Nova"
            fontSize={14}
          >
            <tspan x={300} y={196}>
              VALID THRU
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  </div>
);
