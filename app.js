const courses = [
  {id:'dca',title:'Diploma in Computer Applications',cat:'Computer foundations',code:'DCA',months:6,level:'Beginner',desc:'Build a confident foundation in computer use, office tools and digital work.',modules:['Computer and operating-system essentials','Documents, spreadsheets and presentations','Internet, email and digital safety','Practical office workflow'],project:'Create a professional digital-work portfolio for a fictional organisation.'},
  {id:'office',title:'Office Productivity Essentials',cat:'Computer foundations',code:'OFF.',months:3,level:'Beginner',desc:'Create polished documents, useful spreadsheets and clear presentations.',modules:['Document styles and page layout','Spreadsheet calculations and charts','Presentations and visual communication','File organisation and collaboration'],project:'Produce a professional report with a supporting spreadsheet and slides.'},
  {id:'typing',title:'English & Hindi Typing',cat:'Computer foundations',code:'TYPE',months:2,level:'Beginner',desc:'Improve accuracy, speed and confidence for everyday digital work.',modules:['Keyboard and posture fundamentals','Accuracy-first practice routines','English and Hindi input methods','Speed tests and formatting practice'],project:'Complete a bilingual formatted document with a personal progress log.'},
  {id:'digital',title:'Digital Literacy & Internet',cat:'Computer foundations',code:'NET',months:2,level:'Beginner',desc:'Navigate the internet with practical confidence and safer digital habits.',modules:['Search, sources and online communication','Accounts, passwords and privacy','Cloud files and collaboration','Responsible use of digital services'],project:'Build a personal digital-safety checklist and resource guide.'},
  {id:'python',title:'Python Programming',cat:'Development',code:'Py',months:3,level:'Beginner',desc:'Learn the logic of programming through approachable, practical projects.',modules:['Variables, conditions and loops','Functions, collections and modules','File handling and error management','Testing and practical scripts'],project:'Build a command-line expense organiser with file-based records.'},
  {id:'frontend',title:'Frontend Development',cat:'Development',code:'{UI}',months:4,level:'Beginner',desc:'Create fast, accessible interfaces that work on every screen.',modules:['HTML and CSS foundations','JavaScript and browser events','Component-based interfaces','Accessibility and performance'],project:'Build a responsive portfolio with an interactive project gallery.'},
  {id:'fullstack',title:'Full-stack Web Development',cat:'Development',code:'FS',months:6,level:'Intermediate',desc:'Connect front-end interfaces to APIs, data and deployable products.',modules:['Modern HTML, CSS and JavaScript','React components and application state','APIs, authentication concepts and databases','Testing, deployment and product polish'],project:'Ship a small full-stack product with a useful public workflow.'},
  {id:'app',title:'Mobile App Development',cat:'Development',code:'APP',months:4,level:'Intermediate',desc:'Plan and build mobile experiences around a clear user need.',modules:['Mobile interaction and layout patterns','Navigation and local state','Data, forms and error feedback','Testing on real devices'],project:'Prototype a focused mobile utility from problem to working demo.'},
  {id:'ai',title:'AI Tools & Automation',cat:'AI & data',code:'AI',months:2,level:'Beginner',desc:'Use modern AI tools thoughtfully to research, create and automate.',modules:['Prompt clarity and task decomposition','Research, verification and source quality','No-code workflows and automation maps','Privacy, safety and human review'],project:'Design an automation workflow with clear human approval points.'},
  {id:'excel',title:'Advanced Excel & Analytics',cat:'AI & data',code:'XLS',months:2,level:'Intermediate',desc:'Make sense of data with formulas, pivot tables and decision-ready reports.',modules:['Lookups and conditional calculations','Data cleaning and validation','Pivot tables and visualisation','Reporting workflows'],project:'Create an interactive sales report from a sample dataset.'},
  {id:'data',title:'Data Analytics Foundations',cat:'AI & data',code:'DATA',months:4,level:'Beginner',desc:'Ask better questions and turn raw data into clear, useful insights.',modules:['Data types and analytical thinking','Spreadsheet and SQL foundations','Data visualisation','Communicating findings and uncertainty'],project:'Analyse a public dataset and present a concise findings dashboard.'},
  {id:'graphic',title:'Graphic Design Essentials',cat:'Design & media',code:'Aa',months:3,level:'Beginner',desc:'Explore typography, colour and composition through purposeful design.',modules:['Layout, colour and typography','Vector and raster workflows','Brand identity fundamentals','Print and digital export'],project:'Create an original visual identity and a small campaign.'},
  {id:'uiux',title:'UI / UX Design',cat:'Design & media',code:'UX',months:3,level:'Beginner',desc:'Design useful digital experiences around real user needs.',modules:['Research and problem definition','Information architecture and user flows','Wireframes and interactive prototypes','Usability testing and accessibility'],project:'Prototype a service flow and improve it using user feedback.'},
  {id:'video',title:'Video Editing & Motion',cat:'Design & media',code:'▶',months:3,level:'Beginner',desc:'Craft compelling stories with clean edits, sound and simple motion.',modules:['Story structure and editing workflow','Colour and audio fundamentals','Titles, captions and motion basics','Rights, formats and delivery'],project:'Edit a short original story with captions and balanced audio.'},
  {id:'tally',title:'Tally & Accounting Fundamentals',cat:'Business & accounting',code:'₹',months:3,level:'Beginner',desc:'Understand bookkeeping and practise day-to-day business accounting.',modules:['Bookkeeping concepts and ledgers','Vouchers and transaction entry','Inventory and business reports','Reconciliation and supervised tax examples'],project:'Maintain a fictional business ledger and produce financial reports.'},
  {id:'marketing',title:'Digital Marketing Foundations',cat:'Business & accounting',code:'DM',months:3,level:'Beginner',desc:'Connect audience research, useful content and measurable campaigns.',modules:['Audience and channel research','Content and search fundamentals','Campaign planning and analytics','Consent, privacy and responsible promotion'],project:'Develop a campaign plan with a budget and measurement framework.'},
  {id:'hardware',title:'Computer Hardware & Networking',cat:'IT & security',code:'PC',months:4,level:'Beginner',desc:'Understand computer components, networks and safe troubleshooting.',modules:['Computer components and safe handling','Operating-system installation concepts','Local network fundamentals','Troubleshooting and maintenance'],project:'Document a supervised workstation and small-network setup.'},
  {id:'security',title:'Cybersecurity Fundamentals',cat:'IT & security',code:'SEC',months:3,level:'Beginner',desc:'Build habits and knowledge that help keep devices and information safe.',modules:['Common threats and digital hygiene','Authentication and access controls','Network and data protection basics','Incident reporting and authorised lab exercises'],project:'Create a security checklist and practise in an isolated training lab.'}
];

