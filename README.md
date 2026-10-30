# 🌳 Bantaba  Cash Remittance Operating System (OS)

> **Home, within reach.**  
> A mission-critical, double-entry cash remittance teller and vault operations system designed for West African payout counters and global diaspora desks (Guangzhou, London, New York).

[![Deploy to GitHub Pages](https://github.com/Blackmelentan/bantaba-remittance-os/actions/workflows/deploy.yml/badge.svg)](https://github.com/Blackmelentan/bantaba-remittance-os/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-blueviolet.svg)](https://vitejs.dev/)

---

## 🚀 Live Deployment
- **GitHub Pages:** [https://blackmelentan.github.io/bantaba-remittance-os/](https://blackmelentan.github.io/bantaba-remittance-os/)

---

## 📖 Overview
**Bantaba Remittance OS** bridges cash-in desks across major diaspora trading hubs with high-volume counter cash-out locations across West Africa. The system enforces strict double-entry ledger bookkeeping, real-time FX fee engines, counter liquidity thresholds, and compliance audit trails.

### Supported Corridors
* **Origin Cash Desks (Cash-In):**
  - 🇨🇳 China — Guangzhou Desk (`CNY`)
  - 🇬🇧 United Kingdom — London Desk (`GBP`)
  - 🇺🇸 United States — New York Desk (`USD`)
* **Payout Counters (Cash-Out):**
  - 🇬🇲 The Gambia — Banjul & Serrekunda Counters (`GMD`)
  - 🇸🇳 Senegal — Dakar Counter (`XOF`)
  - 🇲🇱 Mali — Bamako Counter (`XOF`)
  - 🇬🇼 Guinea-Bissau — Bissau Counter (`XOF`)
  - 🇬🇳 Guinea-Conakry — Conakry Counter (`GNF`)

---

## ✨ Key Features

1. **Cash Desk (Send / Issue Transfer):**
   - Instant FX exchange rate calculations with counter fee breakdown.
   - Generates tamper-proof 10-digit redemption codes (`BNT-XXXX-XX`).
   - Thermal POS receipt slip preview with 80mm clean print styling.
   - Synthetic audio confirmation chime upon transfer issuance.

2. **Payout Counter (Redeem & Disburse):**
   - Instant code verification against the central ledger.
   - Anti-double-spend protection (prevents already redeemed codes from disbursing).
   - Vault liquidity check: blocks disbursement if counter vault cash float is insufficient.

3. **Regional Vault & Treasury Management:**
   - Real-time balances for Banjul (`GMD`), Dakar (`XOF`), Bamako (`XOF`), Conakry (`GNF`), and Bissau (`XOF`).
   - Dynamic float status indicators (`Optimal` vs `Low Float`).
   - Supervisor / Admin float top-up modal to inject cash reserves into branch vaults.

4. **Double-Entry General Ledger:**
   - Accurate accounting journal entries (DR Cash Vault / CR Customer Payable / CR FX Income).
   - Filter ledger by status (`All`, `UNREDEEMED`, `REDEEMED`, `CANCELLED`).
   - One-click **Export to CSV** for finance teams.

5. **Compliance & Audit Trails:**
   - Immutable log of staff actions, logins, payouts, and cancellations.
   - One-click **Export to CSV** for MLRO (Money Laundering Reporting Officers).

6. **Bento Grid Analytics:**
   - Real-time monthly processed volume (USD equivalent).
   - Corridor distribution breakdown.
   - Active ticket counts and repeat recipient metrics.

7. **Data Persistence:**
   - Full `localStorage` persistence with seamless "Reset to Demo Data" capability.

---

## 🛠️ Development & Tooling

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm` or `yarn`

### Setup
```bash
# Clone repository
git clone https://github.com/Blackmelentan/bantaba-remittance-os.git
cd bantaba-remittance-os

# Install development dependencies
npm install

# Start local development server (with HMR)
npm run dev

# Run automated business logic test suite
npm test

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🧪 Testing
The project includes automated business logic tests covering:
- FX fee deductions and payout totals across all corridors.
- Fee threshold validation.
- Redemption code structure (`BNT-XXXX-XX`).
- Double-entry accounting balancing.
- Cash disbursement and vault balance deduction.
- Vault deficit protection (anti-overdraft).
- Double-redemption and cancellation security gates.

To run tests:
```bash
npm test
```

---

## 🔐 Demo Credentials
When prompted at the login overlay:
* **Staff ID:** `TEL-8842` (or any custom Teller ID)
* **Terminal PIN:** `1234`
* **Roles:**
  - `Teller / Cashier` — Access to Send Desk and Payout Counter.
  - `Branch Supervisor` — Access to Analytics, Treasury, and Float Top-Up.
  - `Compliance / MLRO` — Access to General Ledger and Audit Trails.
  - `System Admin` — Unrestricted access to all modules.

---

## 📄 License
Licensed under the [MIT License](LICENSE).
