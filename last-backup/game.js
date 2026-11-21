/* =========================================================
   〈마지막 백업〉 EP.01 — 체크아웃 10분 전
   게임 상태·파일 뷰어·암호 퍼즐·힌트·최종 보고서
   ========================================================= */
(function () {
  "use strict";

  /* ---------------- 사건 정보 ---------------- */
  var CASE = {
    victim: "한서연",
    backupAt: "2026-11-18 03:14:22",
    checkout: 600 // 초 (10분)
  };

  var SPEAKER = {
    "박준호": "n1",
    "한서연": "n2",
    "윤아름": "n3",
    "최민석": "n4",
    "김다인": "n5"
  };

  /* ---------------- 채팅 로그 데이터 ---------------- */
  var CHAT = [
    { day: "2026-11-17 (화)" },
    { t: "12:10", n: "김다인", m: [
      "아 맞다 대표님 차(24바 5178) 오늘도 회사 앞에 세워두셨네요 ㅋㅋ"
    ] },
    { t: "18:40", n: "박준호", m: [
      "오늘 밤엔 사무실에서 지표 정리 좀 하다가 들어갈게요.",
      "내일 미팅 자료 마무리하고요."
    ] },
    { t: "18:41", n: "김다인", m: ["넵"] },
    { t: "18:44", n: "김다인", m: [
      "서연님, 카드 끝자리 4471 맞죠? 이번 달 정산에 등록할게요."
    ] },
    { t: "18:45", n: "한서연", m: ["네 맞아요!"] },
    { t: "20:12", n: "최민석", m: [
      "대표님, 리텐션 수치 엑셀 어디에 있나요?",
      "대시보드 캡처랑 숫자가 달라서 여쭤봅니다."
    ] },
    { t: "20:15", n: "박준호", m: ["그건 제가 정리할게요. 건드리지 마세요."] },
    { t: "20:16", n: "최민석", m: ["넵 알겠습니다"] },
    { t: "21:12", n: "한서연", m: [
      "펜션 도착! 창밖이 바로 바다임 🌊",
      "여기 오니까 사천면 생각난다. 할머니 댁 그대로 비어 있는데, 열쇠는 아직 나한테 있어."
    ] },
    { t: "21:13", n: "윤아름", m: ["부럽다ㅠㅠ 내일 10시 데모 화이팅!!"] },
    { t: "21:14", n: "한서연", m: ["ㅋㅋㅋ 고마워 준비 다 했어"] },
    { t: "22:41", n: "한서연", m: [
      "최종 시안 올렸어요. 대시보드 캡처도 새로 넣었습니다."
    ] },
    { t: "22:44", n: "박준호", m: ["확인했습니다. 내일 잘 부탁드려요."] },
    { t: "22:50", n: "최민석", m: [
      "저는 그 지표 이름만 보면 좀 그래서요",
      "그냥 promise라고 부를게요. 투자자한테 한 약속이니까."
    ] },
    { t: "22:52", n: "박준호", m: [
      "지표를 그런 식으로 부르지 마세요. 정식 명칭은 리텐션입니다."
    ] },
    { t: "22:53", n: "최민석", deleted: true },
    { t: "23:41", n: "한서연", m: [
      "이거 내일 아침에 마저 볼게요. 자러 갑니다 🌙"
    ] },
    { day: "2026-11-18 (수)" },
    { t: "00:41", n: "박준호", m: [
      "서연 씨랑 방금 통화했어요. 데모 준비 다 됐대요 ㅎㅎ",
      "내일 뵙겠습니다."
    ] },
    { t: "07:52", n: "윤아름", m: ["서연아?"] },
    { t: "09:40", n: "김다인", m: ["서연님 연락 안 되나요? 미팅 10시인데"] },
    { t: "10:03", n: "박준호", m: [
      "어제 밤 11시 반에 제가 전화했을 때는 괜찮다고 했는데… 이상하네요.",
      "저는 오늘 아침에 사무실에 있었는데 연락이 안 되네요."
    ] },
    { t: "10:20", n: "윤아름", m: [
      "대표님, 새벽 2시에 사무실 불 다 꺼져 있었어요. 어디 계셨어요?"
    ] },
    { t: "10:21", n: "박준호", m: ["집에 있었어요. 그 얘긴 나중에 합시다."] }
  ];

  /* ---------------- 음성메모 대본 ---------------- */
  var REC_DURATION = 56;
  var REC = [
    { t: 0, x: "…(숨소리, 창밖의 바람 소리)", amb: true },
    { t: 2, x: "나, 한서연. 11월 18일 새벽 2시 14분." },
    { t: 5, x: "이걸 녹음해두는 건, 나중에 내가 이 말을 안 믿을까 봐." },
    { t: 9, x: "23시 31분하고 0시 39분에 준호 오빠한테서 두 번 전화가 왔어. 둘 다 안 받았어." },
    { t: 15, x: "받으면 내가 뭘 알고 있는지 들킬 것 같아서." },
    { t: 18, x: "오늘 밤에 확인했어. 제안서 12페이지 리텐션 41.7%. 원본 로그엔 27.4%야." },
    { t: 23, x: "내가 디자인한 그 페이지가 거짓말이 된 거지. 내 손으로." },
    { t: 27, x: "아침 10시에 이걸 그대로 보여줄 순 없어. 그러면 나도 같이 끝나." },
    { t: 31, x: "데모엔 안 나갈 거야. 대신 원본 들고 9시에 먼저 가서 얘기할 거야." },
    { t: 35, x: "내 폰은 회사 계정으로 백업돼. 내가 쓰는 게 다 올라가. 그래서 지금 동기화를 끊을 거야." },
    { t: 40, x: "아까부터 아래 주차장에 차 한 대가 불 켜진 채로 서 있어. 우리 차가 아닌데. 번호판이 잘 안 보여." },
    { t: 45, x: "5시 20분 첫차 타고 사천 쪽으로 갈 거야. 할머니 댁 비어 있고, 열쇠는 가방 안쪽에 있어." },
    { t: 50, x: "바다 보고 정리하고 연락할게. 엄마한테는 아직 말하지 마. 진짜야." },
    { t: 53, x: "(한숨) …사람 없는 데서 잠깐만 숨고 싶어." },
    { t: 56, x: "(녹음 종료)", amb: true }
  ];

  /* ---------------- 사진 SVG ---------------- */
  var PHOTO_SVG = '' +
  '<svg viewBox="0 0 320 420" role="img" aria-label="새벽 세 시, 펜션 창밖 야경. 바다와 주차장, 그 아래 차 한 대가 서 있다.">' +
    '<defs>' +
      '<linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#050c18"/><stop offset="45%" stop-color="#0c1d33"/>' +
        '<stop offset="78%" stop-color="#173553"/><stop offset="100%" stop-color="#20455f"/>' +
      '</linearGradient>' +
      '<linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#123049"/><stop offset="100%" stop-color="#081a2a"/>' +
      '</linearGradient>' +
      '<radialGradient id="moonG">' +
        '<stop offset="0%" stop-color="#ffe9c4" stop-opacity=".8"/>' +
        '<stop offset="45%" stop-color="#ffdca8" stop-opacity=".16"/>' +
        '<stop offset="100%" stop-color="#ffdca8" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<linearGradient id="lampG" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#ffd79a" stop-opacity=".34"/>' +
        '<stop offset="100%" stop-color="#ffd79a" stop-opacity="0"/>' +
      '</linearGradient>' +
    '</defs>' +
    '<rect width="320" height="420" fill="url(#skyG)"/>' +
    '<g fill="#d7e8ff" opacity=".5">' +
      '<circle cx="42" cy="38" r="1.1"/><circle cx="88" cy="64" r=".8"/>' +
      '<circle cx="146" cy="30" r=".9"/><circle cx="188" cy="58" r=".7"/>' +
      '<circle cx="272" cy="120" r=".9"/><circle cx="60" cy="110" r=".7"/>' +
      '<circle cx="300" cy="46" r="1"/>' +
    '</g>' +
    '<circle cx="238" cy="70" r="48" fill="url(#moonG)"/>' +
    '<circle cx="238" cy="70" r="12.5" fill="#ffeccb"/>' +
    '<circle cx="233.5" cy="66" r="2.6" fill="#f0d5a4" opacity=".55"/>' +
    '<circle cx="242" cy="75" r="1.7" fill="#f0d5a4" opacity=".45"/>' +
    '<rect y="196" width="320" height="60" fill="url(#seaG)"/>' +
    '<g stroke="#ffdca8" stroke-linecap="round" stroke-opacity=".38">' +
      '<line x1="230" y1="203" x2="248" y2="203" stroke-width="1.8"/>' +
      '<line x1="226" y1="211" x2="252" y2="211" stroke-width="1.4"/>' +
      '<line x1="232" y1="220" x2="246" y2="220" stroke-width="1.6"/>' +
      '<line x1="222" y1="229" x2="254" y2="229" stroke-width="1.2"/>' +
      '<line x1="234" y1="238" x2="244" y2="238" stroke-width="1.5"/>' +
    '</g>' +
    '<g stroke="#9dc4e8" stroke-opacity=".13" stroke-width="1.4" stroke-linecap="round">' +
      '<line x1="18" y1="212" x2="64" y2="212"/><line x1="88" y1="222" x2="140" y2="222"/>' +
      '<line x1="160" y1="214" x2="204" y2="214"/><line x1="24" y1="236" x2="76" y2="236"/>' +
      '<line x1="150" y1="242" x2="202" y2="242"/>' +
    '</g>' +
    '<rect y="256" width="320" height="46" fill="#0b1a26"/>' +
    '<path d="M0 302 L320 296 L320 420 L0 420 Z" fill="#0a141d"/>' +
    '<g opacity=".9">' +
      '<rect x="14" y="300" width="82" height="52" fill="#0d1a24"/>' +
      '<rect x="24" y="312" width="18" height="14" fill="#ffca8a" opacity=".55"/>' +
      '<rect x="52" y="312" width="18" height="14" fill="#1a2a38"/>' +
      '<rect x="24" y="332" width="18" height="14" fill="#1a2a38"/>' +
      '<rect x="52" y="332" width="18" height="14" fill="#22384a" opacity=".8"/>' +
    '</g>' +
    '<rect x="56" y="252" width="3" height="96" fill="#1b2a37"/>' +
    '<circle cx="57.5" cy="252" r="4.5" fill="#ffd79a" opacity=".85"/>' +
    '<path d="M57 254 L14 350 L104 350 Z" fill="url(#lampG)"/>' +
    '<g opacity=".85">' +
      '<rect x="120" y="330" width="86" height="20" rx="6" fill="#1b2836"/>' +
      '<path d="M134 330 L142 319 L186 319 L194 330 Z" fill="#22333f"/>' +
      '<rect x="146" y="321.5" width="15" height="6" rx="1.4" fill="#40586d" opacity=".65"/>' +
      '<rect x="168" y="321.5" width="15" height="6" rx="1.4" fill="#40586d" opacity=".65"/>' +
      '<circle cx="136" cy="351" r="5.5" fill="#060c12"/>' +
      '<circle cx="190" cy="351" r="5.5" fill="#060c12"/>' +
      '<rect x="148" y="343" width="30" height="7" rx="1.2" fill="#cfd6c4" opacity=".9"/>' +
      '<circle cx="205" cy="336" r="2.2" fill="#ffd79a" opacity=".7"/>' +
      '<ellipse cx="163" cy="316" rx="30" ry="7" fill="#ffd79a" opacity=".07"/>' +
    '</g>' +
    '<g fill="#05090e" opacity=".92">' +
      '<rect x="0" y="0" width="320" height="10"/>' +
      '<rect x="0" y="0" width="11" height="420"/>' +
      '<rect x="309" y="0" width="11" height="420"/>' +
      '<rect x="0" y="410" width="320" height="10"/>' +
      '<rect x="99" y="10" width="12" height="400"/>' +
      '<rect x="209" y="10" width="12" height="400"/>' +
      '<rect x="11" y="150" width="298" height="11"/>' +
    '</g>' +
    '<g fill="#243444" opacity=".5">' +
      '<rect x="99" y="10" width="1.4" height="400"/>' +
      '<rect x="209" y="10" width="1.4" height="400"/>' +
      '<rect x="11" y="150" width="298" height="1.2"/>' +
    '</g>' +
    '<rect x="0" y="0" width="320" height="420" fill="#0b1c33" opacity=".12"/>' +
  '</svg>';

  var PLATE_SVG = '' +
  '<svg viewBox="0 0 260 92" role="img" aria-label="번호판 확대 이미지: 24바 5178">' +
    '<rect width="260" height="92" fill="#0b141d"/>' +
    '<rect x="46" y="20" width="168" height="52" rx="6" fill="#e6e4d8" stroke="#8e968a"/>' +
    '<text x="130" y="58" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="27" font-weight="700" fill="#1b2a1f" letter-spacing="2">24바 5178</text>' +
  '</svg>';

  /* ---------------- 파일 정의 ---------------- */
  var FILES = [
    {
      id: "log",
      name: "안내_복구로그.txt",
      icon: "▤",
      label: "시스템 로그",
      meta: "텍스트 · 18 KB · 03:14:22",
      render: renderLog
    },
    {
      id: "chat",
      name: "채팅백업_프로젝트팀.log",
      icon: "▦",
      label: "단톡방 로그",
      meta: "메신저 내보내기 · 1.2 MB · 10:47",
      render: renderChat
    },
    {
      id: "receipt",
      name: "영수증_편의점_심야.png",
      icon: "▣",
      label: "영수증 사진",
      meta: "이미지 · 412 KB · 02:47",
      render: renderReceipt
    },
    {
      id: "photo",
      name: "사진_창밖_야경.svg",
      icon: "◫",
      label: "사진 + EXIF",
      meta: "이미지 · 2.4 MB · 03:09:41",
      render: renderPhoto
    },
    {
      id: "voice",
      name: "음성메모_0214.rec",
      icon: "◉",
      label: "음성메모",
      meta: "오디오 · 3.1 MB · 02:14",
      render: renderVoice
    },
    {
      id: "memo",
      name: "비밀메모_초안.lock",
      icon: "▩",
      label: "잠긴 파일",
      meta: "암호화 · 88 KB · 03:13",
      locked: true,
      code: "4471",
      mode: "digits",
      render: renderMemo
    },
    {
      id: "dm",
      name: "DM백업_익명.lock",
      icon: "▥",
      label: "잠긴 파일",
      meta: "암호화 · 640 KB · 03:14",
      locked: true,
      code: "promise",
      mode: "text",
      render: renderDM
    },
    {
      id: "call",
      name: "통화기록_1118.csv",
      icon: "▧",
      label: "복구 불가",
      meta: "0 B · 동기화 실패",
      unrecoverable: true,
      render: renderCallFail
    }
  ];

  var READABLE = FILES.filter(function (f) { return !f.unrecoverable; });

  var HINTS = {
    memo: {
      title: "힌트 — 비밀메모_초안.lock",
      s1: "그날 새벽의 영수증을 먼저 여세요. 결제 수단 줄에 카드 번호가 찍혀 있는데, 마지막 네 자리 중 한 글자가 번져 있습니다. 같은 카드 번호가 단톡방에서 온전한 숫자로 한 번 언급됩니다.",
      s2: "정답은 <b>4471</b> 입니다. 단톡방 11-17 18:44, 김다인 — '서연님, 카드 끝자리 4471 맞죠?'"
    },
    dm: {
      title: "힌트 — DM백업_익명.lock",
      s1: "비밀메모 초안의 마지막 줄이 이 파일의 암호를 가리킵니다. '그 애가 리텐션을 부르던 단어'를 단톡방에서 찾으세요. 대표가 듣기 싫어했던 그 말입니다.",
      s2: "정답은 <b>PROMISE</b> 입니다. 인턴 최민석이 11-17 22:50에 '투자자한테 한 약속'이라며 promise라고 불렀습니다. 이 단어가 곧 익명 계정의 정체를 증명합니다."
    }
  };

  /* ---------------- 보고서 질문 ---------------- */
  var QUESTIONS = [
    {
      q: "그날 밤, 누가 거짓말을 했습니까?",
      opts: [
        { text: "박준호 대표 — '통화했다'는 말도, '서울에 있었다'는 말도 사실이 아니다", ok: true },
        { text: "윤아름 — 복구 권한을 쥐고 로그를 손댔다", fb: "윤아름은 09:12에 복구 권한을 위임한 사람입니다. 그녀가 백업 로그를 만들 수 있는 위치가 아니었습니다." },
        { text: "최민석 — 처음부터 익명 계정으로 서연을 유인했다", fb: "최민석은 익명 계정으로 숨었을 뿐, 통화나 차량 동선에 대한 거짓 진술은 하지 않았습니다." },
        { text: "한서연 — 실종된 적이 없으니 모든 진술이 거짓이다", fb: "서연은 자리를 피했지만, 기록과 어긋나는 말을 하지는 않았습니다. 거짓말은 '기록과 충돌하는 진술'에서 찾아야 합니다." }
      ],
      right: "맞습니다. 00:41의 '방금 통화했어요'는 음성메모의 '0시 39분 전화, 받지 않았다'와 어긋나고, 10:21의 '집에 있었어요'는 03:09 사진에 찍힌 24바 5178(대표 차량)과 어긋납니다."
    },
    {
      q: "자동 백업이 03시 14분에 멈춘 이유는 무엇입니까?",
      opts: [
        { text: "폰 배터리가 방전되어 전원이 꺼졌다", fb: "복구 로그에 배터리 87%·충전 중으로 기록돼 있습니다. 방전이 아닙니다." },
        { text: "펜션 와이파이가 끊겨 업로드가 실패했다", fb: "이 기기는 Wi-Fi가 아니라 LTE 회선으로 백업했습니다. 회선 문제도 아닙니다." },
        { text: "서연이 직접 동기화를 끊었다 — 폰이 회사 공용 계정으로 백업되는 걸 알았기 때문", ok: true },
        { text: "박준호가 원격으로 세션을 로그아웃시켰다", fb: "로그는 '실행 위치: 기기에서 직접(원격 아님)'이라고 명시합니다. 원격 종료가 아닙니다." }
      ],
      right: "맞습니다. 로그의 '기기에서 직접 실행', 음성메모의 '지금 동기화를 끊을 거야', 메모의 '내 폰은 회사 계정으로 백업된다'가 한 줄로 이어집니다."
    },
    {
      q: "서연은 지금 어디에 있습니까?",
      opts: [
        { text: "서울 모노랩 사무실에서 데모를 준비하고 있다", fb: "DM에서 최민석이 '오늘은 사무실 오지 마세요'라고 말했습니다. 그녀가 사무실에 있을 이유가 없습니다." },
        { text: "펜션 302호 안에 아직 있다", fb: "03:09 사진은 방 안에서 찍혔지만, 그 뒤 그녀는 방을 떠났습니다. 체크아웃 시각까지 방이 비어 있었습니다." },
        { text: "강릉역에서 첫차를 기다리고 있다", fb: "첫차는 사천 방면입니다. 5시 20분 첫차, 열쇠, 할머니 댁이라는 말이 한 방향을 가리킵니다." },
        { text: "강릉 사천면, 비어 있는 할머니 댁 — 살아서 스스로 숨었다", ok: true }
      ],
      right: "맞습니다. 단톡방의 '사천면 할머니 댁, 열쇠는 나한테 있어', 음성메모의 '5시 20분 첫차 타고 사천 쪽', DM의 '사천 쪽이라고 했죠?'가 같은 장소를 가리킵니다."
    }
  ];

  /* ---------------- 상태 ---------------- */
  var state = {
    viewed: {},
    unlocked: {},
    current: null,
    hints: 0,
    hintStage: {},
    started: Date.now(),
    solved: [false, false, false],
    wrongSubmits: 0,
    finished: false
  };

  var el = {
    list: document.getElementById("fileList"),
    viewer: document.getElementById("viewer"),
    count: document.getElementById("fileCount"),
    gaugeFill: document.getElementById("gaugeFill"),
    gaugeLabel: document.getElementById("gaugeLabel"),
    reportBtn: document.getElementById("reportBtn"),
    reportHint: document.getElementById("reportHint"),
    clock: document.getElementById("clockText"),
    status: document.getElementById("gtStatus"),
    hintModal: document.getElementById("hintModal"),
    hintBody: document.getElementById("hintBody"),
    hintTitle: document.getElementById("hintTitle"),
    hintNext: document.getElementById("hintNext"),
    reportModal: document.getElementById("reportModal"),
    reportBody: document.getElementById("reportBody"),
    reportFoot: document.getElementById("reportFoot"),
    submit: document.getElementById("submitReport")
  };

  /* ---------------- 유틸 ---------------- */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function mmss(sec) {
    var s = Math.max(0, Math.floor(sec));
    return pad(Math.floor(s / 60)) + ":" + pad(s % 60);
  }
  function eschtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function toast(msg) {
    var t = document.querySelector(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(t._tm);
    t._tm = setTimeout(function () { t.classList.remove("on"); }, 1800);
  }

  /* ---------------- 파일 목록 ---------------- */
  function renderList() {
    var done = 0;
    READABLE.forEach(function (f) { if (state.viewed[f.id]) done++; });

    el.list.innerHTML = READABLE.concat(FILES.filter(function (f) { return f.unrecoverable; }))
      .map(function (f) {
        var isCur = state.current === f.id;
        var cls = "fitem";
        var badge = "";
        if (f.unrecoverable) {
          cls += " is-fail";
          badge = '<span class="fi-badge fail">복구 불가</span>';
        } else if (f.locked && !state.unlocked[f.id]) {
          badge = '<span class="fi-badge lock">암호 필요</span>';
        } else if (state.viewed[f.id]) {
          cls += " done";
          badge = '<span class="fi-badge done">확인</span>';
        } else {
          badge = '<span class="fi-badge">미확인</span>';
        }
        return '<li><button class="' + cls + '" type="button" data-id="' + f.id + '"' +
          (isCur ? ' aria-current="true"' : '') + '>' +
          '<span class="fi-icon" aria-hidden="true">' + f.icon + '</span>' +
          '<span class="fi-body"><span class="fi-name">' + f.name + '</span>' +
          '<span class="fi-sub">' + badge + '<span>' + f.meta.split(" · ").pop() + '</span></span></span>' +
          '</button></li>';
      }).join("");

    el.count.textContent = done + " / " + READABLE.length;
    var pct = Math.round((done / READABLE.length) * 100);
    el.gaugeFill.style.width = pct + "%";
    el.gaugeLabel.textContent = "단서 " + done + " / " + READABLE.length;

    if (done >= READABLE.length) {
      el.reportBtn.disabled = false;
      el.reportBtn.classList.add("is-ready");
      el.reportHint.textContent = "세 가지 질문에 답하세요";
    } else {
      el.reportBtn.disabled = true;
      el.reportBtn.classList.remove("is-ready");
      el.reportHint.textContent = "파일 " + READABLE.length + "개를 모두 확인하세요";
    }
    Array.prototype.forEach.call(el.list.querySelectorAll("[data-id]"), function (b) {
      b.addEventListener("click", function () { select(b.getAttribute("data-id")); });
    });
  }

  /* ---------------- 파일 열기 ---------------- */
  function select(id) {
    var f = null;
    for (var i = 0; i < FILES.length; i++) { if (FILES[i].id === id) f = FILES[i]; }
    if (!f) return;
    stopAudio();
    state.current = id;
    renderList();
    renderViewer(f);
    if (!el.viewer.hasAttribute("tabindex")) el.viewer.setAttribute("tabindex", "-1");
    el.viewer.focus({ preventScroll: true });
    if (window.matchMedia("(max-width: 859px)").matches) {
      var top = el.viewer.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  }

  function vhead(f, extra) {
    return '<div class="v-head">' +
      '<span class="v-icon" aria-hidden="true">' + f.icon + '</span>' +
      '<div class="v-title"><div class="v-name">' + f.name + '</div>' +
      '<div class="v-meta">' + (extra || f.meta) + '</div></div></div>';
  }

  function renderViewer(f) {
    if (f.locked && !state.unlocked[f.id]) {
      el.viewer.innerHTML = vhead(f) + renderLockScreen(f);
      bindLock(f);
      return;
    }
    var html = f.render(f);
    el.viewer.innerHTML = html;
    if (f.locked && state.unlocked[f.id]) {
      el.viewer.classList.add("unlock-flash");
      setTimeout(function () { el.viewer.classList.remove("unlock-flash"); }, 520);
    }
    if (state.viewed[f.id] !== true && !f.unrecoverable) {
      state.viewed[f.id] = true;
      renderList();
    } else if (f.unrecoverable && !state.viewed[f.id]) {
      state.viewed[f.id] = true; // 목록 표시용, 진행도에는 미포함
      renderList();
    }
    bindViewer(f);
  }

  /* ---------------- 잠금 화면 ---------------- */
  function renderLockScreen(f) {
    var isDigits = f.mode === "digits";
    return '<div class="lock-box">' +
      '<div class="lock-icon" aria-hidden="true">🔒</div>' +
      '<div class="lock-name">' + f.name + '</div>' +
      '<p class="lock-sub">복구된 파일이 암호로 보호되어 있습니다.<br>' +
      (isDigits ? "숫자 4자리" : "영문 단어") + '를 입력하세요.</p>' +
      '<p class="lock-hint">' +
      (isDigits
        ? '<b>파일 힌트</b> — 그날 새벽 영수증에 찍힌 카드 번호의 끝 네 자리. 한 글자가 번져 있습니다.'
        : '<b>파일 힌트</b> — 그 아이가 이 숫자를 부르던 다른 이름. 단톡방 어딘가에 남아 있습니다.') +
      '</p>' +
      '<div class="lock-form">' +
      '<input class="lock-input" id="lockInput" type="text" autocomplete="off" spellcheck="false" ' +
      'inputmode="' + (isDigits ? "numeric" : "text") + '" maxlength="' + (isDigits ? "4" : "10") + '" ' +
      'placeholder="' + (isDigits ? "••••" : "PASSWORD") + '" aria-label="암호 입력" />' +
      '<button class="lock-go" type="button" id="lockGo">복호화</button>' +
      '</div>' +
      '<p class="lock-msg" id="lockMsg">시도 횟수 제한은 없습니다. 힌트를 써도 됩니다.</p>' +
      '<div class="lock-actions">' +
      '<button class="mini-btn hint" type="button" id="lockHint">힌트 보기</button>' +
      '</div></div>';
  }

  function bindLock(f) {
    var input = el.viewer.querySelector("#lockInput");
    var go = el.viewer.querySelector("#lockGo");
    var msg = el.viewer.querySelector("#lockMsg");
    var form = el.viewer.querySelector(".lock-form");
    var hintBtn = el.viewer.querySelector("#lockHint");
    if (f.mode === "digits") {
      input.addEventListener("input", function () {
        input.value = input.value.replace(/[^0-9]/g, "").slice(0, 4);
      });
    }
    function attempt() {
      var v = input.value.trim().toLowerCase();
      if (!v) {
        msg.textContent = "암호를 입력하세요.";
        msg.className = "lock-msg bad";
        return;
      }
      if (v === f.code) {
        state.unlocked[f.id] = true;
        state.viewed[f.id] = true;
        msg.textContent = "복호화 성공 — 파일을 엽니다.";
        msg.className = "lock-msg good";
        setTimeout(function () { renderViewer(f); renderList(); }, 380);
      } else {
        msg.textContent = "암호가 일치하지 않습니다. (" + (f.mode === "digits" ? "숫자 4자리" : "영문 단어") + ")";
        msg.className = "lock-msg bad";
        form.classList.remove("shake");
        void form.offsetWidth;
        form.classList.add("shake");
        input.focus();
        input.select();
      }
    }
    go.addEventListener("click", attempt);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") attempt(); });
    hintBtn.addEventListener("click", function () { openHint(f.id); });
  }

  /* ---------------- 각 파일 뷰 ---------------- */
  function renderLog() {
    var L = [
      ['<span class="t-dim">CLOUDVAULT RECOVERY CONSOLE v4.2</span>'],
      ['복구 로그 · 세션 RC-2026-1118-0451'],
      ['<span class="t-dim">================================</span>'],
      ['계정    han.seoyeon@monolab.kr'],
      ['스냅샷  <span class="t-key">sync_20261118_0314</span>'],
      ['기기    Galaxy S23 (han-s23)'],
      ['        <span class="t-dim">등록 기기 2대 중 1대</span>'],
      ['회선    LTE <span class="t-dim">(Wi-Fi 아님)</span>'],
      ['배터리  <span class="t-ok">87% · 충전 중</span>'],
      ['<span class="t-dim">--------------------------------</span>'],
      ['[03:14:07] 동기화 시작 · 변경 7건'],
      ['[03:14:09] <span class="t-ok">OK</span>  채팅백업_프로젝트팀.log'],
      ['[03:14:10] <span class="t-ok">OK</span>  사진_창밖_야경.svg'],
      ['[03:14:11] <span class="t-ok">OK</span>  영수증_편의점_심야.png'],
      ['[03:14:12] <span class="t-ok">OK</span>  음성메모_0214.rec'],
      ['[03:14:13] <span class="t-ok">OK</span>  비밀메모_초안.lock <span class="t-dim">(암호화)</span>'],
      ['[03:14:14] <span class="t-ok">OK</span>  DM백업_익명.lock <span class="t-dim">(암호화)</span>'],
      ['[03:14:15] <span class="t-bad">실패</span> 통화기록_1118.csv <span class="t-dim">(0 B)</span>'],
      ['           └ 기기에 파일이 없음'],
      ['             <span class="t-dim">(삭제 또는 동기화 제외)</span>'],
      ['[03:14:22] <span class="t-warn">세션 종료</span> — 요청: 사용자'],
      ['           └ 실행: <span class="t-warn">기기에서 직접</span>'],
      ['             <span class="t-warn">(원격 아님)</span>'],
      ['           └ 이후 업로드 기록 없음'],
      ['<span class="t-dim">--------------------------------</span>'],
      ['<span class="t-dim">담당자 메모</span>'],
      ['- 배터리·네트워크 문제로 인한'],
      ['  중단이 아닙니다.'],
      ['- 원격 로그아웃 기록도 없습니다.'],
      ['- 통화기록_1118.csv 는'],
      ['  복구되지 않습니다.'],
      ['- 등록 2번째 기기 마지막 접속'],
      ['  2026-11-15 21:04']
    ];
    return vhead(FILES[0]) +
      '<div class="term">' + L.map(function (l) { return l[0]; }).join("\n") + '</div>' +
      '<p class="v-note">이 로그는 <b>백업이 왜 끝났는지</b>를 기계의 말로 남깁니다. 사람의 말과 다를 수 있으니, 다른 파일과 나란히 놓고 읽어 보세요.</p>';
  }

  function renderChat() {
    var rows = CHAT.map(function (m) {
      if (m.day) return '<div class="chat-day">' + m.day + '</div>';
      var cls = SPEAKER[m.n] || "";
      var body = m.deleted
        ? '<span class="chat-deleted">(삭제된 메시지입니다)</span>'
        : m.m.map(function (line) { return '<span class="chat-text">' + eschtml(line) + '</span>'; }).join("");
      return '<div class="chat-row">' +
        '<span class="chat-time">' + m.t + '</span>' +
        '<div class="chat-main"><span class="chat-name ' + cls + '">' + m.n + '</span>' +
        (m.deleted ? '<span class="chat-text">' + body + '</span>' : body) + '</div></div>';
    }).join("");

    return vhead(FILES[1], "메신저 내보내기 · 1.2 MB · 2026-11-18 10:47 · 최근 24시간") +
      '<div class="chat-wrap">' +
      '<div class="chat-day">모노랩 · 전사 (5명) — 내보내기</div>' +
      rows +
      '<div class="chat-tail">— 내보내기 끝 —</div>' +
      '</div>' +
      '<p class="v-note">말투와 시각을 함께 보세요. 같은 시각에 두 사람이 서로 다른 곳에 있을 수는 없습니다.</p>';
  }

  function renderReceipt() {
    var items = [
      ["삼각김밥(참치마요)", "1,700"],
      ["삼각김밥(불고기)", "1,700"],
      ["캔커피(레쓰비)", "1,200"],
      ["핫팩(대)", "1,500"],
      ["생수 500ml", "800"],
      ["초콜릿(다크)", "1,600"]
    ];
    return vhead(FILES[2]) +
      '<div class="receipt-stage"><div class="receipt">' +
      '<div class="rc-shop">하늘편의점 안목점</div>' +
      '<div class="rc-addr">강원 강릉시 창해로 14 · 안목해변</div>' +
      '<div class="rc-rule"></div>' +
      '<div class="rc-kv"><span>거래일시</span><b>2026-11-18 02:47:19</b></div>' +
      '<div class="rc-kv"><span>영수증</span><b>2026-1118-0247-88213</b></div>' +
      '<div class="rc-kv"><span>POS</span><b>03 · 계산원 07</b></div>' +
      '<div class="rc-rule"></div>' +
      items.map(function (it) {
        return '<div class="rc-line"><span>' + it[0] + '</span><span>' + it[1] + '</span></div>';
      }).join("") +
      '<div class="rc-rule"></div>' +
      '<div class="rc-line rc-total"><span>합계</span><span>8,500</span></div>' +
      '<div class="rc-rule"></div>' +
      '<div class="rc-kv"><span>결제수단</span><b>신용카드</b></div>' +
      '<div class="rc-kv"><span>카드번호</span><b>**** **** **** 4<span class="rc-smudge">·</span>71</b></div>' +
      '<div class="rc-kv"><span>승인번호</span><b>02478813</b></div>' +
      '<div class="rc-barcode"></div>' +
      '<div class="rc-foot">교환·환불은 영수증 지참<br>24시간 영업</div>' +
      '</div></div>' +
      '<div class="rc-read"><span aria-hidden="true">⚠</span><div>카드 번호 마지막 네 자리 가운데 한 글자가 <b>인쇄 불량으로 번져</b> 있습니다. 같은 카드가 다른 기록에 온전히 남아 있는지 찾아보세요.</div></div>';
  }

  function renderPhoto() {
    var exif = [
      ["촬영 시각", "2026-11-18 <b>03:09:41</b>"],
      ["원본", "IMG_20261118_030941.heic → svg"],
      ["기기", "Galaxy S23 · 후면 카메라"],
      ["위치", "37.77254, 128.94688"],
      ["장소", "강원 강릉시 안목해변길 22 (바다뜰 펜션)"],
      ["노출", "f/1.8 · 1/12s · ISO 1600"],
      ["메모 태그", "\"아래층, 아직 불 켜져 있음\""]
    ];
    return vhead(FILES[3], "이미지 · 2.4 MB · 촬영 03:09:41") +
      '<div class="photo-frame">' + PHOTO_SVG + '</div>' +
      '<div class="exif">' + exif.map(function (r) {
        return '<dl class="exif-row" style="margin:0"><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></dl>';
      }).join("") + '</div>' +
      '<button class="zoom-btn" type="button" id="zoomBtn">🔍 주차장 확대 (하단부 보정)</button>' +
      '<div id="plateZoom" hidden></div>' +
      '<p class="v-note">사진은 방 안에서 찍혔습니다. EXIF의 시각과 좌표, 그리고 메모 태그를 함께 읽어 보세요.</p>' +
      '<p class="v-note" style="border-style:solid">이 파일은 <b>보정 확대</b>가 가능합니다. 어두운 하단부에 무언가 서 있습니다.</p>';
  }

  function renderVoice() {
    var speeds = [1, 2, 4];
    return vhead(FILES[4], "오디오 · 3.1 MB · 녹음 02:14:03") +
      '<div class="rec-top">' +
      '<button class="rec-play" type="button" id="playBtn"><span id="playIcon">▶</span><span id="playLabel">재생</span></button>' +
      '<span class="rec-time"><span id="curTime">00:00</span> / ' + mmss(REC_DURATION) + '</span>' +
      '<span class="rec-speed" role="group" aria-label="재생 속도">' +
      speeds.map(function (s) {
        return '<button type="button" data-speed="' + s + '" aria-pressed="' + (s === 2 ? "true" : "false") + '">' + s + '×</button>';
      }).join("") +
      '</span></div>' +
      '<div class="wave" id="wave" aria-hidden="true"></div>' +
      '<div class="wave-legend"><span>00:00</span><span>음성메모 0214</span><span>' + mmss(REC_DURATION) + '</span></div>' +
      '<div class="script" id="script">' +
      REC.map(function (l, i) {
        return '<div class="sline' + (l.amb ? " amb" : "") + '" data-i="' + i + '">' +
          '<span class="st">' + mmss(l.t) + '</span>' +
          '<span class="sx">' + eschtml(l.x) + '</span></div>';
      }).join("") + '</div>' +
      '<button class="script-all" type="button" id="scriptAll">대본 전체 보기</button>' +
      '<p class="v-note">재생하면 타임스탬프 순서대로 한 줄씩 열립니다. 기다리기 어려우면 <b>대본 전체 보기</b>를 누르세요.</p>';
  }

  function renderMemo() {
    return vhead(FILES[5], "암호화 · 88 KB · 작성 03:11 · 복호화 완료") +
      '<div class="doc">' +
      '<div class="doc-sub">🔓 <b>복호화 완료</b> · 마지막 저장 2026-11-18 03:13:02</div>' +
      '<div class="mail-head">' +
      '<div class="mh-row"><b>받는 사람</b>김지원 심사역 (루트벤처스)</div>' +
      '<div class="mh-row"><b>참조</b>—</div>' +
      '<div class="mh-row"><b>발송 예정</b>2026-11-18 09:00 (예약 아님 · 초안)</div>' +
      '<p class="mail-subject">[모노랩] 제안서 12페이지 수치 정정 및 원본 로그 송부</p>' +
      '</div>' +
      '<div class="mail-body">김지원 심사역님, 안녕하세요. 모노랩에서 제품 디자인을 맡고 있는 한서연입니다.\n\n' +
      '오늘 10시 미팅에서 보여드릴 예정인 제안서 12페이지의 리텐션 지표(41.7%)는 원본 로그와 일치하지 않습니다. 원본 로그 기준 값은 27.4%이며, 41.7%는 10월 14일 23시 12분에 대시보드에서 수정된 값입니다.\n\n' +
      '이 페이지의 디자인은 제가 했지만, 수치는 제가 넣지 않았습니다. 그럼에도 제 이름이 들어간 문서이기에, 정확한 값을 먼저 알려드리는 것이 맞다고 판단했습니다. 원본 로그 파일과 수정 이력은 별도로 첨부합니다.\n\n' +
      '혼란을 드려 죄송합니다. 확인 부탁드립니다.\n\n한서연 드림</div>' +
      '<div class="note-pad"><h4>[내 메모 — 발송 전 정리]</h4><ul>' +
      '<li>10/14 23:12 대시보드 수정 로그 · 계정 <b>jh.park</b> (최고관리자)</li>' +
      '<li>민석이가 "숫자가 달라요"라고 물어본 날과 같은 날. 그 애는 모르는 척하고 싶었을 거야.</li>' +
      '<li>내 지분 4%, 12월에 1년 베스팅. 지금 나가면 0이 된다. 그 사람은 그걸 알고 "네가 만든 페이지잖아"라고 했다.</li>' +
      '<li>10시 미팅에 나가면 나는 그 거짓말의 공동 저자가 된다. 안 나가면 겁쟁이가 된다.</li>' +
      '<li>원본을 들고 9시에 먼저 가서 이야기한다. 그게 유일한 방법.</li>' +
      '<li>그런데 내 폰은 회사 계정으로 자동 백업된다. 내가 쓰는 모든 게 대표 화면에 뜬다.</li>' +
      '<li>그래서 지금 동기화를 끊는다. <b>03:11</b>.</li>' +
      '<li>익명 DM의 그 애가 "오늘은 사무실 오지 마세요"라고 했다. 그 말이 자꾸 걸린다.</li>' +
      '<li>DM 암호는 그 애가 리텐션을 부르던 그 단어. 대표가 듣기 싫어했던.</li>' +
      '</ul></div></div>';
  }

  function renderDM() {
    var msgs = [
      { t: "11-16 23:02", me: false, x: "선배님, 저예요. 이 계정은 회사에 안 뜨는 계정이에요." },
      { t: "11-16 23:04", me: true, x: "누구세요?" },
      { t: "11-16 23:05", me: false, x: "오늘 대시보드 숫자 바뀐 거, 제가 봤어요. 제가 누른 거 아니에요. 진짜예요." },
      { t: "11-16 23:09", me: true, x: "…" },
      { t: "11-17 01:30", me: false, x: "원본 로그는 제가 따로 갖고 있어요. 10월 14일 23시 12분에 수정된 기록까지 다 있어요." },
      { t: "11-17 01:32", me: false, x: "근데 저는 이걸 들고 나가면 끝이에요. 저는 아직 인턴이고…" },
      { t: "11-17 01:40", me: true, x: "알겠어. 네 이름은 안 나가게 할게." },
      { t: "11-18 02:58", me: false, x: "선배님, 대표님이 아까 저한테 전화해서 내일 9시에 다들 나와 있으라고 했어요. 뭔가 이상해요." },
      { t: "11-18 03:00", me: false, x: "오늘은 사무실 오지 마세요. 제발." },
      { t: "11-18 03:02", me: true, x: "알겠어. 고마워. 너도 아무 말 하지 마." },
      { t: "11-18 03:05", me: false, x: "선배님, 사천 쪽이라고 했죠? 그 댁 열쇠는 가져가셨어요? 거기 전기 들어와요." },
      { t: "11-18 03:06", me: true, x: "응. 아무한테도 말하지 마." }
    ];
    return vhead(FILES[6], "암호화 · 640 KB · 복호화 완료 · 상대 1명") +
      '<div class="dm-wrap">' +
      '<div class="dm-peer"><span class="dm-avatar" aria-hidden="true">?</span>' +
      '<div><div class="dm-peer-name">@user_2b7</div>' +
      '<div class="dm-peer-sub">익명 계정 · 본인 확인 불가 · 2026-11-16 개설</div></div></div>' +
      msgs.map(function (m) {
        return '<div class="dm-row' + (m.me ? " me" : "") + '">' +
          '<div class="dm-bubble">' + eschtml(m.x) + '</div>' +
          '<div class="dm-t">' + m.t + '</div></div>';
      }).join("") +
      '</div>' +
      '<div class="dm-forensic"><h4>[복구된 계정 연결 정보]</h4>' +
      '<p>@user_2b7 은 <b>monolab.co.kr 사내 계정</b>과 동일한 기기에서 2회 로그인된 기록이 있습니다.<br>' +
      '기기명 <b>MS-DESKTOP-07</b> (모노랩 사무실 좌석 7)<br>' +
      '계정 주인 — <b>최민석</b> · 데이터 인턴 · 입사 3개월</p></div>' +
      '<p class="v-note">익명 계정의 주인은 이 파일의 암호를 정한 사람과 같습니다. 그가 그 지표를 뭐라고 불렀는지 떠올려 보세요.</p>';
  }

  function renderCallFail() {
    return vhead(FILES[7], "복구 실패 · 0 B · 03:14:15") +
      '<div class="lock-box">' +
      '<div class="lock-icon" aria-hidden="true">⛔</div>' +
      '<div class="lock-name">통화기록_1118.csv</div>' +
      '<p class="lock-sub">이 파일은 복구할 수 없습니다.</p>' +
      '<p class="lock-hint" style="text-align:left"><b>실패 원인</b> — 백업 시각에 기기에 파일이 존재하지 않았습니다. 삭제되었거나 동기화 대상에서 제외된 상태입니다.</p>' +
      '</div>' +
      '<p class="v-note">복구되지 않은 파일도 기록입니다. <b>무엇이 없는지</b>가 무엇이 있는지만큼 많은 것을 말해 줍니다.</p>';
  }

  /* ---------------- 뷰어 바인딩 ---------------- */
  function bindViewer(f) {
    if (f.id === "photo") {
      var zb = el.viewer.querySelector("#zoomBtn");
      var pz = el.viewer.querySelector("#plateZoom");
      if (zb && pz) {
        zb.addEventListener("click", function () {
          if (pz.hidden) {
            pz.innerHTML = '<div class="plate-zoom">' + PLATE_SVG +
              '<p>저조도 보정 · 하단부 확대 — <b>24바 5178</b></p></div>';
            pz.hidden = false;
            zb.textContent = "🔍 확대 닫기";
          } else {
            pz.innerHTML = "";
            pz.hidden = true;
            zb.textContent = "🔍 주차장 확대 (하단부 보정)";
          }
        });
      }
    }
    if (f.id === "voice") bindAudio();
  }

  /* ---------------- 음성메모 재생 ---------------- */
  var audio = { playing: false, elapsed: 0, speed: 2, timer: null, els: null };

  function buildWave() {
    var wrap = el.viewer.querySelector("#wave");
    if (!wrap) return;
    var bars = 42;
    var html = "";
    for (var i = 0; i < bars; i++) {
      var v = Math.sin(i * 0.7) * 0.5 + Math.sin(i * 1.9) * 0.32 + Math.sin(i * 0.23) * 0.18;
      var h = Math.round(10 + Math.abs(v) * 34);
      html += '<i style="height:' + h + 'px"></i>';
    }
    wrap.innerHTML = html;
  }

  function bindAudio() {
    buildWave();
    var playBtn = el.viewer.querySelector("#playBtn");
    var icon = el.viewer.querySelector("#playIcon");
    var label = el.viewer.querySelector("#playLabel");
    var cur = el.viewer.querySelector("#curTime");
    var all = el.viewer.querySelector("#scriptAll");
    var speedBtns = el.viewer.querySelectorAll("[data-speed]");
    var lines = el.viewer.querySelectorAll(".sline");
    var bars = el.viewer.querySelectorAll("#wave i");

    audio.els = { playBtn: playBtn, icon: icon, label: label, cur: cur, lines: lines, bars: bars, all: all };
    audio.elapsed = 0;
    audio.playing = false;

    function paint() {
      var t = audio.elapsed;
      cur.textContent = mmss(Math.min(t, REC_DURATION));
      var lit = Math.round((t / REC_DURATION) * bars.length);
      for (var i = 0; i < bars.length; i++) {
        bars[i].classList.toggle("on", i < lit);
      }
      for (var j = 0; j < lines.length; j++) {
        var idx = Number(lines[j].getAttribute("data-i"));
        lines[j].classList.toggle("on", REC[idx].t <= t);
      }
    }
    function tick() {
      audio.elapsed += 0.08 * audio.speed;
      if (audio.elapsed >= REC_DURATION) {
        audio.elapsed = REC_DURATION;
        paint();
        stopAudio();
        if (audio.els) {
          audio.els.label.textContent = "다시 재생";
          audio.els.icon.textContent = "▶";
        }
        return;
      }
      paint();
    }
    function play() {
      if (audio.playing) { stopAudio(); return; }
      if (audio.elapsed >= REC_DURATION) audio.elapsed = 0;
      audio.playing = true;
      icon.textContent = "❚❚";
      label.textContent = "일시정지";
      audio.timer = setInterval(tick, 80);
    }
    playBtn.addEventListener("click", play);
    all.addEventListener("click", function () {
      stopAudio();
      audio.elapsed = REC_DURATION;
      paint();
      if (audio.els) { audio.els.label.textContent = "다시 재생"; audio.els.icon.textContent = "▶"; }
      all.textContent = "대본 전체 표시됨";
      all.disabled = true;
    });
    Array.prototype.forEach.call(speedBtns, function (b) {
      b.addEventListener("click", function () {
        audio.speed = Number(b.getAttribute("data-speed"));
        Array.prototype.forEach.call(speedBtns, function (x) {
          x.setAttribute("aria-pressed", x === b ? "true" : "false");
        });
      });
    });
    paint();
  }

  function stopAudio() {
    if (audio.timer) { clearInterval(audio.timer); audio.timer = null; }
    audio.playing = false;
    if (audio.els) {
      audio.els.icon.textContent = "▶";
      if (audio.elapsed < REC_DURATION) audio.els.label.textContent = "재생";
    }
  }

  /* ---------------- 힌트 모달 ---------------- */
  function openHint(fileId) {
    var h = HINTS[fileId];
    if (!h) return;
    var stage = state.hintStage[fileId] || 0;
    if (stage === 0 && !state.hintStage[fileId + "_counted"]) {
      state.hintStage[fileId + "_counted"] = true;
      state.hints++;
    }
    el.hintTitle.textContent = h.title;
    renderHint(h, fileId, stage);
    el.hintModal.hidden = false;
  }

  function renderHint(h, fileId, stage) {
    var html = '<div class="hint-stage s1"><span class="hs-label">힌트 1단계 · 방향</span>' + h.s1 + '</div>';
    if (stage >= 1) {
      html += '<div class="hint-stage s2"><span class="hs-label">힌트 2단계 · 정답</span>' + h.s2 + '</div>' +
        '<p class="hint-fine">2단계 힌트는 원래 리워드 광고를 본 뒤 열리는 자리입니다. 지금은 광고 없이 바로 공개합니다.</p>';
      el.hintNext.style.display = "none";
    } else {
      el.hintNext.style.display = "";
      el.hintNext.textContent = "힌트 2단계 · 정답 보기";
    }
    el.hintBody.innerHTML = html;
    el.hintNext.onclick = function () {
      state.hintStage[fileId] = 1;
      state.hints++;
      renderHint(h, fileId, 1);
    };
  }

  function closeModal(which) {
    if (which === "hint") el.hintModal.hidden = true;
    if (which === "report") el.reportModal.hidden = true;
  }

  /* ---------------- 최종 보고서 ---------------- */
  function openReport() {
    if (el.reportBtn.disabled) return;
    el.reportModal.hidden = false;
    renderReport();
  }

  function renderReport() {
    var html = "";
    QUESTIONS.forEach(function (q, qi) {
      var solved = state.solved[qi];
      html += '<div class="q-block"><p class="q-title"><span>Q' + (qi + 1) + '</span>' + q.q + '</p><div class="q-opts">';
      q.opts.forEach(function (o, oi) {
        var cls = "q-opt";
        if (solved && o.ok) cls += " correct locked";
        if (!solved && state["pick" + qi] === oi && !o.ok) cls += " wrong";
        html += '<label class="' + cls + '">' +
          '<input type="radio" name="q' + qi + '" value="' + oi + '"' +
          (solved ? " disabled" : "") + ' />' +
          '<span>' + o.text + '</span></label>';
      });
      html += '</div>';
      if (solved) html += '<p class="q-fb">' + QUESTIONS[qi].right + '</p>';
      html += '</div>';
    });
    el.reportBody.innerHTML = html;

    // 이전 선택 복원
    QUESTIONS.forEach(function (q, qi) {
      if (state["pick" + qi] !== undefined && !state.solved[qi]) {
        var inp = el.reportBody.querySelector('input[name="q' + qi + '"][value="' + state["pick" + qi] + '"]');
        if (inp) inp.checked = true;
      }
    });

    el.reportFoot.style.display = "";
    el.submit.textContent = state.wrongSubmits > 0 ? "다시 제출" : "보고서 제출";
  }

  function submitReport() {
    for (var qi = 0; qi < QUESTIONS.length; qi++) {
      if (state.solved[qi]) continue;
      var sel = el.reportBody.querySelector('input[name="q' + qi + '"]:checked');
      if (!sel) {
        toast("모든 질문에 답해 주세요");
        return;
      }
      var oi = Number(sel.value);
      state["pick" + qi] = oi;
      if (QUESTIONS[qi].opts[oi].ok) {
        state.solved[qi] = true;
      }
    }
    var allSolved = state.solved.every(function (v) { return v; });
    if (allSolved) {
      finish();
      return;
    }
    state.wrongSubmits++;
    renderReport();
    // 오답 피드백 표시
    for (var qi2 = 0; qi2 < QUESTIONS.length; qi2++) {
      if (state.solved[qi2]) continue;
      var o = QUESTIONS[qi2].opts[state["pick" + qi2]];
      if (o && !o.ok && o.fb) {
        var block = el.reportBody.querySelectorAll(".q-block")[qi2];
        var ex = document.createElement("p");
        ex.className = "q-fb bad";
        ex.textContent = o.fb;
        block.appendChild(ex);
      }
    }
    el.submit.textContent = "다시 제출";
    toast("틀린 항목이 있습니다. 피드백을 읽고 다시 골라 보세요.");
  }

  function finish() {
    state.finished = true;
    var sec = Math.round((Date.now() - state.started) / 1000);
    var score = 100 - state.hints * 5 - state.wrongSubmits * 8;
    if (score < 40) score = 40;
    var grade, gname;
    if (score >= 95) { grade = "S"; gname = "프로파일러"; }
    else if (score >= 85) { grade = "A"; gname = "수석 수사관"; }
    else if (score >= 70) { grade = "B"; gname = "현장 조사관"; }
    else { grade = "C"; gname = "신입 조수"; }

    var timeTxt = sec >= 60 ? (Math.floor(sec / 60) + "분 " + (sec % 60) + "초") : (sec + "초");

    var html =
      '<div class="ending">' +
      '<span class="ending-badge">CASE CLOSED</span>' +
      '<h3>사건 해결</h3>' +
      '<div class="ep">〈마지막 백업〉 EP.01 — 체크아웃 10분 전</div>' +
      '<div class="grade-row"><span class="grade-letter">' + grade + '</span>' +
      '<span class="grade-name">' + gname + ' · ' + score + '점</span></div>' +
      '<div class="stat-row">' +
      '<div class="stat-box"><dt>플레이 타임</dt><dd>' + timeTxt + '</dd></div>' +
      '<div class="stat-box"><dt>힌트</dt><dd>' + state.hints + '회</dd></div>' +
      '<div class="stat-box"><dt>오답 제출</dt><dd>' + state.wrongSubmits + '회</dd></div>' +
      '</div>' +
      '<ul class="truth-list">' +
      '<li><b>거짓말한 사람</b>박준호 대표. 00:41의 "통화했다"는 음성메모의 "받지 않았다"와, "서울에 있었다"는 03:09 사진 속 24바 5178과 어긋납니다. 정황상 그는 원본 로그를 회수하러 왔습니다.</li>' +
      '<li><b>백업이 멈춘 이유</b>사고가 아니라 서연이 직접 동기화를 끊었습니다. 폰이 회사 공용 계정으로 백업되는 것을 알았기 때문입니다.</li>' +
      '<li><b>서연의 행방</b>강릉 사천면의 비어 있는 할머니 댁. 살아서 스스로 자리를 피했습니다.</li>' +
      '</ul>' +
      '<p class="closing">복구 콘솔의 마지막 조각을 맞춘 순간, 10시 50분이 10시 51분이 됩니다. 윤아름은 사천면으로 향하는 버스 시간표를 캡처했습니다.</p>' +
      '<button class="copy-btn" type="button" id="copyResult">결과 복사하기</button>' +
      '</div>';

    el.reportBody.innerHTML = html;
    el.reportFoot.style.display = "none";
    var rt = document.getElementById("reportTitle");
    if (rt) rt.textContent = "사건 해결 — 진실 추론 결과";

    var copyText =
      "〈마지막 백업〉 EP.01 — 체크아웃 10분 전\n" +
      "추리 등급: " + grade + " · " + gname + " (" + score + "점)\n" +
      "플레이 타임 " + timeTxt + " · 힌트 " + state.hints + "회 · 오답 제출 " + state.wrongSubmits + "회\n" +
      "· 거짓말: 박준호 대표\n" +
      "· 백업 중단: 서연이 직접 동기화를 끊음\n" +
      "· 행방: 강릉 사천면 할머니 댁 (생존)\n" +
      "ddanjitplay.com/last-backup/";

    var cp = document.getElementById("copyResult");
    cp.addEventListener("click", function () {
      var fn = (window.SL && SL.copy) ? SL.copy : function (t) {
        return navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject();
      };
      fn(copyText).then(function () {
        cp.textContent = "복사했어요 ✓";
        setTimeout(function () { cp.textContent = "결과 복사하기"; }, 1600);
      }).catch(function () {
        toast("복사에 실패했습니다. 길게 눌러 선택해 주세요.");
      });
    });
  }

  /* ---------------- 초기화 ---------------- */
  function init() {
    renderList();
    el.reportBtn.addEventListener("click", openReport);
    el.submit.addEventListener("click", submitReport);

    Array.prototype.forEach.call(document.querySelectorAll("[data-close]"), function (b) {
      b.addEventListener("click", function () { closeModal(b.getAttribute("data-close")); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeModal("hint"); closeModal("report"); }
    });

    // 체크아웃 카운트다운
    var left = CASE.checkout;
    var ticker = setInterval(function () {
      left--;
      if (left > 0) {
        el.clock.textContent = "체크아웃까지 " + mmss(left);
      } else {
        el.status.classList.add("is-late");
        el.clock.textContent = "체크아웃 +" + mmss(-left);
      }
    }, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