const areas = ['Computer foundations','Development','AI & data','Design & media','Business & accounting','IT & security'];
const tones = [['#183d3d','#a6e5c8'],['#25304b','#abc1ff'],['#343c22','#d1ee8f'],['#3e2c43','#ebbaed'],['#3a3328','#efc781'],['#193647','#94d6ee']];
const ADMIN_HASH = '83f57b4840f1b9bb78858b6546c4b4a2520987f14abcf4d29df205e4e49dbd29';
const REGISTRY_KEY = 'bit_certificate_registry_v2';
const SESSION_KEY = 'bit_admin_session_v1';
const SIGNING_SALT = 'BIT-VERIFY-2026';
const $ = selector => document.querySelector(selector);
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const today = new Date();
const todayISO = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
const state = {category:'All courses', admin:false, selected:null, lastVerification:''};

function storageGet(key, fallback) { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } }
function storageSet(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
function registry() { return storageGet(REGISTRY_KEY, []).filter(record => record && record.id && record.sig); }
function saveRegistry(records) { storageSet(REGISTRY_KEY, records); }
function adminSession() { try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch { return false; } }
function setAdminSession(value) { try { value ? sessionStorage.setItem(SESSION_KEY,'1') : sessionStorage.removeItem(SESSION_KEY); } catch {} state.admin = value; }

function card(course) {
  const tone = tones[Math.max(0, areas.indexOf(course.cat))];
  return `<article class="course-card"><div class="card-art" style="--art-bg:${tone[0]};--art-color:${tone[1]}"><span class="art-code">${escapeHTML(course.code)}</span><span class="art-tag">BHARAT / LEARNING PATH</span></div><div class="card-body"><span class="card-category">${escapeHTML(course.cat)}</span><h3>${escapeHTML(course.title)}</h3><p>${escapeHTML(course.desc)}</p><div class="card-bottom"><span>${course.months} months · ${escapeHTML(course.level)}</span><button data-course="${escapeHTML(course.id)}" aria-label="View ${escapeHTML(course.title)}">Explore ↗</button></div></div></article>`;
}

$('#featuredCourses').innerHTML = courses.slice(0,3).map(card).join('');
$('#categoryFilters').innerHTML = ['All courses', ...areas].map((area,index) => `<button type="button" data-category="${escapeHTML(area)}" aria-pressed="${index === 0}">${escapeHTML(area)}</button>`).join('');
$('#certificateCourse').innerHTML = courses.map(course => `<option value="${escapeHTML(course.id)}">${escapeHTML(course.title)}</option>`).join('');
$('#year').textContent = today.getFullYear();

function filteredCourses() {
  const query = $('#courseSearch').value.trim().toLowerCase();
  const list = courses.filter(course => (state.category === 'All courses' || course.cat === state.category) && `${course.title} ${course.cat} ${course.desc} ${course.modules.join(' ')}`.toLowerCase().includes(query));
  if ($('#courseSort').value === 'title') list.sort((a,b) => a.title.localeCompare(b.title));
  if ($('#courseSort').value === 'duration') list.sort((a,b) => a.months - b.months || a.title.localeCompare(b.title));
  return list;
}
function renderCourses() {
  const list = filteredCourses();
  $('#allCourses').innerHTML = list.map(card).join('');
  $('#resultCount').textContent = `${list.length} of ${courses.length} programmes`;
  $('#emptyCourses').hidden = Boolean(list.length);
  document.querySelectorAll('[data-category]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === state.category)));
}
$('#courseSearch').addEventListener('input', renderCourses);
$('#courseSort').addEventListener('change', renderCourses);
$('#categoryFilters').addEventListener('click', event => { const button = event.target.closest('[data-category]'); if (button) { state.category = button.dataset.category; renderCourses(); } });
$('#clearFilters').addEventListener('click', () => { state.category = 'All courses'; $('#courseSearch').value = ''; $('#courseSort').value = 'featured'; renderCourses(); $('#courseSearch').focus(); });

function currentRoute() { return (location.hash.slice(1).split('?')[0] || 'home').toLowerCase(); }
function routeQuery() { return new URLSearchParams(location.hash.includes('?') ? location.hash.split('?').slice(1).join('?') : ''); }
function route() {
  const allowed = ['home','courses','about','certificates','verify','admin'];
  const id = allowed.includes(currentRoute()) ? currentRoute() : 'home';
  document.querySelectorAll('.view').forEach(view => { view.hidden = view.id !== id; });
  document.querySelectorAll('[data-nav]').forEach(link => { const active = link.dataset.nav === id; link.classList.toggle('active', active); active ? link.setAttribute('aria-current','page') : link.removeAttribute('aria-current'); });
  $('#navigation').classList.remove('open');
  $('#menuToggle').setAttribute('aria-expanded','false');
  document.title = id === 'home' ? 'Bharat Institute of Technology — Build what comes next.' : `${({courses:'Our courses',about:'The BIT approach',certificates:'Certificate studio',verify:'Verify a certificate',admin:'Admin control'}[id] || 'Bharat Institute of Technology')} | Bharat Institute of Technology`;
  window.scrollTo(0,0);
  updateAccessUI();
  if (id === 'home') resizeOrbit();
  if (id === 'verify') handleVerificationQuery();
}
window.addEventListener('hashchange', route);
$('#menuToggle').addEventListener('click', () => { const open = $('#navigation').classList.toggle('open'); $('#menuToggle').setAttribute('aria-expanded', String(open)); $('#menuToggle').setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });

const dialog = $('#courseDialog');
function showCourse(id) {
  const course = courses.find(item => item.id === id);
  if (!course) return;
  $('#courseDetail').innerHTML = `<p class="detail-tag">${escapeHTML(course.cat)}</p><h2 class="detail-title" id="dialogTitle">${escapeHTML(course.title)}</h2><p class="detail-description">${escapeHTML(course.desc)}</p><div class="detail-meta"><span>Suggested: ${course.months} months</span><span>${escapeHTML(course.level)}</span><span>Practical project</span></div><h3 class="detail-heading">What you’ll explore</h3><ul class="detail-list">${course.modules.map(module => `<li>${escapeHTML(module)}</li>`).join('')}</ul><div class="detail-project"><strong>PUT IT INTO PRACTICE</strong>${escapeHTML(course.project)}</div><p class="detail-note">Programme outline for planning. Fees, batch dates and enrolment are not yet published. This course does not imply certification by an external body.</p><div class="dialog-actions"><button class="button" data-outline="${escapeHTML(course.id)}">Download outline ↓</button><button class="button button-light" data-cert="${escapeHTML(course.id)}">Open certificate studio ↗</button></div>`;
  if (typeof dialog.showModal === 'function' && !dialog.open) dialog.showModal();
}
function saveBlob(blob, filename) { const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = filename; document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000); }
function downloadOutline(id) { const course = courses.find(item => item.id === id); if (!course) return; const text = `BHARAT INSTITUTE OF TECHNOLOGY\n${course.title}\n\nProposed duration: ${course.months} months\nEntry level: ${course.level}\n\n${course.desc}\n\nCURRICULUM\n${course.modules.map((module,index) => `${index+1}. ${module}`).join('\n')}\n\nPRACTICAL PROJECT\n${course.project}\n\nProgramme outline for planning only. Confirm final availability, curriculum, fees and schedule with the institute. No external accreditation is implied.\n`; saveBlob(new Blob([text], {type:'text/plain;charset=utf-8'}), `BIT-${course.id}-course-outline.txt`); }
$('#closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

async function sha256(value) { const bytes = new TextEncoder().encode(value); const digest = await crypto.subtle.digest('SHA-256', bytes); return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2,'0')).join(''); }
function canonical(record) { return [record.id,record.student,record.course,record.date,record.signatory,record.theme].join('|'); }
function encodePayload(value) { const bytes = new TextEncoder().encode(JSON.stringify(value)); let binary = ''; bytes.forEach(byte => { binary += String.fromCharCode(byte); }); return btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }
function decodePayload(value) { try { const normalized = value.replace(/-/g,'+').replace(/_/g,'/'); const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4); const binary = atob(padded); const bytes = Uint8Array.from(binary, char => char.charCodeAt(0)); return JSON.parse(new TextDecoder().decode(bytes)); } catch { return null; } }
function verificationUrl(record) { const base = new URL(location.href); base.hash = ''; return `${base.href}#verify?data=${encodeURIComponent(encodePayload({id:record.id,student:record.student,course:record.course,date:record.date,signatory:record.signatory,theme:record.theme,sig:record.sig}))}`; }
function qrUrl(url) { return `https://quickchart.io/qr?size=240&margin=1&text=${encodeURIComponent(url)}`; }
function readableDate(value) { if (!value) return 'Completion date'; const date = new Date(`${value}T12:00:00`); return Number.isNaN(date.getTime()) ? 'Completion date' : date.toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}); }
function nextCertificateNumber() { const year = today.getFullYear(); const numbers = registry().map(record => Number(String(record.id).match(/(\d+)$/)?.[1] || 0)); return `BIT-${year}-${String(Math.max(0,...numbers)+1).padStart(4,'0')}`; }

