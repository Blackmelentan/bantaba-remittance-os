---
title: "Pitch Script and Investor Q&A"
doc_id: BNT-STR-06
version: "1.0"
date: "29 October 2026"
owner: "Chief Executive Officer"
classification: "Investor"
---

# 1. Purpose and how to use this document

This document is the speaking companion to the 14-slide investor deck (BNT-STR-05). It gives the presenter, for every slide, three things: the **bullets that appear on the slide**, a **speaker script of about 150 words** (roughly one minute at a calm pace), and the **question most likely to be asked at that point**, with a straight answer. Section 3 then lists **50 hard investor questions** with plain answers that do not dodge.

Bantaba is a **remittance company**: families abroad hand cash to a Bantaba staff member at a Send Point, receive a one-time **Bantaba Code**, and the family at home redeems that code for cash at any Payout Point, at which moment the code is burned and can never be used again. Technology (**Bantaba Core**) is the back office, not the product identity. The presenter should never call the company a fintech, a neobank, a payments platform or a digital wallet. Say "remittance company", "money transfer service" or "cash-to-cash remittance with a technology backbone".

## 1.1 Ground rules for the presenter

| Rule | Why |
|---|---|
| Lead with the family, not the technology | Trust, people and premises are the moat; Core is a tool |
| Say "planned", "target", "to be obtained" for every licence | No licence is held today; claiming otherwise is a disclosure failure |
| State the China caveat unprompted | The China corridor is gated by a written PRC legal opinion; hiding it destroys credibility |
| Use only the Base-case numbers in this pack | One set of numbers: see BNT-STR-10 and the financial model BNT-STR-09 |
| Use the honesty note when volume is questioned | The cash-first plan reaches about 10% of Gambia formal inflows by Year 4, not the 40% implied by the earlier digital-first blueprint |
| Mark outside statistics "(verify)" | Only figures from the Bantaba reference sources are stated as fact |
| Never promise returns | Present a plan and its risks, not a forecast guarantee |

## 1.2 Timing

The full deck runs about 20 minutes of speaking plus 25 minutes of questions in a 45-minute slot. For a 15-minute slot, drop slides 4, 11 and 12 to a single sentence each and take them in questions.

# 2. The 14-slide script

## Slide 1. Cover

**On-slide bullets**

- Bantaba: "Home, within reach."
- Cash in. Code out. Family paid.
- Remittance company for the Senegambia and Guinea region; UK, China and USA to The Gambia first
- Seed round: US$4.0M, 24-month runway
- Confidential investor presentation, 29 October 2026

**Speaker script (about 150 words)**

Good morning, and thank you for your time. I am [Name], founder and chief executive of Bantaba. A *bantaba* is the shaded meeting place at the heart of a Mandinka village, where news travels, where money decisions are made and where family obligations are talked through. That is exactly what a remittance is: a family conversation that has money attached. Our line is "Home, within reach", and our product promise is three short phrases: cash in, code out, family paid.

Bantaba is a remittance company. A sister in London hands cash to one of our staff, gets a one-time code, passes it to her mother in Serrekunda, and her mother collects cash at any Bantaba Payout Point. We are raising four million dollars of seed capital to build the network, secure the licences and launch the UK to Gambia corridor, and I will take you through why we think this is a durable business and exactly where it can go wrong.

**Likely question:** "Is this a fintech?" **Answer:** No. It is a remittance company with a technology back office. Revenue in the first two years comes from staffed counters, not an app. The app arrives in Phase 2 as a convenience for customers we already know.

## Slide 2. Problem

**On-slide bullets**

- The Gambia received US$872.05M in formal remittances in 2025 (+US$54.4M on 2024), over 30% of GDP (Central Bank of The Gambia)
- Average global cost of sending about US$200 is 6-7%; Sub-Saharan Africa about 8% (World Bank, verify latest quarter); UN target 3%
- Many senders and recipients still rely on cash, on relatives, or on informal couriers
- Trust is the product: families fear fraud, lost transfers and hidden rates
- App-first competitors under-serve people who prefer to hand over cash and be looked in the eye

**Speaker script (about 150 words)**

Remittances are the economic backbone of The Gambia. The Central Bank reported 872 million dollars in formal inflows in 2025, up 54 million on 2024, and more than thirty percent of GDP. That is formal channels only; informal flows come on top. Meanwhile it costs a family six to seven percent on average to send two hundred dollars globally, and about eight percent into Sub-Saharan Africa, against a United Nations target of three. Every point of cost is rent, school fees or medicine that never arrives.

