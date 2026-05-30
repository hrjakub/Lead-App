const modal = document.querySelector('.modal');
const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const form = document.querySelector('#lead-form');
const floatingChat = document.querySelector('.floating-chat');
const chatWidget = document.querySelector('.chat-widget');
const closeChat = document.querySelector('.close-chat');
const chatInput = document.querySelector('.chat-widget-input input');
const chatSend = document.querySelector('.chat-widget-input button');

function openModal() {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open', 'success');
  document.body.style.overflow = '';
  form.reset();
}

openModalButtons.forEach((button) => button.addEventListener('click', openModal));
closeModalButtons.forEach((button) => button.addEventListener('click', closeModal));

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
    chatWidget.classList.remove('open');
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  modal.classList.add('success');
});

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
  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.textContent = text;
  body.appendChild(userMessage);

  chatInput.value = '';

  setTimeout(() => {
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot';
    botMessage.textContent = 'Thanks. I would now qualify the lead and notify your team instantly.';
    body.appendChild(botMessage);
    body.scrollTop = body.scrollHeight;
  }, 550);
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
