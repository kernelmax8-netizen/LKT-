# Product Requirements Document (PRD)
## Lakdi ki Tal – Wood & Charcoal Vendor Marketplace App

**Version:** 1.0
**Date:** July 6, 2026
**Status:** Draft
**Author:** Product Team

---

## 1. Executive Summary

Lakdi ki Tal is a two-sided marketplace platform connecting **wood/charcoal vendors** ("Lakdi ki Tal" sellers) with **end customers** who need firewood, raw wood, or charcoal for functions, restaurants, hotels, and other commercial or household use cases.

The platform works on a **reverse-bidding / quote-request model**, similar to Ola/Uber for ride requests: a customer posts an order (quantity + use case + location), the request is broadcast to nearby registered vendors, vendors respond with real-time price quotations, and the customer selects the best offer to finalize the deal.

Currently, no dedicated digital platform exists for this unorganized, informal, and cash-driven trade. This is a first-mover opportunity to formalize and digitize the wood/charcoal trade in a city like Hyderabad, with potential to expand to other Indian cities.

---

## 2. Problem Statement

### For End Customers
- No centralized way to discover wood/charcoal vendors nearby.
- No price transparency — prices are negotiated informally and vary wildly by vendor, customer bargaining skill, and urgency.
- No way to compare multiple vendors quickly for a time-sensitive need (e.g., a wedding function).
- No visibility into stock availability before traveling to a vendor's yard.

### For Vendors
- Limited to walk-in customers or word-of-mouth referrals.
- No digital presence or way to advertise stock/pricing.
- Cannot reach new customers outside their immediate locality.
- No structured way to manage daily stock updates or incoming order requests.

### Market Gap
This is a large, informal, cash-based trade (wood, firewood, charcoal for weddings, funerals, restaurants/tandoors, brick kilns, hostels, etc.) with **zero organized digital platforms** currently serving it.

---

## 3. Goals & Objectives

| Goal | Description |
|---|---|
| **Price Transparency** | Give customers visibility into multiple vendor quotes for the same order. |
| **Demand Generation for Vendors** | Give small/local vendors access to a larger customer base beyond their existing network. |
| **Platform Leadership** | Become the go-to app for wood/charcoal procurement — starting in Hyderabad, expanding city by city. |
| **Operational Efficiency** | Reduce time-to-fulfillment for customers needing urgent wood supply (e.g., function tomorrow). |
| **Trust & Reliability** | Build a rating/review system so quality and reliability become visible over time. |

### Success Metrics (KPIs)
- Number of vendors onboarded per city (target: 100+ in Hyderabad in first 6 months)
- Number of daily active order requests
- Average number of quotes received per order (target: 3+)
- Order-to-deal conversion rate (target: >60%)
- Average response time from vendors (target: <15 minutes)
- Repeat customer rate
- GMV (Gross Merchandise Value) processed through the platform

---

## 4. User Personas

### Persona 1: Vendor (Lakdi ki Tal Owner)
- Runs a wood/charcoal yard, often family-run, in a specific locality.
- Sells raw wood, firewood, charcoal in bulk (quintals/tons) and retail quantities.
- Not very tech-savvy; needs a simple, low-friction app (likely regional language support — Telugu/Hindi/Urdu).
- Wants more orders without spending on marketing.

### Persona 2: End Customer — Individual
- Needs wood for a one-off event: wedding, funeral, havan, bonfire, etc.
- Price-sensitive, time-sensitive, unfamiliar with market rates.
- Wants convenience and fair pricing without having to visit multiple yards physically.

### Persona 3: End Customer — Business (B2B)
- Restaurant/dhaba/tandoor owner, hostel mess, hotel, brick kiln, or small factory.
- Needs recurring, reliable supply — may want to set up standing/recurring orders.
- Cares about consistent quality and reliable delivery timelines.

### Persona 4: Platform Admin/Ops Team
- Manages vendor onboarding & verification.
- Monitors disputes, fraud, quality complaints.
- Tracks platform health metrics.

---

## 5. Core User Flows