Cost is only half the problem. The other half is trust. Many families in the diaspora do not use apps for the money that matters. They carry cash to a person they know, because that person can be held to account. Fraud, mis-keyed phone numbers and "the agent says it has not arrived" are everyday fears. We think there is room for a company that is cheaper than the incumbents and more trustworthy than the app.

**Likely question:** "Why can't Wave or the big operators just fix this?" **Answer:** They can compete on price in places; they are not built around cash handed over by a known face in the sender's own neighbourhood. We compete on trust, community presence and a transparent all-in price of 3 to 4.5%.

## Slide 3. Solution: cash, code, cash

**On-slide bullets**

- Sender hands cash to a Bantaba staff member at a Send Point, with ID, every time
- System issues a single-use **Bantaba Code**, shown once and sent to the sender
- Sender gives the code to family; family receives a Bantaba notification with no code in it
- Family redeems at any Payout Point with code, one-time password and ID; cash paid
- Code is **burned** at redemption and can never be used again

**Speaker script (about 150 words)**

Here is the whole product. One: a sender in London walks into a Bantaba Send Point with ID and cash. The cashier shows the price in full, you send, fee, rate, they receive, and locks the rate for thirty minutes. Two: when the cash is counted, the system issues a twelve-character Bantaba Code. It appears once on screen, on the receipt and on the sender's phone. Staff cannot retrieve it afterwards. Three: the sender gives the code to family by phone or WhatsApp. Four: the family member goes to any Payout Point in The Gambia with their ID. Our system sends a six-digit password to the recipient's own registered phone, the officer checks ID, and cash is paid. In the same instant the code is nullified, burned, and is useless to anyone who finds it later. A code on its own is never enough. That is deliberate.

**Likely question:** "What if someone steals the code?" **Answer:** Without the recipient's phone and matching ID, and the optional PIN, it fails. Three wrong second-factor attempts lock the transfer for review.

## Slide 4. How it works

**On-slide bullets**

- Quote, KYC tier, sanctions and PEP screening, then cash received, then code issued
- Redemption: lookup by code, 10-minute session, OTP to recipient phone, ID name check
- Release bands: A up to $200; B to $2,000 adds ID photo; C above $2,000 adds supervisor co-approval
- One atomic database write burns the code and posts the ledger in the same transaction
- Behind the scenes: tills banked, FX netted per corridor, payout float pre-funded, three-way daily reconciliation

**Speaker script (about 150 words)**

Under the counter sits Bantaba Core, our back office. Before any code is issued the sender is verified and screened against sanctions and politically-exposed-person lists. Suspicious patterns create a compliance hold and no code is released until an officer clears it. At payout, the officer enters the code, the system opens a ten-minute session so two points cannot pay the same transfer, and sends the one-time password to the recipient's phone. Under two hundred dollars, code, password and ID name check. Above two thousand, a supervisor must co-approve, which is four-eyes control on cash. The release itself is a single atomic write: the transfer moves to redeemed, the code to burned, the ledger posts and the agent's float is debited, all together or not at all. Meanwhile treasury batches foreign exchange and pre-funds float at payout points so the family never waits for settlement.

**Likely question:** "What if the internet is down at a Payout Point?" **Answer:** Payout is online-only by design, because the burn guarantee needs it. The supervisor phones the Operations Desk for a voice-verified remote redemption.

## Slide 5. Why the code is safe

**On-slide bullets**

- 12 characters, 55 random bits plus a check character; typo-resistant alphabet
- Only a keyed hash (HMAC-SHA256) is stored; plaintext exists in memory at issue only
- Two independent channels: code from the sender, password from Bantaba
- Separation of duties: cashier cannot redeem; payout officer cannot create; admins cannot read codes
- Alerts on any use of a burned, void or replaced code; officer lockout after 5 failed lookups in 10 minutes

**Speaker script (about 150 words)**

