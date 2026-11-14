const BUS_CAPACITY = 28;
const SESSION_WEEKDAYS = new Set([0, 3]);
const NAV_GROUP_PAGES = ['players', 'subscriptions', 'buses'];

const academy = {
  badr: {
    name: 'فرع بدر', players: 148, active: 132, collection: '86%', collected: '325,400 ج.م', seats: 7,
    plans: { monthly: 1250, session: 180, monthlyCount: 95, sessionCount: 37, paused: 16 },
    attendance: { players: 34, coaches: '4/5', rate: '91%' }, finance: { income: '325,400 ج.م', expenses: '184,700 ج.م', net: '140,700 ج.م' },
    buses: [
      { name: 'باص 01', route: 'الحي الأول ← النادي', supervisor: 'محمد فوزي', driver: 'سيد عبد الله', fee: 850, count: 25, players: ['BD-1842'] },
      { name: 'باص 02', route: 'المنطقة 02 ← النادي', supervisor: 'حسام عادل', driver: 'عمرو صابر', fee: 900, count: 27, players: ['BD-1791', 'BD-1755'] },
      { name: 'باص 03', route: 'المنطقة 03 ← النادي', supervisor: 'وليد رجب', driver: 'مصطفى كمال', fee: 950, count: 21, players: ['BD-1652'] }
    ],
    extras: [['حذاء تدريب Academy Pro','ملابس ومعدات',1850,14],['تيشيرت الأكاديمية','الزي الرسمي',450,32],['شنطة التدريب','ملابس ومعدات',620,9],['اشتراك الباص','نقل شهري',850,18]],
    playersList: [['يوسف علي','BD-1842','شهري','92%','باص 01','نشط'],['زياد محمد','BD-1791','بالسيشن','86%','باص 02','متأخر'],['أحمد هاني','BD-1755','شهري','96%','باص 02','نشط'],['مروان وليد','BD-1698','شهري','88%','بدون باص','نشط'],['سليم خالد','BD-1652','بالسيشن','79%','باص 03','متأخر']]
  },
  shorouk: {
    name: 'فرع الشروق', players: 100, active: 82, collection: '78%', collected: '218,900 ج.م', seats: 16,
    plans: { monthly: 1450, session: 210, monthlyCount: 61, sessionCount: 21, paused: 18 },
    attendance: { players: 27, coaches: '3/4', rate: '84%' }, finance: { income: '218,900 ج.م', expenses: '139,200 ج.م', net: '79,700 ج.م' },
    buses: [
      { name: 'باص 01', route: 'الحي الأول ← النادي', supervisor: 'محمود سالم', driver: 'خالد فتحي', fee: 950, count: 22, players: ['SH-1204', 'SH-1021'] },
      { name: 'باص 02', route: 'المنطقة 02 ← النادي', supervisor: 'عمرو زكي', driver: 'أيمن رشدي', fee: 1000, count: 24, players: ['SH-1152'] },
      { name: 'باص 03', route: 'المنطقة 03 ← النادي', supervisor: 'طارق عبد العال', driver: 'شريف نبيل', fee: 1050, count: 18, players: ['SH-1188'] }
    ],
    extras: [['حذاء تدريب Academy Pro','ملابس ومعدات',2050,8],['تيشيرت الأكاديمية','الزي الرسمي',500,24],['شنطة التدريب','ملابس ومعدات',690,15],['اشتراك الباص','نقل شهري',950,23]],
    playersList: [['آدم شريف','SH-1204','شهري','94%','باص 01','نشط'],['عمر ياسر','SH-1188','بالسيشن','82%','باص 03','نشط'],['سيف حازم','SH-1152','شهري','77%','باص 02','متأخر'],['علي أحمد','SH-1097','شهري','90%','بدون باص','نشط'],['نديم وائل','SH-1021','بالسيشن','73%','باص 01','متأخر']]
  }
};

