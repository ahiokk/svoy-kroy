// Учебный прототип магазина «Свой крой». Цели Яндекс Метрики отправляются отсюда.
function goal(name) {
  if (window.ym && window.METRIKA_ID) {
    window.ym(window.METRIKA_ID, 'reachGoal', name);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // уведомление о cookie
  var c = document.querySelector('.cookie');
  if (c && !localStorage.getItem('cookie_ok')) {
    c.style.display = 'block';
    c.querySelector('button').addEventListener('click', function () {
      localStorage.setItem('cookie_ok', '1');
      c.style.display = 'none';
    });
  }

  // кнопки «Купить на Wildberries»: цель buy_wb и окно-заглушка
  var modal = document.querySelector('.modal');
  document.querySelectorAll('[data-buy]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      goal('buy_wb');
      if (modal) modal.style.display = 'flex';
    });
  });
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.hasAttribute('data-close')) modal.style.display = 'none';
    });
  }

  // форма подбора размера: цель size_form, данные никуда не отправляются
  var f = document.querySelector('form.pick');
  if (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      goal('size_form');
      var waist = parseFloat(f.waist.value) || 0;
      var size = waist ? Math.round(waist / 2.54) : '';
      var ok = document.querySelector('.ok');
      ok.textContent = size
        ? 'Вам подойдёт размер ' + size + '. Длину 32 берут при росте до 180 см, 34 при росте выше.'
        : 'Спасибо! Укажите обхват талии, и мы подскажем размер.';
      ok.style.display = 'block';
    });
  }
});
