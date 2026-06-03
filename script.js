// 1) Create a Google Sheet + Apps Script Web App.
// 2) Paste your Web App URL below to send every free-trial/get-started form submission to your live spreadsheet.
// Example: const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzxMqn_LrJQ75ifItGRnSlgMe1Zui6SZSHnEDkFiNpnPbWZHuJvEG7b3UF4aJ3dvhzWfQ/exec";

const modal = document.querySelector('.modal');
const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const form = document.querySelector('#lead-form');
const leadSource = document.querySelector('#lead-source');
const sourceButton = document.querySelector('#source-button');
const leadTimestamp = document.querySelector('#lead-timestamp');
const pageUrl = document.querySelector('#page-url');
const userAgent = document.querySelector('#user-agent');
const formNote = document.querySelector('#form-note');
const formStatus = document.querySelector('#form-status');
const successMessage = document.querySelector('#success-message');

const floatingChat = document.querySelector('.floating-chat');
const chatWidget = document.querySelector('.chat-widget');
const closeChat = document.querySelector('.close-chat');
const chatWidgetBody = document.querySelector('.chat-widget-body');
const chatSuggestions = document.querySelector('#chat-suggestions');
const chatInput = document.querySelector('.chat-widget-input input');
const chatSend = document.querySelector('.chat-widget-input button');

const demoChatBody = document.querySelector('#demo-chat-body');
const demoReplies = document.querySelector('#demo-replies');
const demoScenarioLabel = document.querySelector('#demo-scenario-label');
const summaryTitle = document.querySelector('#lead-summary-title');
const summaryName = document.querySelector('#summary-name');
const summaryService = document.querySelector('#summary-service');
const summaryUrgency = document.querySelector('#summary-urgency');
const summaryTime = document.querySelector('#summary-time');
const summaryContact = document.querySelector('#summary-contact');
const summaryStatus = document.querySelector('#summary-status');

const scenarios = {
  dental: {
    label: 'Dental practice lead',
    messages: [
      { sender: 'bot', text: 'Hi, thanks for contacting Smile Bright Dental. Are you looking for a routine visit, cosmetic treatment, or urgent help?' },
      { sender: 'user', text: 'Hi, I have strong tooth pain and need an appointment as soon as possible.' },
      { sender: 'bot', text: 'I am sorry to hear that. Is the pain mild, moderate, or severe? And is there swelling or fever?' },
      { sender: 'user', text: 'Severe pain, no fever. It started yesterday evening.' },
      { sender: 'bot', text: 'Understood. I will mark this as urgent. What is your name and best phone number?' },
      { sender: 'user', text: 'Emma Martin, +44 7700 900321.' },
      { sender: 'bot', text: 'Thank you, Emma. We have emergency availability tomorrow morning. Would you prefer 09:30 or 11:00?' },
      { sender: 'user', text: '09:30 works.' },
      { sender: 'bot', text: 'Perfect. I have captured your request and alerted the clinic team with your details, urgency, and preferred appointment time.' }
    ],
    summary: {
      title: 'Hot dental lead captured',
      name: 'Emma Martin',
      service: 'Emergency dental appointment',
      urgency: 'High - severe tooth pain',
      time: 'Tomorrow, 09:30',
      contact: '+44 7700 900321',
      status: 'Hot lead - call immediately'
    }
  },
  realestate: {
    label: 'Real estate buyer lead',
    messages: [
      { sender: 'bot', text: 'Hi, thanks for reaching out to Elite Realty Group. Are you looking to buy, sell, or rent?' },
      { sender: 'user', text: 'I am looking to buy an apartment in Barcelona.' },
      { sender: 'bot', text: 'Great. What budget range and preferred area are you considering?' },
      { sender: 'user', text: 'Around €700k to €900k, ideally Eixample or Sarrià.' },
      { sender: 'bot', text: 'Understood. Are you already pre-approved or buying with cash financing?' },
      { sender: 'user', text: 'Partly mortgage, but I already spoke with my bank.' },
      { sender: 'bot', text: 'Good. What is your name, email, and preferred viewing time?' },
      { sender: 'user', text: 'Daniel Novak, daniel@example.com. Friday afternoon is best.' },
      { sender: 'bot', text: 'Thanks, Daniel. I have sent your profile, budget, preferred areas, and viewing availability to the sales team.' }
    ],
    summary: {
      title: 'Qualified buyer lead captured',
      name: 'Daniel Novak',
      service: 'Apartment purchase inquiry',
      urgency: 'Medium-high - bank already contacted',
      time: 'Friday afternoon viewing',
      contact: 'daniel@example.com',
      status: 'Qualified lead - assign to agent'
    }
  },
  homeservices: {
    label: 'Home services repair lead',
    messages: [
      { sender: 'bot', text: 'Hi, thanks for contacting Thompson Home Services. What can we help you with today?' },
      { sender: 'user', text: 'My boiler stopped working and I need someone to check it.' },
      { sender: 'bot', text: 'I can help. Is this affecting heating, hot water, or both?' },
      { sender: 'user', text: 'Both. We have no hot water.' },
      { sender: 'bot', text: 'Understood. I will mark this as urgent. What is your postcode and preferred time window?' },
      { sender: 'user', text: 'SW6. Today after 15:00 if possible.' },
      { sender: 'bot', text: 'Thank you. What is your name and phone number so the technician can confirm?' },
      { sender: 'user', text: 'Laura Green, +44 7700 900987.' },
      { sender: 'bot', text: 'Thanks, Laura. I have sent the repair request, location, urgency, and contact details to the dispatch team.' }
    ],
    summary: {
      title: 'Urgent repair lead captured',
      name: 'Laura Green',
      service: 'Boiler repair',
      urgency: 'High - no heating or hot water',
      time: 'Today after 15:00',
      contact: '+44 7700 900987 - SW6',
      status: 'Urgent lead - dispatch technician'
    }
  }
};

