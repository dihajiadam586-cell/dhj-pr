// Theme toggle + like button + tabs + scroll animations
(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const likeBtn = document.getElementById('likeBtn');
  const likeCountEl = document.getElementById('likeCount');
  const yearEl = document.getElementById('year');
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');

  // Year
  yearEl.textContent = new Date().getFullYear();

  // Theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if(savedTheme === 'light') root.classList.add('light');
  themeToggle.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });

  // Like
  const LIKE_KEY = 'adam-like-count';
  const START = Number(localStorage.getItem(LIKE_KEY) || 0);
  likeCountEl.textContent = START;
  likeBtn.addEventListener('click', () => {
    const v = Number(localStorage.getItem(LIKE_KEY) || 0) + 1;
    localStorage.setItem(LIKE_KEY, v);
    likeCountEl.textContent = v;
    likeBtn.classList.add('pulse');
    setTimeout(()=>likeBtn.classList.remove('pulse'), 300);
  });

  // Tabs
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.tab.active')?.classList.remove('active');
      btn.classList.add('active');
      const id = btn.dataset.tab;
      panels.forEach(p => p.classList.toggle('active', p.id === id));
    });
  });

  // Scroll appear animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = 'none';
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-in-observe').forEach(el => observer.observe(el));
})();
