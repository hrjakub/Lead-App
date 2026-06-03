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
const businessTypeSelect = document.querySelector('select[name="business_type"]');
const otherBusinessField = document.querySelector('#other-business-field');
const otherBusinessInput = document.querySelector('#business-type-other');
const phoneCountrySelect = document.querySelector('#phone-country');
const phoneLocalInput = document.querySelector('#phone-local');
const phoneFullInput = document.querySelector('#phone-full');

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

const DEFAULT_PHONE_COUNTRY_ISO = 'CZ';

const INTERNATIONAL_DIAL_CODES = [
  { iso: 'AF', name: 'Afghanistan', dial: '+93' },
  { iso: 'AX', name: 'Aland Islands', dial: '+358' },
  { iso: 'AL', name: 'Albania', dial: '+355' },
  { iso: 'DZ', name: 'Algeria', dial: '+213' },
  { iso: 'AS', name: 'American Samoa', dial: '+1 684' },
  { iso: 'AD', name: 'Andorra', dial: '+376' },
  { iso: 'AO', name: 'Angola', dial: '+244' },
  { iso: 'AI', name: 'Anguilla', dial: '+1 264' },
  { iso: 'AG', name: 'Antigua and Barbuda', dial: '+1 268' },
  { iso: 'AR', name: 'Argentina', dial: '+54' },
  { iso: 'AM', name: 'Armenia', dial: '+374' },
  { iso: 'AW', name: 'Aruba', dial: '+297' },
  { iso: 'AU', name: 'Australia', dial: '+61' },
  { iso: 'AT', name: 'Austria', dial: '+43' },
  { iso: 'AZ', name: 'Azerbaijan', dial: '+994' },
  { iso: 'BS', name: 'Bahamas', dial: '+1 242' },
  { iso: 'BH', name: 'Bahrain', dial: '+973' },
  { iso: 'BD', name: 'Bangladesh', dial: '+880' },
  { iso: 'BB', name: 'Barbados', dial: '+1 246' },
  { iso: 'BY', name: 'Belarus', dial: '+375' },
  { iso: 'BE', name: 'Belgium', dial: '+32' },
  { iso: 'BZ', name: 'Belize', dial: '+501' },
  { iso: 'BJ', name: 'Benin', dial: '+229' },
  { iso: 'BM', name: 'Bermuda', dial: '+1 441' },
  { iso: 'BT', name: 'Bhutan', dial: '+975' },
  { iso: 'BO', name: 'Bolivia', dial: '+591' },
  { iso: 'BQ', name: 'Bonaire, Sint Eustatius and Saba', dial: '+599' },
  { iso: 'BA', name: 'Bosnia and Herzegovina', dial: '+387' },
  { iso: 'BW', name: 'Botswana', dial: '+267' },
  { iso: 'BR', name: 'Brazil', dial: '+55' },
  { iso: 'IO', name: 'British Indian Ocean Territory', dial: '+246' },
  { iso: 'VG', name: 'British Virgin Islands', dial: '+1 284' },
  { iso: 'BN', name: 'Brunei', dial: '+673' },
  { iso: 'BG', name: 'Bulgaria', dial: '+359' },
  { iso: 'BF', name: 'Burkina Faso', dial: '+226' },
  { iso: 'BI', name: 'Burundi', dial: '+257' },
  { iso: 'CV', name: 'Cabo Verde', dial: '+238' },
  { iso: 'KH', name: 'Cambodia', dial: '+855' },
  { iso: 'CM', name: 'Cameroon', dial: '+237' },
  { iso: 'CA', name: 'Canada', dial: '+1' },
  { iso: 'KY', name: 'Cayman Islands', dial: '+1 345' },
  { iso: 'CF', name: 'Central African Republic', dial: '+236' },
  { iso: 'TD', name: 'Chad', dial: '+235' },
  { iso: 'CL', name: 'Chile', dial: '+56' },
  { iso: 'CN', name: 'China', dial: '+86' },
  { iso: 'CX', name: 'Christmas Island', dial: '+61' },
  { iso: 'CC', name: 'Cocos Islands', dial: '+61' },
  { iso: 'CO', name: 'Colombia', dial: '+57' },
  { iso: 'KM', name: 'Comoros', dial: '+269' },
  { iso: 'CG', name: 'Congo', dial: '+242' },
  { iso: 'CD', name: 'Congo, Democratic Republic of the', dial: '+243' },
  { iso: 'CK', name: 'Cook Islands', dial: '+682' },
  { iso: 'CR', name: 'Costa Rica', dial: '+506' },
  { iso: 'CI', name: 'Cote dIvoire', dial: '+225' },
  { iso: 'HR', name: 'Croatia', dial: '+385' },
  { iso: 'CU', name: 'Cuba', dial: '+53' },
  { iso: 'CW', name: 'Curacao', dial: '+599' },
  { iso: 'CY', name: 'Cyprus', dial: '+357' },
  { iso: 'CZ', name: 'Czech Republic', dial: '+420' },
  { iso: 'DK', name: 'Denmark', dial: '+45' },
  { iso: 'DJ', name: 'Djibouti', dial: '+253' },
  { iso: 'DM', name: 'Dominica', dial: '+1 767' },
  { iso: 'DO', name: 'Dominican Republic', dial: '+1 809' },
  { iso: 'EC', name: 'Ecuador', dial: '+593' },
  { iso: 'EG', name: 'Egypt', dial: '+20' },
  { iso: 'SV', name: 'El Salvador', dial: '+503' },
  { iso: 'GQ', name: 'Equatorial Guinea', dial: '+240' },
  { iso: 'ER', name: 'Eritrea', dial: '+291' },
  { iso: 'EE', name: 'Estonia', dial: '+372' },
  { iso: 'SZ', name: 'Eswatini', dial: '+268' },
  { iso: 'ET', name: 'Ethiopia', dial: '+251' },
  { iso: 'FK', name: 'Falkland Islands', dial: '+500' },
  { iso: 'FO', name: 'Faroe Islands', dial: '+298' },
  { iso: 'FJ', name: 'Fiji', dial: '+679' },
  { iso: 'FI', name: 'Finland', dial: '+358' },
  { iso: 'FR', name: 'France', dial: '+33' },
  { iso: 'GF', name: 'French Guiana', dial: '+594' },
  { iso: 'PF', name: 'French Polynesia', dial: '+689' },
  { iso: 'GA', name: 'Gabon', dial: '+241' },
  { iso: 'GM', name: 'Gambia', dial: '+220' },
  { iso: 'GE', name: 'Georgia', dial: '+995' },
  { iso: 'DE', name: 'Germany', dial: '+49' },
  { iso: 'GH', name: 'Ghana', dial: '+233' },
  { iso: 'GI', name: 'Gibraltar', dial: '+350' },
  { iso: 'GR', name: 'Greece', dial: '+30' },
  { iso: 'GL', name: 'Greenland', dial: '+299' },
  { iso: 'GD', name: 'Grenada', dial: '+1 473' },
  { iso: 'GP', name: 'Guadeloupe', dial: '+590' },
  { iso: 'GU', name: 'Guam', dial: '+1 671' },
  { iso: 'GT', name: 'Guatemala', dial: '+502' },
  { iso: 'GG', name: 'Guernsey', dial: '+44' },
  { iso: 'GN', name: 'Guinea', dial: '+224' },
  { iso: 'GW', name: 'Guinea-Bissau', dial: '+245' },
  { iso: 'GY', name: 'Guyana', dial: '+592' },
  { iso: 'HT', name: 'Haiti', dial: '+509' },
  { iso: 'HN', name: 'Honduras', dial: '+504' },
  { iso: 'HK', name: 'Hong Kong', dial: '+852' },
  { iso: 'HU', name: 'Hungary', dial: '+36' },
  { iso: 'IS', name: 'Iceland', dial: '+354' },
  { iso: 'IN', name: 'India', dial: '+91' },
  { iso: 'ID', name: 'Indonesia', dial: '+62' },
  { iso: 'IR', name: 'Iran', dial: '+98' },
  { iso: 'IQ', name: 'Iraq', dial: '+964' },
  { iso: 'IE', name: 'Ireland', dial: '+353' },
  { iso: 'IM', name: 'Isle of Man', dial: '+44' },
  { iso: 'IL', name: 'Israel', dial: '+972' },
  { iso: 'IT', name: 'Italy', dial: '+39' },
  { iso: 'JM', name: 'Jamaica', dial: '+1 876' },
  { iso: 'JP', name: 'Japan', dial: '+81' },
  { iso: 'JE', name: 'Jersey', dial: '+44' },
  { iso: 'JO', name: 'Jordan', dial: '+962' },
  { iso: 'KZ', name: 'Kazakhstan', dial: '+7' },
  { iso: 'KE', name: 'Kenya', dial: '+254' },
  { iso: 'KI', name: 'Kiribati', dial: '+686' },
  { iso: 'XK', name: 'Kosovo', dial: '+383' },
  { iso: 'KW', name: 'Kuwait', dial: '+965' },
  { iso: 'KG', name: 'Kyrgyzstan', dial: '+996' },
  { iso: 'LA', name: 'Laos', dial: '+856' },
  { iso: 'LV', name: 'Latvia', dial: '+371' },
  { iso: 'LB', name: 'Lebanon', dial: '+961' },
  { iso: 'LS', name: 'Lesotho', dial: '+266' },
  { iso: 'LR', name: 'Liberia', dial: '+231' },
  { iso: 'LY', name: 'Libya', dial: '+218' },
  { iso: 'LI', name: 'Liechtenstein', dial: '+423' },
  { iso: 'LT', name: 'Lithuania', dial: '+370' },
  { iso: 'LU', name: 'Luxembourg', dial: '+352' },
  { iso: 'MO', name: 'Macau', dial: '+853' },
  { iso: 'MG', name: 'Madagascar', dial: '+261' },
  { iso: 'MW', name: 'Malawi', dial: '+265' },
  { iso: 'MY', name: 'Malaysia', dial: '+60' },
  { iso: 'MV', name: 'Maldives', dial: '+960' },
  { iso: 'ML', name: 'Mali', dial: '+223' },
  { iso: 'MT', name: 'Malta', dial: '+356' },
  { iso: 'MH', name: 'Marshall Islands', dial: '+692' },
  { iso: 'MQ', name: 'Martinique', dial: '+596' },
  { iso: 'MR', name: 'Mauritania', dial: '+222' },
  { iso: 'MU', name: 'Mauritius', dial: '+230' },
  { iso: 'YT', name: 'Mayotte', dial: '+262' },
  { iso: 'MX', name: 'Mexico', dial: '+52' },
  { iso: 'FM', name: 'Micronesia', dial: '+691' },
  { iso: 'MD', name: 'Moldova', dial: '+373' },
  { iso: 'MC', name: 'Monaco', dial: '+377' },
  { iso: 'MN', name: 'Mongolia', dial: '+976' },
  { iso: 'ME', name: 'Montenegro', dial: '+382' },
  { iso: 'MS', name: 'Montserrat', dial: '+1 664' },
  { iso: 'MA', name: 'Morocco', dial: '+212' },
  { iso: 'MZ', name: 'Mozambique', dial: '+258' },
  { iso: 'MM', name: 'Myanmar', dial: '+95' },
  { iso: 'NA', name: 'Namibia', dial: '+264' },
  { iso: 'NR', name: 'Nauru', dial: '+674' },
  { iso: 'NP', name: 'Nepal', dial: '+977' },
  { iso: 'NL', name: 'Netherlands', dial: '+31' },
  { iso: 'NC', name: 'New Caledonia', dial: '+687' },
  { iso: 'NZ', name: 'New Zealand', dial: '+64' },
  { iso: 'NI', name: 'Nicaragua', dial: '+505' },
  { iso: 'NE', name: 'Niger', dial: '+227' },
  { iso: 'NG', name: 'Nigeria', dial: '+234' },
  { iso: 'NU', name: 'Niue', dial: '+683' },
  { iso: 'NF', name: 'Norfolk Island', dial: '+672' },
  { iso: 'KP', name: 'North Korea', dial: '+850' },
  { iso: 'MK', name: 'North Macedonia', dial: '+389' },
  { iso: 'MP', name: 'Northern Mariana Islands', dial: '+1 670' },
  { iso: 'NO', name: 'Norway', dial: '+47' },
  { iso: 'OM', name: 'Oman', dial: '+968' },
  { iso: 'PK', name: 'Pakistan', dial: '+92' },
  { iso: 'PW', name: 'Palau', dial: '+680' },
  { iso: 'PS', name: 'Palestine', dial: '+970' },
  { iso: 'PA', name: 'Panama', dial: '+507' },
  { iso: 'PG', name: 'Papua New Guinea', dial: '+675' },
  { iso: 'PY', name: 'Paraguay', dial: '+595' },
  { iso: 'PE', name: 'Peru', dial: '+51' },
  { iso: 'PH', name: 'Philippines', dial: '+63' },
  { iso: 'PN', name: 'Pitcairn Islands', dial: '+64' },
  { iso: 'PL', name: 'Poland', dial: '+48' },
  { iso: 'PT', name: 'Portugal', dial: '+351' },
  { iso: 'PR', name: 'Puerto Rico', dial: '+1 787' },
  { iso: 'QA', name: 'Qatar', dial: '+974' },
  { iso: 'RE', name: 'Reunion', dial: '+262' },
  { iso: 'RO', name: 'Romania', dial: '+40' },
  { iso: 'RU', name: 'Russia', dial: '+7' },
  { iso: 'RW', name: 'Rwanda', dial: '+250' },
  { iso: 'BL', name: 'Saint Barthelemy', dial: '+590' },
  { iso: 'SH', name: 'Saint Helena', dial: '+290' },
  { iso: 'KN', name: 'Saint Kitts and Nevis', dial: '+1 869' },
  { iso: 'LC', name: 'Saint Lucia', dial: '+1 758' },
  { iso: 'MF', name: 'Saint Martin', dial: '+590' },
  { iso: 'PM', name: 'Saint Pierre and Miquelon', dial: '+508' },
  { iso: 'VC', name: 'Saint Vincent and the Grenadines', dial: '+1 784' },
  { iso: 'WS', name: 'Samoa', dial: '+685' },
  { iso: 'SM', name: 'San Marino', dial: '+378' },
  { iso: 'ST', name: 'Sao Tome and Principe', dial: '+239' },
  { iso: 'SA', name: 'Saudi Arabia', dial: '+966' },
  { iso: 'SN', name: 'Senegal', dial: '+221' },
  { iso: 'RS', name: 'Serbia', dial: '+381' },
  { iso: 'SC', name: 'Seychelles', dial: '+248' },
  { iso: 'SL', name: 'Sierra Leone', dial: '+232' },
  { iso: 'SG', name: 'Singapore', dial: '+65' },
  { iso: 'SX', name: 'Sint Maarten', dial: '+1 721' },
  { iso: 'SK', name: 'Slovakia', dial: '+421' },
  { iso: 'SI', name: 'Slovenia', dial: '+386' },
  { iso: 'SB', name: 'Solomon Islands', dial: '+677' },
  { iso: 'SO', name: 'Somalia', dial: '+252' },
  { iso: 'ZA', name: 'South Africa', dial: '+27' },
  { iso: 'KR', name: 'South Korea', dial: '+82' },
  { iso: 'SS', name: 'South Sudan', dial: '+211' },
  { iso: 'ES', name: 'Spain', dial: '+34' },
  { iso: 'LK', name: 'Sri Lanka', dial: '+94' },
  { iso: 'SD', name: 'Sudan', dial: '+249' },
  { iso: 'SR', name: 'Suriname', dial: '+597' },
  { iso: 'SJ', name: 'Svalbard and Jan Mayen', dial: '+47' },
  { iso: 'SE', name: 'Sweden', dial: '+46' },
  { iso: 'CH', name: 'Switzerland', dial: '+41' },
  { iso: 'SY', name: 'Syria', dial: '+963' },
  { iso: 'TW', name: 'Taiwan', dial: '+886' },
  { iso: 'TJ', name: 'Tajikistan', dial: '+992' },
  { iso: 'TZ', name: 'Tanzania', dial: '+255' },
  { iso: 'TH', name: 'Thailand', dial: '+66' },
  { iso: 'TL', name: 'Timor-Leste', dial: '+670' },
  { iso: 'TG', name: 'Togo', dial: '+228' },
  { iso: 'TK', name: 'Tokelau', dial: '+690' },
  { iso: 'TO', name: 'Tonga', dial: '+676' },
  { iso: 'TT', name: 'Trinidad and Tobago', dial: '+1 868' },
  { iso: 'TN', name: 'Tunisia', dial: '+216' },
  { iso: 'TR', name: 'Turkey', dial: '+90' },
  { iso: 'TM', name: 'Turkmenistan', dial: '+993' },
  { iso: 'TC', name: 'Turks and Caicos Islands', dial: '+1 649' },
  { iso: 'TV', name: 'Tuvalu', dial: '+688' },
  { iso: 'VI', name: 'US Virgin Islands', dial: '+1 340' },
  { iso: 'UG', name: 'Uganda', dial: '+256' },
  { iso: 'UA', name: 'Ukraine', dial: '+380' },
  { iso: 'AE', name: 'United Arab Emirates', dial: '+971' },
  { iso: 'GB', name: 'United Kingdom', dial: '+44' },
  { iso: 'US', name: 'United States', dial: '+1' },
  { iso: 'UY', name: 'Uruguay', dial: '+598' },
  { iso: 'UZ', name: 'Uzbekistan', dial: '+998' },
  { iso: 'VU', name: 'Vanuatu', dial: '+678' },
  { iso: 'VA', name: 'Vatican City', dial: '+379' },
  { iso: 'VE', name: 'Venezuela', dial: '+58' },
  { iso: 'VN', name: 'Vietnam', dial: '+84' },
  { iso: 'WF', name: 'Wallis and Futuna', dial: '+681' },
  { iso: 'EH', name: 'Western Sahara', dial: '+212' },
  { iso: 'YE', name: 'Yemen', dial: '+967' },
  { iso: 'ZM', name: 'Zambia', dial: '+260' },
  { iso: 'ZW', name: 'Zimbabwe', dial: '+263' }
];

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