const widgetState = {
  stage: 'business_type',
  data: {},
  isResponding: false
};

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getSheetUrl() {
  return GOOGLE_SHEET_WEB_APP_URL.trim();
}

function hasSheetEndpoint() {
  return getSheetUrl().length > 0;
}

function setFormStatus(state, message) {
  if (!formStatus) return;

  if (!message) {
    formStatus.hidden = true;
    formStatus.removeAttribute('data-state');
    formStatus.textContent = '';
    return;
  }

  formStatus.hidden = false;
  formStatus.dataset.state = state;
  formStatus.textContent = message;
}

function updateFormNote() {
  if (!formNote) return;

  formNote.textContent = hasSheetEndpoint()
    ? 'Submissions are configured to post to your Google Apps Script Web App. Check the Google Sheet after testing because the browser cannot read no-cors responses.'
    : 'Demo mode: add your Google Apps Script Web App URL in script.js to store submissions in a live spreadsheet.';
}

function setTrackingFields(source) {
  const value = source || 'Website form';
  const timestamp = new Date().toISOString();

  leadSource.value = value;
  sourceButton.value = value;
  leadTimestamp.value = timestamp;
  pageUrl.value = window.location.href;
  userAgent.value = navigator.userAgent;
}

function setSelectByText(select, value) {
  if (!select || !value) return;

  const normalizedValue = value.toLowerCase();
  const option = Array.from(select.options).find((item) => item.textContent.toLowerCase() === normalizedValue);
  if (option) select.value = option.value;
}

function businessTypeToFormOption(value = '') {
  const lower = value.toLowerCase();

  if (lower.includes('dental') || lower.includes('dentist')) return 'Dental Practice';
  if (lower.includes('medical') || lower.includes('clinic') || lower.includes('doctor')) return 'Medical Practice';
  if (lower.includes('med spa') || lower.includes('spa')) return 'Med Spa';
  if (lower.includes('real') || lower.includes('estate') || lower.includes('property')) return 'Real Estate';
  if (lower.includes('home') || lower.includes('plumb') || lower.includes('repair') || lower.includes('hvac')) return 'Home Services';
  if (lower.includes('coach') || lower.includes('consult')) return 'Coaching / Consulting';

  return value ? 'Other' : '';
}

function setPlanFromSource(source) {
  const planSelect = form.elements.plan;

  if (source.includes('Pricing Simple Monthly')) {
    setSelectByText(planSelect, '$50/month - Most Popular');
  } else if (source.includes('Pricing Setup Monthly')) {
    setSelectByText(planSelect, 'Setup + $200/month');
  }
}

function prefillLeadForm(data = {}) {
  if (!form) return;

  const fields = form.elements;
  const businessType = businessTypeToFormOption(data.business_type || data.businessType || '');

  if (data.company && fields.company) fields.company.value = data.company;
  if (businessType && fields.business_type) setSelectByText(fields.business_type, businessType);
  if (data.name && fields.name) fields.name.value = data.name;
  if (data.email && fields.email) fields.email.value = data.email;
  if (data.phone && fields.phone) fields.phone.value = data.phone;
  if (data.message && fields.message) fields.message.value = data.message;
}