const branchRecords = {
  badr: {
    attendance: [{name:'يوسف علي',code:'BD-1842',present:true},{name:'زياد محمد',code:'BD-1791',present:true},{name:'أحمد هاني',code:'BD-1755',present:false},{name:'مروان وليد',code:'BD-1698',present:true},{name:'سليم خالد',code:'BD-1652',present:true},{name:'فارس عماد',code:'BD-1629',present:false}],
    coaches: [['ع م','عمر مصطفى','المدرب الرئيسي · وصل 5:42 م','حاضر'],['ك س','كريم سامي','مدرب حراس · لم يسجل بعد','منتظر'],['أ ع','أحمد علاء','مدرب لياقة · لم يسجل بعد','منتظر']],
    coachProfiles: [
      { name: 'عمر مصطفى', role: 'المدرب الرئيسي', contract: 'full', salary: 18000, presentDays: 23 },
      { name: 'كريم سامي', role: 'مدرب حراس', contract: 'part', sessionRate: 450, sessions: 14, overtimeRate: 550 },
      { name: 'أحمد علاء', role: 'لياقة بدنية', contract: 'part', sessionRate: 500, sessions: 12, overtimeRate: 600 }
    ],
    payments: [['ي ع','يوسف علي','متأخر 9 أيام','1,250 ج.م'],['ز م','زياد محمد','متأخر 6 أيام','900 ج.م'],['م و','مروان وليد','يستحق اليوم','1,250 ج.م']],
    transactions: [['اشتراك يوسف علي','اشتراكات','13 نوفمبر','InstaPay','+1,250 ج.م','in','مؤكد'],['صيانة باص 02','نقل','12 نوفمبر','نقدي','−3,400 ج.م','out','معتمد'],['شراء 12 كرة تدريب','متنوعات','11 نوفمبر','تحويل بنكي','−8,600 ج.م','out','للمراجعة']]
  },
  shorouk: {
    attendance: [{name:'آدم شريف',code:'SH-1204',present:true},{name:'عمر ياسر',code:'SH-1188',present:true},{name:'سيف حازم',code:'SH-1152',present:false},{name:'علي أحمد',code:'SH-1097',present:true},{name:'نديم وائل',code:'SH-1021',present:false},{name:'ياسين تامر',code:'SH-0994',present:true}],
    coaches: [['م ر','مروان رجب','المدرب الرئيسي · وصل 5:51 م','حاضر'],['أ ن','أحمد نبيل','مدرب لياقة · لم يسجل بعد','منتظر'],['ي ك','ياسر كمال','مدرب مهارات · لم يسجل بعد','منتظر']],
    coachProfiles: [
      { name: 'مروان رجب', role: 'المدرب الرئيسي', contract: 'full', salary: 17000, presentDays: 21 },
      { name: 'أحمد نبيل', role: 'مدرب لياقة', contract: 'part', sessionRate: 470, sessions: 13, overtimeRate: 580 },
      { name: 'ياسر كمال', role: 'مدرب مهارات', contract: 'part', sessionRate: 430, sessions: 10, overtimeRate: 520 }
    ],
    payments: [['س ح','سيف حازم','متأخر 7 أيام','1,450 ج.م'],['ن و','نديم وائل','متأخر 3 أيام','1,050 ج.م'],['ع أ','علي أحمد','يستحق غدًا','1,450 ج.م']],
    transactions: [['اشتراك آدم شريف','اشتراكات','13 نوفمبر','بطاقة بنكية','+1,450 ج.م','in','مؤكد'],['وقود باص 01','نقل','12 نوفمبر','نقدي','−2,100 ج.م','out','معتمد'],['شراء أطقم تدريب','متنوعات','10 نوفمبر','تحويل بنكي','−6,250 ج.م','out','للمراجعة']]
  }
};

const notifications = {
  badr: [
    { id: 'bd-late', type: 'late', title: 'اشتراك متأخر', text: 'يوسف علي متأخر 9 أيام — 1,250 ج.م', time: 'اليوم · 9:20 ص', page: 'subscriptions', read: false },
    { id: 'bd-capacity', type: 'capacity', title: 'باص 02 يقترب من السعة', text: 'متبقٍ مقعد واحد فقط من أصل 28', time: 'اليوم · 8:45 ص', page: 'buses', read: false },
    { id: 'bd-new', type: 'new', title: 'اشتراك جديد', text: 'تم تسجيل اشتراك شهري جديد في فرع بدر', time: 'أمس · 6:10 م', page: 'players', read: false },
    { id: 'bd-expiry', type: 'expiry', title: 'اشتراك ينتهي قريبًا', text: '3 اشتراكات تنتهي خلال 5 أيام', time: 'أمس · 2:00 م', page: 'subscriptions', read: true }
  ],
  shorouk: [
    { id: 'sh-late', type: 'late', title: 'دفعة تحتاج متابعة', text: 'سيف حازم متأخر 7 أيام — 1,450 ج.م', time: 'اليوم · 10:05 ص', page: 'subscriptions', read: false },
    { id: 'sh-expiry', type: 'expiry', title: 'اشتراك ينتهي قريبًا', text: 'اشتراكان ينتهيان قبل نهاية الأسبوع', time: 'اليوم · 9:10 ص', page: 'subscriptions', read: false },
    { id: 'sh-new', type: 'new', title: 'لاعب جديد', text: 'تمت إضافة لاعب جديد إلى فرع الشروق', time: 'أمس · 5:30 م', page: 'players', read: true }
  ]
};

let currentBranch = 'badr';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const icon = id => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const formatNumber = value => Number(value || 0).toLocaleString('ar-EG-u-nu-latn');
const formatCurrency = value => `${formatNumber(value)} ج.م`;
const initials = name => String(name || '').trim().split(/\s+/).slice(0, 2).map(part => part[0] || '').join(' ');

