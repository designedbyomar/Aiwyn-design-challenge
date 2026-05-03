import type { Assignment } from "@/lib/types"

export function layoutBars(assignments: Assignment[]): Assignment[][] {
  const rows: Assignment[][] = []
  const sorted = [...assignments].sort((a, b) => a.start - b.start)
  for (const a of sorted) {
    let placed = false
    for (const row of rows) {
      const last = row[row.length - 1]
      if (last.end < a.start) {
        row.push(a)
        placed = true
        break
      }
    }
    if (!placed) rows.push([a])
  }
  return rows
}