const certificateForm = $('#certificateForm');
certificateForm.elements.date.value = todayISO;
certificateForm.elements.date.max = todayISO;
certificateForm.elements.number.value = nextCertificateNumber();
function formData() { const course = courses.find(item => item.id === certificateForm.elements.course.value) || courses[0]; return {student:certificateForm.elements.student.value.trim(),course:course.title,date:certificateForm.elements.date.value,number:certificateForm.elements.number.value.trim(),signatory:certificateForm.elements.signatory.value.trim(),theme:certificateForm.elements.theme.value}; }
function updateCertificatePreview(record = state.selected) {
  const data = record || formData();
  $('#previewStudent').textContent = data.student || 'Student Name';
  $('#previewCourse').textContent = data.course || courses[0].title;
  $('#previewDate').textContent = readableDate(data.date);
  $('#previewNumber').textContent = `Certificate no. ${data.number || data.id || '—'}`;
  $('#previewSignatory').textContent = data.signatory || 'Authorised signatory';
  $('#certificatePreview').classList.toggle('green', data.theme === 'green');
  const qr = $('#previewQr');
  if (record?.sig) { qr.src = qrUrl(verificationUrl(record)); $('#qrNote').textContent = 'QR ready — open it to verify this certificate record.'; } else { qr.removeAttribute('src'); $('#qrNote').textContent = 'Create a record to generate its verification QR code.'; }
}
function editCertificateForm() { if (state.selected) state.selected = null; updateCertificatePreview(null); }
certificateForm.addEventListener('input', editCertificateForm);
certificateForm.addEventListener('change', editCertificateForm);
function validateCertificate() { ['student','number','signatory'].forEach(key => { const input = certificateForm.elements[key]; input.setCustomValidity(input.value.trim() ? '' : 'Please complete this field.'); }); return certificateForm.reportValidity(); }
['student','number','signatory'].forEach(key => certificateForm.elements[key].addEventListener('input', () => certificateForm.elements[key].setCustomValidity('')));

certificateForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (!state.admin || !validateCertificate()) return;
  const data = formData();
  const records = registry();
  if (records.some(record => record.id.toLowerCase() === data.number.toLowerCase())) { certificateForm.elements.number.setCustomValidity('That certificate number already exists.'); certificateForm.elements.number.reportValidity(); return; }
  const submit = certificateForm.querySelector('button[type="submit"]'); submit.disabled = true; submit.textContent = 'Signing record…';
  const record = {...data,id:data.number,sig:await sha256(`${canonical({...data,id:data.number})}|${SIGNING_SALT}`),revoked:false,createdAt:new Date().toISOString()};
  saveRegistry([record,...records]); state.selected = record; updateCertificatePreview(record); renderRegistry(); $('#certificateStatus').textContent = `Certificate ${record.id} created. The QR code links to its verification page.`; submit.disabled = false; submit.innerHTML = 'Create certificate <span>↗</span>'; certificateForm.elements.number.value = nextCertificateNumber();
});
$('#printCertificate').addEventListener('click', () => { if (!state.admin) return; if (!state.selected) { $('#certificateStatus').textContent = 'Create the certificate record first, then print or export it.'; return; } window.print(); });

async function loadImage(source) { return new Promise((resolve,reject) => { const image = new Image(); image.crossOrigin = 'anonymous'; image.onload = () => resolve(image); image.onerror = reject; image.src = source; }); }
function fitText(context,text,x,y,maxWidth,size,min=22) { let current = size; while (current > min) { context.font = `${current}px Georgia`; if (context.measureText(text).width <= maxWidth) break; current -= 1; } context.fillText(text,x,y); }
async function exportCertificate(record) {
  const canvas = document.createElement('canvas'); canvas.width = 2480; canvas.height = 1754; const context = canvas.getContext('2d'); if (!context) return;
  const navy = record.theme === 'green' ? '#154d42' : '#142941'; const gold = '#b69a5c';
  context.fillStyle = '#fcfbf7'; context.fillRect(0,0,canvas.width,canvas.height); context.strokeStyle = gold; context.lineWidth = 5; context.strokeRect(85,85,2310,1584); context.lineWidth = 2; context.strokeRect(107,107,2266,1540);
  context.fillStyle = gold; context.font = 'bold 80px Arial'; context.fillText('BIT',195,285); context.fillStyle = navy; context.font = 'bold 53px Arial'; context.fillText('BHARAT INSTITUTE',400,255); context.font = '30px Arial'; context.fillText('O F  T E C H N O L O G Y',400,312); context.textAlign = 'right'; context.fillStyle = '#7e6d46'; context.font = '24px Arial'; context.fillText('KNOWLEDGE INTO POSSIBILITY',2270,278); context.beginPath(); context.moveTo(195,365); context.lineTo(2285,365); context.stroke();
  context.textAlign = 'center'; context.fillStyle = navy; context.font = 'bold 52px Arial'; context.fillText('C E R T I F I C A T E  O F  C O M P L E T I O N',1240,495); context.fillStyle = '#777267'; context.font = 'italic 40px Georgia'; context.fillText('This is to certify that',1240,620); context.fillStyle = navy; fitText(context,record.student,1240,785,2070,115,42); context.fillStyle = '#777267'; context.font = '38px Georgia'; context.fillText('has successfully completed the course',1240,885); context.fillStyle = navy; fitText(context,record.course,1240,990,2010,66,38); context.fillStyle = '#777267'; context.font = '38px Georgia'; context.fillText('at Bharat Institute of Technology.',1240,1080);
  context.fillStyle = navy; fitText(context,readableDate(record.date),560,1330,640,42); fitText(context,record.signatory,1920,1330,640,42); context.strokeStyle = '#a19b89'; context.lineWidth = 2; [235,1595].forEach(x => { context.beginPath(); context.moveTo(x,1370); context.lineTo(x+650,1370); context.stroke(); }); context.fillStyle = '#8a7b5a'; context.font = '24px Arial'; context.fillText('DATE OF COMPLETION',560,1425); context.fillText('SIGNATURE REQUIRED',1920,1425); context.strokeStyle = gold; context.lineWidth = 4; context.beginPath(); context.arc(1240,1330,120,0,Math.PI*2); context.stroke(); context.beginPath(); context.arc(1240,1330,109,0,Math.PI*2); context.stroke(); context.fillStyle = '#997a39'; context.font = '48px Georgia'; context.fillText('B I T',1240,1320); context.font = '18px Arial'; context.fillText('EXCELLENCE',1240,1354); context.fillText('IN LEARNING',1240,1380); context.font = '22px Arial'; context.fillStyle = '#868176'; context.textAlign = 'left'; context.fillText(`Certificate no. ${record.id}`,195,1570); context.textAlign = 'right'; context.fillText('Institute-issued certificate · Verify with QR',2285,1570);
  try { const image = await loadImage(qrUrl(verificationUrl(record))); context.drawImage(image,1090,1180,300,300); } catch { context.strokeStyle = gold; context.lineWidth = 3; context.strokeRect(1090,1180,300,300); context.fillStyle = '#777267'; context.textAlign = 'center'; context.font = '28px Arial'; context.fillText('SCAN QR',1240,1330); }
  canvas.toBlob(blob => { if (blob) saveBlob(blob, `BIT-${record.id.replace(/[^a-z0-9_-]/gi,'-')}-certificate.png`); }, 'image/png');
}

