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

  // 3. 5分経過してたらすぐ表示 / 残ってたら待ってから表示
  if (timePassed >= LIMIT_TIME) {
    alert("あなたの今日の価値作りはここからだね！少し休憩して、また来てね☕️");
  } else {
    const timeLeft = LIMIT_TIME - timePassed;

    setTimeout(() => {
      alert("あなたの今日の価値作りはここからだね！少し休憩して、また来てね☕️");
    }, timeLeft);
  }
});
