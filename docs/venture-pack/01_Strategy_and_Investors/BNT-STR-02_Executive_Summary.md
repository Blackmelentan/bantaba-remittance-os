---
title: "Executive Summary"
doc_id: BNT-STR-02
version: "1.0"
date: "29 October 2026"
owner: "Chief Executive Officer"
classification: "Investor"
---

# 1. Summary

**Bantaba** is a remittance company. Families abroad hand cash to a Bantaba staff member or authorised agent at a **Send Point**; the system issues a one-time **Bantaba Code**; the family at home redeems the code for cash at any **Payout Point**, and the code is burned the moment it is used. The tagline is **"Home, within reach."** The product line is **"Cash in. Code out. Family paid."**

We are raising **US$4.0 million in seed funding** to build the platform that runs the service (**Bantaba Core**), obtain the licences the business needs, open the first Send Points and Payout Points, and pre-fund payout float. The seed gives a 24-month runway and carries the company to a Series A of US$5.0 million, targeted to close in month 22.

Bantaba is not an app-first company, a neo-bank or a digital wallet. Technology is a back-office tool. Trust, people, premises, a cash network and compliance are the moat.

# 2. The opportunity

The Gambia is among the most remittance-dependent economies in the world. The Central Bank of The Gambia reports formal remittance inflows of **US$872.05 million in 2025**, up US$54.4 million on 2024 and **more than 30% of GDP**; the 2024 figure was US$775.6 million, about 31.5% of GDP. Informal flows are additional.

Sending money home is expensive. World Bank data put the global average cost of sending about US$200 at roughly 6 to 7%, and Sub-Saharan Africa at about 8% (verify latest quarter), against a UN target of 3%. Many senders in the Gambian and wider Senegambian and Guinean diaspora are paid in cash or prefer to deal with a person, and many recipients have no bank account and a feature phone. They are underserved by apps designed for banked, smartphone-first customers.

Bantaba targets an **all-in cost of 3 to 4.5%**, roughly half the market average, while keeping cash and a human face at both ends of the transfer.

# 3. How it works

| Step | What happens |
|---|---|
| 1. Cash in | Sender visits a Send Point with ID. The cashier quotes: you send, fee, rate, they receive, total to pay. The rate is locked for 30 minutes |
| 2. Checks | ID verified every time, sanctions and PEP screening, limits and velocity rules. No anonymous transfers |
| 3. Code out | Cash is counted, the transfer is created and the Bantaba Code is issued once, on screen, on the receipt and by SMS or WhatsApp to the sender |
| 4. Family informed | The sender passes the code to the family. The recipient gets a notification with no code in it |
| 5. Family paid | At any Payout Point the recipient shows ID and the code; a 6-digit OTP goes to the recipient's own phone; the officer checks ID; the system performs an atomic burn and cash is released |

## 3.1 The Bantaba Code

A 12-character code (for example `K7M2-9QX4-TR8D`) with a check character, stored only as a keyed digest. It is single-use and cannot be retrieved by staff. A code alone is never enough: release needs the code (from the sender), an OTP (from Bantaba to the recipient), human ID verification and, if set, a Secret PIN. Higher amounts add controls: above US$200 an ID photo is captured; above US$2,000 a supervisor co-approves and Compliance is notified. After the burn, the code is dead forever and any later attempt is refused and alerted.

# 4. Why this model

1. **Cash-first, not digital-first.** Phase 1 revenue comes from staffed Send Points; the Bantaba Send app, card and open-banking pay-in and wallet payout follow in Phase 2.
2. **A security design customers and agents can trust.** The code, two independent channels, ID checks and an immutable audit trail protect the family and the agent.
3. **A defensible price.** A flat fee by amount band plus a 1.5% FX margin. Worked example: £200 in London, fee £4.99, sender pays £204.99, the family receives GMD 18,404 at an illustrative rate, all-in cost about 4.0%.
4. **A moat that is difficult to copy.** Licences, premises, vetted agents, pre-funded float and community reputation.

# 5. Corridors and phases

