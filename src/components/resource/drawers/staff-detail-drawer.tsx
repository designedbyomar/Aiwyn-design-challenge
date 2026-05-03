"use client"

import { Icon, Chip } from "../icons"
import { PROJECTS, STATUS_META, calcWeeklyHours, WEEKS_3MO } from "@/lib/data"
import type { Staff } from "@/lib/types"

interface StaffDetailDrawerProps {
  staff: Staff
  onClose: () => void
  onResolve: (action: "reassign" | "adjust" | "flag") => void
}

export function StaffDetailDrawer({ staff, onClose, onResolve }: StaffDetailDrawerProps) {
  const weekly = calcWeeklyHours(staff, WEEKS_3MO)
  const maxWeekly = Math.max(...weekly)
  const totalScheduled = weekly.reduce((a, b) => a + b, 0)
  const isOverallocated = staff.status === "overallocated" || staff.status === "budget"
  const meta = STATUS_META[staff.status]

  return (
    <>
      <div className="rm-drawer-overlay" onClick={onClose} />
      <div className="rm-drawer">
        <button className="rm-drawer-close" onClick={onClose}>
          <Icon name="close" size={18} />
        </button>
        <div className="rm-drawer-head">
          {isOverallocated && (
            <div className="rm-drawer-eyebrow">
              <Icon name="alert" size={12} /> Capacity conflict · {staff.conflicts} week{staff.conflicts !== 1 ? "s" : ""}
            </div>
          )}
          {!isOverallocated && (
            <div className="rm-drawer-eyebrow" style={{ color: "var(--blue-600)" }}>
              <Icon name="user" size={12} /> Staff details
            </div>
          )}
          <h2 className="rm-drawer-title">{staff.name} · {staff.role}, {staff.team}</h2>
          <p className="rm-drawer-sub">
            <Chip kind={meta.chip}>{meta.label}</Chip>
          </p>
        </div>

        <div className="rm-drawer-body">
          <div className="rm-section">
            <div className="rm-section-title">Capacity snapshot</div>
            <div className="rm-stat-grid">
              <div className="rm-stat">
                <div className="label">Scheduled hours</div>
                <div className="value">
                  {maxWeekly}<span style={{ fontSize: 12, color: "var(--ink-500)", fontWeight: 500 }}> /wk</span>
                </div>
              </div>
              <div className="rm-stat">
                <div className="label">Available hours</div>
                <div className="value">
                  40<span style={{ fontSize: 12, color: "var(--ink-500)", fontWeight: 500 }}> /wk</span>
                </div>
              </div>
              <div className={`rm-stat ${isOverallocated ? "danger" : ""}`}>
                <div className="label">{isOverallocated ? "Overage" : "Remaining"}</div>
                <div className="value">
                  {isOverallocated ? "+" : ""}
                  {Math.abs(maxWeekly - 40)}
                  <span style={{ fontSize: 12, color: isOverallocated ? "var(--red-600)" : "var(--ink-500)", fontWeight: 500 }}> hrs/wk</span>
                </div>
              </div>
              <div className={`rm-stat ${isOverallocated ? "danger" : ""}`}>
                <div className="label">Allocation</div>
                <div className="value">{staff.allocation}%</div>
              </div>
            </div>
          </div>

          <div className="rm-section">
            <div className="rm-section-title">Project assignments</div>
            {staff.assignments.map((a) => {
              const proj = PROJECTS[a.project]
              if (!proj) return null
              const typeColors: Record<string, string> = {
                audit: "#2B8AFF",
                tax: "#6B4FE0",
                advisory: "#14A085",
                bookkeeping: "#E0805A",
              }
              return (
                <div className="rm-driver" key={a.project + a.start}>
                  <span className="rm-driver-bullet" style={{ background: typeColors[proj.type] }} />
                  <span className="rm-driver-name">{proj.name} · {proj.category}</span>
                  <span className="rm-driver-hours">{a.hours} hrs/wk</span>
                </div>
              )
            })}
            <div
              className="rm-driver"
              style={{
                background: "transparent",
                borderTop: "1px dashed var(--ink-200)",
                borderRadius: 0,
                paddingTop: 10,
                marginTop: 8,
              }}
            >
              <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "var(--ink-700)" }}>
                Total scheduled
              </span>
              <span style={{ fontWeight: 700, color: isOverallocated ? "var(--red-600)" : "var(--ink-900)" }}>
                {maxWeekly} hrs/wk
              </span>
            </div>
          </div>

          {isOverallocated && (
            <div className="rm-section">
              <div className="rm-section-title">Recommended actions</div>
              <div className="rm-action" onClick={() => onResolve("reassign")}>
                <div className="rm-action-icon"><Icon name="swap" size={14} /></div>
                <div className="rm-action-text">
                  <div className="rm-action-title">Reassign hours to another staff member</div>
                  <div className="rm-action-sub">Find alternatives that match role + skill</div>
                </div>
                <Icon name="arrow-right" size={14} color="var(--ink-400)" />
              </div>
              <div className="rm-action" onClick={() => onResolve("adjust")}>
                <div className="rm-action-icon" style={{ background: "var(--amber-100)", color: "var(--amber-600)" }}>
                  <Icon name="edit" size={14} />
                </div>
                <div className="rm-action-text">
                  <div className="rm-action-title">Adjust hours or shift dates</div>
                  <div className="rm-action-sub">Reduce hours to clear the overage</div>
                </div>
                <Icon name="arrow-right" size={14} color="var(--ink-400)" />
              </div>
              <div className="rm-action" onClick={() => onResolve("flag")}>
                <div className="rm-action-icon" style={{ background: "var(--purple-100)", color: "var(--purple-600)" }}>
                  <Icon name="flag" size={14} />
                </div>
                <div className="rm-action-text">
                  <div className="rm-action-title">Flag for partner review</div>
                  <div className="rm-action-sub">Send capacity risk summary to engagement partner</div>
                </div>
                <Icon name="arrow-right" size={14} color="var(--ink-400)" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
