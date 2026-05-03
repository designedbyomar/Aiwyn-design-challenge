"use client"

import { Icon } from "./icons"

interface TopbarProps {
  search: string
  setSearch: (v: string) => void
  activeNav: string
  setActiveNav: (v: string) => void
  onShowToast: (msg: string) => void
}

const NAV_ITEMS = ["Dashboard", "Clients", "Projects", "Resourcing", "Time", "Billing", "Reports"]

export function Topbar({ search, setSearch, activeNav, setActiveNav, onShowToast }: TopbarProps) {
  return (
    <div className="rm-topbar">
      <div className="rm-logo">
        <div className="rm-logo-mark">A</div>
        <span>aiwyn</span>
      </div>
      <nav className="rm-topnav">
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href="#"
            className={activeNav === item ? "active" : ""}
            onClick={(e) => {
              e.preventDefault()
              setActiveNav(item)
              if (item !== "Resourcing") onShowToast(`${item} is a placeholder in this prototype`)
            }}
          >
            {item}
          </a>
        ))}
      </nav>
      <div className="rm-topbar-right">
        <div className="rm-search">
          <span className="search-icon">
            <Icon name="search" size={14} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search staff, projects…"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{ background: "transparent", border: 0, color: "var(--ink-500)", cursor: "pointer", padding: 4 }}
            >
              <Icon name="close" size={12} />
            </button>
          )}
        </div>
        <button
          className="btn btn-ghost btn-sm"
          style={{ padding: 6 }}
          onClick={() => onShowToast("3 unread notifications")}
        >
          <Icon name="bell" size={16} />
        </button>
        <div className="rm-avatar" title="Rachel Tran (you)">RT</div>
      </div>
    </div>
  )
}
