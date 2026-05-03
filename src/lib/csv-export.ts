import type { Staff } from "./types"

export function exportStaffCSV(staff: Staff[]) {
  const lines = [
    ["Staff", "Role", "Team", "Allocation %", "Status", "Conflicts"].join(","),
  ]
  staff.forEach((s) => {
    lines.push(
      [s.name, s.role, s.team, s.allocation, s.status, s.conflicts].join(",")
    )
  })
  const blob = new Blob([lines.join("\n")], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "resource-management.csv"
  a.click()
  URL.revokeObjectURL(url)
}
