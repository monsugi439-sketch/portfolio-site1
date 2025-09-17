// ローディング画面の制御
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    // ページの読み込みが完了したらローディング画面を非表示
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 2000); // 2秒後に非表示
    });
});

// ヘッダーのスクロール検出とアニメーション
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // スクロール方向に応じてヘッダーの表示/非表示を制御
    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
        header.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll) {
        header.classList.add('scrolled');
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// スクロールアニメーションの設定
const scrollReveal = ScrollReveal({
    distance: '50px',
    duration: 1000,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    interval: 150,
    scale: 1,
    viewFactor: 0.3
});

// セクションタイトルのアニメーション
scrollReveal.reveal('.section-title', {
    origin: 'bottom',
    delay: 200
});

// アーティストカードのアニメーション
const cards = document.querySelectorAll('.artist-card');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // 一度表示されたら監視を解除
        }
    });
}, observerOptions);

cards.forEach(card => {
    observer.observe(card);
});

// スムーススクロール（ページ内リンクのみ）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// アーティストカードのクリックイベント
document.querySelectorAll('.artist-card a').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && !href.startsWith('#')) {
            window.location.href = href;
        }
    });
});