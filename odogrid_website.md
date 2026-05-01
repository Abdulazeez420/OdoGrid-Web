# OdoGrid — Website Design Prompt & Content Specification

> **Purpose:** Complete design brief and copy for the official OdoGrid marketing website. Hand this document to a web designer, no-code builder (Framer / Webflow / Wix Studio), or an AI design tool to produce the final site.

---

## Design System

| Token | Value |
| :--- | :--- |
| **Primary** | `#4F8EF7` (electric blue) |
| **Primary Dark** | `#1A56D6` |
| **Accent** | `#FF8C00` (flame orange — streak brand colour) |
| **Background Dark** | `#0D0D0D` |
| **Surface Dark** | `#1C1C1E` |
| **Background Light** | `#F2F2F7` |
| **Text Primary** | `#FFFFFF` (dark mode) / `#1C1C1E` (light mode) |
| **Text Secondary** | `#8E8E93` |
| **Success** | `#30D158` |
| **Font — Headings** | Inter (Bold 700 / ExtraBold 800) |
| **Font — Body** | Inter (Regular 400 / Medium 500) |
| **Border Radius** | 16 px (cards), 12 px (buttons), 24 px (hero pill badges) |
| **Shadows** | Soft drop shadow: `0 8px 32px rgba(0,0,0,0.18)` |
| **Max Content Width** | 1200 px |
| **Tone** | Clean, minimal, dark-first with light mode toggle available |

---

## Page Architecture (Scroll Sections)

```
NAV BAR
  ├── Hero
  ├── Features Overview (9-grid cards)
  ├── Feature Deep-Dive 1 — Fuel & Charging
  ├── Feature Deep-Dive 2 — Maintenance & Expenses
  ├── Feature Deep-Dive 3 — Tax & Trips
  ├── Feature Deep-Dive 4 — Privacy & Security
  ├── Calculators Spotlight
  ├── Cloud Sync Spotlight
  ├── Feature Deep-Dive 5 — Document Expiry Vault  ← NEW
  ├── Feature Deep-Dive 6 — Shift Mode & Net Profit  ← NEW
  ├── App Screenshots Carousel
  ├── About
  ├── Contact Us
  ├── Privacy Policy
FOOTER
```

---

## 1. Navigation Bar

**Layout:** Fixed top, full-width, frosted-glass blur background (`backdrop-filter: blur(20px); background: rgba(13,13,13,0.75)`).

**Left:** OdoGrid logo (SVG) + wordmark "OdoGrid" in white semibold.

**Center links:** Features · About · Contact

**Right:**
- "Privacy Policy" text link (muted)
- "Get the App" pill button — gradient `#4F8EF7 → #1A56D6`, 12 px radius, opens Play Store link in new tab

**Mobile:** Hamburger menu, full-screen overlay drawer.

---

## 2. Hero Section

**Background:** Full-viewport dark gradient `#0D0D0D → #111827`. Animated floating particle mesh (low opacity blue/orange dots). On the right side: a tilted phone mockup screenshot of the OdoGrid dashboard.

**Left column content:**

```
[Pill badge — electric blue outline]
  🚗  Smart Vehicle Management · On-Device AI Insights
```

```
[H1 — 72 px, Bold, white, line-height 1.1]
Drive Smarter.
Track Everything.
Save More.
```

```
[Subtitle — 20 px, #8E8E93, max-width 520 px]
OdoGrid is your all-in-one offline-first vehicle companion.
Track fuel, manage maintenance, log business trips, and
export tax-ready reports — all encrypted on your device.
```

```
[CTA Buttons — stacked horizontally]
[Primary] "Download on Google Play"  →  Play Store link (badge style)
[Secondary ghost] "See All Features ↓"  →  scrolls to Features section
```

```
[Trust badges row — small icons + text]
🔒 Encrypted on-device   ·   📶 100% Offline   ·   🌙 Light & Dark Mode   ·   📱 Edge-to-Edge Display
```

**Right column:** iPhone/Android frame with dashboard screenshot. Add subtle gradient glow behind phone in primary blue.

---

## 3. Key Features Overview

