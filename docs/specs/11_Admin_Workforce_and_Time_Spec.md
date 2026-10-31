# Admin, Workforce & Time Management Specification
*Version 1.0 · 31 October 2026*

## 1. Roles
| Role | Can |
|---|---|
| Teller | Send, pay out, view transfers and own float |
| Supervisor | Teller + unlock, re-issue, cancel/refund, close the day, move cash from own branch, see own branch timesheets and reports |
| Compliance | View all, clear or reject alerts and holds |
| Treasury | Add float, move cash, edit exchange rates, view ledger and reports |
| Admin | Everything, plus network, staff, rules, system |
Roles come from the staff record only. Permissions are checked in the engine, not only hidden in the screen.

## 2. Staff management (Admin → Staff & time)
- Add staff: ID, name, role, branches, shift hours, starting 6-digit PIN (must be changed at first use).
- Edit role, branches, shift; reset a PIN.
- **Remove** = deactivate: signed out at once, cannot sign in, history kept. Can be restored.
- Guards: cannot remove yourself; cannot remove or demote the last active admin.

## 3. Time management
- **Operating hours** per branch (open, close, days) in the branch's local time. Tellers and supervisors cannot sign in or transact outside them (admin can turn this off).
- **Clock in** happens automatically at sign-in; **clock out** at sign-out, idle timeout or removal.
- **Late** = minutes after shift start beyond the grace period (default 10).
- **Overtime** = minutes after shift end (or all minutes on an unscheduled day).
- **Timesheets**: per staff over 7 days: shifts, hours, late count/minutes, overtime. Supervisors see their own branch.
- **Attendance log**: every record; admin can correct a record but must give a reason, and it is flagged "edited" and audit-logged.
- **On shift now** list.

## 4. Metrics and rules the admin can change
Code validity (days) · rate lock (minutes) · wrong-PIN attempts · sign-in attempts and lockout · idle sign-out · late grace · enforce hours · FX margin · same-country fee factor · minimum fee · hard maximum · high-value alert · second-approval threshold · ID-details threshold · cash variance tolerance · low-float alert · name-match thresholds. Also: add/deactivate branches (with agent commission and hours), add currencies and countries, set exchange rates.
Every change records who, what, old value and new value in the audit chain.

## 5. Audit
Hash-chained log (each entry contains the hash of the one before). "Verify audit chain" in Admin → System recomputes it and reports the first broken entry. Logged: sign-ins and failures, transfers, payouts and failures, locks, cancels, float moves, day closes, rate/rule/staff/branch changes, attendance edits.

## 6. Day close
Supervisor counts the drawer per currency. Difference to the books is posted to a variance account. Above tolerance (default US$7) a second approver must sign in and an alert is raised.

## 7. Production notes
Move PIN hashing server-side (Argon2id), add two-factor for admin and compliance, send timesheet export to payroll, and keep time records under local labour-law retention rules.