function openModal(eventOrSource, prefillData = {}) {
  const source = typeof eventOrSource === 'string'
    ? eventOrSource
    : eventOrSource?.currentTarget?.dataset?.source || eventOrSource?.currentTarget?.textContent?.trim() || 'Website form';

  modal.classList.remove('success');
  setFormStatus('', '');
  setTrackingFields(source);
  setPlanFromSource(source);
  prefillLeadForm(prefillData);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open', 'success');
  document.body.style.overflow = '';
  form.reset();
  setTrackingFields('Website form');
  setFormStatus('', '');
  updateFormNote();
}

function firstFormValue(formData, names) {
  for (const name of names) {
    const value = String(formData.get(name) || '').trim();
    if (value) return value;
  }
  return '';
}

function normalizeLeadFormData(formData) {
  const timestamp = firstFormValue(formData, ['timestamp', 'submitted_at']) || new Date().toISOString();
  const company = firstFormValue(formData, ['company', 'business', 'business_name']);
  const businessType = firstFormValue(formData, ['business_type', 'industry']);
  const source = firstFormValue(formData, ['source_button', 'source']) || 'Website form';
  const message = firstFormValue(formData, ['message']);

  formData.set('timestamp', timestamp);
  formData.set('submitted_at', timestamp);
  formData.set('company', company);
  formData.set('business', company);
  formData.set('business_type', businessType);
  formData.set('industry', businessType);
  formData.set('source_button', source);
  formData.set('source', source);
  formData.set('message', message);
  formData.set('page_url', firstFormValue(formData, ['page_url']) || window.location.href);
  formData.set('user_agent', firstFormValue(formData, ['user_agent']) || navigator.userAgent);

  return {
    timestamp,
    company,
    businessType,
    source,
    message,
    name: firstFormValue(formData, ['name']),
    email: firstFormValue(formData, ['email']),
    phone: firstFormValue(formData, ['phone'])
  };
}

async function submitLeadToSheet(formData) {
  const url = getSheetUrl();

  if (!url) {
    console.log('Spreadsheet endpoint not connected yet. Lead captured locally:', Object.fromEntries(formData.entries()));
    return { status: 'demo' };
  }

  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  });

  return { status: 'sent' };
}

openModalButtons.forEach((button) => button.addEventListener('click', openModal));
closeModalButtons.forEach((button) => button.addEventListener('click', closeModal));

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
    chatWidget.classList.remove('open');
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  const formData = new FormData(form);
  const lead = normalizeLeadFormData(formData);

  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';
  setFormStatus('pending', 'Sending your lead details...');

  try {
    const result = await submitLeadToSheet(formData);
    const connectedMessage = `Thank you, ${lead.name || 'there'}. Your ${lead.businessType || 'business'} lead details were sent to the connected lead spreadsheet.`;
    const demoMessage = `Thank you, ${lead.name || 'there'}. Your lead details were validated in demo mode. Add the Google Apps Script URL in script.js to save this to Google Sheets.`;

    successMessage.textContent = result.status === 'sent' ? connectedMessage : demoMessage;
    modal.classList.add('success');
  } catch (error) {
    console.error(error);
    setFormStatus('error', 'The form could not reach the Google Apps Script endpoint. Please check the Web App URL and deployment permissions, then try again.');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

updateFormNote();
setTrackingFields('Website form');

function createMessage(sender, text) {
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  message.textContent = text;
  return message;
}

function createTypingIndicator() {
  const typing = document.createElement('div');
  typing.className = 'message bot typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  return typing;
}

function updateLeadSummary(summary) {
  summaryTitle.textContent = summary.title;
  summaryName.textContent = summary.name;
  summaryService.textContent = summary.service;
  summaryUrgency.textContent = summary.urgency;
  summaryTime.textContent = summary.time;
  summaryContact.textContent = summary.contact;
  summaryStatus.textContent = summary.status;
}

function resetLeadSummary() {
  summaryTitle.textContent = 'Conversation in progress...';
  summaryName.textContent = 'Collecting...';
  summaryService.textContent = 'Collecting...';
  summaryUrgency.textContent = 'Assessing...';
  summaryTime.textContent = 'Collecting...';
  summaryContact.textContent = 'Collecting...';
  summaryStatus.textContent = 'Qualifying lead...';
}

async function runScenario(key = 'dental') {
  const scenario = scenarios[key];
  if (!scenario) return;

  demoScenarioLabel.textContent = scenario.label;
  demoChatBody.innerHTML = '';
  resetLeadSummary();

  demoReplies.querySelectorAll('button').forEach((button) => {
    button.classList.toggle('active', button.dataset.scenario === key);
    button.disabled = true;
  });

  for (const message of scenario.messages) {
    if (message.sender === 'bot') {
      const typing = createTypingIndicator();
      demoChatBody.appendChild(typing);
      demoChatBody.scrollTop = demoChatBody.scrollHeight;
      await wait(520);
      typing.remove();
    } else {
      await wait(450);
    }

    demoChatBody.appendChild(createMessage(message.sender, message.text));
    demoChatBody.scrollTop = demoChatBody.scrollHeight;
    await wait(message.sender === 'bot' ? 760 : 620);
  }

  updateLeadSummary(scenario.summary);

  demoReplies.querySelectorAll('button').forEach((button) => {
    button.disabled = false;
  });
}

demoReplies.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-scenario]');
  if (!button) return;
  runScenario(button.dataset.scenario);
});

