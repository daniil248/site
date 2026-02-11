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

  // Lightning Storm System
  var lightningPaths = [
    // Small lightning (20% screen)
    'M50,0 L48,15 L52,15 L49,35 L53,35 L50,60',
    'M50,0 L52,20 L48,20 L51,45',
    'M50,0 L47,18 L51,18 L48,40 L52,40 L49,55',
    
    // Medium lightning (40% screen)
    'M50,0 L48,12 L52,12 L49,25 L53,25 L50,45 L47,45 L51,65 L48,85',
    'M50,0 L52,15 L48,15 L51,30 L54,30 L50,50 L53,50 L49,75',
    'M50,0 L47,20 L51,20 L48,35 L52,35 L49,55 L53,55 L50,80',
    'M50,0 L51,18 L49,18 L52,32 L48,32 L51,50 L47,50 L50,70 L53,70 L50,90',
    
    // Large lightning (60-70% screen - like in image)
    'M50,0 L48,10 L52,10 L49,22 L53,22 L50,35 L47,35 L51,50 L48,50 L52,65 L49,65 L53,80 L50,95',
    'M50,0 L52,12 L48,12 L51,25 L54,25 L50,40 L53,40 L49,55 L52,55 L48,70 L51,70 L47,85 L50,100',
    'M50,0 L47,15 L51,15 L48,28 L52,28 L49,42 L53,42 L50,58 L47,58 L51,72 L48,72 L52,88 L49,105',
    
    // Branching lightning
    'M50,0 L48,20 L52,20 L49,40 M49,40 L45,50 M49,40 L53,40 L50,60 M50,60 L54,70 M50,60 L46,75',
    'M50,0 L51,15 L49,15 L52,35 M52,35 L55,45 M52,35 L48,35 L51,55 M51,55 L47,68 M51,55 L54,65',
    'M50,0 L47,18 L51,18 L48,38 M48,38 L44,48 M48,38 L52,38 L49,58 L53,58 L50,75 M50,75 L46,85',
    
    // Wide spread lightning
    'M50,0 L48,25 L52,25 L49,50 M49,50 L42,65 M49,50 L56,65 M49,50 L50,70',
    'M50,0 L51,20 L49,20 L52,45 M52,45 L45,60 M52,45 L58,60 M52,45 L51,68',
    
    // Intense multi-branch
    'M50,0 L48,15 L52,15 L49,30 M49,30 L45,40 L43,50 M49,30 L53,30 L50,50 M50,50 L47,65 M50,50 L54,65 M50,50 L51,75',
    'M50,0 L51,12 L49,12 L52,28 M52,28 L55,38 L57,48 M52,28 L48,28 L51,48 M51,48 L48,63 M51,48 L55,63 M51,48 L50,80',
    
    // Diagonal strikes
    'M30,0 L32,20 L28,20 L31,40 L27,40 L30,60 L33,60 L30,85',
    'M70,0 L68,18 L72,18 L69,38 L73,38 L70,58 L67,58 L70,82',
    
    // Multi-strike (looks like 2 bolts)
    'M40,0 L38,25 L42,25 L39,50 M60,0 L58,20 L62,20 L59,45',
    
    // Massive screen fill
    'M50,0 L48,10 L52,10 L49,20 L53,20 L50,32 L47,32 L51,45 L48,45 L52,58 L49,58 L53,72 L50,72 L47,88 L51,88 L48,105 M48,45 L44,55 M52,58 L56,68 M47,88 L43,98'
  ];

  function createLightning() {
    var container = document.getElementById('lightning');
    if (!container) return;

    // Random position
    var x = Math.random() * 80 + 10; // 10-90%
    var y = Math.random() * 30; // 0-30%
    
    // Random intensity (small, medium, large)
    var intensity = Math.random();
    var pathIndex;
    
    if (intensity < 0.5) {
      // Small (50% chance)
      pathIndex = Math.floor(Math.random() * 3);
    } else if (intensity < 0.85) {
      // Medium (35% chance)
      pathIndex = 3 + Math.floor(Math.random() * 4);
    } else {
      // Large/Massive (15% chance)
      pathIndex = 7 + Math.floor(Math.random() * (lightningPaths.length - 7));
    }
    
    var path = lightningPaths[pathIndex];
    
    // Set CSS variables
    container.style.setProperty('--strike-x', x + '%');
    container.style.setProperty('--strike-y', y + '%');
    
    // Create flash overlay
    var flash = document.createElement('div');
    flash.className = 'lightning-flash';
    
    // Create bolt SVG
    var bolt = document.createElement('div');
    bolt.className = 'lightning-bolt';
    bolt.innerHTML = '<svg viewBox="0 0 100 120" preserveAspectRatio="xMidYMin slice"><path d="' + path + '" stroke="#00d4aa" stroke-width="' + (intensity > 0.85 ? '2' : '1.5') + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    
    container.innerHTML = '';
    container.appendChild(flash);
    container.appendChild(bolt);
    container.classList.add('active');
    
    // Remove after animation
    setTimeout(function() {
      container.classList.remove('active');
    }, 350);
  }

  function scheduleLightning() {
    // Random interval: 5-15 seconds
    var delay = Math.random() * 10000 + 5000;
    
    setTimeout(function() {
      createLightning();
      scheduleLightning();
    }, delay);
  }

  // Start storm after page load
  window.addEventListener('load', function() {
    setTimeout(scheduleLightning, 3000);
  });
})();
