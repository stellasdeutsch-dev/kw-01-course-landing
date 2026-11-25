/* Разметка блоков. Данные берутся из content.js (window.SITE). */
(function () {
  var S = window.SITE;
  var root = document.getElementById('app');
  var page = document.body.getAttribute('data-page') || 'main';
  var base = document.body.getAttribute('data-base') || '';
  var AD = S.ads[S.ad] || S.ads.dias;

  Object.keys(S.theme || {}).forEach(function (k) { document.documentElement.style.setProperty(k, S.theme[k]); });

  /* ---------- helpers ---------- */
  function href(h) {
    if (h === 'BUY') return AD.buy;
    if (h === 'WHATSAPP') return AD.whatsapp || AD.buy;
    return h;
  }
  function ext(h) { return /^https?:/.test(href(h)) ? ' target="_blank" rel="noopener"' : ''; }
  function img(o, cls, eager) {
    if (!o) return '';
    return '<img class="' + (cls || '') + '" src="' + base + o.src + '" width="' + o.w + '" height="' + o.h +
      '" alt="' + (o.alt || '') + '"' + (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
  }
  function icon(name, cls) { return '<svg class="ic ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }
  function sec(id, bg, cls, inner) {
    return '<section id="' + id + '" class="sec ' + cls + ' bg-' + (bg || 'white') + '">' + inner + '</section>';
  }
  function h2(t, extra) { return '<h2 class="h2 rv">' + t + (extra || '') + '</h2>'; }
  function btn(b, cls) {
    return '<div class="btn-wrap rv ' + (cls || '') + '">' +
      (b.tag ? '<span class="tag tag-tilt">' + b.tag + '</span>' : '') +
      '<a class="btn" href="' + href(b.href) + '"' + ext(b.href) + '>' + icon(b.icon || 'book', 'btn-ic') + '<span>' + b.text + '</span></a></div>';
  }
  function deco(key, cls) { return img(S.deco[key], 'deco ' + cls); }
  function logo(brand) {
    return '<span class="logo">' + brand.a + icon(brand.icon, 'logo-ic') + brand.b + '</span>';
  }

  /* ---------- blocks ---------- */
  var R = {};

  R.hero = function (b) {
    var p = AD.photos.hero;
    return '<header id="top" class="sec hero bg-white">' +
      img(b.bg, 'hero-bg', true) +
      deco('pencil', 'd-hero-top') +
      '<div class="hero-strip">' +
        '<div class="stat"><b>' + b.statLeft.big + '</b><span>' + b.statLeft.small + '</span></div>' +
        '<div class="logo-tab">' + logo(AD.brand) + '</div>' +
        '<div class="stat"><b>' + b.statRight.big + '</b><span>' + b.statRight.small + '</span></div>' +
      '</div>' +
      '<h1 class="h1 rv">' + b.title + '</h1>' +
      '<div class="hero-stage">' +
        '<p class="hero-txt l rv">' + b.textLeft + '</p>' +
        '<p class="hero-txt r rv">' + b.textRight + '</p>' +
        img(b.left, 'hero-flank fl', true) + img(b.right, 'hero-flank fr', true) +
        img(p, 'hero-person', true) +
        '<div class="hero-ctas">' + btn(b.button) +
          '<a class="btn2 rv" href="' + b.button2.href + '"><span>' + b.button2.text + '</span>' + icon('arrow') + '</a></div>' +
      '</div>' +
      deco('pencil', 'd-hero-bl') + deco('paperball', 'd-hero-br') +
    '</header>';
  };

  R.audience = function (b) {
    return sec('audience', b.bg, 'aud', '<div class="wrap">' + h2(b.title) +
      '<div class="aud-grid">' + b.items.map(function (it, i) {
        return '<article class="aud-item rv' + (i % 2 ? ' up' : '') + '">' +
          '<div class="aud-pic"><span class="num">0' + (i + 1) + '</span><span class="circle">' + img(it.img, 'aud-img') + '</span></div>' +
          '<h3>' + it.title + '</h3><p>' + it.text + '</p>' +
          '<h4>Результат</h4><p class="res">' + it.result + '</p></article>';
      }).join('') + '</div></div>');
  };

  R.program = function (b) {
    return sec('program', b.bg, 'prog', '<div class="wrap">' +
      h2(b.title, '<span class="tag tag-under">' + b.tag + '</span>') +
      '<p class="sub rv">' + b.subtitle + '</p>' +
      '<div class="prog-tab rv"><b class="big">' + b.tab.big + '</b><span><b>' + b.tab.top + '</b><small>' + b.tab.small + '</small></span></div>' +
      '<div class="mods">' + b.items.map(function (m, i) {
        return '<article class="mod rv"><span class="mod-tag">' + b.label + ' ' + (i + 1) + '</span>' +
          '<div class="mod-l"><h3>' + m.title + '</h3><ul>' + m.points.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul></div>' +
          '<div class="mod-r"><div class="res-box"><h4>' + b.resultTitle + '</h4><p>' + m.result + '</p></div></div></article>';
      }).join('') + '</div></div>');
  };

  R.faq = function (b) {
    return sec('faq', b.bg, 'faq', '<div class="wrap">' + h2(b.title) + '<div class="faq-list">' +
      b.items.map(function (f, i) {
        return '<details class="faq-item rv"' + (i === 0 ? ' open' : '') + '><summary><span>' + f.q + '</span><i class="pm" aria-hidden="true"></i></summary>' +
          '<div class="faq-a"><p>' + f.a + '</p></div></details>';
      }).join('') + '</div></div>');
  };

  R.format = function (b) {
    return sec('format', b.bg, 'fmt', '<div class="wrap">' + h2(b.title) + '<div class="fmt-grid">' +
      b.items.map(function (it, i) {
        return '<article class="fmt-item rv' + (i % 2 ? ' down' : '') + '"><div class="fmt-pic"><span class="num">0' + (i + 1) + '</span>' + img(it.img, 'fmt-img') + '</div>' +
          '<h3>' + it.title + '</h3><p>' + it.text + '</p></article>';
      }).join('') + '</div></div>');
  };

  R.author = function (b) {
    var a = AD.author;
    return sec('about', b.bg, 'auth', '<div class="wrap auth-grid">' +
      '<div class="auth-l">' + h2(a.title) + '<p class="auth-lead rv">' + a.lead + '</p>' +
        a.items.map(function (it) { return '<div class="auth-row rv"><span class="ic-circle">' + icon(it.icon) + '</span><p>' + it.text + '</p></div>'; }).join('') +
        '<h3 class="facts-h rv">' + a.factsTitle + '</h3><ul class="facts rv">' + a.facts.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
        '<p class="ask rv">' + a.ask + '</p>' +
        '<div class="links rv">' + a.links.map(function (l) {
          return '<a class="lnk lnk-' + l.icon + '" href="' + href(l.href) + '"' + ext(l.href) + '>' + icon(l.icon, 'lnk-ic') + '<span>' + l.text + '</span></a>';
        }).join('') + '</div></div>' +
      '<div class="auth-r rv">' + deco('pencil', 'd-auth-1') + deco('pencil', 'd-auth-2') + deco('eraser', 'd-auth-3') +
        img(AD.photos.author, 'auth-photo') +
        '<div class="plate"><b>' + a.name + '</b></div><div class="plate2">' + a.badge + '</div><span class="tag plate3">' + a.badge2 + '</span>' +
      '</div></div>');
  };

  R.gallery = function (b) {
    var g = AD.gallery;
    return sec('inside', b.bg, 'gal', '<div class="paws" aria-hidden="true"></div><div class="wrap">' + h2(g.title) + '<p class="sub rv">' + g.subtitle + '</p>' +
      '<div class="gal-grid">' + g.items.map(function (it, i) {
        var media = it.video
          ? '<button class="vid" type="button" data-src="' + base + it.video + '" aria-label="Смотреть: ' + it.title + '">' + img(it.img, 'gal-img') + '<span class="play">' + icon('play') + '</span></button>'
          : img(it.img, 'gal-img');
        return '<figure class="card rv' + (i === 0 ? ' big' : '') + (it.tall ? ' tall' : '') + '"><span class="ribbon">' + it.tag + '</span>' +
          '<div class="card-media">' + media + '</div><figcaption><b>' + it.title + '</b><small>' + it.sub + '</small></figcaption></figure>';
      }).join('') + '</div></div>');
  };

  R.tariffs = function (b) {
    var t = AD.tariffs;
    return sec('levels', b.bg, 'tar', '<div class="wrap">' + h2(t.title) + '<p class="sub rv">' + t.subtitle + '</p><div class="tar-grid">' +
      t.items.map(function (c) {
        return '<article class="tcard rv' + (c.dark ? ' dark' : '') + '"><span class="tag tag-top">' + c.tag + '</span>' +
          '<h3>' + c.name + '</h3><p class="tdesc">' + c.desc + '</p>' +
          '<ul>' + c.points.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul>' +
          '<div class="tres"><span class="outline" aria-hidden="true">' + t.resultWord + '</span><p>' + c.result + '</p></div>' +
          '<a class="btn btn-block" href="' + AD.buy + '" target="_blank" rel="noopener"><span>' + t.button + '</span></a>' +
          '<span class="below">' + t.below + icon('arrow') + '</span></article>';
      }).join('') + '</div></div>');
  };

  R.cta = function (b) {
    var c = b.fromAd ? AD.cta : b;
    var p = AD.photos[b.photoKey || 'cta'];
    return sec(b.fromAd ? 'buy' : 'end', b.bg, 'cta', '<div class="paws" aria-hidden="true"></div><div class="wrap cta-grid">' +
      '<div class="cta-l"><h2 class="cta-h rv">' + c.title + '</h2><p class="cta-p rv">' + c.text + '</p>' + btn(c.button) + '</div>' +
      '<div class="cta-r rv"><span class="cta-circle"></span>' + img(p, 'cta-photo') + deco('pencil', 'd-cta') + '</div></div>');
  };

  R.footer = function () {
    return '<footer class="foot"><div class="wrap">' + logo(AD.brand) + '<span>Гайд · 2026</span></div></footer>';
  };

  /* ---------- render ---------- */
  var list = S.pages[page] || S.pages.main;
  root.innerHTML = list.map(function (key) {
    var b = S.blocks[key] || S.adBlocks[key];
    if (!b || !R[b.type]) return '';
    if (page !== 'main' && S.adBlocks[key]) return '';
    return R[b.type](b);
  }).join('');
  document.title = S.meta.title + ' · ' + AD.brand.a.charAt(0) + AD.brand.a.slice(1).toLowerCase() + ' ' + AD.brand.b.charAt(0) + AD.brand.b.slice(1).toLowerCase();

  /* ---------- behaviour ---------- */
  // reveal on scroll
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rv = [].slice.call(document.querySelectorAll('.rv'));
  if (!reduce && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('anim');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  }

  // FAQ: smooth open/close, one open at a time
  [].forEach.call(document.querySelectorAll('.faq-item'), function (d) {
    var s = d.querySelector('summary'), a = d.querySelector('.faq-a');
    s.addEventListener('click', function (e) {
      if (reduce) return;
      e.preventDefault();
      if (d.open) {
        a.style.height = a.scrollHeight + 'px'; void a.offsetHeight; a.style.height = '0px';
        d.classList.remove('is-open');
        setTimeout(function () { d.open = false; a.style.height = ''; }, 300);
      } else {
        d.open = true; d.classList.add('is-open'); a.style.height = '0px'; void a.offsetHeight; a.style.height = a.scrollHeight + 'px';
        setTimeout(function () { a.style.height = ''; }, 300);
      }
    });
    if (d.open) d.classList.add('is-open');
  });

  // video cards: play muted inline on click
  [].forEach.call(document.querySelectorAll('.vid'), function (b) {
    b.addEventListener('click', function () {
      var im = b.querySelector('img');
      var v = document.createElement('video');
      v.src = b.getAttribute('data-src'); v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
      v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.preload = 'none';
      v.width = im.width; v.height = im.height; v.poster = im.src; v.className = 'gal-img';
      v.setAttribute('aria-label', im.alt);
      b.replaceWith(v); v.play && v.play().catch(function () {});
    });
  });
})();
