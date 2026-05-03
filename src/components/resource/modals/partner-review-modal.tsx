"use client"

import { Icon, Chip } from "../icons"

interface PartnerReviewModalProps {
  onClose: () => void
  onSubmit: () => void
}

export function PartnerReviewModal({ onClose, onSubmit }: PartnerReviewModalProps) {
  return (
    <div className="rm-modal-overlay" onClick={onClose}>
      <div className="rm-modal" style={{ width: 640 }} onClick={(e) => e.stopPropagation()}>
        <div className="rm-modal-head">
          <div>
            <h2>Flag capacity risk for partner review</h2>
            <p>The partner will receive context and your recommended resolution.</p>
          </div>
          <button className="btn btn-ghost" onClick={onClose} style={{ marginLeft: "auto", padding: 6 }}>
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="rm-modal-body">
          <div className="rm-banner amber">
            <div className="rm-banner-icon"><Icon name="warning" size={16} color="#6B4F00" /></div>
            <div>
              <div className="rm-banner-title">Pending partner review</div>
              <div className="rm-banner-body">
                Conflict will remain visible on the timeline until partner responds.
              </div>
            </div>
          </div>

          <div className="rm-row-2">
            <div className="rm-field">
              <label>Project</label>
              <div className="rm-input">Acme Foods · 2026 Audit Prep</div>
            </div>
            <div className="rm-field">
              <label>Staff member</label>
              <div className="rm-input">Priya Shah · Senior Associate, Tax</div>
            </div>
          </div>
          <div className="rm-row-2">
            <div className="rm-field">
              <label>Conflict window</label>
              <div className="rm-input">Feb 16 — Mar 6, 2026 (3 weeks)</div>
            </div>
            <div className="rm-field">
              <label>Capacity impact</label>
              <div className="rm-input" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>118% peak · +7 hrs/wk overage</span>
                <Chip kind="red" icon="alert">Overallocated</Chip>
              </div>
            </div>
          </div>
          <div className="rm-field">
            <label>Recommended resolution</label>
            <div className="rm-select" style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Reassign 18 hrs/wk to Jordan Lee (Manager · Audit)</span>
              <span style={{ color: "var(--ink-400)" }}>▾</span>
            </div>
          </div>
          <div className="rm-field">
            <label>Note to partner</label>
            <div
              className="rm-input"
              style={{ minHeight: 84, padding: 12, color: "var(--ink-700)", lineHeight: 1.5 }}
            >
              Priya is at 118% during Acme audit prep due to Hudson tax season overlap. Recommend
              reassigning the 18 hrs/wk Acme block to Jordan Lee — strong audit background and
              sufficient remaining capacity. Awaiting your sign-off before we update the engagement plan.
            </div>
          </div>
        </div>
        <div className="rm-modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-secondary">Save draft</button>
          <button className="btn btn-primary" onClick={onSubmit}>
            <Icon name="send" size={13} /> Send for review
          </button>
        </div>
      </div>
    </div>
  )
}