### 5.1 Vendor Flow
1. Vendor downloads app and registers (business name, location, contact, ID proof).
2. Vendor profile goes through verification (manual/admin approval).
3. Vendor updates daily stock: wood type (raw wood, seasoned firewood, charcoal), quantity available (in quintals/tons), base price range, delivery radius.
4. Vendor receives push notification when a matching order request comes from a nearby customer.
5. Vendor views order details (quantity, use case, delivery location, delivery date/time).
6. Vendor submits a quotation (price + estimated delivery time) within a response window (e.g., 15–30 mins).
7. If selected, vendor gets notified, confirms the deal, and arranges delivery/pickup.
8. Vendor marks order as fulfilled; customer confirms receipt.
9. Vendor receives payment (via platform or COD, per model chosen) and a rating.

### 5.2 Customer Flow
1. Customer downloads app, registers with phone number.
2. Customer creates an order: wood type, quantity (quintals/kg), purpose (optional: wedding/restaurant/personal), delivery address, needed-by date/time.
3. Order is broadcast to all verified vendors within a defined radius (e.g., 5–15 km, configurable).
4. Customer sees incoming quotes in real time on an "Offers" screen — sorted by price, rating, or distance.
5. Customer compares offers (price, vendor rating, estimated delivery time) and selects one.
6. Order is confirmed; vendor and customer contact details are shared for delivery coordination.
7. Delivery happens; customer confirms and rates the vendor.
8. Payment is settled (cash on delivery in Phase 1; digital payment in later phase).

### 5.3 Matchmaking Flow (System)
1. Order request created → system identifies nearby active vendors (based on delivery radius + stock availability).
2. Notification broadcast to eligible vendors simultaneously.
3. Vendors respond with quotes within the response window.
4. System aggregates and displays all quotes to the customer in real time.
5. Customer selects a quote → order status changes to "Confirmed."
6. Other vendors are notified that the order was fulfilled by someone else.

---

## 6. Feature List

### 6.1 Vendor App/Portal
- Registration & KYC (business name, owner name, phone, address, ID proof upload)
- Daily stock management (wood type, quantity, price range, unit of measurement)
- Real-time order request notifications
- Quotation submission screen (price, delivery time, notes)
- Order history & status tracking
- Earnings/orders dashboard
- Ratings & reviews received
- Delivery radius / service area settings
- In-app chat or call-masking with customer post-match

### 6.2 Customer App
- Simple registration (phone/OTP based)
- Create new order (wood type, quantity, use case, location, delivery date)
- Live "Offers" screen showing incoming vendor quotes
- Vendor profile view (ratings, past reviews, distance, response time)
- Accept/reject offers
- Order tracking & status
- Order history & re-order option
- Ratings & review submission post-delivery
- Push notifications (new quote received, order confirmed, delivery updates)

### 6.3 Admin Panel
- Vendor onboarding approval/verification workflow
- Vendor & customer management (block/suspend, dispute handling)
- Order monitoring dashboard
- Analytics: GMV, active vendors, order volume, city-wise heatmaps
- Content moderation (fake listings, spam quotes)
- Commission/payment settlement management (future phase)

---

## 7. Functional Requirements

| ID | Requirement |
|---|---|
| FR1 | System shall allow vendors to register and update KYC documents. |
| FR2 | System shall allow vendors to add/update daily stock (type, quantity, price). |
| FR3 | System shall allow customers to create an order request with quantity, wood type, location, and delivery timeline. |
| FR4 | System shall broadcast new order requests to all verified vendors within a configurable radius. |
| FR5 | System shall allow vendors to submit a price quote against an order request within a time-bound window. |
| FR6 | System shall display all received quotes to the customer, sortable by price/rating/distance. |
| FR7 | System shall allow the customer to accept exactly one quote, closing the order to other vendors. |
| FR8 | System shall notify all non-selected vendors once an order is fulfilled. |
| FR9 | System shall support order status tracking (Requested → Quoted → Confirmed → Delivered → Completed/Cancelled). |
| FR10 | System shall allow post-delivery ratings/reviews from both customer and vendor. |
| FR11 | System shall support location-based vendor discovery using GPS/address input. |
| FR12 | System shall support multiple wood/charcoal categories and units (quintal, kg, ton, bundle). |
| FR13 | Admin shall be able to approve, suspend, or reject vendor accounts. |
| FR14 | System shall send push/SMS notifications for key events (new quote, order confirmed, delivery reminder). |

