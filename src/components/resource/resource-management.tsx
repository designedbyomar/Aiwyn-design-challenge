"use client"

import { useState, useMemo, useCallback } from "react"
import { Icon } from "./icons"
import { Topbar } from "./topbar"
import { PageHeader } from "./page-header"
import { Toolbar } from "./toolbar"
import { SummaryCards } from "./summary-cards"
import { TimelineGrid } from "./timeline/timeline-grid"
import { StaffDetailDrawer } from "./drawers/staff-detail-drawer"
import { ResolveAlternatives } from "./drawers/resolve-alternatives"
import { AdjustHoursPanel } from "./drawers/adjust-hours-panel"
import { NewAssignmentModal } from "./modals/new-assignment-modal"
import { PartnerReviewModal } from "./modals/partner-review-modal"
import { INITIAL_STAFF, WEEKS_1MO, WEEKS_3MO, WEEKS_6MO, PROJECTS, calcWeeklyHours } from "@/lib/data"
import { exportStaffCSV } from "@/lib/csv-export"
import type { Staff, FilterState, TimeRange, WeekHighlight, ModalType, AssignmentForm } from "@/lib/types"

type DrawerState =
  | null
  | { type: "staff-detail"; staffId: string }
  | { type: "alternatives" }
  | { type: "adjust" }

const INITIAL_FILTERS: FilterState = {
  team: "All teams",
  role: "All roles",
  skill: "All skills",
  partner: "All partners",
  projectType: "All types",
  status: "All",
}

