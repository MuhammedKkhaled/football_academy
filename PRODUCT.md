# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS, and JavaScript only, as explicitly requested.

## Users

- Primary: board member / administrator who needs a complete operational and financial view across academy branches.
- Secondary: branch administrators who record attendance, coach check-in/check-out with photo evidence, bus assignments, and payments.
- Other roles represented in the permission model: administration, accounting, and finance.

## Product Purpose

Provide a presentation-ready frontend prototype for operating a multi-branch football academy: players, subscriptions, attendance, coaches, buses, branch-specific extras, and financial oversight.

## Positioning

One Arabic operations view connects branch-level football activity with its financial consequences, while keeping prices, attendance, and transport isolated per branch.

## Operating Context

- The academy has multiple branches such as Badr and El Shorouk.
- Each branch has its own subscriptions, extras and pricing, attendance, buses, players, and coaches.
- Player subscriptions can be monthly or per-session; the example per-session plan has eight sessions per month, two each week.
- Coaches can be full-time with a fixed monthly salary or part-time paid per session.
- Administrators record player attendance, coach arrival/departure, and photo evidence for coach attendance.
- Each player has a guardian phone number used for follow-up contact.
- A player who reaches the branch's configurable absence limit (default 5) appears on the disconnected-players page until attendance is recorded or the player is reactivated manually.
- A bus has 28 player seats and players can be transferred between buses.
- Each branch closes its day financially: incoming receipts for one day are grouped by payment method (InstaPay, cash, Visa), tagged with the receiving administrator and the branch, and the day can be closed or reopened by an administrator.

## Capabilities and Constraints

- Frontend prototype only; no backend, database, or external dependencies.
- Board-member dashboard includes accounts, subscriptions, buses, extras, exports, branch filtering, and role/permission visibility.
- Demonstration login: `admin@gmail.com` / `password`.
- All displayed records and figures are illustrative prototype data, not operational claims.
- Arabic RTL is the primary interface language.

## Evidence on Hand

No brand assets, real player records, financial records, or academy identity were supplied. The prototype must use clearly illustrative data and avoid fabricating real-world claims.

## Product Principles

- Make branch context unmistakable before any operational action.
- Connect money, attendance, staffing, and transport without hiding the underlying records.
- Make capacity and exceptions visible early, especially overdue payments and full buses.
- Keep everyday administrative actions fast and explicit.

## Accessibility & Inclusion

The prototype should remain usable by keyboard, preserve readable contrast, and adapt from desktop to mobile while keeping Arabic reading order intact.