function renderRegistry() {
  const records = registry(); const query = ($('#registrySearch')?.value || '').trim().toLowerCase(); const filtered = records.filter(record => `${record.id} ${record.student} ${record.course}`.toLowerCase().includes(query));
  $('#statTotal').textContent = records.length; $('#statActive').textContent = records.filter(record => !record.revoked).length; $('#statRevoked').textContent = records.filter(record => record.revoked).length;
  if (!filtered.length) { $('#certificateRegister').innerHTML = '<div class="register-empty">No certificate records match this search.</div>'; return; }
  $('#certificateRegister').innerHTML = filtered.map(record => `<article class="register-row"><div><strong>${escapeHTML(record.student)}</strong><small>${escapeHTML(record.course)}</small></div><div><strong>${escapeHTML(record.id)}</strong><small>${escapeHTML(readableDate(record.date))}</small></div><span class="register-status ${record.revoked ? 'revoked' : 'active'}">${record.revoked ? 'Revoked' : 'Active'}</span><span>${escapeHTML(record.signatory)}</span><div class="register-actions"><button class="icon-button" data-registry-action="verify" data-id="${escapeHTML(record.id)}" aria-label="Open verification for ${escapeHTML(record.id)}">View</button><button class="icon-button" data-registry-action="copy" data-id="${escapeHTML(record.id)}" aria-label="Copy verification link for ${escapeHTML(record.id)}">Copy</button><button class="icon-button danger" data-registry-action="revoke" data-id="${escapeHTML(record.id)}" aria-label="${record.revoked ? 'Restore' : 'Revoke'} ${escapeHTML(record.id)}">${record.revoked ? 'Restore' : 'Revoke'}</button></div></article>`).join('');
}
$('#registrySearch').addEventListener('input', renderRegistry);

