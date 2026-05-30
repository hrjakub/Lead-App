// 1) Create a Google Sheet + Apps Script Web App.
// 2) Paste your Web App URL below to send every free-trial/get-started form submission to your live spreadsheet.
// Example: const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
const GOOGLE_SHEET_WEB_APP_URL = "";

const modal = document.querySelector('.modal');
const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const form = document.querySelector('#lead-form');
const leadSource = document.querySelector('#lead-source');
const pageUrl = document.querySelector('#page-url');
const userAgent = document.querySelector('#user-agent');
const floatingChat = document.querySelector('.floating-chat');
const chatWidget = document.querySelector('.chat-widget');
const closeChat = document.querySelector('.close-chat');
const chatInput = document.querySelector('.chat-widget-input input');
const chatSend = document.querySelector('.chat-widget-input button');
const formNote = document.querySelector('#form-note');

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
      urgency: 'High — severe tooth pain',
      time: 'Tomorrow, 09:30',
      contact: '+44 7700 900321',
      status: 'Hot lead — call immediately'
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
      urgency: 'Medium-high — bank already contacted',
      time: 'Friday afternoon viewing',
      contact: 'daniel@example.com',
      status: 'Qualified lead — assign to agent'
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
      urgency: 'High — no heating or hot water',
      time: 'Today after 15:00',
      contact: '+44 7700 900987 • SW6',
      status: 'Urgent lead — dispatch technician'
    }
  }
};

function openModal(event) {
  const source = event?.currentTarget?.dataset?.source || event?.currentTarget?.textContent?.trim() || 'Website form';
  leadSource.value = source;
  pageUrl.value = window.location.href;
  userAgent.value = navigator.userAgent;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open', 'success');
  document.body.style.overflow = '';
  form.reset();
  leadSource.value = 'Website form';
}

openModalButtons.forEach((button) => button.addEventListener('click', openModal));
closeModalButtons.forEach((button) => button.addEventListener('click', closeModal));

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
    chatWidget.classList.remove('open');
  }
});