| Corridor | Launch (M1 = funding close) | Note |
|---|---|---|
| UK to Gambia | M11 public beta (closed pilot M9 to M10) | Beachhead |
| China to Gambia | M15, **gated by PRC legal opinion** | Traders and students |
| USA to Gambia | M19 | US MSB and state licences gate |
| Senegal and Gambia | M25 | WAEMU rules |
| Guinea and Gambia | M31 | Thin liquidity, wider margin |
| Guinea-Bissau and Gambia | M31 | WAEMU |

**Phase 1 "Beachhead" (M0 to M12)** is UK to Gambia plus China pilot preparation. **Phase 2 "Three hubs" (M12 to M24)** adds China and USA, launches the Bantaba Send app and wallet payout. **Phase 3 "Senegambia and Guinea" (M24 to M42)** adds regional corridors, Bantaba Business and onward routing.

**China is a gating item, not a footnote.** Unlicensed cash collection and offsetting settlement across borders is a criminal offence in the PRC. Bantaba will not collect cash in mainland China or settle against it except through a structure validated by PRC counsel and permitted by regulators. Options being evaluated include a Hong Kong entity with a Money Service Operator licence, a licensed cross-border payment partner, or a trade-settlement model run by a licensed partner. The China corridor launches only after a written PRC legal opinion, planned for month 15 and conditional.

# 6. Business model and unit economics

Revenue per transfer is a flat fee (about 2.4% of volume) plus an FX margin (about 1.5%): a **blended take rate of about 3.8 to 4.0%**. Variable costs are 1.62% of volume (payout commission 0.70%, origin commission 0.25%, banking, settlement and FX 0.30%, fraud and loss 0.10%, KYC, screening and SMS 0.12%, cash logistics and insurance 0.15%), leaving **contribution of about 2.2 to 2.3% of volume**.

| UK to Gambia unit economics | |
|---|---|
| Average ticket | US$230 |
| Revenue per transfer | US$9.20 (4.0%) |
| Variable cost | US$3.73 |
| **Contribution per transfer** | **US$5.47** |
| Transfers per sender per year | 9, so US$49 per year |
| 3-year lifetime value | US$107 |
| Customer acquisition cost | US$22 |
| **LTV to CAC** | **4.9x**, payback about 4 transfers |

# 7. Financial plan (Base case, US$)

| | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---|---|---|---|---|
| Transfers | 5,130 | 179,229 | 528,263 | 825,181 | 943,399 |
| Volume sent | $1.18M | $46.4M | $120.7M | $168.8M | $187.5M |
| Revenue | $0.05M | $1.79M | $4.59M | $6.44M | $7.17M |
| Contribution | $0.03M | $1.04M | $2.64M | $3.71M | $4.13M |
| Fixed costs | $1.34M | $2.26M | $3.04M | $3.59M | $3.88M |
| **EBITDA** | **-$1.31M** | **-$1.22M** | **-$0.40M** | **+$0.12M** | **+$0.25M** |
| Year-end headcount | 18 | 32 | 45 | 53 | 56 |
| Active senders (year-end) | 4,708 | 38,421 | 89,330 | 114,280 | 123,458 |

The first EBITDA-positive month is **month 34**. Operating breakeven is about **US$11.6 million of monthly volume**. Cumulative EBITDA troughs at **-US$3.0 million** and the lowest month-end cash is **US$0.80 million**, just before the Series A. Gambia-bound volume implies about **10.4% of Gambia formal inflows by Year 4**, a stretch case shown deliberately; the Conservative case gives 6.2%.

**The early economics are thin.** Year 1 revenue is US$0.05 million against fixed costs of US$1.34 million, because Year 1 is build, licensing, a closed pilot (months 9 to 10) and a public beta (months 11 to 12). The business case rests on repeat usage and a dense network from Year 2 onward.

## 7.1 Scenarios

| Scenario | Volume multiplier | Outcome |
|---|---|---|
| **Base** | 1.0x | As shown above |
| **Conservative** | 0.6x | Year 3 volume US$72M; EBITDA about -US$1.4M a year; no breakeven in five years; lowest cash -US$0.44M, which needs a bridge or a leaner plan |
| **Upside** | 1.3x | Year 3 volume US$157M; first EBITDA-positive month M24 |

# 8. The ask: US$4.0 million seed

