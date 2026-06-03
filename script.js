/* InstantLead AI V4
   Paste your deployed Google Apps Script Web App URL below.
   Example: const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
*/
const GOOGLE_SCRIPT_URL = "";
const SITE_VERSION = "4.0.0";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function initYear() {
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
}

function initMobileNavigation() {
  const toggle = $(".nav-toggle");
  const navLinks = $$(".nav a");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initRevealAnimations() {
  const elements = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
}

function appendChatMessage(text, type = "user") {
  const chatWindow = $("#chatWindow");
  if (!chatWindow) return;

  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function initMiniChat() {
  const form = $("#miniChatForm");
  const input = $("#miniChatInput");
  if (!form || !input) return;

  const replies = [
    "Great. I would ask visitors for business type, location, budget, urgency, and contact details.",
    "That sounds like a qualified lead. The next step is routing it to your email or Google Sheet.",
    "You can customize these questions for real estate, cleaning, restaurants, consulting, or any local service.",
  ];
  let replyIndex = 0;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;

    appendChatMessage(value, "user");
    input.value = "";

    window.setTimeout(() => {
      appendChatMessage(replies[replyIndex % replies.length], "bot");
      replyIndex += 1;
    }, 420);
  });
}

function getFormData(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.submittedAt = new Date().toISOString();
  data.source = "InstantLead AI website";
  data.version = SITE_VERSION;
  return data;
}

function saveLeadLocally(data) {
  const key = "instantlead-ai-v4-leads";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.push(data);
  localStorage.setItem(key, JSON.stringify(existing));
}

async function submitToGoogleAppsScript(data) {
  const body = new URLSearchParams(data);

  await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body,
  });
}

function initLeadForm() {
  const form = $("#leadForm");
  const status = $("#formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.className = "form-status";
    status.textContent = "Submitting lead...";

    const data = getFormData(form);

    try {
      if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.includes("script.google.com")) {
        await submitToGoogleAppsScript(data);
        status.className = "form-status success";
        status.textContent = "Lead submitted. Check your Google Sheet after a few seconds.";
      } else {
        saveLeadLocally(data);
        status.className = "form-status success";
        status.textContent = "Demo mode: lead saved in this browser. Paste your Apps Script URL in script.js to connect Google Sheets.";
      }

      form.reset();
    } catch (error) {
      console.error(error);
      status.className = "form-status error";
      status.textContent = "Submission failed. Check the Apps Script URL and deployment permissions.";
    }
  });
}

function logVersion() {
  console.info(`InstantLead AI V${SITE_VERSION} loaded`);
}

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initMobileNavigation();
  initRevealAnimations();
  initMiniChat();
  initLeadForm();
  logVersion();
});