The code is the one genuinely new idea in our design, so let me explain why we trust it. It is twelve characters drawn from a typo-resistant alphabet: fifty-five random bits and a check character. We never store the code itself, only a keyed hash, with the key held in a hardware-backed key store. So a database breach does not yield redeemable codes. The sender receives it, and Bantaba separately sends a six-digit password to the recipient's phone at redemption, so an attacker needs two independent channels plus a matching ID, plus a PIN above five hundred dollars if the sender set one. Roles are separated: the person who creates a transfer cannot cancel it, a cashier cannot redeem, and even administrators cannot read a code. If anyone tries a burned code, we alert, because that is either an honest mistake or an attack, and we want to know which.

**Likely question:** "Is this safer than a bank transfer?" **Answer:** Different, not strictly safer. It removes account-takeover and mis-keyed account numbers; it adds counter and cash risk, which we control with premises, four-eyes, caps and CCTV.

## Slide 6. Market

**On-slide bullets**

- The Gambia formal inflows: US$775.6M in 2024 (about 31.5% of GDP); US$872.05M in 2025
- Our Base plan sends the equivalent of about 10.4% of Gambia formal inflows by Year 4 (Conservative case 6.2%)
- Sender persona: 28-55, diaspora in UK, USA, China; sends $100-$500 about twice a month
- Recipient persona: 25-65, family with a phone and a nearby Payout Point
- Regional adjacency: Senegal, Guinea, Guinea-Bissau

**Speaker script (about 150 words)**

The market is large relative to the country and concentrated in a few corridors. In 2025, The Gambia received 872 million dollars through formal channels. Our Year 4 plan sends 168.8 million dollars, equivalent to about ten percent of formal inflows. I want to be candid that this is a stretch, and we show it deliberately. Our earlier digital-first blueprint implied roughly forty percent, which we judged indefensible, so we rebuilt the plan cash-first. The Conservative case is six percent. Our customer is a person in their late twenties to mid-fifties, working in care, logistics, hospitality, study or trade in London, Guangzhou or the United States, sending a hundred to five hundred dollars around twice a month to family who need it for school fees, rent and medicine. Once the Gambia network works, neighbouring Senegal, Guinea and Guinea-Bissau reuse the same people and processes.

**Likely question:** "Why believe 10%?" **Answer:** We do not ask you to. The Conservative case reaches 6.2% and shows we need a bridge; the Base case is the plan we manage to.

## Slide 7. Corridors and phasing

**On-slide bullets**

- Phase 1 "Beachhead" (M0-M12): UK to Gambia, closed pilot M9-M10, public beta M11
- Phase 2 "Three hubs" (M12-M24): China to Gambia (M15, gated by PRC legal opinion), USA to Gambia (M19), Bantaba Send app, wallet payout
- Phase 3 "Senegambia & Guinea" (M24-M42): Senegal (M25), Guinea (M31), Guinea-Bissau (M31), Bantaba Business
- Each new corridor must pass the expansion gates
- Seed funds Phase 1 and the start of Phase 2; Series A funds the rest

**Speaker script (about 150 words)**

We go one corridor at a time, and we do not open the next until the previous one earns it. Phase one is the beachhead: UK to Gambia. We close funding in month one, build and license through the year, run a closed pilot with two hundred invited senders and twenty points in months nine and ten, with a sixty-five thousand dollar volume cap, and open a public beta in month eleven. Phase two adds China in month fifteen, but only after a written legal opinion from PRC counsel, because unlicensed cash collection across that border is a criminal offence. It adds the USA in month nineteen, plus the app and wallet payout. Phase three takes us into Senegal in month twenty-five, then Guinea and Guinea-Bissau in month thirty-one. Before any corridor opens, partner service levels must be at least ninety-nine and a half percent, licences confirmed, and the prior corridor profitable on contribution for twelve months.

**Likely question:** "What if the PRC opinion says no?" **Answer:** China does not launch. We have a Hong Kong money service operator route and a licensed-partner route to evaluate; if neither is permitted, the plan loses its second-largest corridor and we reforecast.

## Slide 8. Business model and unit economics

**On-slide bullets**

- Flat fee by send amount plus 1.5% FX margin; all-in 3-4.5% versus 6-8% market
- Blended take rate about 3.8-4.0% of volume; variable cost 1.62%; contribution about 2.2-2.3%
- UK to Gambia: average ticket $230, revenue $9.20, contribution $5.47 per transfer
- 9 transfers a year, 3-year LTV $107, CAC $22, LTV:CAC 4.9x, payback about 4 transfers
- Operating breakeven at about $11.6M monthly volume; first EBITDA-positive month M34

