'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menu = $('.menu-toggle');
const nav = $('#main-nav');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menu'); nav.classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); nav.classList.toggle('open', open); });
$$('a', nav).forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width:1051px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.08 });
  $$('.reveal').forEach(element => observer.observe(element));
}

$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  $$('[data-filter]').forEach(filter => { const active = button === filter; filter.classList.toggle('active', active); filter.setAttribute('aria-pressed', String(active)); });
  let count = 0;
  $$('[data-category]').forEach(product => { const shown = category === 'all' || product.dataset.category === category; product.hidden = !shown; if (shown) { product.classList.add('visible'); count++; } });
  $('#filter-count').textContent = `${count} ${count === 1 ? 'material' : 'materiais'}`;
}));

const dialogTriggers = new WeakMap();
function openDialog(dialog, trigger) { dialogTriggers.set(dialog, trigger || document.activeElement); dialog.showModal(); }
$$('dialog').forEach(dialog => {
  $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { const trigger = dialogTriggers.get(dialog); if (!document.querySelector('dialog[open]') && trigger?.isConnected && !trigger.closest('dialog:not([open])')) trigger.focus({ preventScroll: true }); });
});

const products = {
  resina: { title: 'Resina ecológica Cazo Khalix', category: 'RESINAS · O COMEÇO DA IDEIA', image: 'resina', alt: 'Embalagem kraft da resina Cazo Khalix', description: 'Conheça a resina da marca e suas possibilidades para projetos artesanais. Explore as referências de formas e texturas e consulte as orientações técnicas para a sua criação.' },
  aditivo: { title: 'Aditivo acelerador de secagem', category: 'COMPLEMENTOS · PROCESSO CRIATIVO', image: 'terrazzo', alt: 'Aditivo Cazo Khalix junto a um conjunto de peças em granilite', description: 'Um complemento da linha Cazo Khalix apresentado nas referências da marca. Consulte compatibilidade, proporções e modo de uso para entender como incluí-lo no seu processo.' }
};
let selectedProduct = 'resina';
let productTrigger = null;
$$('[data-product]').forEach(button => button.addEventListener('click', () => {
  selectedProduct = button.dataset.product;
  productTrigger = button;
  const product = products[selectedProduct];
  $('#product-title').textContent = product.title;
  $('#product-detail-category').textContent = product.category;
  $('#product-detail-description').textContent = product.description;
  $('#product-detail-img').src = `assets/${product.image}.jpg`;
  $('#product-detail-img').alt = product.alt;
  openDialog($('#product-dialog'), button);
}));

const gallery = {
  criacao: 'Composição com vasos amarelos, incensário e bandeja de formato orgânico.',
  bandejas: 'Bandejas ovais em tons minerais, com textura e acabamento artesanal.'
};
$$('[data-gallery]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.gallery;
  $('#gallery-detail').src = `assets/${key}.jpg`;
  $('#gallery-detail').alt = gallery[key];
  $('#gallery-caption').textContent = gallery[key];
  openDialog($('#gallery-dialog'), button);
}));

function contact(interest, trigger) {
  closeMenu();
  $('#inquiry-result').hidden = true;
  $('#inquiry-form').hidden = false;
  $('#copy-status').textContent = '';
  if (interest) $('#interest').value = interest;
  openDialog($('#contact-dialog'), trigger);
}
$$('[data-contact]').forEach(button => button.addEventListener('click', () => contact(null, button)));
$('#product-inquiry').addEventListener('click', () => { $('#product-dialog').close(); contact(products[selectedProduct].title, productTrigger); });
$('#inquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = $('#visitor-name').value.trim();
  const message = $('#message').value.trim();
  if (!name || !message) { const input = !name ? $('#visitor-name') : $('#message'); input.setCustomValidity('Preencha este campo com o seu texto.'); input.reportValidity(); input.addEventListener('input', () => input.setCustomValidity(''), { once: true }); return; }
  $('#prepared-message').value = `Olá, equipe Cazo Khalix! Meu nome é ${name}.\n\nTenho interesse em: ${$('#interest').value}.\n\n${message}\n\nPodem me ajudar com informações e disponibilidade?`;
  $('#inquiry-form').hidden = true;
  $('#inquiry-result').hidden = false;
  $('#prepared-message').focus();
});
$('#edit-message').addEventListener('click', () => { $('#inquiry-result').hidden = true; $('#inquiry-form').hidden = false; $('#copy-status').textContent = ''; $('#visitor-name').focus(); });
$('#copy-message').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('#prepared-message').value); $('#copy-status').textContent = 'Mensagem copiada. Agora você pode enviá-la pelo canal da marca.'; }
  catch { $('#prepared-message').focus(); $('#prepared-message').select(); $('#copy-status').textContent = 'Selecione e copie o texto com Ctrl+C ou pelo menu do seu dispositivo.'; }
});
$('#year').textContent = new Date().getFullYear();