function currentMonthValue() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function getMonthInfo(value) {
  const [year, month] = String(value || '').split('-').map(Number);
  if (!year || !month || month < 1 || month > 12) return null;
  const days = new Date(year, month, 0).getDate();
  let total = 0;
  for (let day = 1; day <= days; day++) {
    if (SESSION_WEEKDAYS.has(new Date(year, month - 1, day).getDay())) total++;
  }
  return {
    year,
    month,
    days,
    total,
    label: new Intl.DateTimeFormat('ar-EG-u-nu-latn', { month: 'long', year: 'numeric' }).format(new Date(year, month - 1, 1))
  };
}

function formatMonth(value) {
  return getMonthInfo(value)?.label || '';
}

function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
}

function setNavGroupExpanded(expanded) {
  $('#nav-group-toggle').setAttribute('aria-expanded', String(expanded));
  $('#nav-group-menu').hidden = !expanded;
}

function showPage(name) {
  closeNotifications();
  $$('.page').forEach(page => page.classList.toggle('active', page.dataset.page === name));
  $$('.nav-item[data-page]').forEach(item => item.classList.toggle('active', item.dataset.page === name));
  const inNavGroup = NAV_GROUP_PAGES.includes(name);
  $('#nav-group-toggle').classList.toggle('child-active', inNavGroup);
  if (inNavGroup) setNavGroupExpanded(true);
  $('#sidebar').classList.remove('open');
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function planCardsMarkup(plans) {
  const monthInfo = getMonthInfo(currentMonthValue());
  return `<article class="price-plan recommended"><span>اشتراك شهري</span><strong>${formatNumber(plans.monthly)} <small>ج.م / شهر</small></strong><b>الأكثر اختيارًا</b><small>قيمة ثابتة مهما كان الشهر 28 أو 30 أو 31 يومًا.</small></article><article class="price-plan"><span>اشتراك بالسيشن</span><strong>${formatNumber(plans.session)} <small>ج.م / سيشن</small></strong><b>${monthInfo ? `${monthInfo.total} سيشن في ${monthInfo.label}` : 'سيشنان أسبوعيًا'}</b><small>سيشنان كل أسبوع، ويُحسب عدد السيشنات الفعلي حسب الشهر.</small></article>`;
}

function renderPlayers() {
  $('#players-table').innerHTML = academy[currentBranch].playersList.map((player, i) => {
    const age = player[9] ? Math.max(0, new Date().getFullYear() - Number(player[9])) : 12 + (i % 3) * 2;
    const planDetail = player[2] === 'بالسيشن' && player[8] ? `<small>${escapeHtml(formatMonth(player[6]))} · ${formatNumber(player[8])} من ${formatNumber(player[7])} سيشن</small>` : '';
    return `<tr>
    <td><div class="player-cell"><span class="avatar a${(i % 3) + 1}">${escapeHtml(initials(player[0]))}</span><div><b>${escapeHtml(player[0])}</b><small>${age} سنة</small></div></div></td>
    <td>${escapeHtml(player[1])}</td><td><div class="plan-cell"><span>${escapeHtml(player[2])}</span>${planDetail}</div></td><td>${escapeHtml(player[3])}</td><td>${escapeHtml(player[4])}</td>
    <td><span class="status ${player[5] === 'نشط' ? 'present' : 'late'}">${escapeHtml(player[5])}</span></td></tr>`;
  }).join('');
}

function renderPlans() {
  $('#plan-cards').innerHTML = planCardsMarkup(academy[currentBranch].plans);
}

function renderPricing() {
  const plans = academy[currentBranch].plans;
  $('#pricing-monthly').value = plans.monthly;
  $('#pricing-session').value = plans.session;
  $('#pricing-preview').innerHTML = planCardsMarkup(plans);
}

function seatSummary() {
  const buses = academy[currentBranch].buses;
  return {
    available: buses.reduce((total, bus) => total + Math.max(0, BUS_CAPACITY - bus.count), 0),
    capacity: buses.length * BUS_CAPACITY
  };
}

function renderBuses() {
  const buses = academy[currentBranch].buses;
  $('#bus-board').innerHTML = buses.map(bus => {
    const available = Math.max(0, BUS_CAPACITY - bus.count);
    const full = available === 0;
    const warning = available === 1;
    const status = full ? 'مكتمل' : warning ? 'مقعد واحد' : 'متاح';
    return `<article class="bus-card ${warning || full ? 'warning' : ''}"><header><div>${icon('i-bus')}<strong>${escapeHtml(bus.name)}</strong></div><span class="status ${warning || full ? 'late' : 'present'}">${status}</span></header><div class="capacity-track"><i style="width:${Math.min(bus.count / BUS_CAPACITY * 100, 100)}%"></i></div><div class="capacity-label"><b>${formatNumber(bus.count)} لاعبًا</b><span>${formatNumber(available)} مقعد متاح</span></div><ul><li>المسار: ${escapeHtml(bus.route)}</li><li>المشرف: ${escapeHtml(bus.supervisor)}</li><li>السائق: ${escapeHtml(bus.driver)}</li><li>سعر النقل: ${formatCurrency(bus.fee)} / شهر</li></ul></article>`;
  }).join('') || '<div class="empty-state">لا توجد باصات في هذا الفرع بعد.</div>';

  const assignedPlayers = academy[currentBranch].playersList.map((player, i) => ({ player, i })).filter(item => item.player[4] !== 'بدون باص');
  $('#transfer-player').innerHTML = assignedPlayers.length ? assignedPlayers.map(({ player, i }) => `<option value="${i}">${escapeHtml(player[0])} — ${escapeHtml(player[4])}</option>`).join('') : '<option value="" disabled>لا يوجد لاعبون على الباصات</option>';
  $('#transfer-bus').innerHTML = buses.map((bus, i) => `<option value="${i}">${escapeHtml(bus.name)}</option>`).join('');
}

function renderExtras() {
  $('#extras-table').innerHTML = academy[currentBranch].extras.map((item, i) => `<tr><td><b>${escapeHtml(item[0])}</b></td><td>${escapeHtml(item[1])}</td><td><input class="price-input" data-extra="${i}" type="number" value="${item[2]}" aria-label="سعر ${escapeHtml(item[0])}"> ج.م</td><td><div class="stock"><i style="--stock:${Math.min(item[3]*3,100)}%"></i><span>${item[3]}</span></div></td><td><span class="status ${item[3]<10?'late':'present'}">${item[3]<10?'مخزون منخفض':'متاح'}</span></td></tr>`).join('');
}

function renderCoachProfiles() {
  const profiles = branchRecords[currentBranch].coachProfiles;
  $('#coach-grid').innerHTML = profiles.map((coach, i) => {
    const contract = coach.contract === 'full' ? '<span class="contract full">Full-time</span>' : '<span class="contract part">Part-time</span>';
    const details = coach.contract === 'full'
      ? `<div><dt>الراتب الشهري</dt><dd>${formatCurrency(coach.salary)}</dd></div><div><dt>حضور الشهر</dt><dd>${formatNumber(coach.presentDays)} يومًا</dd></div>`
      : `<div><dt>سعر السيشن</dt><dd>${formatCurrency(coach.sessionRate)}</dd></div><div><dt>سيشنات الشهر</dt><dd>${formatNumber(coach.sessions)}</dd></div><div><dt>السيشن الإضافي</dt><dd>${formatCurrency(coach.overtimeRate)}</dd></div>`;
    return `<article><div class="avatar xl a${(i % 3) + 1}">${escapeHtml(initials(coach.name))}</div><div><h2>${escapeHtml(coach.name)}</h2><p>${escapeHtml(coach.role)}</p></div>${contract}<dl>${details}</dl></article>`;
  }).join('');
}

function renderBranch() {
  const b = academy[currentBranch];
  const seats = seatSummary();
  $$('[data-branch-name]').forEach(el => el.textContent = b.name);
  $$('[data-metric]').forEach(el => el.textContent = el.dataset.metric === 'seats' ? formatNumber(seats.available) : b[el.dataset.metric]);
  $('[data-delta="active"]').textContent = `${Math.round(b.active / b.players * 100)}% من اللاعبين`;
  $('[data-delta="collection"]').textContent = b.collected;
  $('[data-delta="seats"]').textContent = `من أصل ${formatNumber(seats.capacity)} مقعد`;
  $('[data-plan="monthly"]').textContent = `${b.plans.monthlyCount} لاعب`;
  $('[data-plan="session"]').textContent = `${b.plans.sessionCount} لاعب`;
  $('[data-plan="paused"]').textContent = `${b.plans.paused} لاعب`;
  $('.donut b').textContent = b.active;
  $('.donut').setAttribute('aria-label', `${Math.round(b.plans.monthlyCount / b.active * 100)} بالمئة اشتراك شهري`);
  $$('[data-attendance]').forEach(el => el.textContent = b.attendance[el.dataset.attendance]);
  $('#revenue-total').innerHTML = `${b.collected.replace(' ج.م','')} <small>ج.م</small>`;
  $('#finance-income').textContent = b.finance.income;
  $('#finance-expenses').textContent = b.finance.expenses;
  $('#finance-net').textContent = b.finance.net;
  renderPlayers();
  renderPlans();
  renderPricing();
  renderBuses();
  renderExtras();
  renderAttendance();
  renderBranchRecords();
  renderCoachProfiles();
  renderNotifications();
  updatePlayerPlanUI();
  updateSubscriptionNote();
}

function renderAttendance() {
  const attendancePlayers = branchRecords[currentBranch].attendance;
  $('#attendance-roster').innerHTML = attendancePlayers.map((player, i) => `<div class="roster-row"><span class="avatar a${(i%3)+1}">${escapeHtml(initials(player.name))}</span><div><b>${escapeHtml(player.name)}</b><small>${escapeHtml(player.code)}</small></div><button class="attendance-toggle ${player.present?'present':''}" data-attendance-index="${i}">${player.present?'حاضر':'تسجيل حضور'}</button></div>`).join('');
  $('#attendance-count').textContent = `${attendancePlayers.filter(p => p.present).length} من ${attendancePlayers.length}`;
}

function renderBranchRecords() {
  const records = branchRecords[currentBranch];
  $('#overview-coaches').innerHTML = records.coaches.map((coach, i) => `<div class="coach-row"><div class="avatar a${(i % 3) + 1}">${escapeHtml(coach[0])}</div><div><strong>${escapeHtml(coach[1])}</strong><span>${escapeHtml(coach[2])}</span></div><span class="status ${coach[3]==='حاضر'?'present':'late'}">${escapeHtml(coach[3])}</span></div>`).join('');
  $('.payment-list').innerHTML = records.payments.map((payment, i) => `<div><span class="avatar a${(i%3)+1}">${escapeHtml(payment[0])}</span><p><b>${escapeHtml(payment[1])}</b><small>${escapeHtml(payment[2])}</small></p><strong>${escapeHtml(payment[3])}</strong></div>`).join('');
  $('[data-page="finance"] tbody').innerHTML = records.transactions.map(item => `<tr><td><b>${escapeHtml(item[0])}</b></td><td>${escapeHtml(item[1])}</td><td>${escapeHtml(item[2])}</td><td>${escapeHtml(item[3])}</td><td class="money ${item[5]}">${escapeHtml(item[4])}</td><td><span class="status ${item[6]==='للمراجعة'?'late':'present'}">${escapeHtml(item[6])}</span></td></tr>`).join('');
}

function updatePlayerPlanUI() {
  const form = $('#player-form');
  if (!form) return;
  const plan = form.elements.plan.value;
  const sessionFields = $('#session-fields');
  const monthInput = $('#session-month');
  const countInput = $('#session-remaining');
  const monthly = academy[currentBranch].plans.monthly;
  const session = academy[currentBranch].plans.session;
  const isSession = plan === 'session';
  sessionFields.hidden = !isSession;

  if (isSession) {
    if (!monthInput.value) monthInput.value = currentMonthValue();
    const monthInfo = getMonthInfo(monthInput.value);
    if (monthInfo) {
      countInput.max = monthInfo.total;
      if (!countInput.value || Number(countInput.value) > monthInfo.total) countInput.value = monthInfo.total;
      $('#player-price-note').innerHTML = `<b>${formatNumber(countInput.value)} سيشن متبقية</b> في ${escapeHtml(monthInfo.label)} × ${formatCurrency(session)} = ${formatCurrency(Number(countInput.value) * session)}. إجمالي سيشنات الشهر ${formatNumber(monthInfo.total)}.`;
    }
  } else {
    $('#player-price-note').innerHTML = `<b>${formatCurrency(monthly)} شهريًا.</b> السعر ثابت مهما كان عدد أيام الشهر.`;
  }
}

function updateSubscriptionNote() {
  const note = $('#month-note');
  const checked = $('input[name="plan"]:checked');
  if (!note || !checked) return;
  const plans = academy[currentBranch].plans;
  const monthInfo = getMonthInfo(currentMonthValue());
  note.textContent = checked.value === 'monthly'
    ? `الفترة: ${monthInfo?.label || 'الشهر الحالي'} · ${formatCurrency(plans.monthly)} — السعر ثابت مهما كان عدد أيام الشهر.`
    : `${monthInfo ? `${monthInfo.total} سيشن في ${monthInfo.label}` : 'سيشنان أسبوعيًا'} · ${formatCurrency(plans.session)} للسيشن — يُحسب الحضور الفعلي.`;
}

function renderNotifications() {
  const items = notifications[currentBranch];
  const unread = items.filter(item => !item.read).length;
  const count = $('#notification-count');
  count.textContent = formatNumber(unread);
  count.hidden = unread === 0;
  $('#notification-read-all').disabled = unread === 0;
  $('#notification-list').innerHTML = items.length ? items.map(item => `<button class="notification-item ${item.read ? '' : 'unread'}" type="button" data-notification-id="${item.id}"><span class="notification-dot ${item.type}"></span><span class="notification-copy"><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.text)}</small><em>${escapeHtml(item.time)}</em></span></button>`).join('') : '<p class="notification-empty">لا توجد إشعارات لهذا الفرع.</p>';
  $('[data-branch-name]', $('#notification-panel')).textContent = academy[currentBranch].name;
}

function closeNotifications() {
  const panel = $('#notification-panel');
  if (!panel || panel.hidden) return;
  panel.hidden = true;
  $('#notification-btn').setAttribute('aria-expanded', 'false');
}

function toggleNotifications() {
  const panel = $('#notification-panel');
  const willOpen = panel.hidden;
  panel.hidden = !willOpen;
  $('#notification-btn').setAttribute('aria-expanded', String(willOpen));
}

function preparePlayerDialog() {
  const monthInput = $('#session-month');
  if (!monthInput.value) monthInput.value = currentMonthValue();
  const form = $('#player-form');
  if (form) form.elements.plan.value = 'monthly';
  updatePlayerPlanUI();
}

function renderBusPlayerPicker() {
  const buses = academy[currentBranch].buses;
  const players = academy[currentBranch].playersList;
  $('#bus-player-picker').innerHTML = players.length ? players.map(player => `<label class="bus-player-option"><input type="checkbox" value="${escapeHtml(player[1])}"><span><b>${escapeHtml(player[0])}</b><small>${escapeHtml(player[1])} · ${escapeHtml(player[4])}</small></span></label>`).join('') : '<p class="field-note">أضف لاعبًا أولًا قبل إسناده للباص.</p>';
  $('#bus-player-picker').dataset.busNames = buses.map(bus => bus.name).join('|');
  updateBusPickerCount();
}

function updateBusPickerCount() {
  const count = $$('#bus-player-picker input:checked').length;
  $('#bus-picker-count').textContent = `${formatNumber(count)} / ${BUS_CAPACITY}`;
}

function prepareBusDialog() {
  const form = $('#bus-form');
  form.reset();
  const nextNumber = String(academy[currentBranch].buses.length + 1).padStart(2, '0');
  $('#bus-name').value = `باص ${nextNumber}`;
  renderBusPlayerPicker();
}

function prepareCoachDialog() {
  const form = $('#coach-form');
  form.reset();
  updateCoachContractFields();
}

function updateCoachContractFields() {
  const part = $('#coach-contract').value === 'part';
  $('#coach-full-fields').hidden = part;
  $('#coach-part-fields').hidden = !part;
  $$('#coach-full-fields input').forEach(input => input.disabled = part);
  $$('#coach-part-fields input').forEach(input => input.disabled = !part);
}

$('#login-form').addEventListener('submit', event => {
  event.preventDefault();
  const valid = $('#email').value.trim() === 'admin@gmail.com' && $('#password').value === 'password';
  $('#login-error').hidden = valid;
  if (!valid) return;
  $('#login-view').hidden = true;
  $('#app-view').hidden = false;
  renderBranch();
  preparePlayerDialog();
});

$('#logout-btn').addEventListener('click', () => {
  $('#app-view').hidden = true;
  $('#login-view').hidden = false;
  closeNotifications();
});
$('#menu-btn').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
$('#nav-group-toggle').addEventListener('click', () => {
  setNavGroupExpanded($('#nav-group-toggle').getAttribute('aria-expanded') !== 'true');
});
$$('.nav-item[data-page]').forEach(item => item.addEventListener('click', () => showPage(item.dataset.page)));
$$('[data-go]').forEach(button => button.addEventListener('click', () => {
  const dialog = button.closest('dialog');
  if (dialog) dialog.close();
  showPage(button.dataset.go);
}));
$$('[data-open]').forEach(button => button.addEventListener('click', () => {
  const id = button.dataset.open;
  if (id === 'bus-dialog') prepareBusDialog();
  if (id === 'coach-dialog') prepareCoachDialog();
  $(`#${id}`).showModal();
}));
$$('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));

$('#branch-select').addEventListener('change', event => {
  currentBranch = event.target.value;
  closeNotifications();
  renderBranch();
  toast(`تم عرض بيانات ${academy[currentBranch].name}`);
});
$('#player-search').addEventListener('input', event => {
  const query = event.target.value.trim();
  $$('#players-table tr').forEach(row => row.hidden = !row.textContent.includes(query));
});

$('#player-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const plan = data.get('plan') === 'session' ? 'session' : 'monthly';
  const birthYear = Number(data.get('birthYear')) || 2012;
  const branch = academy[currentBranch];
  let month = '';
  let total = '';
  let remaining = '';

  if (plan === 'session') {
    const monthInfo = getMonthInfo(data.get('sessionMonth'));
    const count = Number(data.get('sessionCount'));
    if (!monthInfo) return toast('اختر شهر الاشتراك أولًا');
    if (!Number.isInteger(count) || count < 1 || count > monthInfo.total) return toast(`عدد السيشنات يجب أن يكون بين 1 و${monthInfo.total}`);
    month = data.get('sessionMonth');
    total = monthInfo.total;
    remaining = count;
  }

  const code = `${currentBranch === 'badr' ? 'BD' : 'SH'}-${1900 + branch.playersList.length}`;
  branch.playersList.unshift([name, code, plan === 'monthly' ? 'شهري' : 'بالسيشن', '—', 'بدون باص', 'نشط', month, total, remaining, birthYear]);
  branch.players++;
  branch.active++;
  if (plan === 'monthly') branch.plans.monthlyCount++;
  else branch.plans.sessionCount++;
  form.reset();
  preparePlayerDialog();
  renderBranch();
  form.closest('dialog').close();
  toast(`تمت إضافة ${name} بنجاح`);
});

$('#subscription-form').addEventListener('submit', event => {
  event.preventDefault();
  event.target.closest('dialog').close();
  toast('تم إنشاء الاشتراك التجريبي بنجاح');
});
$$('input[name="plan"]').forEach(input => input.addEventListener('change', updateSubscriptionNote));

$('#attendance-roster').addEventListener('click', event => {
  const button = event.target.closest('[data-attendance-index]');
  if (!button) return;
  const player = branchRecords[currentBranch].attendance[button.dataset.attendanceIndex];
  player.present = !player.present;
  renderAttendance();
});
$('#mark-all').addEventListener('click', () => {
  branchRecords[currentBranch].attendance.forEach(player => player.present = true);
  renderAttendance();
  toast('تم تسجيل حضور كل اللاعبين في القائمة');
});
$$('[data-att-tab]').forEach(button => button.addEventListener('click', () => {
  $$('[data-att-tab]').forEach(b => b.classList.remove('active'));
  $$('.attendance-tab').forEach(tab => tab.classList.remove('active'));
  button.classList.add('active');
  $(`#${button.dataset.attTab}`).classList.add('active');
}));
$('#coach-photo').addEventListener('change', event => {
  const file = event.target.files[0];
  if (!file) return;
  const preview = $('#coach-preview');
  preview.src = URL.createObjectURL(file);
  preview.hidden = false;
  $$('.camera-box > svg, .camera-box > strong, .camera-box > span').forEach(el => el.hidden = true);
});
const coachActionLabel = document.createElement('label');
coachActionLabel.innerHTML = 'نوع التسجيل<select id="coach-action"><option value="arrival">حضور</option><option value="departure">انصراف</option></select>';
$('#coach-checkin-form').prepend(coachActionLabel);
$('#coach-action').addEventListener('change', event => {
  $('#coach-checkin-form label:nth-of-type(3)').childNodes[0].textContent = event.target.value === 'arrival' ? 'وقت الوصول' : 'وقت الانصراف';
});
$('#coach-checkin-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!$('#coach-photo').files.length) return toast('ارفع صورة الإثبات أولًا');
  toast(`تم تسجيل ${$('#coach-action').value === 'arrival' ? 'حضور' : 'انصراف'} المدرب وإرفاق الصورة`);
});

