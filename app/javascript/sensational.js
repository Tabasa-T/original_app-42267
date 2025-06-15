document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('sensational-overlay');

  if (overlay) {
    // 1秒後にふわっと表示
    setTimeout(() => {
      overlay.classList.remove('d-none');
      overlay.style.opacity = 1;
    }, 1000); // 表示タイミング：1秒後

    // 10秒後に自動でフェードアウト → 完全に非表示
    setTimeout(() => {
      overlay.style.opacity = 0;
      setTimeout(() => {
        overlay.classList.add('d-none');
      }, 500); // フェードアウト完了後に非表示
    }, 11000); // 表示後10秒後（= 合計11秒後）に非表示開始

    // クリックでも非表示にできる
    overlay.addEventListener('click', () => {
      overlay.style.opacity = 0;
      setTimeout(() => {
        overlay.classList.add('d-none');
      }, 500);
    });
  }
});
