"use client"

import { Icon } from "./icons"

interface PageHeaderProps {
  onNewAssignment: () => void
  onExport: () => void
}

export function PageHeader({ onNewAssignment, onExport }: PageHeaderProps) {
  return (
    <div className="rm-pageheader">
      <div>
        <h1>Resource Management</h1>
        <p>Plan staff capacity across active and upcoming client projects.</p>
      </div>
      <div className="rm-pageheader-actions">
        <button className="btn btn-secondary" onClick={onExport}>
          <Icon name="download" size={14} /> Export
        </button>
        <button className="btn btn-primary" onClick={onNewAssignment}>
          <Icon name="plus" size={14} /> New Assignment
        </button>
      </div>
    </div>
  )
}