**Speaker script (about 150 words)**

Pricing is simple: a flat fee that steps up with the amount, plus a 1.5 percent margin over mid-market exchange. A two-hundred-pound transfer from London costs 4.99 pounds in fee; the family receives 18,404 dalasi; the all-in cost is about four percent, against six to eight in the market. We shall publish that worked example in every branch. Across the book we earn about 3.8 to 4.0 percent of volume and spend 1.62 percent on variable cost: payout and origin commission, banking and FX, fraud loss, screening and cash logistics. That leaves about 2.2 percent contribution. On a typical 230-dollar UK transfer that is five dollars forty-seven. Customers send about nine times a year, so a three-year lifetime value is 107 dollars against an acquisition cost of 22, which is 4.9 times. We reach operating breakeven at roughly 11.6 million dollars of monthly volume and our first EBITDA-positive month is month thirty-four.

**Likely question:** "Why is month 34 so late?" **Answer:** Because we are building counters, licences and a float network before volume arrives. Fixed costs of $1.34M in Year 1 are earned back only at scale.

## Slide 9. Competitive position

**On-slide bullets**

- Incumbent money transfer operators: broad networks, higher prices, variable service
- Digital remitters and mobile wallets: low price, thin on cash-in and on trust for older senders
- Informal couriers and hawala: fast and personal, but unregulated and unprotected
- Bantaba: cash-first, owned counters in send hubs, transparent price, burn-once code, community-rooted
- Moat: trust, people, premises, payout network and compliance, not software

**Speaker script (about 150 words)**

Think of three groups. Incumbent money transfer operators have wide networks but charge more and are often impersonal. Digital remitters and wallets are cheap but assume a bank account, a smartphone and confidence in an app, and that is not how many families handle the money that matters. Informal couriers are personal and fast but offer no protection and carry real legal risk for the sender. Bantaba sits between them. We take cash from a known face, in the sender's own neighbourhood, at a price we publish, and pay out at a known face in the family's own town, with a code that works exactly once. Our defensibility is not a clever algorithm. It is premises, trained staff, a licensed payout network, a community reputation and a compliance record, and those take years to copy. A larger operator can match our price, but cannot easily replicate our standing in a kafo or a mosque.

**Likely question:** "What stops an incumbent cutting price?" **Answer:** They can. We hold contribution at about 2.2% and compete on trust and service; a price war would hurt us, and the Conservative case models weaker volume.

## Slide 10. Go-to-market

**On-slide bullets**

- Community first: associations, kafos, student societies and faith groups (35% of acquisition)
- Referral loop: "Give $10, get $10" (30%)
- Employer and sector partnerships (10%); social and creator content in local languages (15%); paid at most 10%
- First transfer fee-free (fee waiver up to $6)
- Paid spend only when CAC is under $22 and payback under 9 months

**Speaker script (about 150 words)**

We will not buy our customers; we will earn them in rooms where trust already exists. Thirty-five percent of acquisition comes from community associations: the kafo, the student society, the mosque group, the football club. Thirty percent comes from referral, give ten dollars and get ten, because a sister recommending Bantaba to her cousin is worth more than any advertisement. Ten percent comes from employer and sector partnerships, for example care agencies and logistics firms with Gambian staff. Fifteen percent is creator and social content, in English with Mandinka, Wolof and Pulaar greetings. Paid media is capped at ten percent and only runs when acquisition cost is below twenty-two dollars with payback inside nine months. The first transfer is fee-free, which is our one deliberate acquisition investment. Our voice is warm and direct, never jargon, and never "hidden fees".

**Likely question:** "Is community marketing scalable?" **Answer:** Each association is a repeatable unit with a named ambassador; we measure CAC per channel monthly and cut what fails.

## Slide 11. Operations and technology

**On-slide bullets**

- Staffed counters: two staff per shift, one supervisor per point, CCTV, safe, till cap
- Payout through company-owned points and tiered agents (sub-agent, agent, super-agent)
- Company-funded float of 2.5 days of forecast payout, plus agent security deposit
- Bantaba Core: modular monolith, PostgreSQL double-entry ledger, append-only audit, AWS London with DR
- Targets: API 99.95%, redemption lookup P95 under 400 ms, RPO 5 min, RTO 60 min

**Speaker script (about 150 words)**

