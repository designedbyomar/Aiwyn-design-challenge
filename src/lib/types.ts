export interface Project {
  id: string
  name: string
  short: string
  type: "audit" | "tax" | "advisory" | "bookkeeping"
  category: string
}

export interface Assignment {
  project: string
  start: number
  end: number
  hours: number
  conflict?: boolean
}

export interface Staff {
  id: string
  name: string
  role: string
  team: string
  initials: string
  color: string
  allocation: number
  status: StaffStatus
  conflicts: number
  assignments: Assignment[]
}

export type StaffStatus =
  | "underallocated"
  | "healthy"
  | "approaching"
  | "overallocated"
  | "fully"
  | "budget"

export interface Week {
  i: number
  label: string
  month: string
}

export interface WeekHighlight {
  staffId: string
  weekIdx: number
  kind: "amber" | "red"
}

export interface AssignmentForm {
  projectId: string
  staffId: string
  start: number
  end: number
  hours: number
  budgetHours: number
}

export type DrawerType =
  | "staff-detail"
  | "conflict"
  | "alternatives"
  | "adjust"
  | null

export type ModalType =
  | { kind: "new" }
  | { kind: "newConflict"; form: AssignmentForm }
  | { kind: "partner" }
  | null

export interface FilterState {
  team: string
  role: string
  skill: string
  partner: string
  projectType: string
  status: string
}

export type TimeRange = "1M" | "3M" | "6M"

export interface StatusMeta {
  chip: string
  label: string
  swatch: string
}