**Section header:**
```
[Label — blue uppercase tracking]  EVERYTHING YOU NEED
[H2 — 48 px]  One App. Complete Vehicle Intelligence.
[Subtext]  From daily fill-ups to year-end tax reports — OdoGrid handles it all.
```

**9-card grid (3 × 3 on desktop, 1-col on mobile). Each card:**
- Icon (48 px, coloured on dark surface card)
- Feature name (18 px semibold)
- 2-line description

| # | Icon | Feature Name | Description |
| :- | :-- | :--- | :--- |
| 1 | ⛽ | Fuel & Charging Tracker | Log every fill-up with auto-calculated totals, GPS station detection, and OCR receipt scanning. |
| 2 | 🔧 | Maintenance Scheduler | Schedule oil changes, tyre rotations and more by date or mileage. Get notified before they're overdue. |
| 3 | 📊 | Spending Analytics | Navigate month-by-month with interactive `< April 2026 >` controls. Filter by vehicle or view all combined — charts, totals, and breakdowns update instantly. |
| 4 | 📋 | Tax & Trip Logging | Record business vs personal trips. Generate a PDF tax deduction report in seconds. |
| 5 | 🔒 | Privacy-First Security | AES-256 encrypted Isar database. Your data never leaves your device unless you choose to export it. |
| 6 | ☁️ | Cloud Backup & Restore | Serverless sync to Google Drive and Dropbox. Auto-backup on a schedule you choose — daily, weekly, or monthly. Runs silently in the background. No OdoGrid account required. |
| 7 | 🪪 | Document Expiry Vault | Store Driving Licence, Insurance, PUC, Fitness Certificate and more. Colour-coded expiry badges and push notifications at 30 d, 7 d, and 1 d before expiry. |
| 8 | 📈 | Shift Mode & Net Profit | Track gig-economy shifts from the Dashboard. Log earnings and instantly see your real net profit — earnings minus all vehicle costs. |
| 9 | 🗂️ | Fleet Data & Annual Reports | Export and import cross-vehicle data as versioned JSON. Generate a Fleet Performance PDF with per-vehicle earnings, fuel cost, and net profit breakdown. |

**Card style:** `background: #1C1C1E`, `border: 1px solid rgba(255,255,255,0.06)`, `border-radius: 16px`, hover lifts with blue border glow.

---

## 4. Feature Deep-Dive 1 — Fuel & Charging

**Layout:** Alternating left-image / right-text (zigzag) on desktop.

**Image side:** Phone mockup showing the Fuel Log list page.

**Text side:**
```
[H3 — 36 px]  Never Miss a Fill-Up Detail
```
```
[Body]
Log petrol, diesel, electric charging, and hybrid refuels in seconds.
OdoGrid auto-calculates your total cost while you type and
tracks your fuel efficiency (km/L, L/100km, MPG) across every tank.
```

**Bullet list with check icons (green `#30D158`):**
- Auto-calculated total — edit quantity or price, the other updates instantly
- GPS "Detect Location" auto-tags your current fuel station
- OCR receipt scanner — point camera at receipt, values fill in automatically
- Full Fuel Economy history with efficiency trend graph
- Supports Litres, Gallons, and kWh for EVs

---

## 5. Feature Deep-Dive 2 — Maintenance & Expenses

**Image side:** Phone mockup of Maintenance task list.

**Text side:**
```
[H3]  Stay Ahead of Every Service Interval
```
```
[Body]
Schedule tasks by date or odometer distance. Get push notifications
before your next oil change, tyre rotation, or service is due.
Split repair costs into parts and labour for accurate record-keeping.
```

**Bullets:**
- Date-based and mileage-based reminders
- Parts vs. labour cost breakdown per job
- General expense tracking: Insurance, Parking, Tolls, Fines
- Category filtering for monthly expense summaries
- Auto-synced odometer — every log keeps your mileage current
- Edit any task in-place — tap the 3-dot menu and choose Edit

---

## 6. Feature Deep-Dive 3 — Tax & Trips

**Image side:** Phone mockup of Trips module / Tax Report card.

**Text side:**
```
[H3]  Log Trips. Claim Every Kilometre.
```
```
[Body]
Mark each trip as business or personal. At tax time, generate a
professionally formatted PDF Tax Deduction Report — complete with
your vehicle details, total deductible distance, and cost breakdown.
```