Operations is where remittance companies live or die, so we plan it in detail. Every Send Point has two staff on shift, a supervisor, a safe, cameras, a panic button and a cash cap on the till. Cash is banked on a fixed schedule and reconciled daily three ways: our ledger, the bank statement and the physical count. In The Gambia, payout is through our own points and through agents, who are tiered by daily cap and security deposit. We fund the float; agents post a refundable deposit as collateral; payout is blocked if float runs short. The technology is deliberately boring: a modular monolith on PostgreSQL with a double-entry append-only ledger, hosted in London with a second region for recovery. Money truth lives in the ledger and every action is audited in a hash-chained trail. We are building Core to be reliable, not fashionable.

**Likely question:** "Who builds the tech and what if the team leaves?" **Answer:** A CTO-led team of in-house engineers, architecture documented in the BNT-TEC series, with an external security audit before the pilot.

## Slide 12. Compliance and licensing

**On-slide bullets**

- UK: launch via an FCA-authorised partner or agent arrangement while own authorised payment institution application is prepared (typically 9-12 months)
- USA: FinCEN registration and state licences, or authorised-delegate route (planned)
- Gambia: CBG-authorised status or licensed partner (to be confirmed)
- China: gated by written PRC legal opinion; Hong Kong MSO or licensed-partner structures under evaluation
- AML: MLRO, KYC tiers, sanctions and PEP screening, four-eyes, three lines of defence

**Speaker script (about 150 words)**

I will be direct: we hold no licences today. Everything on this slide is planned and conditional, and counsel must confirm the route in each jurisdiction. In the UK we intend to start through an FCA-authorised payment institution partner or agent arrangement while we prepare our own authorisation, which usually takes nine to twelve months. In the United States we plan FinCEN registration and state licences, or operation as an authorised delegate. In The Gambia we are working toward Central Bank authorisation or a licensed partner. China is the hard one: unlicensed cash collection and offsetting settlement across that border is criminal, so we launch there only after a written PRC legal opinion. Internally we run a board-approved AML policy, a named money laundering reporting officer, tiered KYC, sanctions screening on every transfer, and four-eyes review. Compliance is a cost line, a hiring priority and a Series A trigger, not an afterthought.

**Likely question:** "What if licensing takes longer?" **Answer:** We hold launch until the route is lawful. A six-month licence delay costs about six months of fixed costs and is covered by the 24-month runway, but compresses Series A timing.

## Slide 13. Financials and the ask

**On-slide bullets**

- Volume: $1.18M (Y1), $46.4M (Y2), $120.7M (Y3), $168.8M (Y4), $187.5M (Y5)
- Revenue: $0.05M, $1.79M, $4.59M, $6.44M, $7.17M; EBITDA -$1.31M, -$1.22M, -$0.40M, +$0.12M, +$0.25M
- Cumulative EBITDA trough -$3.0M; lowest month-end cash $0.80M
- Seed US$4.0M; Series A US$5.0M target close M22
- Use of seed: product and engineering 30%, licensing and compliance 20%, operations and network 22.5%, G&A 12.5%, marketing 5%, float 10%

**Speaker script (about 150 words)**

We are raising a four-million-dollar seed round, closing in month one, with a 24-month runway. Base-case volume grows from 1.2 million dollars in the build year to 46 million in Year 2 and 121 million in Year 3. Revenue follows at 1.8 million and 4.6 million. We are loss-making until Year 4: EBITDA is minus 1.3, minus 1.2, minus 0.4, then plus 0.1 and 0.25 million. The cumulative EBITDA trough is about three million dollars and the lowest month-end cash is 0.8 million, just before a planned five-million-dollar Series A in month twenty-two. The seed pays for the engine, thirty percent, the licences, twenty percent, the counters and agent network, twenty-two and a half percent, leadership and G&A, marketing, and a float of four hundred thousand dollars. The Series A is triggered by five million dollars monthly run-rate, two corridors live, fraud under 0.1 percent, and licences secured. In the Conservative case we need a bridge, and I will show you that too.

**Likely question:** "What is the downside case?" **Answer:** At 0.6x volume, EBITDA is about minus $1.4M a year, no breakeven within five years and lowest cash is minus $0.44M, so we would cut cost and seek a bridge.

## Slide 14. Team and roadmap

**On-slide bullets**

