"use client"

import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string
  size?: number
  color?: string
  sw?: number
}

export function Icon({ name, size = 16, color = "currentColor", sw = 1.75, ...rest }: IconProps) {
  const props: SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...rest,
  }

  switch (name) {
    case "search":
      return <svg {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
    case "plus":
      return <svg {...props}><path d="M12 5v14M5 12h14" /></svg>
    case "download":
      return <svg {...props}><path d="M12 4v12M7 11l5 5 5-5M5 20h14" /></svg>
    case "alert":
      return <svg {...props}><path d="M12 3 2 20h20L12 3Z" /><path d="M12 10v5M12 18v.01" /></svg>
    case "warning":
      return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16v.01" /></svg>
    case "check":
      return <svg {...props}><path d="m5 12 5 5L20 7" /></svg>
    case "check-circle":
      return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></svg>
    case "close":
      return <svg {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>
    case "calendar":
      return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
    case "clock":
      return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
    case "users":
      return <svg {...props}><circle cx="9" cy="8" r="3.5" /><path d="M3 20c0-3.5 3-6 6-6s6 2.5 6 6" /><circle cx="17" cy="9" r="3" /><path d="M21 19c0-3-2-5-4.5-5" /></svg>
    case "user":
      return <svg {...props}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /></svg>
    case "bell":
      return <svg {...props}><path d="M6 8a6 6 0 1 1 12 0c0 4 2 6 2 6H4s2-2 2-6Z" /><path d="M10 19a2 2 0 0 0 4 0" /></svg>
    case "filter":
      return <svg {...props}><path d="M4 5h16l-6 8v6l-4-2v-4Z" /></svg>
    case "refresh":
      return <svg {...props}><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></svg>
    case "swap":
      return <svg {...props}><path d="M7 7h13l-3-3M17 17H4l3 3" /></svg>
    case "edit":
      return <svg {...props}><path d="M4 20h4l10-10-4-4L4 16Z" /><path d="m14 6 4 4" /></svg>
    case "flag":
      return <svg {...props}><path d="M5 21V4M5 4h12l-2 4 2 4H5" /></svg>
    case "chevron":
      return <svg {...props}><path d="m6 9 6 6 6-6" /></svg>
    case "arrow-right":
      return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7" /></svg>
    case "send":
      return <svg {...props}><path d="m4 12 16-8-6 18-3-7-7-3Z" /></svg>
    case "info":
      return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M12 8v.01M12 11v6" /></svg>
    case "sparkle":
      return <svg {...props}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3" /></svg>
    case "trend":
      return <svg {...props}><path d="m3 17 6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>
    default:
      return null
  }
}

export function Chip({
  kind = "neutral",
  icon,
  children,
}: {
  kind?: string
  icon?: string
  children: React.ReactNode
}) {
  return (
    <span className={`chip chip-${kind}`}>
      {icon && <Icon name={icon} size={10} />}
      {!icon && <span className="chip-dot" />}
      {children}
    </span>
  )
}
