function toggleMobileMenu() {
  console.log("toggleMobileMenu called"); // デバッグ用
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const mobileOverlay = document.querySelector(".mobile-overlay");
  const body = document.body;

  console.log("Elements found:", {
    mobileMenu,
    mobileToggle,
    mobileOverlay,
  }); // デバッグ用

  // メニューの表示・非表示を切り替え
  mobileMenu.classList.toggle("active");
  mobileToggle.classList.toggle("active");
  mobileOverlay.classList.toggle("active");

  console.log("Classes after toggle:", {
    mobileMenuActive: mobileMenu.classList.contains("active"),
    mobileToggleActive: mobileToggle.classList.contains("active"),
    mobileOverlayActive: mobileOverlay.classList.contains("active"),
  }); // デバッグ用

  // メニューが開いている時はスクロールを無効化
  if (mobileMenu.classList.contains("active")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "";
  }
}


// ESCキーでメニューを閉じる
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          const mobileMenu = document.querySelector(".mobile-menu");
          if (mobileMenu.classList.contains("active")) {
            toggleMobileMenu();
          }
        }
      });

      // ウィンドウリサイズ時にモバイルメニューを閉じる
      window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
          const mobileMenu = document.querySelector(".mobile-menu");
          const mobileToggle = document.querySelector(".mobile-menu-toggle");
          const mobileOverlay = document.querySelector(".mobile-overlay");
          const body = document.body;

          // メニューが開いている場合は閉じる
          if (mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active");
            mobileToggle.classList.remove("active");
            mobileOverlay.classList.remove("active");
            body.style.overflow = "";
          }
        }
      });

      // スムーススクロール機能
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      // スクロール時のヘッダー背景変更
      window.addEventListener("scroll", function () {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
          header.style.background = "rgba(255, 255, 255, 0.98)";
          header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.15)";
        } else {
          header.style.background = "rgba(255, 255, 255, 0.95)";
          header.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
        }
      });

      // アニメーション効果（要素が画面に入ったときにフェードイン）
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      }, observerOptions);

      // 各セクションにアニメーション効果を適用
      document.addEventListener("DOMContentLoaded", function () {
        const animatedElements = document.querySelectorAll(
          ".feature-card, .stat-card, .pricing-card, .team-member"
        );

        animatedElements.forEach((el) => {
          el.style.opacity = "0";
          el.style.transform = "translateY(20px)";
          el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          observer.observe(el);
        });
      });