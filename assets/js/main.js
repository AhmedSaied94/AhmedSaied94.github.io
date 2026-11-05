(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      }
    });
  }

  // Theme: saved choice wins; otherwise follow the system setting.
  var root = document.documentElement;
  var themeBtn = document.querySelector('.theme-toggle');
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function currentTheme() {
    return root.getAttribute('data-theme') || (mq && mq.matches ? 'dark' : 'light');
  }
  function syncLabel() {
    if (!themeBtn) return;
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    themeBtn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    themeBtn.setAttribute('title', 'Switch to ' + next + ' theme');
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncLabel();
    });
    if (mq && mq.addEventListener) mq.addEventListener('change', syncLabel);
    syncLabel();
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // GitHub Pages has no backend: compose the message in the visitor's email app.
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = 'Portfolio enquiry from ' + d.get('name');
      var body = d.get('message') + '\n\n— ' + d.get('name') + ' (' + d.get('email') + ')';
      window.location.href = 'mailto:ahmed.saeed311294@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
