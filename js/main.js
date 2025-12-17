// ==== ПАДАЮЩИЙ СНЕГ ====
function createSnow() {
  const snowContainer = document.querySelector('.snow-container');
  if (!snowContainer) return;
  
  snowContainer.innerHTML = '';
  
  const snowflakeCount = window.innerWidth < 768 ? 50 : 150;
  
  for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    const size = Math.random() * 5 + 3;
    const posX = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.7 + 0.3;
    const blur = Math.random() * 2;
    
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${posX}%`;
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `${delay}s`;
    snowflake.style.opacity = opacity;
    snowflake.style.filter = `blur(${blur}px)`;
    
    snowContainer.appendChild(snowflake);
  }
}

// ==== ПЛАВНЫЕ ПЕРЕХОДЫ ====
let isTransitioning = false;

function setupSmoothTransitions() {
  // Задержка для анимации входа
  setTimeout(() => {
    if (window.location.pathname.includes('books/')) {
      document.body.classList.add('book-page-enter');
    }
  }, 100);
  
  // Обработка кликов по ссылкам
  document.querySelectorAll('a[href]:not(.purchase-button)').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('http') || href.startsWith('#') || 
          href.startsWith('javascript') || this.target === '_blank' ||
          this.classList.contains('purchase-button')) {
        return;
      }
      
      e.preventDefault();
      
      if (isTransitioning) return;
      isTransitioning = true;
      
      // Анимация выхода
      document.body.style.animation = 'fadeOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      
      // Переход после анимации
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
}

// ==== АНИМАЦИЯ КАРТОЧЕК КНИГ ====
function setupBookCardsAnimation() {
  const bookCards = document.querySelectorAll('.book-card');
  bookCards.forEach((card, index) => {
    card.style.setProperty('--card-index', index);
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Добавляем описание из data-атрибута
    const description = card.getAttribute('data-description');
    const hoverInfo = card.querySelector('.book-hover-info p');
    
    if (description && hoverInfo) {
      const maxLength = 120;
      const shortDesc = description.length > maxLength 
        ? description.substring(0, maxLength) + '...' 
        : description;
      hoverInfo.textContent = shortDesc;
    }
  });
}

// ==== ГЕНЕРАЦИЯ ОТЗЫВОВ ====
function generateReviews() {
  if (!window.location.pathname.includes('books/')) return;
  
  const reviewsSection = document.querySelector('.reviews-section');
  if (!reviewsSection) return;
  
  const bookId = window.location.pathname.split('/').pop().split('.')[0];
  
  const allReviews = {
    '1-tufli': [
      {
        author: "Мария С.",
        date: "15.12.2023",
        rating: 5,
        text: "Эта книга изменила мое отношение к Рождеству. История настолько искренняя, что не могу сдержать слез при каждом прочтении."
      },
      {
        author: "Алексей К.",
        date: "22.12.2023",
        rating: 4,
        text: "Отличная книга для холодного вечера. Заставляет задуматься о самом важном в жизни."
      },
      {
        author: "Екатерина В.",
        date: "05.01.2024",
        rating: 5,
        text: "Прочитала за один вечер! Невероятно трогательная история, которая согревает душу."
      }
    ],
    '2-pets-on': [
      {
        author: "Ольга П.",
        date: "10.12.2023",
        rating: 5,
        text: "Любимая книга моего детства! Теперь читаю своим детям. Финдус - лучший кот в мире!"
      },
      {
        author: "Дмитрий С.",
        date: "18.12.2023",
        rating: 4,
        text: "Уютная история, которая создает настоящую рождественскую атмосферу."
      }
    ],
    '3-porosenok': [
      {
        author: "Анна М.",
        date: "20.12.2023",
        rating: 5,
        text: "Роулинг снова поразила глубиной. История Поросёнка трогает до глубины души."
      }
    ],
    '4-yolka': [
      {
        author: "Сергей Л.",
        date: "25.12.2023",
        rating: 5,
        text: "Потрясающая книга о силе человеческого духа. Читал со слезами на глазах."
      }
    ],
    '5-tumi': [
      {
        author: "Ирина В.",
        date: "12.12.2023",
        rating: 4,
        text: "Очень трогательная история об исцелении через творчество."
      }
    ],
    '6-snezhoviki': [
      {
        author: "Михаил Т.",
        date: "28.12.2023",
        rating: 5,
        text: "Философская и нежная книга. Идеально для зимних вечеров."
      }
    ],
    '7-zimnyaya-istoriya': [
      {
        author: "Елена С.",
        date: "05.12.2023",
        rating: 5,
        text: "Невероятно уютная книга! Читаешь и чувствуешь тепло домашнего очага."
      }
    ],
    '8-chai-v-lesu': [
      {
        author: "Андрей К.",
        date: "15.12.2023",
        rating: 5,
        text: "Медитативная книга. Учит ценить тишину и моменты одиночества."
      }
    ],
    '9-lyuter': [
      {
        author: "Татьяна Р.",
        date: "22.12.2023",
        rating: 5,
        text: "Прекрасная история о доверии и надежде. Рекомендую всем!"
      }
    ]
  };
  
  const reviews = allReviews[bookId] || [
    {
      author: "Анонимный читатель",
      date: "20.12.2023",
      rating: 5,
      text: "Прекрасная рождественская история! Рекомендую всем, кто хочет почувствовать дух праздника."
    },
    {
      author: "Книголюб",
      date: "25.12.2023",
      rating: 4,
      text: "Идеальное чтение для зимнего вечера. Создает уютную атмосферу и дарит хорошее настроение."
    }
  ];
  
  let reviewsHTML = '<div class="reviews-grid">';
  
  reviews.forEach((review, index) => {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += i <= review.rating ? '★' : '☆';
    }
    
    reviewsHTML += `
      <div class="review-card animate" style="animation-delay: ${index * 0.2}s">
        <div class="review-header">
          <div>
            <div class="review-author">${review.author}</div>
            <div class="review-date">${review.date}</div>
          </div>
          <div class="review-rating">${stars}</div>
        </div>
        <div class="review-text">"${review.text}"</div>
      </div>
    `;
  });
  
  reviewsHTML += '</div>';
  reviewsSection.innerHTML += reviewsHTML;
}

// ==== АНИМАЦИЯ ТЕГОВ ====
function animateTags() {
  const tags = document.querySelectorAll('.tags span');
  tags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
  });
}

// ==== АНИМАЦИЯ ПРИ ПРОКРУТКЕ ====
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Анимация для тегов
        if (entry.target.classList.contains('tags')) {
          animateTags();
        }
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  document.querySelectorAll('.animate').forEach(el => {
    observer.observe(el);
  });
}

// ==== ИНИЦИАЛИЗАЦИЯ ====
document.addEventListener('DOMContentLoaded', function() {
  // Запускаем снег
  createSnow();
  
  // Пересоздаем снег при изменении размера окна
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createSnow, 250);
  });
  
  // Настраиваем плавные переходы
  setupSmoothTransitions();
  
  // Настраиваем анимацию карточек
  setupBookCardsAnimation();
  
  // Генерируем отзывы
  generateReviews();
  
  // Настраиваем анимацию при прокрутке
  setupScrollAnimations();
  
  // Анимация для текста
  setTimeout(() => {
    const paragraphs = document.querySelectorAll('.intro p');
    paragraphs.forEach((p, index) => {
      p.style.animationDelay = `${index * 0.2}s`;
    });
  }, 500);
  
  // Добавляем CSS для анимации выхода
  if (!document.querySelector('#transition-styles')) {
    const style = document.createElement('style');
    style.id = 'transition-styles';
    style.textContent = `
      @keyframes fadeOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-10px);
        }
      }
    `;
    document.head.appendChild(style);
  }
});

// ==== ПРЕДЗАГРУЗКА ИЗОБРАЖЕНИЙ ====
function preloadImages() {
  const images = [];
  
  // Главная страница
  images.push(
    'assets/tufli.jpg',
    'assets/pets-on.jpg',
    'assets/porosenok.jpg',
    'assets/yolka.jpg',
    'assets/tumi.jpg',
    'assets/snezhoviki.jpg',
    'assets/zimnyaya-istoriya.jpg',
    'assets/chai-v-lesu.jpg',
    'assets/lyuter.jpg'
  );
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Запускаем предзагрузку
window.addEventListener('load', preloadImages);