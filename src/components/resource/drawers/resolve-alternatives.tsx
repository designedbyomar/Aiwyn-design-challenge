"use client"

import { Icon, Chip } from "../icons"

interface AltCardProps {
  initials: string
  color: string
  name: string
  role: string
  allocation: number
  match: string
  kind: "recommended" | "warning"
  rank: number
}

function AltCard({ initials, color, name, role, allocation, match, kind, rank }: AltCardProps) {
  const fillColor =
    allocation > 100 ? "var(--red-500)" :
    allocation >= 80 ? "var(--amber-500)" : "var(--green-500)"

  return (
    <div className={`rm-alt-card ${kind}`}>
      <div className="rm-staff-avatar" style={{ background: color, width: 40, height: 40, fontSize: 13 }}>
        {initials}
      </div>
      <div className="rm-alt-meta">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="rm-alt-name">{name}</div>
          {kind === "recommended" && rank === 1 && <Chip kind="green" icon="check">Best match</Chip>}
          {kind === "warning" && <Chip kind="amber" icon="warning">Near capacity</Chip>}
        </div>
        <div className="rm-alt-sub">{role} · {allocation}% allocated</div>
        <div className="rm-alt-bar">
          <div
            className="rm-alt-bar-fill"
            style={{ width: `${Math.min(allocation, 100)}%`, background: fillColor }}
          />
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-600)", marginTop: 6 }}>{match}</div>
      </div>
    </div>
  )
}

interface ResolveAlternativesProps {
  onClose: () => void
  onSelect: () => void
}

export function ResolveAlternatives({ onClose, onSelect }: ResolveAlternativesProps) {
  return (
    <>
      <div className="rm-drawer-overlay" onClick={onClose} />
      <div className="rm-drawer" style={{ width: 480 }}>
        <button className="rm-drawer-close" onClick={onClose}>
          <Icon name="close" size={18} />
        </button>
        <div className="rm-drawer-head">
          <div className="rm-drawer-eyebrow" style={{ color: "var(--blue-600)" }}>
            <Icon name="swap" size={12} /> Reassign work
          </div>
          <h2 className="rm-drawer-title">Compare alternatives</h2>
          <p className="rm-drawer-sub">Reassign 18 hrs/wk · Acme Foods · Feb 16 – Mar 6</p>
        </div>
        <div className="rm-drawer-body">
          <div className="rm-banner info" style={{ padding: 12 }}>
            <div className="rm-banner-icon"><Icon name="sparkle" size={14} color="var(--blue-600)" /></div>
            <div className="rm-banner-body">
              Ranked by role match, skill match, and remaining weekly capacity during the conflict window.
            </div>
          </div>

          <AltCard
            initials="JL" color="#14A085" name="Jordan Lee" role="Manager · Audit"
            allocation={82} match="Strong audit experience · Available 7 hrs/wk"
            kind="recommended" rank={1}
          />
          <AltCard
            initials="SR" color="#E0805A" name="Sam Rivera" role="Associate · Audit"
            allocation={76} match="Available during target weeks · 10 hrs/wk free"
            kind="recommended" rank={2}
          />
          <AltCard
            initials="AB" color="#DC3545" name="Ana Brooks" role="Manager · Advisory"
            allocation={91} match="Near capacity · Not recommended"
            kind="warning" rank={3}
          />

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="btn btn-ghost" onClick={onClose}>Back</button>
            <div style={{ flex: 1 }} />
            <button className="btn btn-primary" onClick={onSelect}>
              <Icon name="check" size={13} /> Reassign to Jordan
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
