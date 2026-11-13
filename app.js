// shortcut: prototype state is memory-only, add a backend when records must persist.
const academy = {
  badr: {
    name: 'فرع بدر', players: 148, active: 132, collection: '86%', collected: '325,400 ج.م', seats: 7,
    plans: { monthly: 1250, session: 180, monthlyCount: 95, sessionCount: 37, paused: 16 },
    attendance: { players: 34, coaches: '4/5', rate: '91%' }, finance: { income: '325,400 ج.م', expenses: '184,700 ج.م', net: '140,700 ج.م' },
    buses: [25, 27, 21], extras: [['حذاء تدريب Academy Pro','ملابس ومعدات',1850,14],['تيشيرت الأكاديمية','الزي الرسمي',450,32],['شنطة التدريب','ملابس ومعدات',620,9],['اشتراك الباص','نقل شهري',850,18]],
    playersList: [['يوسف علي','BD-1842','شهري','92%','باص 01','نشط'],['زياد محمد','BD-1791','بالسيشن','86%','باص 02','متأخر'],['أحمد هاني','BD-1755','شهري','96%','باص 02','نشط'],['مروان وليد','BD-1698','شهري','88%','بدون باص','نشط'],['سليم خالد','BD-1652','بالسيشن','79%','باص 03','متأخر']]
  },
  shorouk: {
    name: 'فرع الشروق', players: 100, active: 82, collection: '78%', collected: '218,900 ج.م', seats: 16,
    plans: { monthly: 1450, session: 210, monthlyCount: 61, sessionCount: 21, paused: 18 },
    attendance: { players: 27, coaches: '3/4', rate: '84%' }, finance: { income: '218,900 ج.م', expenses: '139,200 ج.م', net: '79,700 ج.م' },
    buses: [22, 24, 18], extras: [['حذاء تدريب Academy Pro','ملابس ومعدات',2050,8],['تيشيرت الأكاديمية','الزي الرسمي',500,24],['شنطة التدريب','ملابس ومعدات',690,15],['اشتراك الباص','نقل شهري',950,23]],
    playersList: [['آدم شريف','SH-1204','شهري','94%','باص 01','نشط'],['عمر ياسر','SH-1188','بالسيشن','82%','باص 03','نشط'],['سيف حازم','SH-1152','شهري','77%','باص 02','متأخر'],['علي أحمد','SH-1097','شهري','90%','بدون باص','نشط'],['نديم وائل','SH-1021','بالسيشن','73%','باص 01','متأخر']]
  }
};

const branchRecords = {
  badr: {
    attendance: [{name:'يوسف علي',code:'BD-1842',present:true},{name:'زياد محمد',code:'BD-1791',present:true},{name:'أحمد هاني',code:'BD-1755',present:false},{name:'مروان وليد',code:'BD-1698',present:true},{name:'سليم خالد',code:'BD-1652',present:true},{name:'فارس عماد',code:'BD-1629',present:false}],
    coaches: [['ع م','عمر مصطفى','المدرب الرئيسي · وصل 5:42 م','حاضر'],['ك س','كريم سامي','مدرب حراس · لم يسجل بعد','منتظر']],
    payments: [['ي ع','يوسف علي','متأخر 9 أيام','1,250 ج.م'],['ز م','زياد محمد','متأخر 6 أيام','900 ج.م'],['م و','مروان وليد','يستحق اليوم','1,250 ج.م']],
    transactions: [['اشتراك يوسف علي','اشتراكات','13 نوفمبر','InstaPay','+1,250 ج.م','in','مؤكد'],['صيانة باص 02','نقل','12 نوفمبر','نقدي','−3,400 ج.م','out','معتمد'],['شراء 12 كرة تدريب','متنوعات','11 نوفمبر','تحويل بنكي','−8,600 ج.م','out','للمراجعة']]
  },
  shorouk: {
    attendance: [{name:'آدم شريف',code:'SH-1204',present:true},{name:'عمر ياسر',code:'SH-1188',present:true},{name:'سيف حازم',code:'SH-1152',present:false},{name:'علي أحمد',code:'SH-1097',present:true},{name:'نديم وائل',code:'SH-1021',present:false},{name:'ياسين تامر',code:'SH-0994',present:true}],
    coaches: [['م ر','مروان رجب','المدرب الرئيسي · وصل 5:51 م','حاضر'],['أ ن','أحمد نبيل','مدرب لياقة · لم يسجل بعد','منتظر']],
    payments: [['س ح','سيف حازم','متأخر 7 أيام','1,450 ج.م'],['ن و','نديم وائل','متأخر 3 أيام','1,050 ج.م'],['ع أ','علي أحمد','يستحق غدًا','1,450 ج.م']],
    transactions: [['اشتراك آدم شريف','اشتراكات','13 نوفمبر','بطاقة بنكية','+1,450 ج.م','in','مؤكد'],['وقود باص 01','نقل','12 نوفمبر','نقدي','−2,100 ج.م','out','معتمد'],['شراء أطقم تدريب','متنوعات','10 نوفمبر','تحويل بنكي','−6,250 ج.م','out','للمراجعة']]
  }
};

