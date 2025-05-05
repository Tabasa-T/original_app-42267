document.addEventListener("DOMContentLoaded", () => {
  // 強制終了フラグがあればオーバーレイを表示
  if (sessionStorage.getItem("force_exit")) {
    const overlay = document.getElementById("force-exit-overlay");
    overlay.classList.add("show");

    // 表示したら1回だけ表示するようにフラグを削除
    sessionStorage.removeItem("force_exit");
  }
});