export function ResourceManagement() {
  const [staff, setStaff] = useState<Staff[]>(() => JSON.parse(JSON.stringify(INITIAL_STAFF)))
  const [drawer, setDrawer] = useState<DrawerState>(null)
  const [modal, setModal] = useState<ModalType>(null)
  const [range, setRange] = useState<TimeRange>("3M")
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)
  const [search, setSearch] = useState("")
  const [activeNav, setActiveNav] = useState("Resourcing")
  const [toast, setToast] = useState<string | null>(null)

  const weeks = range === "1M" ? WEEKS_1MO : range === "6M" ? WEEKS_6MO : WEEKS_3MO
  const rangeLabel =
    range === "1M" ? "Feb 2 — Feb 28, 2026 · 4 weeks" :
    range === "6M" ? "Jan 5 — Jun 21, 2026 · 24 weeks" :
    "Jan 5 — Mar 27, 2026 · 12 weeks"

  const filteredStaff = useMemo(() => {
    return staff.filter((s) => {
      if (filters.team !== "All teams" && s.team !== filters.team) return false
      if (filters.role !== "All roles" && s.role !== filters.role) return false
      if (filters.status !== "All") {
        const want = filters.status.toLowerCase()
        if (want === "overallocated" && s.status !== "overallocated" && s.status !== "budget") return false
        if (want === "healthy" && s.status !== "healthy") return false
        if (want === "approaching" && s.status !== "approaching") return false
        if (want === "underallocated" && s.status !== "underallocated") return false
      }
      if (search.trim() && !s.name.toLowerCase().includes(search.trim().toLowerCase())) return false
      return true
    })
  }, [staff, filters, search])

  const highlightWeeks = useMemo<WeekHighlight[]>(() => {
    const out: WeekHighlight[] = []
    filteredStaff.forEach((s) => {
      if (s.status === "overallocated" || s.status === "budget") {
        for (let w = 6; w <= 9; w++) out.push({ staffId: s.id, weekIdx: w, kind: "red" })
      } else if (s.status === "approaching") {
        for (let w = 6; w <= 9; w++) out.push({ staffId: s.id, weekIdx: w, kind: "amber" })
      }
    })
    return out
  }, [filteredStaff])

  const summary = useMemo(() => {
    const totalCount = filteredStaff.length
    const overCount = filteredStaff.filter((s) => s.status === "overallocated").length
    const nearCount = filteredStaff.filter((s) => s.status === "approaching").length
    const availCount = filteredStaff.filter((s) => s.status === "healthy" || s.status === "underallocated").length
    const totalScheduled = filteredStaff.reduce((sum, s) => {
      const weekly = calcWeeklyHours(s, weeks)
      return sum + weekly.reduce((a, b) => a + b, 0)
    }, 0)
    const totalCapacity = totalCount * 40 * weeks.length
    const unassigned = Math.max(0, totalCapacity - totalScheduled)
    return { totalCount, overCount, nearCount, availCount, unassigned }
  }, [filteredStaff, weeks])

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }, [])

  const handleReassign = () => {
    setStaff((prev) =>
      prev.map((s) => {
        if (s.id === "priya") {
          return {
            ...s, allocation: 88, status: "approaching" as const, conflicts: 0,
            assignments: s.assignments.filter((a) => a.project !== "acme"),
          }
        }
        if (s.id === "jordan") return { ...s, allocation: 96, status: "approaching" as const }
        return s
      })
    )
    setDrawer(null)
    showToast("Reassigned 18 hrs/wk from Priya Shah to Jordan Lee")
  }

  const handleAdjust = (newHours: number) => {
    setStaff((prev) =>
      prev.map((s) => {
        if (s.id === "priya") {
          const newAlloc = 72 + Math.round((newHours / 40) * 100)
          return {
            ...s,
            allocation: newAlloc,
            status: (newAlloc > 100 ? "overallocated" : newAlloc >= 80 ? "approaching" : "healthy") as Staff["status"],
            conflicts: newAlloc > 100 ? s.conflicts : 0,
            assignments: s.assignments.map((a) =>
              a.project === "acme" ? { ...a, hours: newHours, conflict: newAlloc > 100 } : a
            ),
          }
        }
        return s
      })
    )
    setDrawer(null)
    showToast(`Updated Acme Foods to ${newHours} hrs/wk`)
  }

  const handlePartnerReview = () => {
    setStaff((prev) =>
      prev.map((s) => (s.id === "priya" ? { ...s, status: "budget" as const } : s))
    )
    setModal(null)
    showToast("Capacity risk sent to Marcus Holloway for review")
  }

  const handleSaveAssignment = (form: AssignmentForm) => {
    const target = staff.find((s) => s.id === form.staffId)
    if (!target) { setModal(null); return }
    const newAlloc = target.allocation + Math.round((form.hours / 40) * 100)
    if (newAlloc > 100) {
      setModal({ kind: "newConflict", form })
      return
    }
    setStaff((prev) =>
      prev.map((s) => {
        if (s.id !== form.staffId) return s
        return {
          ...s,
          allocation: newAlloc,
          status: (newAlloc >= 80 ? "approaching" : newAlloc >= 50 ? "healthy" : "underallocated") as Staff["status"],
          assignments: [...s.assignments, {
            project: form.projectId, start: form.start, end: form.end, hours: form.hours,
          }],
        }
      })
    )
    setModal(null)
    showToast(`Assignment saved · ${target.name} now at ${newAlloc}%`)
  }

  const handleSaveWithConflict = (form: AssignmentForm) => {
    const target = staff.find((s) => s.id === form.staffId)
    setStaff((prev) =>
      prev.map((s) => {
        if (s.id !== form.staffId) return s
        const newAlloc = s.allocation + Math.round((form.hours / 40) * 100)
        return {
          ...s,
          allocation: newAlloc,
          status: "overallocated" as const,
          conflicts: (s.conflicts || 0) + 1,
          assignments: [...s.assignments, {
            project: form.projectId, start: form.start, end: form.end, hours: form.hours, conflict: true,
          }],
        }
      })
    )
    setModal(null)
    showToast(`Saved with conflict · ${target?.name} flagged for review`)
  }

  const handleReset = () => {
    setStaff(JSON.parse(JSON.stringify(INITIAL_STAFF)))
    setDrawer(null)
    setModal(null)
    setFilters(INITIAL_FILTERS)
    setSearch("")
    setRange("3M")
    showToast("Prototype reset")
  }

  const handleExport = () => {
    exportStaffCSV(filteredStaff)
    showToast("Exported CSV · resource-management.csv")
  }

  const activeFilterCount =
    Object.entries(filters).filter(([, v]) => !v.startsWith("All")).length + (search ? 1 : 0)

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS)
    setSearch("")
  }

  const selectedStaffId = drawer?.type === "staff-detail" ? drawer.staffId : null
  const selectedStaff = selectedStaffId ? staff.find((s) => s.id === selectedStaffId) : null

  return (
    <div style={{ minHeight: "100vh" }}>
      <Topbar
        search={search}
        setSearch={setSearch}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onShowToast={showToast}
      />
      <div className="rm-page">
        <PageHeader
          onNewAssignment={() => setModal({ kind: "new" })}
          onExport={handleExport}
        />
        <Toolbar
          range={range}
          setRange={setRange}
          filters={filters}
          onFilterChange={(key, value) => setFilters((f) => ({ ...f, [key]: value }))}
          onClear={clearFilters}
          activeCount={activeFilterCount}
          rangeLabel={rangeLabel}
          onReset={handleReset}
        />
        <SummaryCards summary={summary} />

        {staff.some((s) => s.status === "budget") && (
          <div className="rm-banner amber" style={{ marginBottom: 16 }}>
            <div className="rm-banner-icon"><Icon name="flag" size={14} color="#6B4F00" /></div>
            <div style={{ flex: 1 }}>
              <div className="rm-banner-title">1 capacity risk pending partner review</div>
              <div className="rm-banner-body">
                Priya Shah · Acme Foods (Feb 16 – Mar 6) · sent to Marcus Holloway · awaiting response
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => showToast("Status: in review with Marcus Holloway")}>
              View status
            </button>
          </div>
        )}

        {filteredStaff.length === 0 ? (
          <div style={{
            background: "white", border: "1px solid var(--ink-200)", borderRadius: 12,
            padding: 60, textAlign: "center",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", background: "var(--ink-100)",
              display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12,
            }}>
              <Icon name="search" size={22} color="var(--ink-500)" />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>No staff match your filters</div>
            <div style={{ color: "var(--ink-500)", fontSize: 13, marginBottom: 16 }}>
              Adjust filters or clear them to see your full team.
            </div>
            <button className="btn btn-primary" onClick={clearFilters}>Clear filters</button>
          </div>
        ) : (
          <TimelineGrid
            weeks={weeks}
            staff={filteredStaff}
            highlightWeeks={highlightWeeks}
            selectedStaffId={selectedStaffId}
            onSelectStaff={(staffId) => setDrawer({ type: "staff-detail", staffId })}
            onSelectProject={(staffId) => setDrawer({ type: "staff-detail", staffId })}
          />
        )}
      </div>

      {/* Drawers */}
      {drawer?.type === "staff-detail" && selectedStaff && (
        <StaffDetailDrawer
          staff={selectedStaff}
          onClose={() => setDrawer(null)}
          onResolve={(action) => {
            if (action === "reassign") setDrawer({ type: "alternatives" })
            else if (action === "adjust") setDrawer({ type: "adjust" })
            else if (action === "flag") { setDrawer(null); setModal({ kind: "partner" }) }
          }}
        />
      )}
      {drawer?.type === "alternatives" && (
        <ResolveAlternatives
          onClose={() => setDrawer({ type: "staff-detail", staffId: "priya" })}
          onSelect={handleReassign}
        />
      )}
      {drawer?.type === "adjust" && (
        <AdjustHoursPanel
          onClose={() => setDrawer({ type: "staff-detail", staffId: "priya" })}
          onApply={handleAdjust}
        />
      )}

      {/* Modals */}
      {modal?.kind === "new" && (
        <NewAssignmentModal
          staff={staff}
          onClose={() => setModal(null)}
          onSave={handleSaveAssignment}
        />
      )}
      {modal?.kind === "newConflict" && (
        <NewAssignmentModal
          staff={staff}
          initial={modal.form}
          forceConflict
          onClose={() => setModal(null)}
          onSave={handleSaveAssignment}
          onSaveAnyway={handleSaveWithConflict}
        />
      )}
      {modal?.kind === "partner" && (
        <PartnerReviewModal onClose={() => setModal(null)} onSubmit={handlePartnerReview} />
      )}

      {/* Toast */}
      {toast && (
        <div className="rm-toast">
          <Icon name="check-circle" size={16} color="#34B85B" />
          {toast}
        </div>
      )}
    </div>
  )
}
