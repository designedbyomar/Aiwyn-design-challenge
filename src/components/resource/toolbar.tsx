"use client"

import { Icon } from "./icons"
import { FilterDropdown } from "./filter-dropdown"
import { FILTER_OPTIONS } from "@/lib/data"
import type { FilterState, TimeRange } from "@/lib/types"

interface ToolbarProps {
  range: TimeRange
  setRange: (r: TimeRange) => void
  filters: FilterState
  onFilterChange: (key: keyof FilterState, value: string) => void
  onClear: () => void
  activeCount: number
  rangeLabel: string
  onReset: () => void
}

export function Toolbar({
  range,
  setRange,
  filters,
  onFilterChange,
  onClear,
  activeCount,
  rangeLabel,
  onReset,
}: ToolbarProps) {
  return (
    <div className="rm-toolbar">
      <div className="rm-segment">
        <button className={range === "1M" ? "active" : ""} onClick={() => setRange("1M")}>1 month</button>
        <button className={range === "3M" ? "active" : ""} onClick={() => setRange("3M")}>3 months</button>
        <button className={range === "6M" ? "active" : ""} onClick={() => setRange("6M")}>6 months</button>
      </div>
      <span style={{ width: 1, height: 20, background: "var(--ink-200)", margin: "0 4px" }} />
      <FilterDropdown
        label="Team"
        icon="filter"
        options={FILTER_OPTIONS.team}
        value={filters.team}
        onChange={(v) => onFilterChange("team", v)}
      />
      <FilterDropdown
        label="Role"
        options={FILTER_OPTIONS.role}
        value={filters.role}
        onChange={(v) => onFilterChange("role", v)}
      />
      <FilterDropdown
        label="Skill"
        options={FILTER_OPTIONS.skill}
        value={filters.skill}
        onChange={(v) => onFilterChange("skill", v)}
      />
      <FilterDropdown
        label="Partner"
        options={FILTER_OPTIONS.partner}
        value={filters.partner}
        onChange={(v) => onFilterChange("partner", v)}
      />
      <FilterDropdown
        label="Project Type"
        options={FILTER_OPTIONS.projectType}
        value={filters.projectType}
        onChange={(v) => onFilterChange("projectType", v)}
      />
      <FilterDropdown
        label="Status"
        options={FILTER_OPTIONS.status}
        value={filters.status}
        onChange={(v) => onFilterChange("status", v)}
      />
      {activeCount > 0 && (
        <button className="btn btn-ghost btn-sm" onClick={onClear} style={{ color: "var(--blue-600)" }}>
          Clear ({activeCount})
        </button>
      )}
      <div className="rm-toolbar-spacer" />
      <span className="rm-toolbar-meta">{rangeLabel}</span>
      <button className="btn btn-ghost btn-sm" onClick={onReset} title="Reset prototype state">
        <Icon name="refresh" size={13} /> Reset
      </button>
    </div>
  )
}
