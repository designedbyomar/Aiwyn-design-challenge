"use client"

import { useState } from "react"
import { Icon } from "../icons"

interface AdjustHoursPanelProps {
  onClose: () => void
  onApply: (hours: number) => void
}

export function AdjustHoursPanel({ onClose, onApply }: AdjustHoursPanelProps) {
  const [hours, setHours] = useState(11)
  const newPct = 72 + Math.round((hours / 40) * 100)
  const inConflict = newPct > 100

  return (
    <>
      <div className="rm-drawer-overlay" onClick={onClose} />
      <div className="rm-drawer" style={{ width: 480 }}>
        <button className="rm-drawer-close" onClick={onClose}>
          <Icon name="close" size={18} />
        </button>
        <div className="rm-drawer-head">
          <div className="rm-drawer-eyebrow" style={{ color: "var(--amber-600)" }}>
            <Icon name="edit" size={12} /> Adjust hours / dates
          </div>
          <h2 className="rm-drawer-title">Acme Foods · Priya Shah</h2>
          <p className="rm-drawer-sub">Recalculates capacity in real time</p>
        </div>
        <div className="rm-drawer-body">
          <div className="rm-field">
            <label>Weekly hours</label>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input
                type="range" min="0" max="40" value={hours}
                onChange={(e) => setHours(+e.target.value)}
                style={{ flex: 1, accentColor: "var(--blue-600)" }}
              />
              <div style={{ fontVariantNumeric: "tabular-nums", fontWeight: 700, fontSize: 18, minWidth: 80, textAlign: "right" }}>
                {hours} <span style={{ fontSize: 12, color: "var(--ink-500)", fontWeight: 500 }}>hrs/wk</span>
              </div>
            </div>
          </div>
          <div className="rm-row-2">
            <div className="rm-field">
              <label>Start date</label>
              <div className="rm-input">Feb 16, 2026</div>
            </div>
            <div className="rm-field">
              <label>End date</label>
              <div className="rm-input" style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Mar 6, 2026</span>
                <Icon name="calendar" size={14} color="var(--ink-400)" />
              </div>
            </div>
          </div>

          <div className="rm-section">
            <div className="rm-section-title">Updated capacity preview</div>
            <div style={{
              background: inConflict ? "var(--red-100)" : "var(--green-100)",
              border: `1px solid ${inConflict ? "#F5C2C7" : "#B9E5C4"}`,
              borderRadius: 10, padding: 14,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-600)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Peak allocation
                </span>
                <span style={{ fontWeight: 700, fontSize: 18, color: inConflict ? "var(--red-600)" : "var(--green-600)" }}>
                  {newPct}%
                </span>
              </div>
              <div style={{ height: 8, background: "var(--white)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                <div style={{
                  height: "100%",
                  width: `${Math.min((newPct / 130) * 100, 100)}%`,
                  background: inConflict ? "var(--red-500)" : "var(--green-500)",
                  transition: "width 0.15s",
                }} />
                <div style={{
                  position: "absolute", top: -2, bottom: -2,
                  left: `${(100 / 130) * 100}%`,
                  borderLeft: "2px dashed var(--ink-400)",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "var(--ink-600)" }}>
                <span>{inConflict ? "Still over capacity" : "Within capacity"}</span>
                <span>40 hrs/wk available</span>
              </div>
            </div>
          </div>

          <div className="rm-section">
            <div className="rm-section-title">Change summary</div>
            <div style={{ fontSize: 13, color: "var(--ink-700)", lineHeight: 1.6 }}>
              Acme Foods reduced from <s style={{ color: "var(--ink-400)" }}>18 hrs/wk</s> → <b>{hours} hrs/wk</b>.<br />
              Project budget impact: <b>{(hours * 3).toFixed(0)} / 60 budgeted hours</b>.
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <div style={{ flex: 1 }} />
            <button
              className="btn btn-primary"
              onClick={() => onApply(hours)}
              disabled={inConflict}
              style={inConflict ? { opacity: 0.6, cursor: "not-allowed" } : {}}
            >
              <Icon name="check" size={13} /> Apply changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
