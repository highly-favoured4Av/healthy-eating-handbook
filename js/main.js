(function(){
  var C = window.SITE_CONFIG || {};
  var $ = function(s,r){return (r||document).querySelector(s)};
  var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  // ---- hero variant (A/B): ?hero=b  or ?hero=a
  var params = new URLSearchParams(location.search);
  var v = (params.get('hero')||'a').toLowerCase()==='b' ? 'b' : 'a';
  document.documentElement.setAttribute('data-hero', v);
  $$('[data-hero-variant]').forEach(function(el){ el.hidden = el.getAttribute('data-hero-variant') !== v; });
  // ---- theme switch: ?theme=navy
  if ((params.get('theme')||'')==='navy') document.body.classList.add('theme-navy');
  // ---- analytics hook (safe if no analytics installed)
  function track(name,data){ try{ (window.dataLayer=window.dataLayer||[]).push(Object.assign({event:name,hero_variant:v},data||{})); }catch(e){} }
  // ---- checkout links
  var dlg = $('#checkout-dialog');
  $$('[data-checkout]').forEach(function(a){
    if (C.CHECKOUT_URL) { a.setAttribute('href', C.CHECKOUT_URL); a.setAttribute('rel','noopener'); }
    a.addEventListener('click', function(e){
      track('checkout_click',{location:a.getAttribute('data-checkout')});
      if (!C.CHECKOUT_URL) { e.preventDefault(); if (dlg && dlg.showModal) dlg.showModal(); else alert('Checkout is not connected yet. Set CHECKOUT_URL in js/config.js.'); }
    });
  });
  if (dlg) $$('[data-close-dialog]', dlg).forEach(function(b){ b.addEventListener('click', function(){ dlg.close(); }); });
  // ---- sample + social links from config
  $$('[data-sample]').forEach(function(a){ a.setAttribute('href', C.SAMPLE_URL); a.addEventListener('click', function(){ track('sample_download'); }); });
  $$('[data-whatsapp]').forEach(function(a){ a.setAttribute('href', C.WHATSAPP_CHANNEL); a.addEventListener('click', function(){ track('community_click'); }); });
  $$('[data-instagram]').forEach(function(a){ a.setAttribute('href', C.INSTAGRAM); });
  $$('[data-email]').forEach(function(a){ a.setAttribute('href','mailto:'+C.EMAIL); if(!a.textContent.trim()) a.textContent=C.EMAIL; });
  $$('[data-price]').forEach(function(el){ el.textContent = C.PRICE_DISPLAY; });
  // ---- mobile nav
  var btn = $('#nav-toggle'), nav = $('#site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function(){ var o = btn.getAttribute('aria-expanded')==='true'; btn.setAttribute('aria-expanded', String(!o)); nav.classList.toggle('open', !o); });
    $$('a', nav).forEach(function(a){ a.addEventListener('click', function(){ btn.setAttribute('aria-expanded','false'); nav.classList.remove('open'); }); });
  }
  // ---- sticky mobile CTA appears after the hero
  var sticky = $('#sticky-cta'), hero = $('#hero');
  if (sticky && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function(en){ en.forEach(function(e){ sticky.classList.toggle('show', !e.isIntersecting); }); }, {threshold:0}).observe(hero);
  }
  // ---- FAQ tracking
  $$('.faq details').forEach(function(d){ d.addEventListener('toggle', function(){ if (d.open) track('faq_open',{q:(d.querySelector('summary')||{}).textContent}); }); });
  // ---- year
  $$('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });
})();
