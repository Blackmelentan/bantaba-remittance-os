# Bantaba Cash Remittance Operating System

> **Home, within reach.**  
> A high-reliability, double-entry cash remittance teller and vault operations system designed for West African payout counters and global diaspora desks.

[![Deploy Bantaba Remittance OS](https://github.com/Blackmelentan/bantaba-remittance-os/actions/workflows/deploy.yml/badge.svg)](https://github.com/Blackmelentan/bantaba-remittance-os/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-blueviolet.svg)](https://vitejs.dev/)

---

## Live Deployment
- **Live System:** [https://blackmelentan.github.io/bantaba-remittance-os/](https://blackmelentan.github.io/bantaba-remittance-os/)

---

## Platform Overview
Bantaba is designed for cross-border corridor operations, bridging high-volume diaspora cash intake with rapid cash disbursement across regional branch counters.

### Operating Corridors (Bidirectional Sending & Receiving)
Every branch and counter in the Bantaba network operates both as a cash collection desk and as a cash payout counter. Any currency can be remitted to any other supported country or currency:
* **China:** Guangzhou (`CANTON_GZ`), Yiwu (`YIWU_CN`) — CNY
* **United Kingdom:** London (`UK_LDN`), Manchester (`UK_MCR`) — GBP
* **United States:** New York (`US_NYC`), Atlanta (`US_ATL`) — USD
* **Europe:** Berlin (`DE_BER`), Paris (`FR_PAR`) — EUR
* **Middle East:** Dubai (`AE_DXB`) — AED
* **The Gambia:** Banjul (`GM_BJL`), Serrekunda (`GM_SKD`) — GMD
* **Senegal:** Dakar (`SN_DKR`), Ziguinchor (`SN_ZIG`) — XOF
* **Mali:** Bamako (`ML_BMK`) — XOF
* **Guinea-Bissau:** Bissau (`GW_BSU`) — XOF
* **Guinea-Conakry:** Conakry (`GNF_CKY`) — GNF
* **Zambia:** Lusaka (`ZM_LSK`) — ZMW
* **Malaysia:** Kuala Lumpur corridor — MYR

---

## Supported Currencies
* **CNY** — Chinese Yuan (¥)
* **GBP** — British Pound (£)
* **USD** — US Dollar ($)
* **EUR** — Euro (€)
* **AED** — UAE Dirham (AED)
* **GMD** — Gambian Dalasi (D)
* **XOF** — West African CFA Franc (CFA)
* **GNF** — Guinean Franc (FG)
* **ZMW** — Zambian Kwacha (ZK)
* **MYR** — Malaysian Ringgit (RM)

---

## Documentation Library
The `docs/` directory contains full regulatory, architecture, and operational specifications:
* `Bantaba AML KYC Compliance & Regulatory Map.pdf`
* `Bantaba Counter & Agent Operations Manual.pdf`
* `Bantaba Executive Summary & Venture Blueprint.pdf`
* `Bantaba Remittance System Documentation and Prototype.pdf`
* `Bantaba System Architecture & Code Lifecycle Spec.pdf`
* `Bantaba Treasury FX & Float Settlement SOP.pdf`

---

## System Capabilities

1. **Cash Collection Desk:**
   - Real-time foreign exchange rate calculation with automated counter fee breakdown.
   - Generates unique 10-digit redemption codes in the standard format.
   - POS thermal receipt formatting with print styles.
   - Synthetic audio confirmation for cashier interactions.

2. **Cash Payout Counter:**
   - Rapid code verification against central ledger balances.
   - Anti-double-spend protection restricting already disbursed codes.
   - Counter vault balance verification to block overdrafts.
   - Real-time pending queue selector for swift lookup.

3. **Multi-Currency Chart of Accounts:**
   - Integrated chart of accounts supporting balanced double-entry accounting:
     - `1010 CASH_VAULT` (Asset)
     - `2010 CUST_PAYABLE` (Liability)
     - `4010 FX_SPREAD_REV` (Revenue)
     - `4020 COUNTER_FEE_REV` (Revenue)
     - `5010 AGENT_COMM_EXP` (Expense)
   - Every transaction automatically records debit and credit journal entries.

4. **Treasury and Vault Management:**
   - Live liquidity tracking for regional vaults: Banjul (GMD), Dakar (XOF), Bamako (XOF), Conakry (GNF), and Bissau (XOF).
   - Liquidity alerts for low float balances.
   - Supervisor and Administrator float injection modal to rebalance counter cash.

5. **Compliance and Audit Trail:**
   - Chronological logging of authentication, code generation, disbursements, reversals, and float rebalancing.
   - Dedicated CSV export for Money Laundering Reporting Officers (MLRO) and compliance reviews.

6. **Executive Analytics:**
   - Processed volume tracking with foreign exchange conversion to USD equivalent.
   - Corridor flow distributions across regional desks.
   - Customer retention metrics based on recipient verification.

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/Blackmelentan/bantaba-remittance-os.git
cd bantaba-remittance-os

# Install dependencies
npm install

# Start local server
npm run dev

# Run automated test suite
npm test

# Build production bundle
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## Testing
The automated test suite verifies financial logic, vault constraints, code formats, and double-entry balancing:
```bash
npm test
```

---

## Terminal Authentication
* **Staff ID:** TEL-8842
* **Security PIN:** 1234
* **Available Roles:**
  - `Teller / Cashier`: Collection desk and payout counter access.
  - `Branch Supervisor`: Treasury controls and liquidity rebalancing.
  - `Compliance / MLRO`: Audit trails and regulatory logs.
  - `System Administrator`: Unrestricted access across all operational modules.

---

## License
Licensed under the [MIT License](LICENSE).  
Copyright (c) Bantaba Remittance Network.
