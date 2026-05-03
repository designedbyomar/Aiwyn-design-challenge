"use client"

import { useState, useRef, useEffect } from "react"
import { Icon } from "./icons"

interface FilterDropdownProps {
  label: string
  icon?: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

export function FilterDropdown({ label, icon, options, value, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isActive = !value.startsWith("All")

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        className={`rm-filter ${isActive ? "applied" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {icon && <Icon name={icon} size={11} />}
        {isActive ? value : label}
        <span className="caret">▾</span>
      </button>
      {open && (
        <div className="rm-filter-dropdown">
          {options.map((opt) => (
            <div
              key={opt}
              className={`rm-filter-option ${value === opt ? "selected" : ""}`}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
            >
              {value === opt && <Icon name="check" size={12} />}
              {value !== opt && <span style={{ width: 12 }} />}
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