let currentBranch = 'badr';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const icon = id => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;

function toast(message) {
  const el = $('#toast'); el.textContent = message; el.classList.add('show');
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
}

function showPage(name) {
  $$('.page').forEach(page => page.classList.toggle('active', page.dataset.page === name));
  $$('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.page === name));
  $('#sidebar').classList.remove('open');
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function renderPlayers() {
  $('#players-table').innerHTML = academy[currentBranch].playersList.map((player, i) => `<tr>
    <td><div class="player-cell"><span class="avatar a${(i % 3) + 1}">${player[0].split(' ').map(n=>n[0]).join('')}</span><div><b>${player[0]}</b><small>تحت ${12 + (i % 3) * 2} سنة</small></div></div></td>
    <td>${player[1]}</td><td>${player[2]}</td><td>${player[3]}</td><td>${player[4]}</td>
    <td><span class="status ${player[5] === 'نشط' ? 'present' : 'late'}">${player[5]}</span></td></tr>`).join('');
}

function renderPlans() {
  const p = academy[currentBranch].plans;
  $('#plan-cards').innerHTML = `<article class="price-plan recommended"><span>اشتراك شهري</span><strong>${p.monthly.toLocaleString('ar-EG')} <small>ج.م / شهر</small></strong><b>الأكثر اختيارًا</b><small>قيمة ثابتة مهما كان الشهر 28 أو 30 أو 31 يومًا.</small></article><article class="price-plan"><span>اشتراك بالسيشن</span><strong>${p.session.toLocaleString('ar-EG')} <small>ج.م / سيشن</small></strong><b>8 سيشن شهريًا</b><small>سيشنان كل أسبوع، ويُحسب الحضور الفعلي.</small></article>`;
}

function renderBuses() {
  $('#bus-board').innerHTML = academy[currentBranch].buses.map((count, i) => `<article class="bus-card ${count >= 27 ? 'warning' : ''}"><header><div>${icon('i-bus')}<strong>باص 0${i+1}</strong></div><span class="status ${count >= 27 ? 'late' : 'present'}">${count >= 27 ? 'يكاد يكتمل' : 'متاح'}</span></header><div class="capacity-track"><i style="width:${count/28*100}%"></i></div><div class="capacity-label"><b>${count} لاعبًا</b><span>${28-count} مقعد متاح</span></div><ul><li>المسار: ${i===0?'الحي الأول ← النادي':'المنطقة '+(i+1)+' ← النادي'}</li><li>المشرف: ${['محمد فوزي','حسام عادل','وليد رجب'][i]}</li></ul></article>`).join('');
  $('#transfer-player').innerHTML = academy[currentBranch].playersList.map((player, i) => player[4] === 'بدون باص' ? '' : `<option value="${i}">${player[0]} — ${player[4]}</option>`).join('');
}

function renderExtras() {
  $('#extras-table').innerHTML = academy[currentBranch].extras.map((item, i) => `<tr><td><b>${item[0]}</b></td><td>${item[1]}</td><td><input class="price-input" data-extra="${i}" type="number" value="${item[2]}" aria-label="سعر ${item[0]}"> ج.م</td><td><div class="stock"><i style="--stock:${Math.min(item[3]*3,100)}%"></i><span>${item[3]}</span></div></td><td><span class="status ${item[3]<10?'late':'present'}">${item[3]<10?'مخزون منخفض':'متاح'}</span></td></tr>`).join('');
}

function renderBranch() {
  const b = academy[currentBranch];
  $$('[data-branch-name]').forEach(el => el.textContent = b.name);
  $$('[data-metric]').forEach(el => el.textContent = b[el.dataset.metric]);
  $('[data-delta="active"]').textContent = `${Math.round(b.active/b.players*100)}% من اللاعبين`;
  $('[data-delta="collection"]').textContent = b.collected;
  $('[data-delta="seats"]').textContent = 'من أصل 84 مقعد';
  $('[data-plan="monthly"]').textContent = `${b.plans.monthlyCount} لاعب`;
  $('[data-plan="session"]').textContent = `${b.plans.sessionCount} لاعب`;
  $('[data-plan="paused"]').textContent = `${b.plans.paused} لاعب`;
  $('.donut b').textContent = b.active;
  $$('[data-attendance]').forEach(el => el.textContent = b.attendance[el.dataset.attendance]);
  $('#revenue-total').innerHTML = `${b.collected.replace(' ج.م','')} <small>ج.م</small>`;
  $('#finance-income').textContent = b.finance.income; $('#finance-expenses').textContent = b.finance.expenses; $('#finance-net').textContent = b.finance.net;
  renderPlayers(); renderPlans(); renderBuses(); renderExtras(); renderAttendance(); renderBranchRecords();
}

function renderAttendance() {
  const attendancePlayers = branchRecords[currentBranch].attendance;
  $('#attendance-roster').innerHTML = attendancePlayers.map((player, i) => `<div class="roster-row"><span class="avatar a${(i%3)+1}">${player.name.split(' ').map(n=>n[0]).join('')}</span><div><b>${player.name}</b><small>${player.code}</small></div><button class="attendance-toggle ${player.present?'present':''}" data-attendance-index="${i}">${player.present?'حاضر':'تسجيل حضور'}</button></div>`).join('');
  $('#attendance-count').textContent = `${attendancePlayers.filter(p => p.present).length} من ${attendancePlayers.length}`;
}

function renderBranchRecords() {
  const records = branchRecords[currentBranch];
  $$('.coach-row').forEach((row, i) => {
    const coach = records.coaches[i];
    row.innerHTML = `<div class="avatar a${i+1}">${coach[0]}</div><div><strong>${coach[1]}</strong><span>${coach[2]}</span></div><span class="status ${coach[3]==='حاضر'?'present':'late'}">${coach[3]}</span>`;
  });
  $('.payment-list').innerHTML = records.payments.map((payment, i) => `<div><span class="avatar a${(i%3)+1}">${payment[0]}</span><p><b>${payment[1]}</b><small>${payment[2]}</small></p><strong>${payment[3]}</strong></div>`).join('');
  $('[data-page="finance"] tbody').innerHTML = records.transactions.map(item => `<tr><td><b>${item[0]}</b></td><td>${item[1]}</td><td>${item[2]}</td><td>${item[3]}</td><td class="money ${item[5]}">${item[4]}</td><td><span class="status ${item[6]==='للمراجعة'?'late':'present'}">${item[6]}</span></td></tr>`).join('');
}

$('#login-form').addEventListener('submit', event => {
  event.preventDefault();
  const valid = $('#email').value.trim() === 'admin@gmail.com' && $('#password').value === 'password';
  $('#login-error').hidden = valid;
  if (!valid) return;
  $('#login-view').hidden = true; $('#app-view').hidden = false; renderBranch(); renderAttendance();
});

$('#logout-btn').addEventListener('click', () => { $('#app-view').hidden = true; $('#login-view').hidden = false; });
$('#menu-btn').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
$$('.nav-item').forEach(item => item.addEventListener('click', () => showPage(item.dataset.page)));
$$('[data-go]').forEach(button => button.addEventListener('click', () => { const dialog = button.closest('dialog'); if(dialog) dialog.close(); showPage(button.dataset.go); }));
$$('[data-open]').forEach(button => button.addEventListener('click', () => $(`#${button.dataset.open}`).showModal()));
$$('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));

$('#branch-select').addEventListener('change', event => { currentBranch = event.target.value; renderBranch(); toast(`تم عرض بيانات ${academy[currentBranch].name}`); });
$('#player-search').addEventListener('input', event => { const query = event.target.value.trim(); $$('#players-table tr').forEach(row => row.hidden = !row.textContent.includes(query)); });

$('#player-form').addEventListener('submit', event => {
  event.preventDefault(); const name = new FormData(event.target).get('name').trim();
  academy[currentBranch].playersList.unshift([name, `${currentBranch==='badr'?'BD':'SH'}-${1900+academy[currentBranch].playersList.length}`,'شهري','—','بدون باص','نشط']);
  academy[currentBranch].players++; renderBranch(); event.target.closest('dialog').close(); event.target.reset(); toast(`تمت إضافة ${name} بنجاح`);
});

$('#subscription-form').addEventListener('submit', event => { event.preventDefault(); event.target.closest('dialog').close(); toast('تم إنشاء الاشتراك التجريبي بنجاح'); });
$$('input[name="plan"]').forEach(input => input.addEventListener('change', () => { $('#month-note').textContent = input.value === 'monthly' ? 'الفترة: 1–30 نوفمبر · السعر لا يتأثر بعدد أيام الشهر.' : 'الباقة: 8 سيشن · سيشنان أسبوعيًا، ويُخصم عند تسجيل الحضور.'; }));

$('#attendance-roster').addEventListener('click', event => { const button = event.target.closest('[data-attendance-index]'); if(!button) return; const player = branchRecords[currentBranch].attendance[button.dataset.attendanceIndex]; player.present = !player.present; renderAttendance(); });
$('#mark-all').addEventListener('click', () => { branchRecords[currentBranch].attendance.forEach(player => player.present = true); renderAttendance(); toast('تم تسجيل حضور كل اللاعبين في القائمة'); });
$$('[data-att-tab]').forEach(button => button.addEventListener('click', () => { $$('[data-att-tab]').forEach(b=>b.classList.remove('active')); $$('.attendance-tab').forEach(tab=>tab.classList.remove('active')); button.classList.add('active'); $(`#${button.dataset.attTab}`).classList.add('active'); }));
$('#coach-photo').addEventListener('change', event => { const file = event.target.files[0]; if(!file) return; const preview = $('#coach-preview'); preview.src = URL.createObjectURL(file); preview.hidden = false; $$('.camera-box > svg, .camera-box > strong, .camera-box > span').forEach(el=>el.hidden=true); });
const coachActionLabel = document.createElement('label');
coachActionLabel.innerHTML = 'نوع التسجيل<select id="coach-action"><option value="arrival">حضور</option><option value="departure">انصراف</option></select>';
$('#coach-checkin-form').prepend(coachActionLabel);
$('#coach-action').addEventListener('change', event => { $('#coach-checkin-form label:nth-of-type(3)').childNodes[0].textContent = event.target.value === 'arrival' ? 'وقت الوصول' : 'وقت الانصراف'; });
$('#coach-checkin-form').addEventListener('submit', event => { event.preventDefault(); if(!$('#coach-photo').files.length) return toast('ارفع صورة الإثبات أولًا'); toast(`تم تسجيل ${$('#coach-action').value === 'arrival' ? 'حضور' : 'انصراف'} المدرب وإرفاق الصورة`); });

$('#transfer-form').addEventListener('submit', event => {
  event.preventDefault();
  const player = academy[currentBranch].playersList[Number($('#transfer-player').value)];
  const source = Number(player[4].match(/\d+/)[0])-1;
  const target = Number($('#transfer-bus').value)-1;
  if(source === target) return toast('اختر باصًا مختلفًا عن الباص الحالي');
  if(academy[currentBranch].buses[target] >= 28) return toast('هذا الباص مكتمل السعة');
  academy[currentBranch].buses[source]--; academy[currentBranch].buses[target]++; player[4] = `باص 0${target+1}`;
  renderPlayers(); renderBuses(); toast(`تم ترحيل ${player[0]} من باص 0${source+1} إلى باص 0${target+1}`);
});
$('#save-extras').addEventListener('click', () => { $$('.price-input').forEach(input => academy[currentBranch].extras[input.dataset.extra][2] = Number(input.value)); toast(`تم حفظ أسعار ${academy[currentBranch].name} فقط`); });

function downloadCsv(filename, rows) {
  const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob(['\uFEFF'+rows.map(row=>row.join(',')).join('\n')], {type:'text/csv;charset=utf-8'})); link.download = filename; link.click(); URL.revokeObjectURL(link.href); toast('تم تجهيز ملف التقرير');
}
$('#export-btn').addEventListener('click', () => { const b = academy[currentBranch]; downloadCsv(`academy-${currentBranch}-report.csv`, [['البيان','القيمة'],['الفرع',b.name],['اللاعبون',b.players],['الاشتراكات النشطة',b.active],['نسبة التحصيل',b.collection],['المقاعد المتاحة',b.seats]]); });
$('[data-page="players"] .toolbar .btn-secondary').addEventListener('click', () => downloadCsv(`players-${currentBranch}.csv`, [['اللاعب','الكود','الاشتراك','الحضور','الباص','الحالة'], ...academy[currentBranch].playersList]));
$('[data-page="finance"] .page-heading .btn-secondary').addEventListener('click', () => downloadCsv(`finance-${currentBranch}.csv`, [['البيان','الفئة','التاريخ','طريقة الدفع','القيمة','الحالة'], ...branchRecords[currentBranch].transactions.map(row => [row[0],row[1],row[2],row[3],row[4],row[6]])]));

$('#today-date').textContent = new Intl.DateTimeFormat('ar-EG', {weekday:'long', day:'numeric', month:'long', year:'numeric'}).format(new Date());
