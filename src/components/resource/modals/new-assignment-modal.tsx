"use client"

import { useState } from "react"
import { Icon, Chip } from "../icons"
import { PROJECTS, WEEKS_3MO, FILTER_OPTIONS } from "@/lib/data"
import type { Staff, AssignmentForm } from "@/lib/types"

interface NewAssignmentModalProps {
  staff: Staff[]
  onClose: () => void
  onSave: (form: AssignmentForm) => void
  onSaveAnyway?: (form: AssignmentForm) => void
  initial?: AssignmentForm
  forceConflict?: boolean
}

export function NewAssignmentModal({
  staff,
  onClose,
  onSave,
  onSaveAnyway,
  initial,
  forceConflict,
}: NewAssignmentModalProps) {
  const projectsList = Object.values(PROJECTS)
  const [form, setForm] = useState<AssignmentForm>(
    initial || {
      projectId: "acme",
      staffId: "priya",
      start: 6,
      end: 9,
      hours: 18,
      budgetHours: 60,
    }
  )

  const proj = PROJECTS[form.projectId]
  const target = staff.find((s) => s.id === form.staffId)
  const newAlloc = target ? target.allocation + Math.round((form.hours / 40) * 100) : 0
  const inConflict = forceConflict || newAlloc > 100
  const overage = Math.max(0, newAlloc - 100) * 40 / 100
  const totalAssigned = form.hours * (form.end - form.start + 1)
  const overBudget = totalAssigned > form.budgetHours

  const update = (k: keyof AssignmentForm, v: string | number) =>
    setForm((f) => ({ ...f, [k]: v }))

  return (
    <div className="rm-modal-overlay" onClick={onClose}>
      <div className="rm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rm-modal-head">
          <div>
            <h2>New Assignment</h2>
            <p>Preview impact on the timeline before saving.</p>
          </div>
          <button className="btn btn-ghost" onClick={onClose} style={{ marginLeft: "auto", padding: 6 }}>
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="rm-modal-body">
          {inConflict && target && (
            <div className="rm-banner danger">
              <div className="rm-banner-icon"><Icon name="alert" size={16} color="#842029" /></div>
              <div>
                <div className="rm-banner-title">Capacity conflict detected</div>
                <div className="rm-banner-body">
                  This assignment would push <b>{target.name}</b> to <b>{newAlloc}% capacity</b> during
                  {" "}<b>Feb 16 – Mar 6</b>, exceeding available capacity by <b>{Math.round(overage)} hrs/week</b>.
                </div>
              </div>
            </div>
          )}

          <div className="rm-row-2">
            <div className="rm-field">
              <label>Project</label>
              <select className="rm-select" value={form.projectId} onChange={(e) => update("projectId", e.target.value)}>
                {projectsList.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} · {p.category}</option>
                ))}
              </select>
            </div>
            <div className="rm-field">
              <label>Staff member</label>
              <select className="rm-select" value={form.staffId} onChange={(e) => update("staffId", e.target.value)}>
                {staff.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} · {s.role}, {s.team} ({s.allocation}%)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rm-row-3">
            <div className="rm-field">
              <label>Start week</label>
              <select className="rm-select" value={form.start} onChange={(e) => update("start", +e.target.value)}>
                {WEEKS_3MO.map((w) => (
                  <option key={w.i} value={w.i}>{w.label}</option>
                ))}
              </select>
            </div>
            <div className="rm-field">
              <label>End week</label>
              <select className="rm-select" value={form.end} onChange={(e) => update("end", +e.target.value)}>
                {WEEKS_3MO.map((w) => (
                  <option key={w.i} value={w.i}>{w.label}</option>
                ))}
              </select>
            </div>
            <div className="rm-field">
              <label>Weekly hours</label>
              <input
                type="number" min="0" max="40" className="rm-input"
                value={form.hours} onChange={(e) => update("hours", +e.target.value)}
              />
            </div>
          </div>

          <div className="rm-row-2">
            <div className="rm-field">
              <label>Project budget hours</label>
              <div className="rm-input" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{totalAssigned} / {form.budgetHours} budgeted</span>
                <Chip kind={overBudget ? "purple" : "green"} icon={overBudget ? "warning" : "check"}>
                  {overBudget ? "Over budget" : "Within budget"}
                </Chip>
              </div>
            </div>
            <div className="rm-field">
              <label>Engagement partner</label>
              <select className="rm-select">
                {FILTER_OPTIONS.partner.slice(1).map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {target && (
            <div className="rm-section">
              <div className="rm-section-title">Capacity preview · {target.name}</div>
              <div style={{
                background: inConflict ? "var(--red-100)" : "var(--green-100)",
                border: `1px solid ${inConflict ? "#F5C2C7" : "#B9E5C4"}`,
                borderRadius: 10, padding: 14,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-600)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Current → New peak
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 18, color: inConflict ? "var(--red-600)" : "var(--green-600)" }}>
                    {target.allocation}% → {newAlloc}%
                  </span>
                </div>
                <div style={{ height: 8, background: "var(--white)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                  <div style={{
                    height: "100%",
                    width: `${Math.min((newAlloc / 130) * 100, 100)}%`,
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
                  <span>40 hrs/wk available</span>
                  <span>
                    {inConflict
                      ? `+${Math.round(overage)} hrs/wk over`
                      : `${Math.round(40 - (target.allocation * 0.4) - form.hours)} hrs/wk free`}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="rm-modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          {inConflict ? (
            <>
              <button className="btn btn-secondary" onClick={() => onSave(form)}>Save as draft</button>
              <button
                className="btn btn-primary"
                style={{ background: "var(--red-600)" }}
                onClick={() => (onSaveAnyway || onSave)(form)}
              >
                <Icon name="alert" size={13} /> Save with conflict
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => onSave(form)}>
              <Icon name="check" size={13} /> Save assignment
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