function flagFromIso(iso) {
  if (!iso || iso.length !== 2) return '';

  return iso
    .toUpperCase()
    .split('')
    .map((letter) => String.fromCodePoint(letter.charCodeAt(0) + 127397))
    .join('');
}

function populatePhoneCountryOptions() {
  if (!phoneCountrySelect) return;

  phoneCountrySelect.innerHTML = '';

  INTERNATIONAL_DIAL_CODES.forEach((country) => {
    const option = document.createElement('option');
    option.value = country.iso;
    option.dataset.dial = country.dial;
    option.dataset.country = country.name;
    option.textContent = `${flagFromIso(country.iso)} ${country.dial} ${country.name}`;
    phoneCountrySelect.appendChild(option);
  });

  phoneCountrySelect.value = DEFAULT_PHONE_COUNTRY_ISO;
}

function selectedPhoneCountry() {
  const option = phoneCountrySelect?.selectedOptions?.[0];

  return {
    iso: option?.value || '',
    country: option?.dataset?.country || '',
    dial: option?.dataset?.dial || ''
  };
}

function normalizeDialDigits(value) {
  return String(value || '').replace(/\D/g, '');
}

function setPhoneCountryByIso(iso) {
  if (!phoneCountrySelect || !iso) return false;

  const option = Array.from(phoneCountrySelect.options).find((item) => item.value === iso);
  if (!option) return false;

  phoneCountrySelect.value = iso;
  return true;
}