// O widget apenas prepara o link; nenhuma mensagem é enviada pelo site.
const whatsappToggle = $('#whatsapp-toggle');
const whatsappPanel = $('#whatsapp-panel');
const whatsappHint = $('#whatsapp-hint');
let whatsappHintDismissed = false;
function setWhatsappOpen(open, restoreFocus = false) {
  whatsappPanel.hidden = !open;
  whatsappToggle.setAttribute('aria-expanded', String(open));
  whatsappToggle.setAttribute('aria-label', `${open ? 'Fechar' : 'Abrir'} contato da Cazo Khalix pelo WhatsApp`);
  whatsappHint.hidden = true;
  whatsappHintDismissed = true;
  if (open) $('#whatsapp-heading').focus({ preventScroll: true });
  else if (restoreFocus) whatsappToggle.focus({ preventScroll: true });
}
whatsappToggle.addEventListener('click', () => setWhatsappOpen(whatsappPanel.hidden));
$('.whatsapp-close').addEventListener('click', () => setWhatsappOpen(false, true));
$('.whatsapp-hint button').addEventListener('click', () => { whatsappHint.hidden = true; whatsappHintDismissed = true; });
document.addEventListener('click', event => { if (!whatsappPanel.hidden && !event.target.closest('.whatsapp-widget')) setWhatsappOpen(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !whatsappPanel.hidden) { event.preventDefault(); setWhatsappOpen(false, true); } });
const whatsappMessages = {
  duvida: 'Olá, estou com uma dúvida, pode me ajudar?',
  resina: 'Olá, gostaria de saber mais sobre a resina ecológica Cazo Khalix. Pode me ajudar?',
  aditivo: 'Olá, gostaria de informações sobre os aditivos da Cazo Khalix. Pode me ajudar?'
};
$$('[data-wa-topic]').forEach(button => button.addEventListener('click', () => {
  $$('[data-wa-topic]').forEach(topic => topic.setAttribute('aria-pressed', String(topic === button)));
  $('#whatsapp-link').href = `https://wa.me/5511944703377?text=${encodeURIComponent(whatsappMessages[button.dataset.waTopic])}`;
}));
window.setTimeout(() => { if (!whatsappHintDismissed && whatsappPanel.hidden && !document.querySelector('dialog[open]')) whatsappHint.hidden = false; }, 6000);
window.setTimeout(() => { whatsappHint.hidden = true; }, 15000);

// Telas de acesso: referência visual, sem autenticação ou persistência.
function switchAccountTab(mode) {
  const register = mode === 'register';
  $$('[data-account-tab]').forEach(tab => { const active = tab.dataset.accountTab === mode; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
  $('#account-login-panel').hidden = register;
  $('#account-register-panel').hidden = !register;
  $('#account-title').textContent = register ? 'Sua criatividade tem lugar.' : 'Que bom ter você aqui.';
  $('#account-status').textContent = '';
}
$$('[data-account]').forEach(button => button.addEventListener('click', () => {
  let trigger = button;
  const parentDialog = button.closest('dialog');
  if (parentDialog) { trigger = dialogTriggers.get(parentDialog) || button; parentDialog.close(); }
  closeMenu();
  switchAccountTab(button.dataset.account);
  openDialog($('#account-dialog'), trigger);
}));
$$('[data-account-tab]').forEach(tab => {
  tab.addEventListener('click', () => switchAccountTab(tab.dataset.accountTab));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const tabs = $$('[data-account-tab]');
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - tabs.indexOf(tab);
    switchAccountTab(tabs[index].dataset.accountTab);
    tabs[index].focus();
  });
});
$('#account-login-form').addEventListener('submit', event => { event.preventDefault(); $('#account-status').textContent = 'Esta é uma prévia visual. O acesso à conta será ativado na versão final.'; });
$('#account-register-form').addEventListener('submit', event => {
  event.preventDefault();
  const confirm = $('#register-confirm');
  if ($('#register-password').value !== confirm.value) { confirm.setCustomValidity('As senhas precisam ser iguais.'); confirm.reportValidity(); return; }
  $('#account-status').textContent = 'Cadastro apresentado para visualização. Nenhuma conta foi criada e os dados não foram enviados.';
});
[$('#register-password'), $('#register-confirm')].forEach(input => input.addEventListener('input', () => $('#register-confirm').setCustomValidity('')));
$('.account-forgot').addEventListener('click', () => { $('#account-status').textContent = 'A recuperação de senha será disponibilizada junto com o acesso à conta.'; });
$('#account-dialog').addEventListener('close', () => { $$('input[type="password"]', $('#account-dialog')).forEach(input => { input.value = ''; input.setCustomValidity(''); }); });

