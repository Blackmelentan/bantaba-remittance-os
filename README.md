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

### Operating Corridors
* **Collection Desks (Cash Intake):**
  - Guangzhou Branch, China (CNY)
  - Yiwu Branch, China (CNY)
  - London Branch, United Kingdom (GBP)
  - Manchester Branch, United Kingdom (GBP)
  - New York Branch, United States (USD)
  - Atlanta Branch, United States (USD)
* **Payout Counters (Cash Disbursement):**
  - Banjul Counter, The Gambia (GMD)
  - Serrekunda Counter, The Gambia (GMD)
  - Dakar Counter, Senegal (XOF)
  - Bamako Counter, Mali (XOF)
  - Bissau Counter, Guinea-Bissau (XOF)
  - Conakry Counter, Guinea-Conakry (GNF)

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