**Bullets:**
- Business vs. personal trip classification
- Auto-calculated distance from odometer readings
- One-tap PDF export for accountants or self-assessment
- Built-in Tax Calculator — estimate deductible expenses by business-use %
- Mileage Calculator — km/L, L/100km, MPG UK, cost per 100 km
- **Shift Earnings** — log earnings per shift and track real net profit (earnings − costs) on the Dashboard
- **Fleet Performance PDF** — cross-vehicle report with shifts, fuel cost, earnings & net profit per vehicle

---

## 7. Feature Deep-Dive 4 — Privacy & Security

**Full-width dark section with centred layout. Blue padlock icon above heading.**

```
[H2 — 44 px, centred]  Your Data. Your Device. Always.
```
```
[Subtext — centred, max 600 px]
OdoGrid stores everything encrypted on your phone using AES-256
hardware-backed keys. No account required. No server. No tracking
of your vehicle data — ever.
```

**3-column icon + stat cards:**

| Icon | Stat | Label |
| :-: | :--- | :--- |
| 🔐 | AES-256 | Hardware-backed encryption |
| 📴 | 100% Offline | No internet needed to use the app |
| 👁️ | Zero telemetry | Vehicle data never sent to any server |

**Export options row:**
```
[Small cards row]   JSON Export  ·  PDF Export  ·  Excel Export
```
Each has a format icon, name, and 1-line description.

---

## 8. Calculators Spotlight

**Background:** Slightly lighter surface `#1C1C1E`. Two-column layout.

**Left: Tax Calculator preview card (UI mockup)**
```
[H3]  Built-in Tax & Mileage Calculators
[Body]
No spreadsheet juggling. Enter your annual mileage, business-use
percentage, and vehicle costs — OdoGrid instantly calculates
your deductible expenses and estimated tax saving.
```

**Tab labels (visual only — not interactive on website):**
- `TAX CALCULATOR` | `MILEAGE CALCULATOR`

**Right: Mileage Calculator preview card**
Shows input fields (odometer start/end, fuel used, price/L) and output metrics (km/L, L/100km, MPG, cost/100km).

---

## 8B. Feature Deep-Dive 5 — Document Expiry Vault

**Layout:** Text left, phone mockup right.

```
[Label — blue uppercase]  DOCUMENT VAULT
[H3]  Never Miss a Document Expiry Again
```
```
[Body]
Store all your vehicle documents in one place — Driving Licence,
Insurance, PUC, RC Book, Fitness Certificate, Road Tax and more.
Colour-coded expiry badges and push notifications keep you ahead
of every deadline.
```

**Bullets:**
- Supports 7+ document types — fully customisable
- Green / orange / red badges based on days remaining
- Push notifications at 30 days, 7 days, and 1 day before expiry
- Per-vehicle document lists — separate records for every car or bike
- All documents stored locally, encrypted — never uploaded to any server

---

## 8C. Feature Deep-Dive 6 — Shift Mode & Net Profit

**Layout:** Phone mockup left, text right (alt).

```
[Label — blue uppercase]  GIG ECONOMY
[H3]  Know Your Real Earnings, Not Just Revenue
```
```
[Body]
For rideshare, delivery, and gig-economy drivers. Start a shift
from the Dashboard, log your earnings when you finish, and
instantly see your real net profit — what you actually made
after deducting fuel, maintenance, and expenses.
```

**Bullets:**
- Start / End / Cancel shift with a single tap from the Dashboard
- Live elapsed-time ticker while your shift runs
- Log shift earnings (ride income, delivery pay, etc.)
- Net Profit row on Dashboard — Earnings minus all vehicle costs
- Fleet Performance PDF — per-vehicle shifts, fuel cost, earnings & net profit comparison
- Android Home Screen shortcuts — long-press app icon → Start Trip or Log Fuel

---

## 9. Cloud Sync Spotlight

**Background:** Gradient from `#0D0D0D` to `#0F1B2D`.

```
[H2]  Your Backup. On Your Terms.
[Subtext]
No proprietary cloud. Sync your encrypted database directly to
Google Drive or Dropbox — providers you already trust.
```

**Two side-by-side provider cards:**