- Leadership: CEO, COO, CTO, CFO and Treasury head, MLRO and Head of Compliance
- Headcount: 18 (Y1), 32 (Y2), 45 (Y3), 53 (Y4), 56 (Y5)
- Governance: board with investor and independent directors; audit and risk committee; monthly AML committee; weekly treasury committee
- First 90 days: incorporate, appoint MLRO, partner term sheets, build sprint 1-2
- Gates: security audit (M7-8), closed pilot (M9-10), public beta (M11), Series A process (M15)

**Speaker script (about 150 words)**

We are hiring around five leaders and a compact team: a chief executive, an operations chief, a chief technology officer, a finance and treasury head, and a money laundering reporting officer who is hired early because licences depend on that person. Headcount reaches eighteen by the end of Year 1 and fifty-six by Year 5. Governance is built for a regulated business from day one: a board with an investor director and independent members, an audit and risk committee, a monthly AML committee and a weekly treasury committee. Our first ninety days are about foundations: incorporating the entities, appointing the MLRO, signing partner term sheets for payout and banking, and starting the first build sprints. After that come gates: a security audit, a controlled pilot with a cap, a public beta, and the start of the Series A process in month fifteen. I would like to ask for your support on this plan and your hardest questions.

**Likely question:** "Who is on the team today?" **Answer:** [Insert actual founder bios and advisers; list roles still to be hired and the plan and budget for each, see BNT-OPS-10.]

# 3. Fifty hard investor questions, with straight answers

Answers use only Base-case numbers from BNT-STR-10 unless stated. Where the honest answer is "we do not know yet", we say so.

## 3.1 Market and demand

| # | Question | Straight answer |
|---|---|---|
| 1 | Remittance is a crowded, low-margin market. Why will you win? | We probably will not win broadly, and we do not need to. We need about 10% of Gambia's formal inflows by Year 4 (6.2% in Conservative), from customers who prefer a human counter. We win on trust and on a price of 3 to 4.5% against 6 to 8%. |
| 2 | Is the 10.4% share of Gambian inflows realistic? | It is a stretch and we label it as one. It assumes China and USA corridors both open on time. In the Conservative case it is 6.2% and we do not break even within five years. |
| 3 | Why The Gambia first, and not Nigeria or Ghana? | Remittances exceed 30% of Gambian GDP, the diaspora is concentrated in the UK, USA and China corridors, the market is small enough to cover with a modest network, and the founders know the community. Larger markets have larger, better-funded incumbents. |
| 4 | Are your market figures current? | Gambia inflow figures (US$775.6M in 2024, US$872.05M in 2025) are Central Bank reports. World Bank price figures are quoted as "verify latest quarter". We refresh before each investor update. |
| 5 | How do you know customers want cash-to-cash? | We have run user research planning in Phase 0 (BNT-STR-07) rather than claimed proof. The closed pilot (200 senders, 20 points) is designed to test it. If activation is below 65% at M12 we change the plan. |
| 6 | What share of senders use cash today? | We do not have a verified number and will not invent one. Phase 0 research and the pilot will give us a measured figure. |
| 7 | What if Gambian remittances fall? | Volume falls with the corridor. We mitigate with regional corridors from M25 and Business payouts later; the risk register carries a macro-dependency item (BNT-STR-11). |
| 8 | Are diaspora senders loyal? | Evidence is mixed in this industry. We assume 9 transfers a year per active sender and track 90-day repeat above 60% as a M12 target. A sender who is cheaper and trusted should stay, but we measure rather than assume. |

## 3.2 Product and the code

