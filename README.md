# Aiwyn Resource Management — Product Design Exercise

A timeline-based capacity planning concept for resource managers at accounting firms.

This project explores how resource managers can understand staff allocation across active and upcoming projects, identify capacity risk early, inspect what is causing conflicts, and take action before resourcing decisions are finalized.

---

## Project Context

Resource managers need to manage staff across multiple active client projects. They may know who is available, but they often lack a clear view of how allocated each person already is across overlapping, date-ranged work.

The challenge was to design a first-release experience that helps managers:

- See staff capacity across the next 3 months
- Identify people approaching or exceeding capacity
- Understand which projects are causing conflicts
- Reassign work, adjust hours/dates, or flag risk for partner review
- Make confident decisions with limited information

---

## Design Goal

Create a lightweight, data-forward resource management workflow that makes capacity risk visible, explainable, and actionable.

**Core principle:**

> Show capacity risk early. Explain what is driving it. Give the manager a direct path to resolve it.

---

## Solution Overview

The proposed experience is a desktop-first **Capacity Timeline**.

Instead of using a static table, the main view uses staff rows and date-ranged project bars across a weekly timeline. This makes it easier to see when projects overlap, where capacity breaks, and how long a conflict lasts.

The default view shows **3 months**, with controls to switch between:

- 1 month
- 3 months
- 6 months

---

## Tools Used

| Tool | Purpose |
|---|---|
| **ChatGPT** | Helped break down the prompt, define product requirements, map workflows, write documentation, and refine the case-study narrative. |
| **Claude Code** | Used to help structure, edit, and implement the prototype/codebase more quickly. |
| **Claude Design** | Used to support visual exploration, layout refinement, and UI direction. |
| **Figma / Design Tool** | Used to create low-to-mid fidelity wireframes and prototype screens. |
| **Mermaid** | Used to document key user flows as lightweight diagrams. |
| **Markdown / README** | Used to package the design process, product requirements, assumptions, and decisions in a repo-friendly format. |
| **Aiwyn Design System Notes** | Used as a visual reference for typography, color, UI components, spacing, tone, and accessibility. |
| **Tella / Loom-style Recording** | Used to record a walkthrough of the work, design decisions, and prototype flow. |
| **Vercel** | Used to deploy and share the prototype as a live web experience. |
| **GitHub** | Used to organize and present the design challenge deliverables. |

---

## Process Summary

I approached this as a conflict-prevention workflow for resource managers. I started by reframing the brief, defining the core data model, setting simple weekly capacity assumptions, and mapping the main workflows. From there, I designed a timeline-first interface that shows date-ranged project assignments across staff, highlights capacity risk, explains the project drivers behind conflicts, and gives managers direct resolution paths through reassignment, schedule adjustment, or partner review.

The final prototype focuses on v1 clarity, control, and decision confidence rather than broad scheduling automation.

---

## Process

### 1. Read and reframed the brief

I started by identifying the core problem behind the prompt:

> Resource managers need to understand staff capacity across date-ranged projects and resolve conflicts before staffing decisions are finalized.

The challenge was framed less as a dashboard problem and more as a **conflict-prevention workflow**.

---

### 2. Defined the core product model

I reduced the system to a few key objects:

| Object | Purpose |
|---|---|
| **Staff Member** | Person being assigned to project work |
| **Project** | Date-ranged client engagement |
| **Assignment** | Staff member + project + date range + weekly hours |
| **Capacity** | Available hours compared against scheduled hours |
| **Conflict** | A state where scheduled hours exceed available capacity |
| **Partner Review** | Lightweight escalation path for unresolved risk |

---

### 3. Set capacity assumptions

To keep the first release lean, I used simple planning assumptions:

- Capacity is calculated weekly
- Standard capacity is 40 hours/week
- Projects have start and end dates
- Assignments use weekly scheduled hours
- Overlapping projects are combined into weekly allocation
- Conflicts appear before assignment changes are saved

---

### 4. Chose a timeline-first interface

Because projects can span multiple weeks, I chose a timeline layout instead of a static table.

The timeline makes it easier to see:

- When a project starts and ends
- Which projects overlap
- Which weeks are at risk
- How long a conflict lasts
- Which staff members need attention

---