$('#transfer-form').addEventListener('submit', event => {
  event.preventDefault();
  const playerIndex = Number($('#transfer-player').value);
  const targetIndex = Number($('#transfer-bus').value);
  const branch = academy[currentBranch];
  const player = branch.playersList[playerIndex];
  if (!player) return toast('اختر لاعبًا مسندًا إلى باص');
  const sourceIndex = branch.buses.findIndex(bus => bus.name === player[4]);
  if (sourceIndex < 0) return toast('هذا اللاعب غير مسند إلى باص حاليًا');
  const targetBus = branch.buses[targetIndex];
  if (!targetBus) return toast('اختر الباص الجديد');
  if (sourceIndex === targetIndex) return toast('اختر باصًا مختلفًا عن الباص الحالي');
  if (targetBus.count >= BUS_CAPACITY) return toast('هذا الباص مكتمل السعة');
  const sourceBus = branch.buses[sourceIndex];
  sourceBus.count = Math.max(0, sourceBus.count - 1);
  sourceBus.players = sourceBus.players.filter(code => code !== player[1]);
  targetBus.count++;
  if (!targetBus.players.includes(player[1])) targetBus.players.push(player[1]);
  player[4] = targetBus.name;
  renderPlayers();
  renderBuses();
  toast(`تم ترحيل ${player[0]} من ${sourceBus.name} إلى ${targetBus.name}`);
});