function updateAccessUI() { state.admin = adminSession(); $('#certificateGate').hidden = state.admin; $('#certificateWorkspace').hidden = !state.admin; $('#adminLogin').hidden = state.admin; $('#adminDashboard').hidden = !state.admin; if (state.admin) renderRegistry(); }
$('#adminLoginForm').addEventListener('submit', async event => { event.preventDefault(); const input = $('#adminPassword'); const status = $('#adminLoginStatus'); status.textContent = 'Checking access…'; const hash = await sha256(input.value); if (hash === ADMIN_HASH) { setAdminSession(true); input.value = ''; status.textContent = 'Access granted.'; updateAccessUI(); } else { status.textContent = 'Access denied. Check the administrator password.'; input.select(); } });
$('#adminLogout').addEventListener('click', () => { setAdminSession(false); state.selected = null; updateAccessUI(); location.hash = 'admin'; $('#adminLoginStatus').textContent = 'Signed out. Authorised administrators only.'; });

function renderVerification(result) {
  const target = $('#verifyResult');
  if (!result) { target.className = 'verify-result invalid'; target.innerHTML = '<div class="result-mark">!</div><h2>Certificate not found</h2><p>No matching signed certificate was found on this device. Open the complete QR verification link or check the number.</p>'; return; }
  const status = result.revoked ? 'revoked' : result.valid ? 'valid' : 'invalid';
  target.className = `verify-result ${status}`;
  target.innerHTML = `<div class="result-mark">${result.revoked ? '!' : result.valid ? '✓' : '?'}</div><h2>${result.revoked ? 'Certificate revoked' : result.valid ? 'Certificate verified' : 'Unable to verify'}</h2><p>${result.revoked ? 'This record is marked revoked in the local administrator register.' : result.valid ? 'The QR payload and certificate details match the BIT signing check.' : 'The verification data could not be matched to a valid BIT signing check.'}</p>${result.record ? `<div class="verify-data"><div><span>STUDENT</span><strong>${escapeHTML(result.record.student)}</strong></div><div><span>CERTIFICATE NO.</span><strong>${escapeHTML(result.record.id)}</strong></div><div><span>COURSE</span><strong>${escapeHTML(result.record.course)}</strong></div><div><span>COMPLETED</span><strong>${escapeHTML(readableDate(result.record.date))}</strong></div><div><span>SIGNATORY</span><strong>${escapeHTML(result.record.signatory)}</strong></div><div><span>REGISTER STATUS</span><strong>${result.revoked ? 'Revoked on this device' : 'Active / signed payload'}</strong></div></div>` : ''}<div class="verify-actions"><a class="button button-outline" href="#courses">Explore BIT courses <span>↗</span></a></div>`;
}
async function verifyPayload(payload) { if (!payload?.id || !payload?.sig) return null; const valid = await sha256(`${canonical(payload)}|${SIGNING_SALT}`) === payload.sig; const local = registry().find(record => record.id.toLowerCase() === String(payload.id).toLowerCase()); return {valid,revoked:Boolean(local?.revoked),record:payload}; }
async function handleVerificationQuery() { const query = routeQuery(); const encoded = query.get('data'); if (!encoded || encoded === state.lastVerification) return; state.lastVerification = encoded; const payload = decodePayload(encoded); $('#verifyInput').value = encoded; renderVerification(await verifyPayload(payload)); }
$('#verifyForm').addEventListener('submit', async event => { event.preventDefault(); const value = $('#verifyInput').value.trim(); if (!value) { renderVerification(null); return; } let payload = null; if (value.includes('data=')) { try { payload = decodePayload(new URL(value,location.href).hash.split('data=')[1] || value.split('data=')[1]); } catch {} } else { payload = decodePayload(value); } if (!payload) { const local = registry().find(record => record.id.toLowerCase() === value.toLowerCase()); payload = local || null; } renderVerification(await verifyPayload(payload)); });