async function submitLeadToSheet(formData) {
  if (!GOOGLE_SHEET_WEB_APP_URL) {
    console.log('Spreadsheet endpoint not connected yet. Lead captured locally:', Object.fromEntries(formData.entries()));
    return;
  }

  await fetch(GOOGLE_SHEET_WEB_APP_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  const formData = new FormData(form);
  formData.append('submitted_at', new Date().toISOString());

  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';

  try {
    await submitLeadToSheet(formData);
    modal.classList.add('success');
  } catch (error) {
    console.error(error);
    alert('Something went wrong while submitting. Please try again.');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

if (GOOGLE_SHEET_WEB_APP_URL && formNote) {
  formNote.textContent = 'Submissions are connected to your live spreadsheet.';
}

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

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

const chatWidgetBody = document.querySelector('.chat-widget-body');

const widgetState = {
  stage: 'business',
  data: {}
};

function resetWidgetConversation() {
  widgetState.stage = 'business';
  widgetState.data = {};
  chatWidgetBody.innerHTML = '';
  chatWidgetBody.appendChild(createMessage('bot', 'Hi. I’m InstantLead AI. I can simulate a real lead-qualification conversation for your business. What type of business should I act for? For example: dental clinic, real estate agency, home services, restaurant, or gym.'));
  chatWidgetBody.scrollTop = chatWidgetBody.scrollHeight;
}

function isGreeting(text) {
  const lower = text.toLowerCase().trim();
  return ['hi', 'hello', 'hey', 'hola', 'bonjour', 'ciao', 'good morning', 'good afternoon', 'good evening'].includes(lower);
}

function detectBusiness(text) {
  const lower = text.toLowerCase();
  if (lower.includes('dental') || lower.includes('dentist') || lower.includes('clinic')) return 'dental clinic';
  if (lower.includes('real') || lower.includes('estate') || lower.includes('property') || lower.includes('broker')) return 'real estate agency';
  if (lower.includes('home') || lower.includes('plumb') || lower.includes('boiler') || lower.includes('repair') || lower.includes('hvac')) return 'home services company';
  if (lower.includes('restaurant') || lower.includes('bar') || lower.includes('cafe')) return 'restaurant';
  if (lower.includes('gym') || lower.includes('fitness') || lower.includes('trainer')) return 'fitness business';
  if (lower.includes('hotel')) return 'hotel';
  if (lower.includes('law') || lower.includes('legal')) return 'law firm';
  return text;
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
  return lower.includes('trial') || lower.includes('get started') || lower.includes('start now') || lower.includes('contact me');
}

function openTrialFromChat() {
  leadSource.value = 'Chatbot CTA';
  pageUrl.value = window.location.href;
  userAgent.value = navigator.userAgent;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

async function widgetBotReply(text) {
  const typing = createTypingIndicator();
  chatWidgetBody.appendChild(typing);
  chatWidgetBody.scrollTop = chatWidgetBody.scrollHeight;
  await wait(550);
  typing.remove();
  chatWidgetBody.appendChild(createMessage('bot', text));
  chatWidgetBody.scrollTop = chatWidgetBody.scrollHeight;
}

async function sendWidgetLeadToSheet() {
  if (!GOOGLE_SHEET_WEB_APP_URL) {
    console.log('Chat lead captured locally:', widgetState.data);
    return;
  }

  const contact = widgetState.data.contact || '';
  const formData = new FormData();
  formData.append('submitted_at', new Date().toISOString());
  formData.append('business', widgetState.data.business || '');
  formData.append('industry', widgetState.data.business || '');
  formData.append('name', widgetState.data.name || '');
  formData.append('email', contact.includes('@') ? contact : '');
  formData.append('phone', contact.includes('@') ? '' : contact);
  formData.append('website', '');
  formData.append('plan', 'Chatbot lead qualification demo');
  formData.append('contact_preference', 'Captured through chat widget');
  formData.append('volume', '');
  formData.append('message', `Need: ${widgetState.data.need || ''}. Urgency: ${widgetState.data.urgency || ''}. Preferred time: ${widgetState.data.time || ''}.`);
  formData.append('source', 'Floating chat widget');
  formData.append('page_url', window.location.href);
  formData.append('user_agent', navigator.userAgent);

  await submitLeadToSheet(formData);
}

function makeLeadSummary() {
  const d = widgetState.data;
  return `Lead captured and qualified ✅\n\nBusiness type: ${d.business}\nVisitor need: ${d.need}\nUrgency: ${d.urgency}\nName: ${d.name}\nContact: ${d.contact}\nPreferred time: ${d.time}\n\nYour team would receive this as a structured lead summary, so the visitor is not lost even outside business hours.`;
}

async function handleWidgetConversation(text) {
  const clean = text.trim();
  const lower = clean.toLowerCase();

  if (lower === 'restart' || lower === 'reset' || lower === 'start over') {
    resetWidgetConversation();
    return;
  }

  if (containsTrialRequest(clean)) {
    await widgetBotReply('Perfect. I’ll open the free-trial form so your details can be captured properly.');
    openTrialFromChat();
    return;
  }

  if (containsPricingQuestion(clean)) {
    await widgetBotReply('Pricing starts from $50/month. The positioning is simple: if the AI saves even one missed lead or appointment per month, it can pay for itself. There is also a $200 one-time setup option for custom AI training and lead-flow configuration.');
    return;
  }

  if (containsSpreadsheetQuestion(clean)) {
    await widgetBotReply('Yes. Lead data can be sent directly into a live Google Sheet / Excel-style spreadsheet with timestamp, name, contact details, business type, need, urgency, source button, and message.');
    return;
  }

  if (containsSetupQuestion(clean)) {
    await widgetBotReply('Setup is designed to be lightweight: we add the AI lead widget to the website, train it on the business FAQs and services, define the qualification questions, and connect the lead output to email, Google Sheets, or CRM.');
    return;
  }

  if (isGreeting(clean) && widgetState.stage === 'business') {
    await widgetBotReply('Hi. Let’s run a quick simulation. What kind of business should I act for — dental clinic, real estate agency, home services, restaurant, or something else?');
    return;
  }

  switch (widgetState.stage) {
    case 'business': {
      widgetState.data.business = detectBusiness(clean);
      widgetState.stage = 'need';
      await widgetBotReply(`Great. I’ll act as the AI assistant for a ${widgetState.data.business}. A website visitor arrives. What are they looking for? For example: appointment, quote, property viewing, repair, booking, or consultation.`);
      break;
    }

    case 'need': {
      widgetState.data.need = clean;
      widgetState.stage = 'urgency';
      await widgetBotReply('Understood. I would now qualify urgency. Is this urgent today, needed this week, or just a general inquiry?');
      break;
    }

    case 'urgency': {
      widgetState.data.urgency = clean;
      widgetState.stage = 'name';
      await widgetBotReply('Good. Now I capture the visitor identity. What name should I use for this demo lead?');
      break;
    }

    case 'name': {
      widgetState.data.name = clean;
      widgetState.stage = 'contact';
      await widgetBotReply(`Thanks, ${widgetState.data.name}. What phone number or email should the business use to follow up?`);
      break;
    }

    case 'contact': {
      widgetState.data.contact = clean;
      widgetState.stage = 'time';
      await widgetBotReply('Final step: what is the preferred contact time or appointment window?');
      break;
    }

    case 'time': {
      widgetState.data.time = clean;
      widgetState.stage = 'complete';
      await widgetBotReply(makeLeadSummary());
      await sendWidgetLeadToSheet();
      await widgetBotReply('This is what InstantLead AI does: it turns anonymous website visitors into qualified leads your team can act on. Type “restart” to test another case, “pricing” for pricing, or “trial” to open the free-trial form.');
      break;
    }

    case 'complete': {
      await widgetBotReply('This lead is already qualified. Type “restart” to simulate a new lead, “pricing” to see pricing, or “trial” to open the free-trial form.');
      break;
    }

    default: {
      resetWidgetConversation();
    }
  }
}

floatingChat.addEventListener('click', () => {
  chatWidget.classList.toggle('open');
});

closeChat.addEventListener('click', () => {
  chatWidget.classList.remove('open');
});

async function sendDemoMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  chatWidgetBody.appendChild(createMessage('user', text));
  chatInput.value = '';
  chatWidgetBody.scrollTop = chatWidgetBody.scrollHeight;

  await handleWidgetConversation(text);
}

chatSend.addEventListener('click', sendDemoMessage);
chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') sendDemoMessage();
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