### 5. Created product requirements

I translated the brief into a concise set of requirements covering:

- Timeline range controls
- Staff rows
- Date-ranged project bars
- Weekly capacity calculations
- Allocation thresholds
- Conflict detection
- Conflict detail
- Assignment preview
- Resolution actions
- Partner escalation

---

### 6. Mapped key workflows

I mapped the main resource-management flows before designing screens:

- Review capacity
- Inspect conflict
- Create assignment
- Resolve conflict
- Reassign work
- Adjust hours/dates
- Flag for partner review

These flows helped keep the prototype focused on the manager’s decision path instead of becoming a generic scheduling dashboard.

---

### 7. Designed the main prototype states

The prototype focuses on six core states:

| Screen | Purpose |
|---|---|
| **Capacity Timeline Overview** | See staff allocation across the selected range |
| **Staff Capacity Detail Drawer** | Understand what is causing a conflict |
| **New Assignment Preview** | See capacity impact before saving |
| **Conflict Detected State** | Surface risk before the assignment is finalized |
| **Resolve Conflict** | Compare reassignment and adjustment options |
| **Partner Review** | Escalate unresolved risk with context |

---

### 8. Applied visual direction

The UI follows an Aiwyn-inspired enterprise SaaS direction:

- Plus Jakarta Sans
- Blue primary actions
- Clean white cards
- Light gray surfaces
- Status chips
- Rounded panels
- Minimal line icons
- Clear alert states
- High contrast status labels

The goal was to make the interface feel professional, calm, and operational without over-polishing the challenge.

---

### 9. Built and deployed the prototype

After defining the product requirements and flows, I used AI-assisted design and development tools to move quickly from concept to working prototype.

The prototype was organized in GitHub and deployed through Vercel so the work could be reviewed as a live web experience.

---

### 10. Documented scope and tradeoffs

I separated what belongs in the first release from what should come later.

V1 focuses on:

- Visibility
- Explanation
- Pre-save conflict detection
- Direct resolution actions

Later releases could add:

- Scenario planning
- PTO and holiday logic
- AI recommendations
- Forecasting
- Full partner approval workflow
- Integrations with time, billing, and project systems

---

### 11. Recorded the walkthrough

The final step was recording a short walkthrough covering:

- The problem framing
- Why the view is timeline-based
- How capacity is calculated
- How conflicts are surfaced
- How managers resolve issues
- What is in and out of scope
- What I would prioritize next

---

## Key Screens

### 1. Capacity Timeline Overview

The main workspace shows staff allocation across a 12-week timeline.

Key elements:

- Staff rows with role, team, allocation %, and status
- Date-ranged project bars across weekly columns
- Summary cards for available staff, near capacity, overallocated staff, and unassigned hours
- Filters for team, role, skill, partner, project type, and status
- Visual warnings for near-capacity and overallocated weeks

---

### 2. Staff Capacity Detail Drawer

Clicking a warning or conflict opens a right-side drawer.

The drawer explains:

- Conflict window
- Scheduled hours
- Available hours
- Overage
- Allocation percentage
- Project drivers
- Recommended actions

This keeps the manager in context while explaining why someone is overallocated.

---

### 3. New Assignment / Assignment Preview

Managers can create a new assignment by selecting:

- Project
- Staff member
- Start date
- End date
- Weekly hours
- Project budget hours
- Engagement partner

Before saving, the system previews the impact on the timeline.

---

### 4. Conflict Detected State

If the assignment creates a conflict, the system surfaces a clear warning before save.

Example:

> This assignment would push Priya Shah to 118% capacity during Feb 16–Mar 6, exceeding available capacity by 7 hrs/week.

The goal is to prevent silent overbooking.

---

### 5. Resolve Conflict

The manager can resolve a conflict through three paths:

#### Reassign Work

Compares alternative staff by:

- Role match
- Skill match
- Remaining capacity

#### Adjust Hours / Dates

Allows the manager to reduce weekly hours or shift the date range, with live capacity recalculation.

#### Flag for Partner Review

Creates a lightweight escalation path when the conflict requires partner approval or business tradeoff.

---

## Capacity Model

Capacity is calculated weekly.

```txt
Allocation % = Scheduled project hours ÷ Available working hours