| # | Question | Straight answer |
|---|---|---|
| 9 | What is genuinely new here? | The single-use Bantaba Code with digest-only storage, burn on redemption, and two independent channels. The rest is disciplined remittance operations, which is the point. |
| 10 | Can a code be guessed? | The space is 2^55. With N live codes, a random guess succeeds with probability N/2^55, and rate limits, per-officer lockout and second factors apply even to a valid code. |
| 11 | What if the sender sends the code to the wrong person? | The recipient still needs the matching ID name and the OTP on the registered phone. The sender can cancel before redemption with ID and receipt, with supervisor approval. |
| 12 | What if the recipient has no phone? | Supervisor exception and a Secret PIN are required. These cases are rare, capped and reviewed. |
| 13 | What if the recipient's ID name does not match? | The officer cannot release. Fuzzy match threshold is 0.80; failures count toward lock after three attempts. |
| 14 | What if the officer colludes with a thief? | Four-eyes above $2,000, ID capture above $200, geo-fenced devices, separation of duties, mystery shopping and an alert on any attempt at a burned code. Collusion cannot be eliminated, only made costly and visible. |
| 15 | Why online-only payout? | The burn guarantee needs one authoritative record. An offline release could pay one transfer twice. Outages use voice-verified remote redemption by the Operations Desk. |
| 16 | Why not just use mobile money for everything? | Mobile money is a planned payout channel (Wave, Afrimoney, QMoney) in Phase 2. Our first customers prefer cash on both ends, and cash payout is the licensed, understood route. |
| 17 | When does the app arrive? | Phase 2, from M13 to M24, with card and open-banking pay-in. It serves senders already known to us. |
| 18 | Can the technology be copied? | Yes. We do not claim the software is the moat. Trust, premises, licences and the payout network are. |

## 3.3 Unit economics and pricing

| # | Question | Straight answer |
|---|---|---|
| 19 | Is 3-4.5% really profitable with cash handling? | Take rate is 3.8 to 4.0%, variable cost 1.62%, contribution about 2.2 to 2.3%. Fixed costs must be covered by scale: breakeven is about $11.6M monthly volume. |
| 20 | What is your customer acquisition cost? | $22 for UK to Gambia, against 3-year LTV of $107 (4.9x) and a payback of about four transfers. CAC is a model estimate until the pilot measures it. |
| 21 | Is LTV overstated? | It assumes 9 transfers a year and a 3-year life at $5.47 contribution per transfer. If frequency halves, LTV:CAC is about 2.4x; still positive but we would cut paid spend. |
| 22 | What FX exposure do you carry? | The 1.5% margin is over mid-market, and treasury nets by corridor and converts in batches. We hold a small positions limit set by the weekly treasury committee. FX moves between quote and conversion are a real cost we model within the 0.30% banking and FX variable line. |
| 23 | How do you price GNF and XOF corridors? | XOF is pegged to EUR; GNF is thinner, so we set 2.0% on GMD to GNF and 1.5% in the other direction, and we use partner-first liquidity. |
| 24 | Why a free first transfer? | It is our single customer-acquisition investment: fee waiver up to $6, part of the $22 CAC. |
| 25 | Does a price war kill you? | A cut of one point removes roughly half our contribution. We would respond with service and community, not price. This is a listed risk. |

## 3.4 Financials and funding

| # | Question | Straight answer |
|---|---|---|
| 26 | Why $4.0M and why 24 months? | Seed covers the build, licensing and pilot with a cumulative EBITDA trough of about $3.0M and a minimum month-end cash of $0.80M before Series A. Float of $0.4M is included. |
| 27 | What happens if Series A is late? | Cash falls below $0.80M. We have levers: slow hiring, defer the USA corridor, and a bridge from existing investors. In the Conservative case a bridge is necessary. |
| 28 | What are the Series A triggers? | At least $5M monthly run-rate volume, two corridors live, fraud under 0.1% of volume, and licences secured for UK send and Gambia receive. |
| 29 | When do you break even? | First EBITDA-positive month is M34 in the Base case; Year 4 EBITDA is +$0.12M. Not in five years in the Conservative case. |
| 30 | Why is Year 1 volume only $1.18M? | Year 1 is build, a capped closed pilot ($65k) and a short public beta. We refuse to launch before safeguarding and licensing are in place. |
| 31 | What is your burn rate? | Year 1 fixed costs are $1.34M (about $112k a month), growing to $2.26M in Year 2. |
| 32 | How much float do you need? | 2.5 days of forecast payout: $0.07M at Year 1, $0.64M Year 2, $1.19M Year 3, $1.53M Year 5. Funded by us; agents also post deposits. |
| 33 | Is the cash trapped in the destination country? | Float is pre-funded in GMD at points; excess above 150% of target is swept back. Repatriating balances depends on central-bank FX rules; this is a treasury risk. |
| 34 | What is the exit? | We are not promising one. Credible paths include a strategic sale to a larger remittance or payments group, or a regional consolidation; neither is modelled. |
| 35 | What are the investor protections? | Board seat for the lead investor, information rights, and customary seed terms; to be set out in the term sheet. [Placeholder terms.] |

## 3.5 Compliance and legal

