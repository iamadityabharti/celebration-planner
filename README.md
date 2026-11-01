# 🎉 Celebrai — GenAI Celebration & Event Planner

> **AI-Powered Master Event Architect for Weddings, Birthdays, Community Festivals, and Beyond.**
> Built for the GenAI Celebration & Event Planner Hackathon Challenge (Deadline: November 1, 2026).

---

## 🌟 Live Web App & Resources
- **Live Accessible URL**: [https://celebrai-planner.vercel.app](https://celebrai-planner.vercel.app) *(or deployable to Vercel/Netlify in 1 click)*
- **GitHub Repository**: [https://github.com/iamadityabharti/celebration-planner](https://github.com/iamadityabharti/celebration-planner) (< 2 MB clean source)
- **Walkthrough Demo Video**: `< 4 Minutes Video Demo` (See complete turnkey demo script below)

---

## 🎯 Problem Statement Fulfillment

| Required Capability | Celebrai Implementation |
| :--- | :--- |
| **Weddings, Birthdays & Community Events** | Pre-engineered presets & generative templates for **Weddings** (Royal Sunset Coastal), **Birthdays** (Neon Synthwave 30th), and **Community Events** (GreenRoots Harvest Eco-Fest), plus custom events. |
| **Budgets & Allocations** | Dynamic budget allocator with live burn-rate bar, category distribution (Venue, Catering, Decor, Photo, DJ, Permits), itemized expense ledger with paid/pending status, and **AI cost-saving hacks**. |
| **Timelines & Run of Show** | Dual-mode timeline: **Countdown Milestones** (6 months down to day-before with priority tags) and **Day-of Run of Show** (minute-by-minute cue sheet with printable schedule). |
| **Vendor Checklists** | Comprehensive vendor hub (Venue, Caterer, Photo/Video, Florist, DJ/Sound, Permits) with contract milestones, status pipeline, and **AI RFP Interview Questions** generator. |
| **Personalized Ideas & Themes** | Instant thematic concepts: curated 5-color HEX palette (copy-to-clipboard), signature food & cocktail pairings, entertainment concepts, photo-op installations, and social hashtags. |
| **GenAI Planning Assistant** | **Celebration Copilot** context-aware assistant: knows budget, guest count, and event theme to answer contingency questions, draft 2-minute toast speeches, and optimize plans. |

---

## ✨ Key Features & Technical Highlights

### 1. 🎨 GenAI Thematic Concept Generator
- **Harmonious Color Swatches**: Real-time 5-color palette with 1-click HEX code copying.
- **Atmosphere & Styling**: Bespoke decor ideas customized to the vibe (e.g., Neon Cyberpunk, Romantic Coastal, Rustic Eco-Harvest).
- **Culinary & Mixology**: Signature cocktails/mocktails and chef-curated menu concepts.
- **Entertainment & Photo-Ops**: Interactive guest experiences and memorable photo installations.

### 2. 💰 Intelligent Dynamic Budget Engine
- **Target vs. Actual Tracker**: Visual burn rate with over-budget alerts and buffer calculations.
- **Multi-Currency Support**: Switch between **USD ($)**, **INR (₹)**, **EUR (€)**, and **GBP (£)**.
- **AI Cost-Saving Recommendations**: Proactive advice on repurposing decor, bulk craft bar sourcing, and vendor optimizations.
- **Itemized Ledger**: Add custom expenses, assign vendors, record deposits, and track paid statuses.

### 3. ⏳ Dual-Engine Timeline & Day-of "Run of Show"
- **Planning Countdown Milestones**: Grouped by phase (6 months, 3 months, 1 month, 2 weeks, day-before) with task checkboxes and high/medium/low priority tags.
- **Day-of Run of Show**: Hour-by-hour agenda with designated owners (Coordinator, DJ, Caterer, Host) and 1-click **Printable Agenda Brief**.

### 4. 📋 Vendor Partnership Hub & AI Interviewer
- **Status Pipeline**: Researching ➔ Contacted ➔ Quoted ➔ Booked ➔ Paid.
- **Interactive Checklists**: Insurance, tastings, contracts, and permits tracking.
- **AI Vendor Interviewer**: Auto-generates critical RFP questions tailored to the vendor category (e.g. asking a photographer about dual memory card backup and drone flight permits).

### 5. 💌 Guest Experience & AI Invitation Drafter
- **RSVP Tracking**: Confirmed, Pending, and Declined counts with total headcount.
- **Dietary Restriction Auditor**: Instant tally for caterers (Vegan, Gluten-Free, Halal, Nut Allergies).
- **1-Click AI Invitation Copy Suite**:
  - 💬 **WhatsApp / SMS Instant Blast** with emojis and RSVP links.
  - ✉️ **Formal Email Invitation** with personalized subject line and body.
  - 📸 **Instagram / Social Caption** with tailored event hashtags.

### 6. 🤖 Celebration Copilot (Interactive AI Drawer)
- Context-aware chatbot with visibility into the user's specific event parameters.
- One-click inquiry shortcuts:
  - *"How can we cut 15% from the budget?"*
  - *"Plan for rainy weather contingency"*
  - *"Draft an emotional 2-minute toast speech"*
  - *"Give me interactive icebreaker games for guests"*

### 7. 📄 Instant Professional PDF Export
- Generates a branded, multi-page, print-ready PDF Event Masterplan incorporating the color palette, budget table, day-of agenda, and vendor contacts using `jsPDF`.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18 + TypeScript + Vite 6
- **Styling**: Tailwind CSS + Custom Glassmorphism & Glow Effects
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Document Export**: jsPDF + AutoTable
- **AI Integration**:
  - Direct **Google Gemini 1.5/2.0 Flash API** integration (configurable via in-app API key modal).
  - Built-in **intelligent client-side generative engine** ensuring **100% offline & zero-config functionality** for instant evaluations.

---

## 🚀 Quickstart & Local Setup

```bash
# 1. Clone repository (<10 MB)
git clone https://github.com/adityabharti/celebration-planner.git
cd celebration-planner

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

---

## 🎬 Turnkey Walkthrough Demo Video Script (< 4 Minutes)

Follow this structured script to record your <4-minute walkthrough video:

| Time | Screen / Feature | Voiceover / Talking Points |
| :--- | :--- | :--- |
| **0:00 - 0:35** | **Home & 1-Click Demo Presets** | *"Welcome to Celebrai, the GenAI Celebration & Event Planner built to solve weddings, birthdays, and community gatherings. Notice our one-click presets: Royal Sunset Wedding, 30th Synthwave Birthday, and Greenfield Eco-Fest. With a click, the entire theme, palette, budget, and run of show instantly adapt."* |
| **0:35 - 1:15** | **GenAI Event Architect Wizard** | Click **"Generate Event"**. Fill in a quick custom prompt (e.g. Anniversary in Paris, ₹50,000 budget or $10k). Hit **Generate Masterplan**. *"Celebrai's AI synthesizes a cohesive masterplan: tailored color swatches with 1-click HEX copying, signature food & cocktails, and curated decor concepts."* Click on a swatch to show the copy feedback. |
| **1:15 - 2:00** | **Dynamic Budget & AI Cost Hacks** | Click **"Budget & Expenses"** tab. Show the burn-rate bar, total committed vs. buffer, and AI Cost-Optimization Hacks. Click **"Add Expense"** to add an item, and toggle an expense to **"Paid"**. Point out the currency support (USD, INR, EUR, GBP). |
| **2:00 - 2:40** | **Timeline & Day-of Run of Show** | Click **"Timeline & Run of Show"** tab. Show the minute-by-minute day-of schedule. Check off a milestone. Click **"Countdown Milestones"** to show planning stages (6 months to day-before). Show the **"Print Agenda"** capability. |
| **2:40 - 3:15** | **Vendor Checklists & AI Interviewer** | Switch to **"Vendor Checklists"**. Show status pipeline (Researching to Paid). Click **"AI Interview Questions"** on a vendor (e.g. Photography or Venue) to showcase the tailored RFP questions generated to protect the host's budget. |
| **3:15 - 3:45** | **Guest Manager & Celebration Copilot** | Switch to **"Guests & Invitations"** to show RSVP counters and dietary tallies for caterers. Show the 1-click WhatsApp and Email drafter. Then open the **"Copilot"** drawer, click a quick prompt like *"How can we cut 15% from the budget?"*, and watch Copilot respond instantly. |
| **3:45 - 4:00** | **Export PDF & Closing** | Click **"Export PDF"** to demonstrate the generated printable document. Click **"Celebrate!"** for the confetti blast. Conclude with a strong closing summary of how Celebrai transforms event planning stress into effortless celebration. |

---

## 📜 License
MIT License. Built with passion for unforgettable celebrations.

