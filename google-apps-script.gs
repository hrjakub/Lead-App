const SHEET_NAME = 'Leads';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

    const headers = [
      'Received At',
      'Submitted At',
      'Business Name',
      'Industry',
      'Full Name',
      'Email',
      'Phone',
      'Website URL',
      'Preferred Plan',
      'Preferred Contact Method',
      'Lead Volume',
      'Message',
      'Source Button',
      'Page URL',
      'User Agent'
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
    }

    const p = e.parameter || {};

    sheet.appendRow([
      new Date(),
      p.submitted_at || '',
      p.business || '',
      p.industry || '',
      p.name || '',
      p.email || '',
      p.phone || '',
      p.website || '',
      p.plan || '',
      p.contact_preference || '',
      p.volume || '',
      p.message || '',
      p.source || '',
      p.page_url || '',
      p.user_agent || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput('InstantLead AI lead-capture endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