| # | Question | Straight answer |
|---|---|---|
| 36 | Do you hold any licence? | No. All licences are planned or to be obtained. The UK launch runs through an FCA-authorised partner or agent route while our own application is prepared. |
| 37 | What if the FCA says no? | We continue under the partner route if its terms permit, or delay. The authorisation takes about 9 to 12 months and the plan allows for it. |
| 38 | How do the new FCA safeguarding rules affect you? | Rules tightened from 7 May 2026 (daily reconciliation, monthly returns, annual audit above a size threshold). Whether and how they apply to a money-remittance-only firm needs counsel's confirmation; we budget for compliance either way. |
| 39 | Is the China corridor legal? | Only if structured lawfully. Unlicensed cash collection and offsetting settlement across the PRC border is a criminal offence. We launch only after a written PRC opinion, planned M15, using a Hong Kong MSO or a licensed cross-border partner. |
| 40 | What is the plan if China is impossible? | We drop the corridor. That removes about $14.8M of Y2 and $37.0M of Y3 volume from the Base case and we reforecast. See the risk register BNT-STR-11. |
| 41 | How will you avoid being used for money laundering? | Tiered KYC, ID every transfer, sanctions and PEP screening, velocity, structuring and many-to-one rules, four-eyes, an MLRO, annual independent audit. Cash is inherently higher risk and we price this into compliance headcount. |
| 42 | What about US state licences? | Fifty-state licensing is slow. We plan the authorised-delegate route first and licences later; the USA corridor is M19 and gated by that outcome. |
| 43 | Who regulates payout in Gambia? | The Central Bank of The Gambia, via our own authorisation or a licensed partner, with STRs to the Financial Intelligence Unit. Counsel confirms current AML law status. |

## 3.6 Operations, risk and team

| # | Question | Straight answer |
|---|---|---|
| 44 | What if a Send Point is robbed? | Cash caps per till ($3,000 UK/US), a drop-safe, scheduled bank runs, two staff and CCTV, insurance, and an incident runbook (BNT-OPS-08). Staff safety rules outrank cash. |
| 45 | What if an agent defaults or absconds? | Float is capped by tier, geo-fenced and deposit-backed; deposits range from $400 to $10,000. Weekly commission settlement allows clawback. Residual loss is in the 0.10% fraud and loss budget. |
| 46 | What if the payout partner fails? | Multiple payout rails, a service level of at least 99.5% required before launch and owned points as fallback. Concentration is a tracked risk. |
| 47 | What is your key-person risk? | High in the early years. We mitigate with documented architecture, a deputy for each executive and key-person cover where available. |
| 48 | How will you hire a regulated-firm team? | MLRO and Head of Compliance are hired first; each Send Point has trained staff certified to 85% on AML for agents, with annual recertification. |
| 49 | What is your biggest risk, honestly? | Regulatory timing across four jurisdictions, followed by volume ramp. Both are in the register with owners and early-warning indicators. |
| 50 | What would make you shut this down? | If by M12 activation is under 50%, fraud is above 0.15% or no lawful UK route exists, we return unspent capital rather than burn it. |

# 4. Handling difficult moments

| Situation | Response |
|---|---|
| Investor says "this is just Western Union" | Agree on the model and disagree on the execution: transparent price, burn-once code, community channels. Move to unit economics. |
| Investor challenges the numbers | Show the Conservative case first; do not defend the Base case as a prediction. |
| Investor presses on licences | Show the licence table; state that nothing is held; show which gates depend on which licence. |
| Investor asks for a number you do not have | Say "we do not know yet, here is how we will find out and by when". |
| Investor asks about competitors by name | Describe the category, not individual firms, unless the facts are in BNT-STR-07. |

# 5. Open items / assumptions to validate

- Founder and leadership biographies must be inserted for slide 14 and Q&A 47 before first use.
- Term sheet details for Q&A 35 are placeholders until the lead investor is agreed.
- World Bank price benchmark (verify latest quarter) to be refreshed before each meeting.
- FCA safeguarding applicability and the UK partner route must be confirmed by counsel (BNT-CMP-01).
- PRC legal opinion timing (planned M15) and structure options are not yet commissioned.
- Pilot data (activation, repeat, CAC) will replace modelled estimates in the Q&A after M10.
- Speaker scripts should be timed in rehearsal; target 150 words per slide, about 60 seconds each.
