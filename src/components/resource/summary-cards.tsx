"use client"

import { Icon } from "./icons"

interface SummaryStats {
  totalCount: number
  overCount: number
  nearCount: number
  availCount: number
  unassigned: number
}

export function SummaryCards({ summary }: { summary: SummaryStats }) {
  return (
    <div className="rm-summary">
      <div className="rm-card slate">
        <div className="label">Available Staff</div>
        <div className="value">
          {summary.availCount}
          <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-500)" }}> / {summary.totalCount}</span>
        </div>
        <div className="delta">Healthy or under-allocated</div>
        <div className="accent"><Icon name="users" size={16} /></div>
      </div>
      <div className="rm-card amber">
        <div className="label">Near Capacity</div>
        <div className="value">{summary.nearCount}</div>
        <div className="delta">80–99% allocated</div>
        <div className="accent"><Icon name="warning" size={16} /></div>
      </div>
      <div className="rm-card red">
        <div className="label">Overallocated</div>
        <div className="value">{summary.overCount}</div>
        <div className="delta down">Action required</div>
        <div className="accent"><Icon name="alert" size={16} /></div>
      </div>
      <div className="rm-card green">
        <div className="label">Unassigned Hours</div>
        <div className="value">
          {summary.unassigned}
          <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-500)" }}> hrs</span>
        </div>
        <div className="delta">Available capacity</div>
        <div className="accent"><Icon name="clock" size={16} /></div>
      </div>
    </div>
  )
}