**Google Drive Card**
- Icon: Google Drive logo
- "Backs up to your private appDataFolder — invisible to other apps"
- Features: ZIP compression, auto-deduplication, timestamp tracking, configurable auto-backup frequency (daily / weekly / monthly)

**Dropbox Card**
- Icon: Dropbox logo
- "Backs up as encrypted ZIP into your /Apps/OdoGrid folder"
- Features: ZIP upload, timestamp history, merge-based restore (adds missing records without deleting existing local entries), graceful background handling (auto-backup silently skips if Dropbox has not yet been connected, never prompting mid-session)

**Auto-backup note (centred):**
> Open the App Drawer and choose **Google Drive** or **Dropbox** to manage backup and restore from dedicated Sync pages. Auto-backup is enabled by default after your first successful backup — adjust the frequency (Daily, Weekly, or Monthly) from the Backup & Sync screen at any time.

**Restore note (centred, muted):**
> Google Drive restore replaces local data; Dropbox restore merges missing records into local data. All backup files remain encrypted end-to-end.

---

## 10. App Screenshots Carousel

**Full-width section. Section title:**
```
[H2, centred]  See It In Action
```

**Horizontal scrollable carousel (auto-play, 4 s interval) of 6 phone mockups:**
1. Dashboard — month filter `< April 2026 >`, vehicle picker, spending chart + streak badge
2. Fuel Log list — cards with efficiency badges
3. Add Fuel Sheet — GPS button + OCR banner
4. Maintenance tasks list
5. Tax Report card — vehicle picker + Generate PDF button
6. Settings page — theme selector + currency picker

**Mockup style:** Phone frame with subtle drop shadow + blue glow at bottom. Dark background on all screens. Dots pagination below carousel.

---

## 11. About Section

**Section anchor:** `#about`

**Layout:** Centred, max 760 px, generous vertical padding.

```
[Label — muted uppercase]  ABOUT ODOGRID
[H2 — 44 px]  Built for Drivers Who Care About Their Cars
```

```
[Body paragraph 1]
OdoGrid was built from a simple frustration — there was no
single app that tracked fuel costs, upcoming maintenance, business
mileage, AND protected your data without demanding an account or
an internet connection.

We built OdoGrid to be the app we wanted to use ourselves:
offline-first, encrypted by default, with smart features that
save time and money at every service station and year-end tax filing.
```

```
[Body paragraph 2]
The app supports petrol, diesel, hybrid, and electric vehicles.
It works for individual drivers, freelancers tracking business mileage,
and fleet managers who need detailed cost records for multiple vehicles.
```

**Values row — 3 cards:**

| Value | Description |
| :--- | :--- |
| **Privacy First** | No accounts. No vehicle data servers. Your information stays on your device. |
| **Offline Always** | Full functionality without an internet connection. Works anywhere. |
| **Constantly Improving** | Regular updates based on real driver feedback, covering new vehicle types and tax rules. |

---

## 12. Contact Section

**Section anchor:** `#contact`

**Background:** `#111111`.

```
[H2, centred]  Get in Touch
[Subtext, centred]
Have a question, feature request, or found a bug?
We'd love to hear from you.
```

**Centred contact card (`background: #1C1C1E`, `border-radius: 20px`, max-width 560 px):**

```
[Email row]
  ✉️  supportodogrid@gmail.com
  [Copy button]

[Response time note — muted]
  We typically respond within 24–48 hours.
```

**Below card — 3 quick-link buttons (ghost/outline style):**
- 🐛 Report a Bug → mailto link
- 💡 Request a Feature → mailto link with subject pre-filled
- ⭐ Leave a Review → Play Store link
- 📱 Contact Support → mailto link with device diagnostics subject

> **Designer note:** Do not include a form with user-submitted free text fields to avoid spam without server-side validation. Use mailto links only.

---

## 13. Privacy Policy Section

**Section anchor:** `#privacy`

**Full-width white/light surface section OR a dedicated `/privacy` sub-page.**

```
[H2]  Privacy Policy
[Meta — muted]  Last updated: April 2026 · Phase 15 — Pre-Launch Compliance, Contact Support & Data Deletion
```

**Sub-sections:**

