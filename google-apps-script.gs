/**
 * InstantLead AI V4 - Google Apps Script receiver
 *
 * Setup:
 * 1. Create a Google Sheet.
 * 2. Extensions > Apps Script.
 * 3. Paste this file.
 * 4. Replace SHEET_ID with your Google Sheet ID.
 * 5. Deploy > New deployment > Web app.
 * 6. Execute as: Me.
 * 7. Who has access: Anyone.
 * 8. Copy the Web App URL and paste it into script.js as GOOGLE_SCRIPT_URL.
 */

const SHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";
const SHEET_NAME = "Leads";

function doPost(e) {
  try {
    const sheet = getOrCreateSheet_();
    const payload = parsePayload_(e);

    ensureHeaders_(sheet);

    sheet.appendRow([
      new Date(),
      payload.name || "",
      payload.email || "",
      payload.company || "",
      payload.phone || "",
      payload.website || "",
      payload.monthlyLeads || "",
      payload.message || "",
      payload.source || "InstantLead AI website",
      payload.version || "4.0.0",
      payload.submittedAt || "",
    ]);

    return jsonResponse_({ ok: true, message: "Lead saved" });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error) });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, message: "InstantLead AI V4 endpoint is live" });
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow([
    "Received At",
    "Name",
    "Email",
    "Company",
    "Phone",
    "Website",
    "Monthly Leads",
    "Message",
    "Source",
    "Version",
    "Submitted At",
  ]);
}

function parsePayload_(e) {
  if (!e) return {};

  if (e.postData && e.postData.type === "application/json") {
    return JSON.parse(e.postData.contents || "{}");
  }

  return e.parameter || {};
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