| Use of funds | US$ | Share |
|---|---|---|
| Product and engineering (Bantaba Core, security audit, apps) | $1.2M | 30% |
| Operations, Send Points and agent network | $0.9M | 22.5% |
| Licensing, legal and compliance | $0.8M | 20% |
| Leadership, finance and G&A | $0.5M | 12.5% |
| Prefunded float and working capital | $0.4M | 10% |
| Marketing and community | $0.2M | 5% |
| **Total** | **$4.0M** | **100%** |

**Series A (US$5.0M)** is targeted to close at month 22, with the process opening around month 15. Triggers: monthly run-rate volume of at least US$5 million, two corridors live, fraud below 0.1% of volume, and licences secured for UK send and Gambia receive. The total plan is US$9.0 million.

# 9. Compliance and licensing

We do not claim licences we do not hold. The planned route in each jurisdiction, subject to counsel, is as follows.

| Jurisdiction | Planned route |
|---|---|
| UK (send) | Launch through an FCA-authorised payment institution partner or agent arrangement while preparing Bantaba's own authorised payment institution application (typically 9 to 12 months, verify). Observe the safeguarding rules in force from 7 May 2026 as counsel confirms |
| USA (send) | FinCEN MSB registration and state money-transmitter licences, or authorised delegate of a licensed operator |
| China (send) | Gated by PRC legal opinion; Hong Kong MSO or licensed partner structures |
| Gambia (receive) | Central Bank of The Gambia authorisation, directly or through a licensed partner; payout via banks, mobile-money operators and own Payout Points |
| Senegal, Guinea-Bissau, Guinea | Partner-first with approved local institutions; own licence later |

Governance includes a board-approved AML policy, a nominated MLRO in the UK and The Gambia, annual risk assessment, an independent annual AML audit and staff training with annual attestation. Compliance is covered in the BNT-CMP series.

# 10. Team and organisation

Leadership comprises a CEO, COO, CTO, CFO and Treasury head, and an MLRO and Head of Compliance. Headcount is planned at 18 at the end of Year 1, rising to 32, 45, 53 and 56. Functions include engineering and product, compliance and risk, treasury and finance, HQ operations and support, Send Point staff in the UK, China and USA, a payout and agent team in The Gambia and region, and growth and community. The board will include investor directors and an independent director, with an audit and risk committee and an AML and compliance committee. Names and biographies: [to be inserted by the founders].

# 11. Key risks

| Risk | Mitigation |
|---|---|
| Licensing delay in the UK, USA or The Gambia | Partner-first launch, counsel-led roadmap, no launch before a position is confirmed |
| China corridor cannot be structured lawfully | Gate on PRC legal opinion; plan does not depend on China in Phase 1; Hong Kong and licensed-partner options |
| Cash handling, robbery and fraud | Two staff per shift, till caps, CCTV, safes, insurance, the code, OTP and ID controls |
| Thin early economics and funding risk | 24-month runway, honest Conservative case, Series A triggers, leaner-plan option |
| FX and liquidity, especially GNF | Batch conversion, spreads set by Treasury with four-eyes, wider margin on thin corridors |
| Agent integrity | Deposits, daily caps, geo-fence, probation, mystery shopper audits, clawback |

# 12. Why now, and what we ask of you

Remittances to The Gambia are large, growing and costly to families, and the segment least served by app-first competitors is the cash-based customer who wants a trusted counter. Bantaba brings a security design, the single-use Bantaba Code, that suits that customer and the agents who serve them, at a price roughly half the market average.

We invite investors to join the US$4.0 million seed round. A full Investor Memorandum (BNT-STR-04), Business Plan (BNT-STR-03), Market Analysis (BNT-STR-07) and Financial Plan (BNT-STR-10) are available, with the financial model in `Bantaba_Financial_Model.xlsx`.

# 13. Open items / assumptions to validate

- All forecasts are planning-grade Base case outputs from `Bantaba_Financial_Model.xlsx` and are not guarantees.
- External statistics beyond those quoted from CBG and World Bank sources must be verified before external distribution.
- The Gambia share of inflows (10.4% by Year 4) depends on assumed growth in the Gambia inflow base; confirm the denominator in the model.
- Licensing timelines for the UK, USA and The Gambia and the China structure are subject to counsel's advice.
- Founder and team details are placeholders.
