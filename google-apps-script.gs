const SHEET_NAME = 'Leads';

const HEADERS = [
  'Received At',
  'Timestamp',
  'Full Name',
  'Email',
  'Phone',
  'Business Type',
  'Company',
  'Message',
  'Source Button',
  'Preferred Plan',
  'Preferred Contact Method',
  'Lead Volume',
  'Website URL',
  'Page URL',
  'User Agent'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  let lockAcquired = false;
  lock.waitLock(30000);
  lockAcquired = true;

  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
    const headers = ensureHeaders_(sheet);
    const params = e.parameter || {};
    const receivedAt = new Date();
    const row = headers.map(function(header) {
      return valueForHeader_(header, params, receivedAt);
    });

    sheet.appendRow(row);

    return jsonOutput_({
      result: 'success',
      captured_at: receivedAt.toISOString()
    });
  } catch (error) {
    return jsonOutput_({
      result: 'error',
      message: String(error)
    });
  } finally {
    if (lockAcquired) {
      lock.releaseLock();
    }
  }
}

function doGet() {
  return ContentService
    .createTextOutput('InstantLead AI lead-capture endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    return HEADERS;
  }

  const width = Math.max(sheet.getLastColumn(), HEADERS.length);
  const currentHeaders = sheet.getRange(1, 1, 1, width).getValues()[0].map(function(value) {
    return String(value || '').trim();
  });
  const knownHeaders = currentHeaders.filter(Boolean);
  const nextHeaders = currentHeaders.slice();

  HEADERS.forEach(function(header) {
    if (knownHeaders.indexOf(header) === -1) {
      nextHeaders.push(header);
      knownHeaders.push(header);
    }
  });

  while (nextHeaders.length && !nextHeaders[nextHeaders.length - 1]) {
    nextHeaders.pop();
  }

  sheet.getRange(1, 1, 1, nextHeaders.length).setValues([nextHeaders]);
  sheet.setFrozenRows(1);

  return nextHeaders;
}

function valueForHeader_(header, params, receivedAt) {
  const timestamp = pick_(params, ['timestamp', 'submitted_at']);
  const company = pick_(params, ['company', 'business', 'business_name']);
  const businessType = pick_(params, ['business_type', 'industry']);
  const source = pick_(params, ['source_button', 'source']);

  const values = {
    'Received At': receivedAt,
    'Timestamp': timestamp,
    'Submitted At': timestamp,
    'Full Name': pick_(params, ['name', 'full_name']),
    'Email': pick_(params, ['email']),
    'Phone': pick_(params, ['phone']),
    'Business Type': businessType,
    'Industry': businessType,
    'Company': company,
    'Business Name': company,
    'Message': pick_(params, ['message']),
    'Source Button': source,
    'Preferred Plan': pick_(params, ['plan']),
    'Preferred Contact Method': pick_(params, ['contact_preference']),
    'Lead Volume': pick_(params, ['volume']),
    'Website URL': pick_(params, ['website']),
    'Page URL': pick_(params, ['page_url']),
    'User Agent': pick_(params, ['user_agent'])
  };

  return values[header] || '';
}

function pick_(params, names) {
  for (let i = 0; i < names.length; i++) {
    const value = params[names[i]];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return String(value).trim();
    }
  }

  return '';
}

function jsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