document.addEventListener('click', async event => {
  const courseButton = event.target.closest('[data-course]'); if (courseButton) showCourse(courseButton.dataset.course);
  const outlineButton = event.target.closest('[data-outline]'); if (outlineButton) downloadOutline(outlineButton.dataset.outline);
  const certButton = event.target.closest('[data-cert]'); if (certButton) { dialog.close(); location.hash = state.admin ? 'certificates' : 'admin'; }
  const registryButton = event.target.closest('[data-registry-action]'); if (!registryButton) return;
  const record = registry().find(item => item.id === registryButton.dataset.id); if (!record) return;
  const action = registryButton.dataset.registryAction;
  if (action === 'verify') { location.hash = `verify?data=${encodeURIComponent(encodePayload(record))}`; return; }
  if (action === 'copy') { try { await navigator.clipboard.writeText(verificationUrl(record)); registryButton.textContent = 'Copied'; setTimeout(() => { registryButton.textContent = 'Copy'; }, 1200); } catch { window.prompt('Copy verification link', verificationUrl(record)); } return; }
  if (action === 'revoke') { const records = registry(); const index = records.findIndex(item => item.id === record.id); if (index >= 0) { records[index].revoked = !records[index].revoked; saveRegistry(records); if (state.selected?.id === record.id) state.selected = records[index]; renderRegistry(); } }
});