$('#save-extras').addEventListener('click', () => {
  $$('.price-input').forEach(input => academy[currentBranch].extras[input.dataset.extra][2] = Number(input.value));
  toast(`تم حفظ أسعار ${academy[currentBranch].name} فقط`);
});

$('#pricing-form').addEventListener('submit', event => {
  event.preventDefault();
  const monthly = Number($('#pricing-monthly').value);
  const session = Number($('#pricing-session').value);
  if (monthly <= 0 || session <= 0) return toast('أدخل أسعارًا أكبر من صفر');
  academy[currentBranch].plans.monthly = monthly;
  academy[currentBranch].plans.session = session;
  renderPlans();
  renderPricing();
  updatePlayerPlanUI();
  updateSubscriptionNote();
  toast(`تم حفظ أسعار ${academy[currentBranch].name}`);
});
$('#pricing-monthly').addEventListener('input', event => {
  const monthly = Number(event.target.value) || 0;
  const session = Number($('#pricing-session').value) || academy[currentBranch].plans.session;
  $('#pricing-preview').innerHTML = planCardsMarkup({ ...academy[currentBranch].plans, monthly, session });
});
$('#pricing-session').addEventListener('input', event => {
  const session = Number(event.target.value) || 0;
  const monthly = Number($('#pricing-monthly').value) || academy[currentBranch].plans.monthly;
  $('#pricing-preview').innerHTML = planCardsMarkup({ ...academy[currentBranch].plans, monthly, session });
});