const courseDetails = {
  online: { title: 'Cursos online.', format: 'APRENDA DE ONDE ESTIVER', image: 'criacao', description: 'Conheça nossos cursos online, todos ministrados utilizando a resina Cazo Khalix. Uma oportunidade para explorar a criação de peças e desenvolver seu olhar artesanal.', message: 'Olá! Gostaria de conhecer os cursos online com resina Cazo Khalix. Podem me passar informações?' },
  presencial: { title: 'Oficinas presenciais.', format: 'UMA EXPERIÊNCIA FEITA À MÃO', image: 'atelier', description: 'Conheça nossas oficinas presenciais, todas ministradas utilizando a resina Cazo Khalix. Entre em contato para saber mais sobre os próximos encontros.', message: 'Olá! Gostaria de informações sobre as oficinas presenciais com resina Cazo Khalix, datas e disponibilidade.' }
};
$$('[data-course]').forEach(button => button.addEventListener('click', () => {
  const course = courseDetails[button.dataset.course];
  $('#course-title').textContent = course.title;
  $('#course-dialog-format').textContent = course.format;
  $('#course-dialog-description').textContent = course.description;
  $('#course-dialog-image').src = `assets/${course.image}.jpg`;
  $('#course-whatsapp').href = `https://wa.me/5511944703377?text=${encodeURIComponent(course.message)}`;
  openDialog($('#course-dialog'), button);
}));
$$('[data-free-class]').forEach(button => button.addEventListener('click', () => openDialog($('#lesson-dialog'), button)));
$$('[data-close-dialog]').forEach(link => link.addEventListener('click', () => link.closest('dialog').close()));

// O formulário prepara a conversa; o visitante confirma o envio no WhatsApp.
$('#full-contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = $('#contact-first-name').value.trim();
  const surname = $('#contact-last-name').value.trim();
  const message = $('#contact-message').value.trim();
  for (const [selector, value] of [['#contact-first-name', name], ['#contact-last-name', surname], ['#contact-message', message]]) {
    if (!value) { const input = $(selector); input.setCustomValidity('Preencha este campo com seu texto.'); input.reportValidity(); input.addEventListener('input', () => input.setCustomValidity(''), { once: true }); return; }
  }
  const phone = $('#contact-phone');
  const digits = phone.value.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) { phone.setCustomValidity('Informe seu WhatsApp com DDD.'); phone.reportValidity(); phone.addEventListener('input', () => phone.setCustomValidity(''), { once: true }); return; }
  const text = `Olá, equipe Cazo Khalix!\n\nMeu nome é ${name} ${surname}.\nE-mail: ${$('#contact-email').value.trim()}\nWhatsApp: ${phone.value.trim()}\n\n${message}`;
  $('#full-contact-whatsapp').href = `https://wa.me/5511944703377?text=${encodeURIComponent(text)}`;
  $('#full-contact-result').hidden = false;
  $('.form-status', $('#full-contact-result')).textContent = 'Mensagem preparada. Nenhuma informação foi enviada pelo site.';
  $('#full-contact-whatsapp').focus();
});
$('#full-contact-form').addEventListener('input', () => { $('#full-contact-result').hidden = true; });
