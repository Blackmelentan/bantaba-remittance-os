# Bantaba Cash Remittance Operating System (v3.0)

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

## What is New in v3.0
Bantaba Remittance OS v3.0 is a ground-up architectural rewrite, replacing the earlier single-file prototype with a modular, cryptographically secure remittance engine:
- **Clean Decoupled Architecture:** Clean separation of business logic (`src/engine/`), user interface (`src/ui/`), and tests (`test/`).
- **Cryptographic Security Layer:** WebCrypto-backed token generation (Crockford Base32 `BNT-XXXX-XXXX` reference + 6-digit Release PIN), PBKDF2 staff password hashing, HMAC-SHA256 hashed secret storage, and zeroing/burning of the PIN upon payout.
- **Blind Recipient Verification at Payout:** Cashier must type recipient name, phone, and ID; the system scores match quality using Jaro-Winkler fuzzy matching and West African alias mapping (*Mamadou/Muhammad*, *Jallow/Diallo*, *Ceesay/Cisse*, etc.) before cash is released.
- **Append-Only Double-Entry Ledger:** All movements balance in integer minor units per currency with on-screen trial balances.
- **Branch Operating Hours & Time Tracking:** Automatic clock-in/out, lateness calculation with grace period, and operating hours enforced per branch timezone.
- **Comprehensive Test Suite:** 23 integration tests executing directly against the real engine with 100% pass rate.

---

## Architecture Layout
```text
├── src/
│   ├── engine/           # Pure business logic (zero DOM dependencies)
│   │   ├── core.js       # Central state machine, RBAC, KYC tiers, audit chain
│   │   ├── crypto.js     # WebCrypto PBKDF2, HMAC, SHA-256, rejection sampling
│   │   ├── defaults.js   # Seed data (12 currencies, 12 countries, 19 branches)
│   │   ├── fx.js         # Cross-rates via USD pivot, fee bands, margin overrides
│   │   ├── ledger.js     # Chart of accounts, double-entry journals, trial balance
│   │   ├── money.js      # Minor integer units conversion (no float drift)
│   │   └── names.js      # Fuzzy name match & West African alias resolution
│   └── ui/               # Presentation layer
│       ├── main.js       # SPA navigation, counter forms, cashier modals
│       └── styles.css    # Clean tactile counter design system
├── test/
│   └── engine.test.js    # 23 automated integration tests (node:test)
├── docs/                 # Institutional documentation & specifications
│   ├── 00_Review_and_Gap_Analysis.md
│   ├── specs/            # Technical specifications (Network, Workforce)
│   ├── venture-pack/     # Business plan, threat model, financial model (.xlsx)
│   └── *.pdf             # Operational and compliance PDFs
└── public/brand/         # Approved SVG vector brand assets
```

---

## Operating Corridors (Bidirectional Sending & Receiving)
Every branch and counter in the Bantaba network operates both as a cash collection desk and as a cash payout counter:
* **The Gambia:** Banjul (`GM-BJL`), Serrekunda (`GM-SKD`), Brikama (`GM-BRK`) — GMD
* **Senegal:** Dakar (`SN-DKR`), Ziguinchor (`SN-ZIG`) — XOF
* **Mali:** Bamako (`ML-BKO`) — XOF
* **Guinea-Bissau:** Bissau (`GW-BSS`) — XOF
* **Guinea:** Conakry (`GN-CKY`) — GNF
* **Zambia:** Lusaka (`ZM-LUN`), Kitwe (`ZM-KIT`) — ZMW
* **United Kingdom:** London (`GB-LDN`), Manchester (`GB-MAN`) — GBP
* **United States:** New York (`US-NYC`), Atlanta (`US-ATL`) — USD
* **China:** Guangzhou (`CN-GZH`), Yiwu (`CN-YIW`) — CNY
* **Germany:** Berlin (`DE-BER`) — EUR
* **France:** Paris (`FR-PAR`) — EUR
* **United Arab Emirates:** Dubai (`AE-DXB`) — AED

---

## Documentation Library
The `docs/` directory contains full regulatory, architecture, and operational specifications:
* [Review & Gap Analysis](docs/00_Review_and_Gap_Analysis.md)
* [Network, Currency & Transfers Spec](docs/specs/10_Network_Currency_and_Transfers_Spec.md)
* [Admin, Workforce & Time Spec](docs/specs/11_Admin_Workforce_and_Time_Spec.md)
* `Bantaba AML KYC Compliance & Regulatory Map.pdf`
* `Bantaba Counter & Agent Operations Manual.pdf`
* `Bantaba Executive Summary & Venture Blueprint.pdf`
* `Bantaba Remittance System Documentation and Prototype.pdf`
* `Bantaba System Architecture & Code Lifecycle Spec.pdf`
* `Bantaba Treasury FX & Float Settlement SOP.pdf`
* `docs/venture-pack/` (Business Plan, Threat Model, GTM, Financial Model Excel)

---

## Quickstart & Local Development

```bash
# Clone the repository
git clone https://github.com/Blackmelentan/bantaba-remittance-os.git
cd bantaba-remittance-os

# Install dependencies
npm install

# Run automated test suite (23 tests on real engine)
npm test

# Start local development server
npm run dev

# Build production bundle
npm run build
```

---

## Demo Authentication

Every demo staff account uses PIN: **`482915`**

| Staff ID | Role | Location | Description |
| :--- | :--- | :--- | :--- |
| `GB-LDN-T1` | Teller | London | Diaspora send desk |
| `GM-SKD-T1` | Teller | Serrekunda | Regional cash payout desk |
| `GM-SKD-S1` | Supervisor | Serrekunda | Overrides, day close, unlocks |
| `TRS-01` | Treasury | Central | Float injection & FX rates |
| `CMP-01` | Compliance | Central | AML/PEP holds & sanctions review |
| `ADM-01` | Admin | Central | Network, staff, rules & system audit |

---

## License
Licensed under the [MIT License](LICENSE).  
Copyright (c) Bantaba Remittance Network.