$('#player-plan').addEventListener('change', updatePlayerPlanUI);
$('#session-month').addEventListener('change', updatePlayerPlanUI);
$('#session-remaining').addEventListener('input', updatePlayerPlanUI);
$('#session-month').value = currentMonthValue();

$('#bus-player-picker').addEventListener('change', updateBusPickerCount);
$('#bus-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const branch = academy[currentBranch];
  if (branch.buses.some(bus => bus.name === name)) return toast('يوجد باص بهذا الاسم بالفعل');
  const selectedCodes = $$('#bus-player-picker input:checked').map(input => input.value);
  if (selectedCodes.length > BUS_CAPACITY) return toast(`السعة القصوى ${BUS_CAPACITY} لاعبًا`);
  const bus = {
    name,
    route: String(data.get('route') || '').trim() || 'غير محدد',
    supervisor: String(data.get('supervisor') || '').trim(),
    driver: String(data.get('driver') || '').trim() || 'غير محدد',
    fee: Number(data.get('fee')) || 0,
    count: selectedCodes.length,
    players: []
  };
  selectedCodes.forEach(code => {
    const player = branch.playersList.find(item => item[1] === code);
    if (!player) return;
    const sourceIndex = branch.buses.findIndex(item => item.name === player[4]);
    if (sourceIndex >= 0) {
      branch.buses[sourceIndex].count = Math.max(0, branch.buses[sourceIndex].count - 1);
      branch.buses[sourceIndex].players = branch.buses[sourceIndex].players.filter(item => item !== code);
    }
    player[4] = name;
    bus.players.push(code);
  });
  branch.buses.push(bus);
  form.reset();
  form.closest('dialog').close();
  renderBranch();
  toast(`تمت إضافة ${name} بنجاح`);
});