function splitInternationalPhone(phone) {
  const cleanPhone = String(phone || '').trim();
  const cleanDigits = normalizeDialDigits(cleanPhone);
  if (!cleanPhone || !cleanDigits) return null;

  const countriesByCodeLength = [...INTERNATIONAL_DIAL_CODES].sort((a, b) => normalizeDialDigits(b.dial).length - normalizeDialDigits(a.dial).length);
  const match = countriesByCodeLength.find((country) => cleanDigits.startsWith(normalizeDialDigits(country.dial)));

  if (!match) return null;

  return {
    country: match,
    local: cleanDigits.slice(normalizeDialDigits(match.dial).length) || cleanPhone
  };
}

function updatePhoneFields() {
  if (!phoneFullInput || !phoneLocalInput) return;

  const selected = selectedPhoneCountry();
  const local = phoneLocalInput.value.trim();
  const fullPhone = local.startsWith('+') ? local : `${selected.dial} ${local}`.trim();

  phoneFullInput.value = fullPhone;
}

function isOtherBusinessSelected() {
  return businessTypeSelect?.value === 'Other';
}

function updateOtherBusinessField() {
  if (!otherBusinessField || !otherBusinessInput) return;

  const showField = isOtherBusinessSelected();
  otherBusinessField.hidden = !showField;

  if (!showField) {
    otherBusinessInput.value = '';
  }
}

