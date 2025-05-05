document.addEventListener("turbo:load", () => {
  console.log("screen_timer.js 実行中！（turbo:load）");

  const LIMIT_TIME = 5 * 60 * 1000; // 制限時間(5分)
  const userId = document.body.dataset.userId;

  // force_exit フラグがあればオーバーレイ表示（最優先）
  const forceExit = sessionStorage.getItem("force_exit");
  if (forceExit) {
    console.log("force_exit フラグ検出 → オーバーレイ表示");
    sessionStorage.removeItem("force_exit"); // フラグ削除
    const overlay = document.getElementById("force-exit-overlay");
    if (overlay) overlay.classList.add("show");
    return; // ← 表示だけで終了、ログイン中ではないため
  }

  if (!userId) return;

  let activeTime = 0;
  let lastCheck = Date.now();
  let timer = null;

  // 初期化：再ログイン時に古い active_time を読み込まないように制御
  const stored = sessionStorage.getItem("active_time");
  if (stored && !isNaN(parseInt(stored))) {
    activeTime = parseInt(stored, 10);
  } else {
    sessionStorage.setItem("active_time", 0);
  }

  //  アクティブ状態で監視スタート
  const startMonitoring = () => {
    if (timer) return;
    lastCheck = Date.now();
    timer = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastCheck;
      lastCheck = now;

      activeTime += elapsed;
      sessionStorage.setItem("active_time", activeTime);

      console.log(`アクティブ合計：${Math.floor(activeTime / 1000)}秒`);

      if (activeTime >= LIMIT_TIME) {
        console.log("アクティブ時間オーバー → ログアウト");
        stopMonitoring();
        logoutUser();
      }
    }, 10000);
  };

  const stopMonitoring = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  // イベント監視（フォーカスあり・なしで監視のON/OFF）
  window.addEventListener("focus", startMonitoring);
  window.addEventListener("blur", stopMonitoring);
  document.hasFocus() ? startMonitoring() : stopMonitoring();
});

// ログアウト処理
function logoutUser() {
  sessionStorage.setItem("force_exit", true);
  sessionStorage.removeItem("active_time");

  const form = document.createElement("form");
  form.method = "POST";
  form.action = "/users/sign_out";
  form.setAttribute("data-turbo", "false");

  const methodInput = document.createElement("input");
  methodInput.type = "hidden";
  methodInput.name = "_method";
  methodInput.value = "delete";
  form.appendChild(methodInput);

  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  if (!csrfToken) {
    console.error(" CSRFトークンが見つかりません");
    return;
  }

  const csrfInput = document.createElement("input");
  csrfInput.type = "hidden";
  csrfInput.name = "authenticity_token";
  csrfInput.value = csrfToken;
  form.appendChild(csrfInput);

  document.body.appendChild(form);
  form.submit();
}
