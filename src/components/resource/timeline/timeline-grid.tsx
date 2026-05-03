"use client"

import { Icon, Chip } from "../icons"
import { layoutBars } from "./bar-layout"
import { PROJECTS, STATUS_META, calcWeeklyHours } from "@/lib/data"
import type { Staff, Week, WeekHighlight } from "@/lib/types"

interface TimelineProps {
  weeks: Week[]
  staff: Staff[]
  highlightWeeks: WeekHighlight[]
  selectedStaffId: string | null
  onSelectStaff: (staffId: string) => void
  onSelectProject: (staffId: string, projectId: string) => void
}

function Legend() {
  return (
    <div className="legend">
      <span><span className="legend-swatch" style={{ background: "#2B8AFF" }} />Audit</span>
      <span><span className="legend-swatch" style={{ background: "#6B4FE0" }} />Tax</span>
      <span><span className="legend-swatch" style={{ background: "#14A085" }} />Advisory</span>
      <span><span className="legend-swatch" style={{ background: "#E0805A" }} />Bookkeeping</span>
      <span style={{ borderLeft: "1px solid var(--ink-200)", paddingLeft: 14 }}>
        <span className="legend-swatch" style={{ background: "rgba(255,193,7,0.35)" }} />Near capacity
      </span>
      <span><span className="legend-swatch" style={{ background: "rgba(220,53,69,0.35)" }} />Conflict</span>
    </div>
  )
}

export function TimelineGrid({
  weeks,
  staff,
  highlightWeeks,
  selectedStaffId,
  onSelectStaff,
  onSelectProject,
}: TimelineProps) {
  const colTemplate = `repeat(${weeks.length}, 1fr)`

  return (
    <div className="rm-timeline-card">
      <div className="rm-timeline-header">
        <h3>Staff capacity · {weeks.length} weeks</h3>
        <Legend />
      </div>
      <div className="rm-grid">
        {/* LEFT FROZEN COLUMN */}
        <div className="rm-grid-left">
          <div className="rm-grid-headrow">
            <span style={{ flex: 1 }}>Staff</span>
            <span style={{ width: 80, textAlign: "right" }}>Allocation</span>
          </div>
          {staff.map((s) => {
            const meta = STATUS_META[s.status]
            const isSelected = selectedStaffId === s.id
            return (
              <div
                key={s.id}
                className="rm-staffrow-left"
                style={isSelected ? { background: "var(--blue-50)" } : {}}
                onClick={() => onSelectStaff(s.id)}
              >
                <div className="rm-staff-avatar" style={{ background: s.color }}>{s.initials}</div>
                <div className="rm-staff-info">
                  <div className="rm-staff-name">
                    {s.name}
                    {s.conflicts > 0 && (
                      <span className="rm-conflict-count">
                        <Icon name="alert" size={9} /> {s.conflicts}
                      </span>
                    )}
                  </div>
                  <div className="rm-staff-meta">{s.role} · {s.team}</div>
                </div>
                <div className="rm-staff-stats">
                  <span
                    className="rm-allocation"
                    style={{ color: s.allocation > 100 ? "var(--red-600)" : "var(--ink-900)" }}
                  >
                    {s.allocation}%
                  </span>
                  <Chip kind={meta.chip}>{meta.label}</Chip>
                </div>
              </div>
            )
          })}
        </div>

        {/* RIGHT TIMELINE */}
        <div className="rm-grid-right">
          <div className="rm-grid-headrow center">
            <div className="rm-week-cols" style={{ gridTemplateColumns: colTemplate, width: "100%" }}>
              {weeks.map((w) => (
                <div key={w.i} className={`rm-week-cell ${w.month ? "month-start" : ""}`}>
                  {w.month && <span className="month">{w.month}</span>}
                  <span>{w.label.split(" ")[1]}</span>
                </div>
              ))}
            </div>
          </div>

          {staff.map((s) => {
            const weeklyHours = calcWeeklyHours(s, weeks)
            return (
              <div
                key={s.id}
                className="rm-staffrow-right"
                style={selectedStaffId === s.id ? { background: "var(--blue-50)" } : {}}
              >
                {/* Week background grid */}
                <div className="rm-week-cols" style={{ gridTemplateColumns: colTemplate }}>
                  {weeks.map((w) => {
                    const hl = highlightWeeks.find((h) => h.staffId === s.id && h.weekIdx === w.i)
                    const cls = hl ? `risk-${hl.kind}` : ""
                    return <div key={w.i} className={`rm-week-cell ${cls}`} />
                  })}
                </div>

                {/* Project bars */}
                <div className="rm-bars">
                  {layoutBars(s.assignments).map((row, rowIdx) =>
                    row.map((a) => {
                      const proj = PROJECTS[a.project]
                      if (!proj) return null
                      const startPct = (a.start / weeks.length) * 100
                      const widthPct = ((a.end - a.start + 1) / weeks.length) * 100
                      return (
                        <div
                          key={proj.id + "-" + a.start}
                          className={`rm-bar ${proj.type} ${a.conflict ? "conflict" : ""}`}
                          style={{
                            left: `calc(${startPct}% + 3px)`,
                            width: `calc(${widthPct}% - 6px)`,
                            top: rowIdx * 28,
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectProject(s.id, proj.id)
                          }}
                        >
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{proj.short}</span>
                          <span className="hours">· {a.hours}h/wk</span>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