// Perspective particles and depth motion for the hero scene.
const visual = $('#heroVisual'); const orbit = $('#orbit'); const orbitContext = orbit.getContext('2d'); const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)'); let paused = prefersReduced.matches; let angle = 0; let lastFrame = 0; let width = 1; let height = 1;
const particles = Array.from({length:72}, (_,index) => ({phase:index*1.73, radius:0.18+(index%9)/12, speed:.0008+(index%5)*.00016, size:.7+(index%4)*.4}));
function setMotion() { $('#motionToggle').textContent = paused ? 'Resume motion' : 'Pause motion'; $('#motionToggle').setAttribute('aria-pressed',String(paused)); if (paused) { visual.style.setProperty('--rx','0deg'); visual.style.setProperty('--ry','0deg'); } }
$('#motionToggle').addEventListener('click', () => { paused = !paused; setMotion(); });
prefersReduced.addEventListener?.('change', event => { paused = event.matches; setMotion(); });
visual.addEventListener('pointermove', event => { if (paused || event.pointerType === 'touch') return; const bounds = visual.getBoundingClientRect(); visual.style.setProperty('--ry',`${((event.clientX-bounds.left)/bounds.width-.5)*12}deg`); visual.style.setProperty('--rx',`${-((event.clientY-bounds.top)/bounds.height-.5)*9}deg`); });
visual.addEventListener('pointerleave', () => { visual.style.setProperty('--rx','0deg'); visual.style.setProperty('--ry','0deg'); });
function resizeOrbit() { const bounds = visual.getBoundingClientRect(); if (!bounds.width || !bounds.height) return; width=bounds.width; height=bounds.height; const dpr=Math.min(window.devicePixelRatio||1,2); orbit.width=width*dpr; orbit.height=height*dpr; orbitContext.setTransform(dpr,0,0,dpr,0,0); drawOrbit(); }
function drawOrbit() { if (!orbitContext) return; orbitContext.clearRect(0,0,width,height); const radius=Math.min(width,height)*.43; const centerX=width*.52; const centerY=height*.51; particles.forEach((particle,index) => { const a=particle.phase+angle*particle.speed*90; const x=Math.cos(a)*radius*particle.radius; const z=Math.sin(a)*radius*particle.radius; const y=Math.sin(a*1.6)*radius*.16; const scale=620/(620+z); orbitContext.beginPath(); orbitContext.fillStyle=`rgba(200,245,107,${.08+.65*(z+radius)/(radius*2)})`; orbitContext.arc(centerX+x*scale,centerY+y*scale,Math.max(.5,particle.size*scale),0,Math.PI*2); orbitContext.fill(); if(index%9===0){ orbitContext.strokeStyle='rgba(143,214,232,.13)'; orbitContext.lineWidth=1; orbitContext.beginPath(); orbitContext.moveTo(centerX+x*scale,centerY+y*scale); orbitContext.lineTo(centerX+x*scale*.82,centerY+y*scale*.82); orbitContext.stroke(); } }); }
function frame(timestamp) { if (!paused && !document.hidden && !$('#home').hidden && timestamp-lastFrame>30) { angle += .7; drawOrbit(); lastFrame=timestamp; } requestAnimationFrame(frame); }
window.addEventListener('resize',resizeOrbit); setMotion(); renderCourses(); updateCertificatePreview(null); updateAccessUI(); route(); requestAnimationFrame(frame);

// Optional progressive enhancement for browsers implementing WebMCP.
if (document.modelContext?.registerTool) { try { Promise.resolve(document.modelContext.registerTool({name:'search_bit_courses',title:'Search BIT courses',description:'Search the proposed course catalogue. This does not enrol a student.',inputSchema:{type:'object',properties:{query:{type:'string',maxLength:120}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:true},execute(input){ if (!input || typeof input.query !== 'string' || input.query.length > 120) throw new Error('A query of up to 120 characters is required.'); state.category='All courses'; $('#courseSearch').value=input.query; location.hash='courses'; const list=filteredCourses(); renderCourses(); return {count:list.length,courses:list.map(course=>({id:course.id,title:course.title,months:course.months}))}; }})).catch(()=>{}); } catch {} }