function resetWidgetConversation() {
  widgetState.stage = 'business_type';
  widgetState.data = {};
  widgetState.isResponding = false;
  chatWidgetBody.innerHTML = '';
  chatSuggestions.hidden = false;
  chatInput.disabled = false;
  chatSend.disabled = false;
  chatWidgetBody.appendChild(createMessage('bot', 'Hi. I’m InstantLead AI. I can capture a qualified lead for your business and show what your team would receive. What type of business do you run?'));
  chatWidgetBody.scrollTop = chatWidgetBody.scrollHeight;
}

function isGreeting(text) {
  const lower = text.toLowerCase().trim();
  return ['hi', 'hello', 'hey', 'hola', 'bonjour', 'ciao', 'good morning', 'good afternoon', 'good evening'].includes(lower);
}

function detectBusinessType(text) {
  const lower = text.toLowerCase();

  if (lower.includes('dental') || lower.includes('dentist')) return 'Dental Practice';
  if (lower.includes('medical') || lower.includes('clinic') || lower.includes('doctor')) return 'Medical Practice';
  if (lower.includes('med spa') || lower.includes('spa')) return 'Med Spa';
  if (lower.includes('real') || lower.includes('estate') || lower.includes('property') || lower.includes('broker')) return 'Real Estate';
  if (lower.includes('home') || lower.includes('plumb') || lower.includes('boiler') || lower.includes('repair') || lower.includes('hvac')) return 'Home Services';
  if (lower.includes('coach') || lower.includes('consult')) return 'Coaching / Consulting';

  return text;
}

function getAssistantNeedPrompt(businessType) {
  const lower = businessType.toLowerCase();

  if (lower.includes('dental')) {
    return 'What should the assistant help capture first: emergency appointments, new patient bookings, cosmetic consultations, or general questions?';
  }

  if (lower.includes('real estate')) {
    return 'What kind of property lead should the assistant qualify: buyer inquiry, seller valuation, rental inquiry, or viewing request?';
  }

  if (lower.includes('home services')) {
    return 'What lead should the assistant qualify: urgent repair, quote request, maintenance visit, or installation?';
  }

  if (lower.includes('medical') || lower.includes('med spa')) {
    return 'What should the assistant handle: new patient inquiries, appointment requests, treatment questions, or after-hours leads?';
  }

  return 'What should the assistant handle for you: appointments, quotes, consultations, bookings, FAQs, or after-hours inquiries?';
}

function containsPricingQuestion(text) {
  const lower = text.toLowerCase();
  return lower.includes('price') || lower.includes('pricing') || lower.includes('cost') || lower.includes('$') || lower.includes('€');
}

function containsSpreadsheetQuestion(text) {
  const lower = text.toLowerCase();
  return lower.includes('sheet') || lower.includes('spreadsheet') || lower.includes('excel') || lower.includes('google') || lower.includes('crm');
}

function containsSetupQuestion(text) {
  const lower = text.toLowerCase();
  return lower.includes('setup') || lower.includes('install') || lower.includes('integration') || lower.includes('website');
}

function containsTrialRequest(text) {
  const lower = text.toLowerCase();
  return lower.includes('trial') || lower.includes('get started') || lower.includes('start now') || lower.includes('book') || lower.includes('contact me');
}

