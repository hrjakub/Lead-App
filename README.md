# InstantLead AI V4

Static landing page for InstantLead AI.

## Files included

- `index.html` - website structure
- `style.css` - responsive styling
- `script.js` - navigation, demo chat, and form logic
- `google-apps-script.gs` - optional Google Sheets form receiver
- `vercel.json` - Vercel static deployment settings
- `README.md` - setup notes

## Correct GitHub upload structure

Upload the files directly into the root of your GitHub repository:

```txt
Lead-App/
├── google-apps-script.gs
├── index.html
├── README.md
├── script.js
├── style.css
└── vercel.json
```

Do not upload the folder as:

```txt
Lead-App/
└── instantlead-ai-v4/
    ├── index.html
    ├── script.js
    └── style.css
```

If the files are inside a subfolder, Vercel may keep deploying the old website.

## Google Sheets connection

1. Create a Google Sheet.
2. Copy the Sheet ID from its URL.
3. Open Extensions > Apps Script.
4. Paste `google-apps-script.gs`.
5. Replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with your Sheet ID.
6. Deploy as Web App.
7. Set access to `Anyone`.
8. Copy the Web App URL.
9. Paste it in `script.js`:

```js
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```

## How to confirm V4 is live

The header subtitle says `V4 Static Website`, the demo widget says `V4 live`, and the footer says `Static V4 build`.
