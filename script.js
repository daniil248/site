(function () {
  'use strict';

  // Header scroll
  var header = document.querySelector('.header');
  if (header) {
    function onScroll() {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Burger menu
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    document.querySelectorAll('.nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // Contact form
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var formData = new FormData(form);
      var data = {
        name: formData.get('name'),
        contact: formData.get('contact'),
        message: formData.get('message')
      };

      // Отправка на backend
      fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        if (result.success) {
          form.style.display = 'none';
          var success = document.getElementById('form-success');
          if (success) success.classList.add('visible');
        } else {
          alert('Ошибка отправки. Попробуйте написать напрямую в Telegram.');
        }
      })
      .catch(function(error) {
        console.error('Error:', error);
        alert('Ошибка отправки. Попробуйте написать напрямую в Telegram.');
      });
    });
  }
})();