function currentStagePrompt() {
  switch (widgetState.stage) {
    case 'business_type':
      return 'What type of business do you run?';
    case 'company':
      return 'What is the company or practice name?';
    case 'message':
      return getAssistantNeedPrompt(widgetState.data.business_type || '');
    case 'urgency':
      return 'How urgent are these leads: immediate response, same-day follow-up, next business day, or general nurturing?';
    case 'name':
      return 'Who should receive the setup details or lead follow-up?';
    case 'email':
      return 'What is the best email address?';
    case 'phone':
      return 'What phone or WhatsApp number should be attached to the lead?';
    case 'follow_up':
      return 'When is the best time for follow-up?';
    default:
      return 'Type "restart" to qualify another lead, or "trial" to open the full form.';
  }
}

function looksLikeEmail(text) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim());
}

function looksLikePhone(text) {
  const digits = text.replace(/\D/g, '');
  return digits.length >= 7;
}

function chatLeadMessage() {
  const data = widgetState.data;
  return [
    data.message ? `AI task: ${data.message}` : '',
    data.urgency ? `Lead urgency: ${data.urgency}` : '',
    data.follow_up ? `Preferred follow-up: ${data.follow_up}` : ''
  ].filter(Boolean).join(' ');
}

function openTrialFromChat() {
  openModal('Chatbot CTA', {
    business_type: widgetState.data.business_type,
    company: widgetState.data.company,
    name: widgetState.data.name,
    email: widgetState.data.email,
    phone: widgetState.data.phone,
    message: chatLeadMessage()
  });
}

async function widgetBotReply(text) {
  const typing = createTypingIndicator();
  chatWidgetBody.appendChild(typing);
  chatWidgetBody.scrollTop = chatWidgetBody.scrollHeight;
  await wait(520);
  typing.remove();
  chatWidgetBody.appendChild(createMessage('bot', text));
  chatWidgetBody.scrollTop = chatWidgetBody.scrollHeight;
}

function makeLeadSummary() {
  const data = widgetState.data;

  return `Qualified lead summary\n\nCompany: ${data.company}\nBusiness type: ${data.business_type}\nNeed: ${data.message}\nUrgency: ${data.urgency}\nContact: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nPreferred follow-up: ${data.follow_up}\n\nThis is the kind of structured lead your team would receive instead of a vague website message.`;
}

async function sendWidgetLeadToSheet() {
  const formData = new FormData();
  const data = widgetState.data;
  const timestamp = new Date().toISOString();

  formData.set('timestamp', timestamp);
  formData.set('submitted_at', timestamp);
  formData.set('company', data.company || '');
  formData.set('business', data.company || '');
  formData.set('business_type', data.business_type || '');
  formData.set('industry', data.business_type || '');
  formData.set('name', data.name || '');
  formData.set('email', data.email || '');
  formData.set('phone', data.phone || '');
  formData.set('website', '');
  formData.set('plan', 'Chatbot lead qualification demo');
  formData.set('contact_preference', data.follow_up || 'Captured through chat widget');
  formData.set('volume', '');
  formData.set('message', chatLeadMessage());
  formData.set('source', 'Floating chat widget');
  formData.set('source_button', 'Floating chat widget');
  formData.set('page_url', window.location.href);
  formData.set('user_agent', navigator.userAgent);

  normalizeLeadFormData(formData);
  return submitLeadToSheet(formData);
}

function setChatBusy(isBusy) {
  widgetState.isResponding = isBusy;
  chatInput.disabled = isBusy;
  chatSend.disabled = isBusy;
}

