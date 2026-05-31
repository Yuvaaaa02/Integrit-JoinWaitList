# Integrit — AI Caption SaaS Waitlist Platform

> Premium futuristic waitlist platform for **Integrit**, an AI-powered multilingual caption plugin for Adobe Premiere Pro & After Effects.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Routing | React Router v6 |
| Icons | Lucide React |
| Fonts | Bebas Neue, DM Sans, JetBrains Mono |
| Database | Google Sheets via Apps Script |

---

## Getting Started

```bash
npm install
npm run dev
```

---

## 🔑 Setting Up Google Sheets Integration

### Step 1 — Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Rename the default tab to **Sheet1**.
3. Add these headers in row 1:
   ```
   Name | Email | Mobile | Joined At
   ```

### Step 2 — Deploy Apps Script

1. Open the Sheet → **Extensions → Apps Script**
2. Delete all existing code and paste the following:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1")
  const data = JSON.parse(e.postData.contents)
  sheet.appendRow([data.name, data.email, data.mobile, data.joinedAt])
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON)
}

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1")
  const rows = sheet.getDataRange().getValues()
  const headers = rows.shift()
  const data = rows.map(row => ({
    name: row[0], email: row[1], mobile: row[2], joinedAt: row[3]
  }))
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
}
```

3. Click **Deploy → New Deployment**
4. Select type: **Web App**
5. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy** and copy the URL

### Step 3 — Add URL to Config

Open `src/config/api.js` and replace the placeholder:

```js
export const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec"
```

---

## Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/admin` | Admin login (`admin` / `admin123`) |
| `/dashboard` | Waitlist dashboard |

---

## Deploy to Vercel

```bash
npm run build
```

Then push to GitHub and import the repo at [vercel.com](https://vercel.com). No backend required.

---

## Project Structure

```
src/
├── config/
│   └── api.js              # Google Script URL
├── utils/
│   ├── sheets.js           # Submit + fetch helpers
│   └── exportCsv.js        # CSV download utility
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── HeroSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── DemoSection.jsx
│   │   ├── StatsSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   ├── FaqSection.jsx
│   │   └── WaitlistForm.jsx
│   ├── dashboard/
│   │   ├── StatCard.jsx
│   │   └── UserTable.jsx
│   └── ui/
│       └── ParticleField.jsx
└── pages/
    ├── LandingPage.jsx
    ├── AdminLogin.jsx
    └── Dashboard.jsx
```
