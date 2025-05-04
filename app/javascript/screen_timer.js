function logoutUser() {
  sessionStorage.setItem("force_exit", true);
  sessionStorage.removeItem("start_time");

  const form = document.createElement("form");
  form.method = "POST";
  form.action = "/users/sign_out"; // Deviseのログアウトパス

  const methodInput = document.createElement("input");
  methodInput.type = "hidden";
  methodInput.name = "_method";
  methodInput.value = "delete";
  form.appendChild(methodInput);

  const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
  const csrfInput = document.createElement("input");
  csrfInput.type = "hidden";
  csrfInput.name = "authenticity_token";
  csrfInput.value = csrfToken;
  form.appendChild(csrfInput);

  document.body.appendChild(form);
  form.submit();
}


document.addEventListener("DOMContentLoaded", () => {
  const LIMIT_TIME = 5 * 60 * 1000; // 5分
  const now = Date.now();

  // スタート時間を保存
  if (!sessionStorage.getItem("start_time")) {
    sessionStorage.setItem("start_time", now);
  }
  
  // 2. 経過時間を計算
  const startTime = parseInt(sessionStorage.getItem("start_time"), 10);
  const timePassed = now - startTime;

  // 3. 5分経過してたらログアウトページへ
  if (timePassed >= LIMIT_TIME) {
    logoutUser(); // すぐログアウト
  } else {
    const timeLeft = LIMIT_TIME - timePassed;
    setTimeout(() => {
      logoutUser(); // 5分後にログアウト
    }, timeLeft);
  }
});
