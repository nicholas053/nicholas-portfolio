// components/HeroLines.tsx
"use client";

import React from "react";

interface HeroLinesProps {
  color?: string;
  opacity?: number;
  animate?: boolean;
}

export default function HeroLines({
  color = "#0ea5e9",
  opacity = 0.12,
  animate = true,
}: HeroLinesProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none -z-10"
      style={{ mixBlendMode: "normal" }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <defs>
          <linearGradient id="maskGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="1" />
            <stop offset="7%" stopColor="#fff" stopOpacity="1" />
            <stop offset="93%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#000" stopOpacity="1" />
          </linearGradient>
          <mask id="edgeMask">
            <rect x="0" y="0" width="100%" height="100%" fill="url(#maskGradient)" />
          </mask>

          <style>{`
            /* responsive stroke widths via CSS vars */
            svg {
              --hl-w-1: 2px;   /* small screens */
              --hl-w-2: 1.6px;
              --hl-w-3: 1.2px;
            }
            @media (min-width: 640px) {
              svg { --hl-w-1: 3px; --hl-w-2: 2.4px; --hl-w-3: 1.8px; }
            }
            @media (min-width: 1024px) {
              svg { --hl-w-1: 4px; --hl-w-2: 3.2px; --hl-w-3: 2.6px; }
            }

            .hl-1 { stroke-width: var(--hl-w-1); }
            .hl-2 { stroke-width: var(--hl-w-2); }
            .hl-3 { stroke-width: var(--hl-w-3); }

            @keyframes floatSmall {
              0% { transform: translateY(-4px); }
              50% { transform: translateY(4px); }
              100% { transform: translateY(-4px); }
            }
            @keyframes dashShift {
              from { stroke-dashoffset: 0; }
              to { stroke-dashoffset: -240; }
            }

            @media (prefers-reduced-motion: reduce) {
              .hl-float { animation: none !important; }
              .hl-dash { animation: none !important; stroke-dasharray: none !important; }
            }
          `}</style>
        </defs>

        <g mask="url(#edgeMask)">
          <g
            className={animate ? "hl-float" : ""}
            style={{
              animationDuration: "7s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          >
            <path
              d="M -80 180 C 160 90 380 280 640 180 C 900 80 1060 260 1300 180"
              fill="none"
              stroke={color}
              strokeOpacity={opacity}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`hl-1 ${animate ? "hl-dash" : ""}`}
              style={{
                strokeDasharray: animate ? 220 : undefined,
                animationName: animate ? "dashShift" : undefined,
                animationDuration: animate ? "20s" : undefined,
                animationTimingFunction: "linear",
              }}
            />
          </g>

          <g
            className={animate ? "hl-float" : ""}
            style={{
              animationDuration: "9s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              transform: "translateY(8px)",
            }}
          >
            <path
              d="M -80 300 C 120 230 420 400 720 300 C 960 230 1140 380 1300 300"
              fill="none"
              stroke={color}
              strokeOpacity={opacity * 0.95}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hl-2"
            />
          </g>

          <g style={{ transform: "translateY(14px)" }}>
            <path
              d="M -80 440 C 180 360 420 500 760 420 C 980 380 1160 480 1300 420"
              fill="none"
              stroke={color}
              strokeOpacity={opacity * 0.9}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hl-3"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
