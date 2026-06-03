# InstantLead AI Static Website - V3.1

InstantLead AI is a simple static website prototype for an AI lead-capture service. It is designed to be deployed from GitHub to Vercel without React, Next.js, Node.js, npm, or any build step.

## How the project works

- `index.html` contains the landing page, pricing section, demo simulator, floating chatbot, and lead form modal.
- `style.css` controls the full visual design, responsive layout, modal, demo chat, and chatbot styling.
- `script.js` powers the CTA buttons, pricing buttons, modal form, chatbot flow, demo scenarios, form validation, success messages, and Google Apps Script submission.
- `google-apps-script.gs` is pasted into a Google Sheet Apps Script project and deployed as a Web App. It receives form/chat submissions and appends rows to a `Leads` sheet.
- `vercel.json` keeps the static Vercel deployment clean with clean URLs and no trailing slash.

## Current connection status

The website is connected to a Google Apps Script Web App through this line in `script.js`:

```js
const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzxMqn_LrJQ75ifItGRnSlgMe1Zui6SZSHnEDkFiNpnPbWZHuJvEG7b3UF4aJ3dvhzWfQ/exec";
```

Form and chatbot submissions are posted to Google Apps Script. If the URL is removed or left blank, the site falls back to demo mode and logs the prepared lead payload in the browser console.

Because the static site uses `fetch(..., { mode: "no-cors" })`, the browser cannot read the Apps Script response. After testing, confirm success by checking for a new row in the Google Sheet.

## Lead data captured

The form and chatbot send these core fields:

- Timestamp
- Full name
- Email
- Phone
- Phone country code
- Phone country
- Business type
- Company
- Message
- Source button

They also send useful context:

- Preferred plan
- Preferred contact method
- Lead volume
- Website URL
- Page URL
- User agent

## Connect Google Sheets

1. Open Google Sheets and create a spreadsheet named `InstantLead AI Leads`.
2. Go to **Extensions > Apps Script**.
3. Delete any starter code.
4. Paste the full code from `google-apps-script.gs`.
5. Save the Apps Script project.
6. Click **Deploy > New deployment**.
7. Choose **Web app**.
8. Set **Execute as** to `Me`.
9. Set **Who has access** to `Anyone`.
10. Click **Deploy** and copy the Web App URL ending in `/exec`.
11. Replace the existing `GOOGLE_SHEET_WEB_APP_URL` in `script.js` if you deploy a new Apps Script Web App URL.
12. Upload the updated files to GitHub and let Vercel redeploy.

## Test checklist

1. Open the local or deployed website.
2. Click **Start Free Trial**, **Get Started**, **Start Today**, and the final CTA to confirm each opens the lead form.
3. Submit a test form lead.
4. Open the floating chat, complete the lead-capture conversation, and confirm it reaches the summary step.
5. If the Apps Script URL is connected, check the Google Sheet for new rows.
6. Test mobile width to confirm the modal, pricing cards, and chat widget remain usable.

## Deployment

This is a static site. Deploy by uploading these files to the GitHub repository connected to Vercel:

- `index.html`
- `style.css`
- `script.js`
- `google-apps-script.gs`
- `vercel.json`
- `README.md`

Vercel will redeploy automatically after you commit the updated files in GitHub.

## Tools used

- HTML
- CSS
- Vanilla JavaScript
- Google Apps Script
- Google Sheets
- GitHub
- Vercel

## Version history

- **V1**: Initial static landing page prototype.
- **V2**: Added stronger live demo structure and lead form preparation.
- **V3**: Added realistic demo scenarios, lead summary card, floating chatbot, and Google Apps Script instructions.
- **V3.1**: Improved lead field alignment, source-button tracking, timestamp capture, chatbot lead qualification, inline form error handling, and Apps Script compatibility.

## Important notes

- Do not add `package.json`, npm, React, Next.js, or a build setup.
- Do not paste private API keys into this static website.
- The Google Apps Script URL is acceptable for this simple prototype, but a production SaaS should also use spam protection, stronger validation, and a protected backend.