---

## 8. Non-Functional Requirements

- **Scalability:** Should support multi-city expansion without architecture rework.
- **Language Support:** Telugu, Hindi, Urdu, English (at minimum for Hyderabad launch) given vendor tech-literacy levels.
- **Performance:** Order broadcast to vendors should happen within 2–3 seconds of order creation.
- **Reliability:** Notification delivery success rate >95%.
- **Security:** Vendor KYC data and customer personal data must be securely stored (encryption at rest, role-based access).
- **Offline Tolerance:** Vendor app should gracefully handle poor network conditions common in some vendor locations (retry queues for stock updates/quotes).
- **Usability:** Vendor-side UI must be extremely simple (icon-driven, minimal text entry, voice input consideration for stock updates).

---

## 9. Monetization Strategy (Future Consideration)

| Model | Description |
|---|---|
| Commission per Deal | Platform takes a % cut from the vendor on each completed order. |
| Subscription for Vendors | Monthly/annual fee for premium visibility or higher order limits. |
| Featured Listings | Vendors pay to appear higher in the quote list or get badge visibility. |
| Lead Fee | Vendors pay a small fee per order request they respond to. |
| Delivery/Logistics Add-on | Platform-arranged delivery for a fee, for vendors without their own transport. |

*Note: Phase 1 launch should focus on adoption and liquidity (vendors + customers) before introducing monetization friction.*

---

## 10. Phased Roadmap

### Phase 1 – MVP (Hyderabad Launch)
- Vendor registration & stock updates
- Customer order creation
- Broadcast-and-quote matchmaking (core Ola/Uber-style flow)
- Basic ratings
- Cash-on-delivery only

### Phase 2 – Trust & Retention
- In-app chat, vendor verification badges
- Ratings/reviews deepened with photos
- Repeat/recurring orders for B2B customers (restaurants, hostels)
- Digital payments integration (UPI)

### Phase 3 – Scale & Monetization
- Multi-city expansion
- Commission-based monetization / subscriptions
- Vendor analytics dashboard (demand trends, pricing insights)
- Logistics/delivery partner integration

### Phase 4 – Platform Expansion
- Expand categories: coal, agricultural residue fuel, briquettes, etc.
- B2B bulk contracts and tenders (hotels, industries)
- Vendor working-capital/credit tie-ups (fintech partnership)

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Low vendor tech adoption | Simple UI, regional language support, on-ground onboarding agents, WhatsApp-based fallback for stock updates in early phase. |
| Trust issues (fake vendors, quality mismatch) | KYC verification, ratings system, dispute resolution process, escrow-like confirmation flow before payment (later phase). |
| Chicken-and-egg problem (no vendors = no customers, and vice versa) | Localized launch in one area of Hyderabad first; manually onboard vendors before public customer launch. |
| Price undercutting/vendor collusion | Monitor pricing patterns; encourage transparent quote history. |
| Delivery/logistics gaps | Phase 1 keeps delivery vendor's responsibility; introduce platform logistics later. |
| Seasonal demand (weddings, winter for charcoal) | Diversify to B2B/restaurant use cases for steady off-season demand. |

---

## 12. Open Questions

1. Will the platform handle payments directly, or remain cash-on-delivery/vendor-collected in Phase 1?
2. What is the minimum/maximum order size supported (retail kg vs bulk quintals/tons)?
3. Should there be a fixed response window for vendor quotes (e.g., 15 mins) after which the order auto-expires?
4. Will delivery be vendor-arranged only, or will the platform offer logistics support from day one?
5. What is the initial target radius for order broadcast (walking distance vs city-wide)?
6. Do we need a separate app for vendors vs a unified app with role-based views?

---

## 13. Appendix: Glossary

- **Lakdi ki Tal:** Local term (Hindi/Urdu, common in Hyderabad) for a wood-selling yard/vendor.
- **Quintal:** Unit of mass equal to 100 kg, commonly used in India for bulk wood/grain trade.
- **GMV:** Gross Merchandise Value — total value of orders transacted through the platform.
