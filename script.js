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

function getDemoReply(text) {
  const lower = text.toLowerCase();

  if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost')) {
    return 'Pricing starts at $50/month. The main value is recovering leads that currently go unanswered after hours or during busy periods.';
  }

  if (lower.includes('book') || lower.includes('appointment') || lower.includes('calendar')) {
    return 'The AI can ask for preferred time, urgency, contact details, and then send your team a clean booking request or calendar-ready lead summary.';
  }

  if (lower.includes('sheet') || lower.includes('excel') || lower.includes('google')) {
    return 'Form submissions can be sent directly into a live spreadsheet with timestamp, name, contact details, industry, plan, source button, and message.';
  }

  if (lower.includes('lead') || lower.includes('qualify')) {
    return 'The AI qualifies each visitor by asking what they need, how urgent it is, where they are located, and how your team should contact them.';
  }

  return 'In a real installation, I would answer FAQs, qualify the visitor, collect contact details, and alert your team instantly with a structured lead summary.';
}

floatingChat.addEventListener('click', () => {
  chatWidget.classList.toggle('open');
});

closeChat.addEventListener('click', () => {
  chatWidget.classList.remove('open');
});

function sendDemoMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  const body = document.querySelector('.chat-widget-body');
  body.appendChild(createMessage('user', text));
  chatInput.value = '';
  body.scrollTop = body.scrollHeight;

  setTimeout(() => {
    body.appendChild(createMessage('bot', getDemoReply(text)));
    body.scrollTop = body.scrollHeight;
  }, 520);
}

chatSend.addEventListener('click', sendDemoMessage);
chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') sendDemoMessage();
});

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
