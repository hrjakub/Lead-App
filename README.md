# InstantLead AI Static Website — V3

This version includes:

- A more realistic interactive live demo conversation
- Scenario buttons for dental, real estate, and home services leads
- A stronger lead summary card showing what the business receives
- A free trial / get started form prepared for spreadsheet capture
- Google Sheets integration using Google Apps Script

## Files

- `index.html` — website structure
- `style.css` — styling
- `script.js` — demo logic + form submission logic
- `google-apps-script.gs` — paste this into Google Apps Script to connect the form to a spreadsheet
- `vercel.json` — static Vercel routing config

## Deploy update to Vercel

1. Upload these files to the existing GitHub repository.
2. Replace the old files.
3. Click **Commit changes**.
4. Vercel will automatically redeploy.

## Connect the form to a live spreadsheet

The easiest beginner setup is Google Sheets. You can export the sheet to Excel any time.

### Step 1 — Create the Google Sheet

1. Open Google Sheets.
2. Create a new blank spreadsheet.
3. Name it: `InstantLead AI Leads`.

### Step 2 — Add the Apps Script code

1. In the Google Sheet, go to **Extensions → Apps Script**.
2. Delete any starter code.
3. Paste the full code from `google-apps-script.gs`.
4. Save the project.

### Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Select **Web app**.
3. Set **Execute as** to `Me`.
4. Set **Who has access** to `Anyone`.
5. Click **Deploy**.
6. Copy the Web App URL. It should end with `/exec`.

### Step 4 — Paste the URL into the website

1. Open `script.js`.
2. Find this line:

```js
const GOOGLE_SHEET_WEB_APP_URL = "";
```

3. Paste your URL inside the quotes:

```js
const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/YOUR_ID_HERE/exec";
```

4. Commit the updated `script.js` to GitHub.
5. Vercel will redeploy.

## Test

1. Open your live Vercel website.
2. Click **Start Free Trial** or **Get Started**.
3. Submit a test lead.
4. Open your Google Sheet.
5. A new row should appear with the lead information.

## Important

Do not paste private API keys into this static website. The Google Apps Script URL is okay for this simple lead-capture setup, but for a serious production SaaS you would normally use a protected backend, spam protection, and validation.


## V3 chatbot update

The floating chatbot now runs a realistic lead-qualification simulation instead of only giving generic keyword replies. It asks for business type, visitor need, urgency, name, contact details, and preferred time, then creates a structured lead summary. If the Google Sheets endpoint is connected, completed chat leads can also be sent to the spreadsheet.