$('#coach-contract').addEventListener('change', updateCoachContractFields);
$('#coach-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const name = String(data.get('coachName') || '').trim();
  const role = String(data.get('coachRole') || '').trim();
  const contract = data.get('contractType') === 'part' ? 'part' : 'full';
  const profile = { name, role, contract };
  if (contract === 'full') {
    profile.salary = Number(data.get('monthlySalary')) || 0;
    profile.presentDays = Number(data.get('presentDays')) || 0;
  } else {
    profile.sessionRate = Number(data.get('sessionRate')) || 0;
    profile.sessions = Number(data.get('coachSessions')) || 0;
    profile.overtimeRate = Number(data.get('overtimeRate')) || 0;
  }
  branchRecords[currentBranch].coachProfiles.unshift(profile);
  branchRecords[currentBranch].coaches.unshift([initials(name), name, `${role} · لم يسجل بعد`, 'منتظر']);
  form.reset();
  prepareCoachDialog();
  renderCoachProfiles();
  renderBranchRecords();
  form.closest('dialog').close();
  toast(`تمت إضافة المدرب ${name}`);
});

$('#notification-btn').addEventListener('click', toggleNotifications);
$('#notification-read-all').addEventListener('click', () => {
  notifications[currentBranch].forEach(item => item.read = true);
  renderNotifications();
  toast('تم تحديد كل الإشعارات كمقروءة');
});
$('#notification-list').addEventListener('click', event => {
  const button = event.target.closest('[data-notification-id]');
  if (!button) return;
  const item = notifications[currentBranch].find(notification => notification.id === button.dataset.notificationId);
  if (!item) return;
  item.read = true;
  renderNotifications();
  closeNotifications();
  showPage(item.page);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.notification-wrap')) closeNotifications();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !$('#notification-panel').hidden) {
    closeNotifications();
    $('#notification-btn').focus();
  }
});