function getBusinessTypeFromForm(formData) {
  const selectedType = firstFormValue(formData, ['business_type', 'industry']);
  const otherType = firstFormValue(formData, ['business_type_other']);

  return selectedType === 'Other' && otherType ? otherType : selectedType;
}

function prefillPhoneField(phone) {
  if (!phoneLocalInput || !phoneCountrySelect) return;

  const parsed = splitInternationalPhone(phone);

  if (parsed) {
    setPhoneCountryByIso(parsed.country.iso);
    phoneLocalInput.value = parsed.local;
  } else {
    phoneLocalInput.value = phone || '';
  }

  updatePhoneFields();
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
  if (businessType === 'Other' && data.business_type && fields.business_type_other) fields.business_type_other.value = data.business_type;
  updateOtherBusinessField();
  if (data.name && fields.name) fields.name.value = data.name;
  if (data.email && fields.email) fields.email.value = data.email;
  if (data.phone) prefillPhoneField(data.phone);
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
  updateOtherBusinessField();
  setPhoneCountryByIso(DEFAULT_PHONE_COUNTRY_ISO);
  updatePhoneFields();
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
  const businessType = getBusinessTypeFromForm(formData);
  const source = firstFormValue(formData, ['source_button', 'source']) || 'Website form';
  const message = firstFormValue(formData, ['message']);
  const phoneCountry = selectedPhoneCountry();
  const phone = firstFormValue(formData, ['phone']);

  formData.set('timestamp', timestamp);
  formData.set('submitted_at', timestamp);
  formData.set('company', company);
  formData.set('business', company);
  formData.set('business_type', businessType);
  formData.set('industry', businessType);
  formData.set('source_button', source);
  formData.set('source', source);
  formData.set('message', message);
  formData.set('phone', phone);
  formData.set('phone_country_iso', phoneCountry.iso);
  formData.set('phone_country_code', phoneCountry.dial);
  formData.set('phone_country', phoneCountry.country);
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
    phone
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
  updatePhoneFields();
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
updateOtherBusinessField();
businessTypeSelect?.addEventListener('change', updateOtherBusinessField);
populatePhoneCountryOptions();
updatePhoneFields();
phoneCountrySelect?.addEventListener('change', updatePhoneFields);
phoneLocalInput?.addEventListener('input', updatePhoneFields);

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
