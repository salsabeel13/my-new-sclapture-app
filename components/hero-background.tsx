export function HeroBackground() {
  return (
    <div className="hero-background" aria-hidden="true">
      <svg
        className="hero-lines"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldLine1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6f4b12" />
            <stop offset="30%" stopColor="#b28a3d" />
            <stop offset="50%" stopColor="#d8c18a" />
            <stop offset="70%" stopColor="#a98238" />
            <stop offset="100%" stopColor="#5f3e0c" />
          </linearGradient>
          <linearGradient id="goldLine2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3d2708" />
            <stop offset="35%" stopColor="#9b7839" />
            <stop offset="55%" stopColor="#cbb477" />
            <stop offset="80%" stopColor="#876522" />
            <stop offset="100%" stopColor="#4a2d08" />
          </linearGradient>
          <radialGradient id="goldGlow">
            <stop offset="0%" stopColor="#a98238" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <filter id="goldBlur"><feGaussianBlur stdDeviation="10" /></filter>
          <filter id="goldSoftBlur"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>

        <rect width="1600" height="900" fill="#030303" />
        <ellipse cx="800" cy="450" rx="650" ry="300" fill="url(#goldGlow)" filter="url(#goldBlur)" />

        <g className="line-group line-back" fill="none">
          <path d="M-100 160 C180 20 300 260 560 180 S930 80 1150 230 S1450 280 1700 80" stroke="#8b611d" strokeWidth="1.2" opacity=".45" />
          <path d="M-150 300 C120 120 330 420 610 300 S1000 190 1230 350 S1480 390 1750 220" stroke="#a98445" strokeWidth="1" opacity=".35" />
          <path d="M-100 700 C170 520 350 760 600 650 S960 510 1210 680 S1450 760 1700 560" stroke="#927440" strokeWidth="1" opacity=".3" />
        </g>

        <g className="line-group line-main-1" fill="none" strokeLinecap="round">
          <path d="M-100 110 C130 0 250 310 500 260 C690 220 760 390 930 470 C1110 555 1300 470 1700 120" stroke="#a98238" strokeWidth="24" opacity=".12" filter="url(#goldBlur)" />
          <path d="M-100 110 C130 0 250 310 500 260 C690 220 760 390 930 470 C1110 555 1300 470 1700 120" stroke="url(#goldLine1)" strokeWidth="8" />
          <path d="M-100 105 C130 0 250 300 500 250 C690 210 760 380 930 460 C1110 545 1300 460 1700 115" stroke="#d8c18a" strokeWidth="1.5" opacity=".8" />
        </g>

        <g className="line-group line-main-2" fill="none" strokeLinecap="round">
          <path d="M-150 420 C100 180 270 500 500 430 C700 370 800 520 990 610 C1180 700 1390 500 1750 430" stroke="#a98238" strokeWidth="20" opacity=".1" filter="url(#goldBlur)" />
          <path d="M-150 420 C100 180 270 500 500 430 C700 370 800 520 990 610 C1180 700 1390 500 1750 430" stroke="url(#goldLine2)" strokeWidth="5" />
          <path d="M-150 414 C100 174 270 494 500 424 C700 364 800 514 990 604 C1180 694 1390 494 1750 424" stroke="#cbb477" strokeWidth="1" opacity=".8" />
        </g>

        <g className="line-group line-lower" fill="none" strokeLinecap="round">
          <path d="M-150 780 C100 600 330 820 570 720 C760 640 900 790 1080 750 C1300 700 1400 560 1750 620" stroke="#a98238" strokeWidth="16" opacity=".08" filter="url(#goldBlur)" />
          <path d="M-150 780 C100 600 330 820 570 720 C760 640 900 790 1080 750 C1300 700 1400 560 1750 620" stroke="url(#goldLine1)" strokeWidth="4" />
        </g>

        <g className="delicate-lines" fill="none">
          <path d="M-100 210 C220 70 390 350 650 260 S1080 100 1700 350" stroke="#b69a5c" strokeWidth=".8" opacity=".55" />
          <path d="M-100 520 C200 330 400 600 650 510 S1100 330 1700 500" stroke="#a98a4a" strokeWidth=".7" opacity=".4" />
          <path d="M-100 850 C250 650 400 850 700 730 S1200 650 1700 760" stroke="#b69a5c" strokeWidth=".8" opacity=".45" />
        </g>
      </svg>
    </div>
  )
}