function downloadCsv(filename, rows) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob(['\uFEFF' + rows.map(row => row.join(',')).join('\n')], {type:'text/csv;charset=utf-8'}));
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
  toast('تم تجهيز ملف التقرير');
}
$('#export-btn').addEventListener('click', () => {
  const b = academy[currentBranch];
  const seats = seatSummary();
  downloadCsv(`academy-${currentBranch}-report.csv`, [['البيان','القيمة'],['الفرع',b.name],['اللاعبون',b.players],['الاشتراكات النشطة',b.active],['نسبة التحصيل',b.collection],['المقاعد المتاحة',seats.available]]);
});
$('[data-page="players"] .toolbar .btn-secondary').addEventListener('click', () => downloadCsv(`players-${currentBranch}.csv`, [['اللاعب','الكود','الاشتراك','الحضور','الباص','الحالة'], ...academy[currentBranch].playersList]));
$('[data-page="finance"] .page-heading .btn-secondary').addEventListener('click', () => downloadCsv(`finance-${currentBranch}.csv`, [['البيان','الفئة','التاريخ','طريقة الدفع','القيمة','الحالة'], ...branchRecords[currentBranch].transactions.map(row => [row[0],row[1],row[2],row[3],row[4],row[6]])]));

$('#today-date').textContent = new Intl.DateTimeFormat('ar-EG-u-nu-latn', {weekday:'long', day:'numeric', month:'long', year:'numeric'}).format(new Date());
preparePlayerDialog();
prepareBusDialog();
renderNotifications();
