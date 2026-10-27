export function Landscape({
  variant = "hero",
}: {
  variant?: "hero" | "traversal" | "quest" | "memory";
}) {
  return (
    <svg
      className={`landscape landscape-${variant}`}
      viewBox="0 0 1200 800"
      fill="none"
      role="img"
      aria-label="Original geometric landscape: a path winds through monumental stone arches in a misty valley"
    >
      <defs>
        <linearGradient
          id={`sky-${variant}`}
          x2="0"
          y2="800"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#111d23" />
          <stop offset=".6" stopColor="#34444a" />
          <stop offset="1" stopColor="#7c7e73" />
        </linearGradient>
        <linearGradient id={`stone-${variant}`} x2="1" y2=".7">
          <stop stopColor="#405055" />
          <stop offset="1" stopColor="#1a272c" />
        </linearGradient>
        <linearGradient
          id={`path-${variant}`}
          x1="580"
          y1="400"
          x2="640"
          y2="800"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#b7ae8b" />
          <stop offset="1" stopColor="#5a635b" />
        </linearGradient>
        <radialGradient id={`mist-${variant}`}>
          <stop stopColor="#c3c6ac" stopOpacity=".35" />
          <stop offset="1" stopColor="#b3c9bf" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`grid-${variant}`}
          width="55"
          height="55"
          patternUnits="userSpaceOnUse"
        >
          <path d="M55 0H0V55" stroke="#c2d1cf" strokeOpacity=".06" />
        </pattern>
      </defs>
      <path fill={`url(#sky-${variant})`} d="M0 0h1200v800H0z" />
      <circle cx="825" cy="240" r="80" stroke="#c3c6ad" strokeOpacity=".18" />
      <circle cx="825" cy="240" r="62" stroke="#c3c6ad" strokeOpacity=".09" />
      <path
        d="M0 450 130 315 240 425 380 245 520 440 680 325 840 430 1000 290 1200 430V800H0Z"
        fill="#34454b"
      />
      <path
        d="m0 540 210-210 110 160 150-55 210 110 140-122 100 65 280-80v392H0Z"
        fill="#2c3e42"
      />
      <path
        d="m810 190 160 5 22 445-67-3-15-377-45 1-15 360-54 13Z"
        fill="#536362"
      />
      <path d="m970 195 34 27 25 405-37 13Z" fill="#243438" />
      <path
        d="m430 160 210-18 35 500-90-2-10-390-61 5 5 407-86 4Z"
        fill={`url(#stone-${variant})`}
      />
      <path d="m640 142 53 25 21 459-39 16Z" fill="#13242a" />
      <path
        d="m430 160 53 16 91-11 66-23"
        stroke="#86928a"
        strokeOpacity=".5"
      />
      <path d="m670 502 37-15 11 139-48 16Z" fill="#7d8472" />
      <path
        d="M0 683 144 591 310 615 435 553 545 622 657 566 833 615 976 568 1200 623V800H0Z"
        fill="#1d3033"
      />
      <path
        d="M591 532c-24 77 115 111 27 157-51 27-151 62-201 111h328c-19-60-39-92-46-118-13-48-81-75-87-150Z"
        fill={`url(#path-${variant})`}
      />
      <path d="m0 750 140-103 115 12 72 141H0Z" fill="#142528" />
      <path d="m1200 700-158-66-140 82-55 84h353Z" fill="#142528" />
      <path d="m173 559 58-10 10 104-64 4Z" fill="#53605b" />
      <path d="m231 549 20 13 9 83-19 8Z" fill="#283a3b" />
      <ellipse
        cx="625"
        cy="530"
        rx="490"
        ry="260"
        fill={`url(#mist-${variant})`}
      />
      <path
        d="M0 0h1200v800H0z"
        fill={`url(#grid-${variant})`}
        className="scene-grid"
      />
      <g stroke="#d1c5a4" strokeOpacity=".45">
        <path d="M490 390h30m-15-15v30M690 560h30m-15-15v30" />
        <path d="M505 390 705 560" strokeDasharray="3 7" />
      </g>
      <g fill="#c7b899">
        <rect x="609" y="590" width="5" height="17" rx="2" />
        <circle cx="611.5" cy="586" r="3" />
      </g>
    </svg>
  );
}
