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
