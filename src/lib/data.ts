import type { Week, Project, Staff, StatusMeta } from "./types"

export const WEEKS_3MO: Week[] = [
  { i: 0, label: "Jan 5", month: "Jan" },
  { i: 1, label: "Jan 12", month: "" },
  { i: 2, label: "Jan 19", month: "" },
  { i: 3, label: "Jan 26", month: "" },
  { i: 4, label: "Feb 2", month: "Feb" },
  { i: 5, label: "Feb 9", month: "" },
  { i: 6, label: "Feb 16", month: "" },
  { i: 7, label: "Feb 23", month: "" },
  { i: 8, label: "Mar 2", month: "Mar" },
  { i: 9, label: "Mar 9", month: "" },
  { i: 10, label: "Mar 16", month: "" },
  { i: 11, label: "Mar 23", month: "" },
]

export const WEEKS_1MO: Week[] = WEEKS_3MO.slice(4, 8)

export const WEEKS_6MO: Week[] = [
  ...WEEKS_3MO,
  { i: 12, label: "Mar 30", month: "" },
  { i: 13, label: "Apr 6", month: "Apr" },
  { i: 14, label: "Apr 13", month: "" },
  { i: 15, label: "Apr 20", month: "" },
  { i: 16, label: "Apr 27", month: "" },
  { i: 17, label: "May 4", month: "May" },
  { i: 18, label: "May 11", month: "" },
  { i: 19, label: "May 18", month: "" },
  { i: 20, label: "May 25", month: "" },
  { i: 21, label: "Jun 1", month: "Jun" },
  { i: 22, label: "Jun 8", month: "" },
  { i: 23, label: "Jun 15", month: "" },
]

export const PROJECTS: Record<string, Project> = {
  rogers: {
    id: "rogers",
    name: "Rogers Manufacturing",
    short: "Rogers Mfg.",
    type: "audit",
    category: "Audit",
  },
  hudson: {
    id: "hudson",
    name: "Hudson Group",
    short: "Hudson Group",
    type: "tax",
    category: "Tax Prep",
  },
  blueoak: {
    id: "blueoak",
    name: "Blue Oak Partners",
    short: "Blue Oak",
    type: "advisory",
    category: "Advisory",
  },
  acme: {
    id: "acme",
    name: "Acme Foods",
    short: "Acme Foods",
    type: "audit",
    category: "2026 Audit Prep",
  },
  northline: {
    id: "northline",
    name: "Northline Dental",
    short: "Northline",
    type: "bookkeeping",
    category: "Bookkeeping",
  },
}

export const INITIAL_STAFF: Staff[] = [
  {
    id: "maya",
    name: "Maya Chen",
    role: "Senior Associate",
    team: "Tax",
    initials: "MC",
    color: "#2B8AFF",
    allocation: 72,
    status: "healthy",
    conflicts: 0,
    assignments: [
      { project: "hudson", start: 2, end: 9, hours: 16 },
      { project: "blueoak", start: 4, end: 7, hours: 13 },
    ],
  },
  {
    id: "jordan",
    name: "Jordan Lee",
    role: "Manager",
    team: "Audit",
    initials: "JL",
    color: "#14A085",
    allocation: 96,
    status: "approaching",
    conflicts: 0,
    assignments: [
      { project: "rogers", start: 0, end: 6, hours: 18 },
      { project: "acme", start: 6, end: 9, hours: 12 },
      { project: "northline", start: 8, end: 11, hours: 10 },
    ],
  },
  {
    id: "priya",
    name: "Priya Shah",
    role: "Senior Associate",
    team: "Tax",
    initials: "PS",
    color: "#6B4FE0",
    allocation: 118,
    status: "overallocated",
    conflicts: 3,
    assignments: [
      { project: "hudson", start: 2, end: 9, hours: 28 },
      { project: "acme", start: 6, end: 9, hours: 18, conflict: true },
    ],
  },
  {
    id: "sam",
    name: "Sam Rivera",
    role: "Associate",
    team: "Audit",
    initials: "SR",
    color: "#E0805A",
    allocation: 76,
    status: "healthy",
    conflicts: 0,
    assignments: [
      { project: "rogers", start: 0, end: 6, hours: 14 },
      { project: "northline", start: 8, end: 11, hours: 16 },
    ],
  },
  {
    id: "ana",
    name: "Ana Brooks",
    role: "Manager",
    team: "Advisory",
    initials: "AB",
    color: "#DC3545",
    allocation: 91,
    status: "approaching",
    conflicts: 1,
    assignments: [
      { project: "blueoak", start: 4, end: 7, hours: 22 },
      { project: "acme", start: 6, end: 9, hours: 14 },
      { project: "northline", start: 8, end: 11, hours: 8 },
    ],
  },
]

export const STATUS_META: Record<string, StatusMeta> = {
  underallocated: { chip: "slate", label: "Underallocated", swatch: "#5B7AA8" },
  healthy: { chip: "green", label: "Healthy", swatch: "#28A745" },
  approaching: { chip: "amber", label: "Approaching", swatch: "#FFC107" },
  fully: { chip: "neutral", label: "Fully Allocated", swatch: "#4A5568" },
  overallocated: { chip: "red", label: "Overallocated", swatch: "#DC3545" },
  budget: { chip: "purple", label: "Budget Risk", swatch: "#6B4FE0" },
}

export const FILTER_OPTIONS: Record<string, string[]> = {
  team: ["All teams", "Tax", "Audit", "Advisory"],
  role: ["All roles", "Manager", "Senior Associate", "Associate"],
  skill: ["All skills", "Tax", "Audit", "Advisory", "Bookkeeping"],
  partner: ["All partners", "Marcus Holloway", "Diana Reyes", "Sam Whitfield"],
  projectType: ["All types", "Audit", "Tax Prep", "Advisory", "Bookkeeping"],
  status: ["All", "Healthy", "Approaching", "Overallocated", "Underallocated"],
}

export function calcWeeklyHours(
  staff: Staff,
  weeks: Week[]
): number[] {
  const out = weeks.map(() => 0)
  staff.assignments.forEach((a) => {
    for (let w = a.start; w <= a.end; w++) {
      const idx = weeks.findIndex((wk) => wk.i === w)
      if (idx >= 0) out[idx] += a.hours
    }
  })
  return out
}

export function statusFromPct(pct: number): string {
  if (pct <= 49) return "underallocated"
  if (pct <= 79) return "healthy"
  if (pct <= 99) return "approaching"
  if (pct === 100) return "fully"
  return "overallocated"
}
