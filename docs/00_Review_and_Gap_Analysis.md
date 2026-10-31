# Bantaba — Review & Gap Analysis
*31 October 2026 · Version 1.0 · Covers the live app (commit eaef20c), your six PDFs, the brand kit and the earlier document set.*

## 1. What was good
Brand kit and logos; the one-page PDFs captured the right business rules (single-use code, T+1 agent reimbursement, tiered KYC, vault thresholds); the Pages deploy pipeline; the clean 17-branch network idea.

## 2. Problems found in the live app (all fixed in v3.0 unless marked)
| # | Finding | Why it matters | Fix |
|---|---|---|---|
| 1 | Role was taken from a dropdown at login; the PIN was the same plaintext `1234` for everyone | Anyone could sign in as admin | Staff IDs with PBKDF2-hashed PINs, role comes from the staff record, lockout after 5 tries |
| 2 | Codes made with `Math.random` | Predictable codes | WebCrypto random with rejection sampling; 32-character alphabet, no look-alike letters |
| 3 | Payout did not compare recipient details | The main fraud control did not exist | Cashier types recipient name, phone, ID; system scores the match (fuzzy name, phone, ID); mismatch refuses cash and counts toward lockout |
| 4 | Codes stored readable | A data leak would expose live codes | Only a keyed hash (HMAC) of the code and PIN is stored; both are wiped when paid |
| 5 | User-entered text written into the page unescaped | Script injection (XSS) | All output escaped |
| 6 | 10 currencies, one-way corridors, three collect currencies | Does not match the business | Any currency to any currency, both directions, any country; 12 currencies incl. Zambian Kwacha |
| 7 | Tests duplicated app logic instead of testing it | Tests could pass while the app was broken | 23 tests run the real engine |
| 8 | No ledger balance check, fee/FX mixed into one number | Cannot audit money | Double-entry journals in whole minor units; each currency must balance; trial balance on screen |
| 9 | No staff time, no hours, no admin controls | Requirement 3 | Admin → Staff & time, operating hours by branch timezone, rules editable |
| 10 | "fintech" keyword in package.json; docs framed as fintech | Brand is cash remittance | Removed |
| 11 | Data lives in one browser (localStorage) | **Not fixed**: needs a real server and database before any real branch uses it | See Section 5 |

## 3. Conflicts between documents (resolved here; update older files to match)
| Topic | Earlier sources | Decision in v3.0 | Reason |
|---|---|---|---|
| Code format | `BNT-XXXX-XX` (PDF); `BNT-` + 8 chars (BIBLE); 10 digits (earlier notes) | `BNT-XXXX-XXXX` reference **plus** 6-digit Release PIN | Reference alone is safe to quote; PIN proves the recipient was told. 8 chars from 32 = 1.1 trillion combinations |
| Expiry | 14 days (PDF) | 30 days, editable by admin | Cash-out in rural areas can be slow; one setting |
| Wrong tries | 3 failed lookups/hour (PDF) | 3 wrong PIN/recipient tries per transfer → lock; plus 5 unknown codes/hour per cashier | Both attack types covered |
| Fees | 1.5% + 1.0% spread (PDF) | Fee bands in USD terms (3 / 5 / 8 / 12) plus 1.5% FX margin, all editable | Flat bands are simpler at a counter; to be tuned with real costs |
| KYC limits | Per-jurisdiction thresholds (PDF) | Three tiers C1/C2/C3 with per-transfer, 30-day and 12-month limits, editable | Per-country limits become a country setting later |
| Brand | BIBLE: Baobab green, Sora/Inter | Your brand kit: leaf green, Fraunces / DM Sans / IBM Plex Mono | Brand kit is the approved source |
| Pricing mode | Send amount only | Send amount **or** recipient-receives amount | Families often need an exact amount |

## 4. New requirements from Melo — status
1 All locations send and receive ✅ · 2 Any currency, both directions, Zambian Kwacha ✅ (assumed "Zambian Dalai" means Kwacha, please confirm) · 3 Admin controls and staff time ✅ · 4 Every branch both collects and pays; many branches per country ✅ · 5 Cashier confirms recipient before payout ✅ · 6 Documentation reviewed (this file) ✅ · 7 Same-country transfers ✅ (half fee by default) · 8 Missing items → Section 5.

## 5. What is still missing (research list)
**Must have before real money**
1. **Backend and database** (server-side hashing, real sessions, backups, row-level access). The prototype proves the rules; it is not a secure store.
2. **Licences and partners per country.** Do not move real money before counsel confirms: UK (FCA authorised payment institution or agent of one), US (FinCEN MSB registration plus state money transmitter licences), China (cash collection is not allowed without a licensed structure; personal foreign exchange is capped at about US$50,000 a year), Senegal/Mali/Guinea-Bissau (BCEAO rules for the CFA zone), Gambia (Central Bank of The Gambia and the Financial Intelligence Unit), Guinea, Zambia (Bank of Zambia, National Payment Systems Act), UAE (Central Bank exchange-house licence), Germany (BaFin payment-institution rules). *These are from general knowledge and a few checked pages; each must be confirmed by a local lawyer.*
3. **Real sanctions and PEP screening** (OFSI, OFAC, UN, EU lists). The prototype only has a two-name demo list.
4. **Live FX rates** and a treasury process for settling between countries (nostro / pre-funding). The prototype only records the position.
5. **Reporting duties**: suspicious activity reports, large-cash reports and record retention (commonly five years) per country.
6. **Privacy law** (UK/EU GDPR, Gambia, others): consent text, retention, deletion, cross-border data transfer.
7. **Recipient notification** by SMS/WhatsApp (the prototype shows a simulated outbox).

**Should have**: customer-facing receipt and terms; complaints handling and refund policy; agent onboarding contract and security deposit terms; staff vetting and training; cash-in-transit and insurance; business continuity; incident response; user-acceptance test plan.

## 6. Document set status
| Document | Status |
|---|---|
| Review & gap analysis (this file) | New |
| Network, currency & transfer spec | New → `specs/10_Network_Currency_and_Transfers_Spec.md` |
| Admin, workforce & time spec | New → `specs/11_Admin_Workforce_and_Time_Spec.md` |
| Business concept, executive summary, business plan, GTM, pitch script, security, infrastructure, financial model | Carried over from the earlier set in `venture-pack/`. **Need one pass** to apply Section 3 (code format, brand, expiry) |
| Investor deck, investor memo, SOP pack, legal/compliance pack, UI mockup book | **Not yet written** — next batch |
| Your six PDFs | Kept in `docs/` unchanged |

## 7. Assumptions to confirm
Zambian currency is Kwacha (ZMW) · all exchange rates are placeholders · agent commission 0.8% of payout is a guess · code validity 30 days · "C3" limit US$13,000 copied from the earlier notes, not a legal limit.