### 13.1 Overview
```
OdoGrid is designed to protect your privacy by default.
The app operates entirely offline and does not transmit your
vehicle data to any external server owned or operated by us.
```

### 13.2 Data We Collect

| Data | Where Stored | Leaves Device? |
| :--- | :--- | :--- |
| Vehicle details (make, model, VIN, plate) | Local encrypted Isar DB | Only if you export manually |
| Fuel logs & odometer readings | Local encrypted Isar DB | Only if you export manually |
| Maintenance records & expenses | Local encrypted Isar DB | Only if you export manually |
| Trip logs & business mileage | Local encrypted Isar DB | Only if you export manually |
| App preferences (currency, theme) | SharedPreferences (device) | Never |
| Location (GPS for station tagging) | Never persisted | Never — used in-memory, discarded immediately |

### 13.3 Third-Party Services
```
OdoGrid integrates with the following third-party services.
Each operates under its own privacy policy:
```
- **Google AdMob** *(Android only)* — displays ads after consent is granted (GDPR compliant). Three ad formats are used: banner ads on list pages, rewarded ads gating premium exports and AI Assistant analysis, and frequency-capped interstitial ads shown at most once every three saves. Users can also purchase a one-time Remove Ads entitlement. [Google Privacy Policy](https://policies.google.com/privacy)
- **Google Drive** *(optional)* — stores your encrypted backup in your own Google Drive appDataFolder. [Google Privacy Policy](https://policies.google.com/privacy)
- **Dropbox** *(optional)* — stores your encrypted backup in your own app folder (`/Apps/OdoGrid`). [Dropbox Privacy Policy](https://www.dropbox.com/privacy)
- **Google ML Kit** *(on-device only)* — OCR text recognition runs entirely on-device; no images are uploaded. [Google Privacy Policy](https://policies.google.com/privacy)
- **Firebase Crashlytics** *(app diagnostics)* — captures crash reports to improve stability. [Google Privacy Policy](https://policies.google.com/privacy)
- **Firebase Analytics** *(product analytics)* — helps measure feature usage and app quality trends. [Google Privacy Policy](https://policies.google.com/privacy)

### 13.4 Advertising & Consent
```
We display ads via Google AdMob (Android only). On first launch, you
are presented with a GDPR consent dialog. You may decline personalised
ads — the app remains fully functional with non-personalised ads shown
instead.

Ad formats used:
• Banner ads — shown at the bottom of list pages.
• Rewarded ads — shown when you choose premium export actions
  (Tax Report, Export History, PDF, Excel) and when running
  AI Assistant analysis from the dedicated assistant page.
  If a rewarded ad fails to load, the requested action proceeds
  immediately as a fallback.
• Interstitial ads — shown at most once every three saves across
  fuel, maintenance, and expense entries combined.

Users can also purchase a one-time "Remove Ads" entitlement via
Google Play Billing to disable all ads permanently.

When an iOS version is released, Apple's App Tracking Transparency
(ATT) prompt will be shown before any ad identifier is accessed.
```

### 13.5 Data Export & Deletion
```
You can export all your data at any time from Privacy & Data → Export
My Data in JSON, PDF, or Excel format. Each export is gated behind a
short rewarded ad; if the ad fails to load the export proceeds
immediately. Exports include real field values (including VIN and plate
number) exactly as stored on-device.

To permanently delete all data, go to Privacy & Data → Wipe Data.
This deletes the encrypted database and all secure keys from your device.
This action is irreversible.
```

### 13.6 Cloud Backup Privacy
```
If you enable Google Drive backup, your encrypted database is
transferred directly between your device and your personal Google Drive
appDataFolder. OdoGrid does not have access to your cloud
credentials or the uploaded file contents.

If you enable Dropbox backup, the encrypted ZIP is transferred directly
between your device and your Dropbox app folder. Google Drive restores
replace the local database file, while Dropbox restores merge missing
records into the existing local database.
```

### 13.7 Contact for Privacy Enquiries
```
Email: supportodogrid@gmail.com
Subject line: Privacy Enquiry — OdoGrid
```

---

## 14. Footer

**Layout:** 3-column grid on desktop, stacked on mobile. Background `#0A0A0A`.

**Column 1 — Brand:**
```
[Logo + wordmark]
OdoGrid

Smart vehicle management for every driver.

[Play Store badge — links to app listing]
```

**Column 2 — Links:**
```
Features
About
Contact
Privacy Policy
Terms of Use
```

**Column 3 — Connect:**
```
supportodogrid@gmail.com

[Social icons — if applicable]
```

**Bottom bar (full-width divider above):**
```
© 2026 OdoGrid. All rights reserved.    ·    Privacy Policy    ·    Terms of Use    ·    Data Deletion
```
Muted text `#8E8E93`, 13 px.

---

## 15. Play Store / App Store CTA Block

**Floating or inline "Get the App" section above the footer:**

**Background:** Gradient `#1A56D6 → #4F8EF7` (blue), full-width, 120 px vertical padding.

```
[H2 — white, centred]  Ready to Drive Smarter?
[Subtext — white/80%, centred]
Download OdoGrid for free. No account required. Optional Premium
subscription for an ad-free experience — cancel any time.
```

```
[Centred badge buttons]
[Google Play Badge — white outline]  →  https://play.google.com/store/apps/details?id=com.odogrid.app
[App Store Badge — white outline]  →  (iOS link when available)
```

**Below badges — small trust row:**
```
✅ Free to download   ·   🔒 No account required   ·   📴 Works offline
```

---

## 16. SEO & Meta Tags

```html
<title>OdoGrid — Smart Vehicle Management App</title>
<meta name="description" content="Track fuel costs, schedule maintenance, log business trips and generate tax reports. Free offline-first vehicle management app for Android.">
<meta property="og:title" content="OdoGrid — Drive Smarter">
<meta property="og:description" content="Encrypted vehicle tracker. Fuel logs, maintenance reminders, tax trip reports, and cloud backup — all offline, all private.">
<meta property="og:image" content="/assets/og-preview.png">
<meta name="theme-color" content="#4F8EF7">
```

**Target keywords:** vehicle tracker app, fuel log app, car maintenance reminder app, business mileage tracker, tax deduction mileage app, offline car app Android, gig economy driver app, document expiry reminder app, shift earnings tracker

---

## 17. Animations & Interactions

| Element | Animation |
| :--- | :--- |
| Hero phone mockup | Float up/down loop, 4 s ease-in-out |
| Feature cards | Fade-up on scroll enter (staggered 100 ms delay) |
| Nav bar | Frosted glass appears after 60 px scroll |
| CTA buttons | Scale 1.03 on hover, shadow deepens |
| Screenshot carousel | Auto-scroll, pause on hover, swipe on mobile |
| Stats counters (if added) | Count-up animation when scrolled into view |
| Section transitions | Smooth `scroll-behavior: smooth` between anchors |

---

## 18. Accessibility

- All interactive elements have visible `:focus` outlines (blue glow `#4F8EF7`)
- Contrast ratio ≥ 4.5:1 for all body text
- `aria-label` on icon-only buttons (Play Store badge, social icons)
- Screen-reader-accessible carousel (ARIA live region)
- `prefers-reduced-motion` — disable float/auto-play animations

---

## 19. Responsive Breakpoints

| Breakpoint | Layout |
| :--- | :--- |
| `< 640 px` (mobile) | Single column, stacked CTAs, 2-col feature grid |
| `640–1024 px` (tablet) | 2-col feature grid, hero stacks vertically |
| `≥ 1024 px` (desktop) | Full 3-col grid, zigzag deep-dives, side-by-side hero |

---

## 20. Assets Needed from Developer

| Asset | Description |
| :--- | :--- |
| `logo.svg` | App icon as SVG vector |
| `og-preview.png` | 1200×630 px Open Graph image |
| `screenshots/01-dashboard.png` | Dashboard screenshot |
| `screenshots/02-fuel-log.png` | Fuel log list |
| `screenshots/03-add-fuel.png` | Add fuel sheet |
| `screenshots/04-maintenance.png` | Maintenance list |
| `screenshots/05-tax-report.png` | Tax report card |
| `screenshots/06-settings.png` | Settings page |
| `phone-frame.svg` | Generic Android phone frame (optional) |
| Play Store listing URL | For badge deep-link |