async function handleWidgetConversation(text) {
  const clean = text.trim();
  const lower = clean.toLowerCase();

  if (lower === 'restart' || lower === 'reset' || lower === 'start over') {
    resetWidgetConversation();
    return;
  }

  if (containsTrialRequest(clean) && widgetState.stage !== 'business_type') {
    await widgetBotReply('Good idea. I’ll open the form and prefill anything we have already captured.');
    openTrialFromChat();
    return;
  }

  if (containsPricingQuestion(clean)) {
    await widgetBotReply(`Pricing starts at $50/month for the simple monthly plan. There is also a setup + monthly option for deeper custom training. ${currentStagePrompt()}`);
    return;
  }

  if (containsSpreadsheetQuestion(clean)) {
    await widgetBotReply(`Yes. The lead can be saved to Google Sheets with timestamp, name, email, phone, business type, company, message, source button, page URL, and user agent. ${currentStagePrompt()}`);
    return;
  }

  if (containsSetupQuestion(clean)) {
    await widgetBotReply(`Setup is lightweight: add the assistant to your website, train it on services and FAQs, choose qualification questions, then send qualified leads to email, Google Sheets, or a CRM. ${currentStagePrompt()}`);
    return;
  }

  if (isGreeting(clean) && widgetState.stage === 'business_type') {
    await widgetBotReply('Hi. Let’s qualify this properly. What type of business do you run?');
    return;
  }

  switch (widgetState.stage) {
    case 'business_type': {
      widgetState.data.business_type = detectBusinessType(clean);
      widgetState.stage = 'company';
      await widgetBotReply(`Great. I’ll tailor this for ${widgetState.data.business_type}. What is the company or practice name?`);
      break;
    }

    case 'company': {
      widgetState.data.company = clean;
      widgetState.stage = 'message';
      await widgetBotReply(`${widgetState.data.company} is noted. ${getAssistantNeedPrompt(widgetState.data.business_type)}`);
      break;
    }

    case 'message': {
      widgetState.data.message = clean;
      widgetState.stage = 'urgency';
      await widgetBotReply('Got it. How urgent are these leads: immediate response, same-day follow-up, next business day, or general nurturing?');
      break;
    }

    case 'urgency': {
      widgetState.data.urgency = clean;
      widgetState.stage = 'name';
      await widgetBotReply('Thanks. Who should receive the setup details or lead follow-up?');
      break;
    }

    case 'name': {
      widgetState.data.name = clean;
      widgetState.stage = 'email';
      await widgetBotReply(`Thanks, ${widgetState.data.name}. What is the best email address?`);
      break;
    }

    case 'email': {
      if (!looksLikeEmail(clean)) {
        await widgetBotReply('Could you send that as a valid email address, like name@company.com?');
        return;
      }

      widgetState.data.email = clean;
      widgetState.stage = 'phone';
      await widgetBotReply('Perfect. What phone or WhatsApp number should be attached to the lead?');
      break;
    }

    case 'phone': {
      if (!looksLikePhone(clean)) {
        await widgetBotReply('Could you send a phone number with at least 7 digits? This helps the business follow up quickly.');
        return;
      }

      widgetState.data.phone = clean;
      widgetState.stage = 'follow_up';
      await widgetBotReply('Last question: when is the best time for follow-up?');
      break;
    }

    case 'follow_up': {
      widgetState.data.follow_up = clean;
      widgetState.stage = 'complete';
      await widgetBotReply(makeLeadSummary());

      try {
        const result = await sendWidgetLeadToSheet();
        await widgetBotReply(result.status === 'sent'
          ? 'I sent this chat lead to the connected Google Sheet. Type "restart" to qualify another lead, or "trial" to open the full form.'
          : 'This chat lead was captured in demo mode. Connect the Google Apps Script URL in script.js to save it to Google Sheets. Type "restart" to qualify another lead, or "trial" to open the full form.');
      } catch (error) {
        console.error(error);
        await widgetBotReply('The lead is qualified, but I could not reach the Google Apps Script endpoint. Check the Web App URL and deployment permissions, then test again.');
      }

      break;
    }

    case 'complete': {
      await widgetBotReply('This lead is already qualified. Type "restart" for a new conversation, "pricing" for pricing, or "trial" to open the form.');
      break;
    }

    default: {
      resetWidgetConversation();
    }
  }
}

async function submitChatPrompt(text) {
  const clean = text.trim();
  if (!clean || widgetState.isResponding) return;

  chatSuggestions.hidden = true;
  chatWidgetBody.appendChild(createMessage('user', clean));
  chatInput.value = '';
  chatWidgetBody.scrollTop = chatWidgetBody.scrollHeight;

  setChatBusy(true);
  try {
    await handleWidgetConversation(clean);
  } finally {
    setChatBusy(false);
    chatInput.focus();
  }
}

function sendDemoMessage() {
  submitChatPrompt(chatInput.value);
}

floatingChat.addEventListener('click', () => {
  chatWidget.classList.toggle('open');
  if (chatWidget.classList.contains('open')) chatInput.focus();
});

closeChat.addEventListener('click', () => {
  chatWidget.classList.remove('open');
});

chatSend.addEventListener('click', sendDemoMessage);
chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') sendDemoMessage();
});

chatSuggestions.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-chat-prompt]');
  if (!button) return;
  submitChatPrompt(button.dataset.chatPrompt);
});

resetWidgetConversation();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

runScenario('dental');
