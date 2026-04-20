<template>
  <div class="sp-root" itemscope itemtype="https://schema.org/LocalBusiness">

    <teleport to="body">
      <transition name="modal">
        <div v-if="quickModalOpen" class="sp-modal-overlay" @click.self="quickModalOpen = false">
          <div class="sp-modal-card">
            <button class="sp-modal-close" @click="quickModalOpen = false" aria-label="Закрыть">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div class="sp-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.76a16 16 0 0 0 6 6l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
              </svg>
            </div>
            <h3>Узнать стоимость</h3>
            <p>Оставьте контакты — перезвоним и рассчитаем цену за 5 минут</p>
            <form @submit.prevent="submitQuickForm" novalidate>
              <div class="sp-modal-field">
                <label for="qf-name">Ваше имя *</label>
                <input type="text" id="qf-name" v-model="quickForm.name" placeholder="Иван" required
                  autocomplete="name" />
              </div>
              <div class="sp-modal-field">
                <label for="qf-phone">Телефон *</label>
                <input type="tel" id="qf-phone" v-model="quickForm.phone" placeholder="+7 (900) 123-45-67" required
                  autocomplete="tel" @input="formatQuickPhone" maxlength="18" />
                <span v-if="quickPhoneError" class="sp-field-error">{{ quickPhoneError }}</span>
              </div>
              <div class="sp-form-consent">
                <input type="checkbox" id="qf-consent" v-model="quickForm.consent" required
                  class="sp-consent-checkbox" />
                <label for="qf-consent" class="sp-consent-text">Согласен с обработкой персональных данных</label>
              </div>
              <button type="submit" class="sp-btn-blue sp-btn-full" :disabled="isQuickSubmitting">
                {{ isQuickSubmitting ? 'Отправляем...' : 'Отправить →' }}
              </button>
              <p v-if="quickFormMessage" :class="['sp-form-message', quickFormMessageType]" role="alert">{{
                quickFormMessage }}</p>
            </form>
          </div>
        </div>
      </transition>
    </teleport>

    <header :class="['sp-header', { scrolled: isScrolled }]" role="banner">
      <div class="sp-container sp-header-inner">
        <div class="sp-logo" itemprop="name">
          <img src="https://stena-pro.vercel.app/logo.jpg" alt="СтеныПро" itemprop="logo" width="42" height="42" />
          <div>
            <span class="sp-logo-title">СТЕНЫ<span class="sp-text-blue">ПРО</span></span>
            <span class="sp-logo-sub">Возведение межкомнатных <br> перегородок под ключ</span>
          </div>
        </div>
        <nav class="sp-nav" aria-label="Основная навигация">
          <a href="#why">Технология</a>
          <a href="#process">Этапы</a>
          <a href="#cost">Цены</a>
          <a href="#reviews">Отзывы</a>
        </nav>
        <div class="sp-hcta">
          <div class="sp-phone-wrap">
            <a href="tel:+79252753031" class="sp-phone" itemprop="telephone">+7 (925) 275-30-31</a>
            <span class="sp-working"><span class="sp-dot"></span>Работаем сейчас</span>
          </div>
          <a href="https://t.me/Stena_pro" target="_blank" rel="noopener noreferrer" class="sp-btn-wa"
            aria-label="Написать в Telegram">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.2-.07-.06-.18-.04-.26-.02-.12.02-2.01 1.28-2.83 1.8-.27.18-.51.27-.73.27-.24 0-.7-.14-1.04-.25-.44-.15-.86-.32-1.24-.48-.41-.17-.45-.41-.07-.65 1.44-.94 3.15-1.87 5.13-2.8 2.44-1.14 2.95-1.34 3.28-1.34.07 0 .23.02.33.13.09.09.12.21.13.29.01.09.02.22-.01.34z" />
            </svg>
            Telegram
          </a>
          <a href="https://max.ru/u/f9LHodD0cOIdwjoTOjhiyOz5kLJnqZr-yxvLnGglx15qlNHyvv7Dh7RQoFs" target="_blank"
            class="sp-btn-max" rel="noopener noreferrer">
            <img width="18" height="18" src="https://max.ru/s/img/big-logo.png" alt="">
            MAX
          </a>
          <button @click="openQuickModal()" class="sp-btn-blue">Замер</button>
        </div>
        <button class="sp-burger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-controls="sp-mobile-menu"
          aria-label="Меню">
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
        </button>
      </div>
      <div id="sp-mobile-menu" class="sp-mmenu" :class="{ open: menuOpen }" role="navigation">
        <a href="#why" @click="menuOpen = false">Технология</a>
        <a href="#process" @click="menuOpen = false">Этапы</a>
        <a href="#cost" @click="menuOpen = false">Цены</a>
        <a href="#reviews" @click="menuOpen = false">Отзывы</a>
        <a href="tel:+79252753031" class="sp-phone-mob">+7 (925) 275-30-31</a>
        <a href="https://t.me/Stena_pro" target="_blank" rel="noopener noreferrer" class="sp-btn-wa sp-btn-wa-mob">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.2-.07-.06-.18-.04-.26-.02-.12.02-2.01 1.28-2.83 1.8-.27.18-.51.27-.73.27-.24 0-.7-.14-1.04-.25-.44-.15-.86-.32-1.24-.48-.41-.17-.45-.41-.07-.65 1.44-.94 3.15-1.87 5.13-2.8 2.44-1.14 2.95-1.34 3.28-1.34.07 0 .23.02.33.13.09.09.12.21.13.29.01.09.02.22-.01.34z" />
          </svg>
          Написать в Telegram
        </a>
        <a href="https://max.ru/u/f9LHodD0cOIdwjoTOjhiyOz5kLJnqZr-yxvLnGglx15qlNHyvv7Dh7RQoFs" target="_blank"
          class="sp-btn-max sp-btn-wa-mob" rel="noopener noreferrer">
          <img width="18" height="18" src="https://max.ru/s/img/big-logo.png" alt="">
          Написать в MAX
        </a>
        <button @click="openQuickModal(); menuOpen = false" class="sp-btn-wa sp-btn-wa-mob"
          style="border:none;cursor:pointer;">Узнать стоимость</button>
        <button @click="scrollTo('#contact'); menuOpen = false" class="sp-btn-blue sp-mmenu-btn">Получить коммерческое
          предложение</button>
      </div>
    </header>

    <main>
      <section class="sp-hero" aria-label="Главный экран">
        <div class="sp-hero-bg">
          <div class="sp-hero-overlay"></div>
        </div>
        <div class="sp-container sp-hero-inner">
          <div class="sp-hero-left">
            <div class="sp-hero-badge sp-hero-anim" style="--hi: 0">РАБОТАЕМ В МОСКВЕ И МО</div>
            <h1 class="sp-hero-anim" style="--hi: 1">Тихие межкомнатные перегородки из ПГП и газобетона за <span
                style="white-space:nowrap"><span class="sp-blue">1 день</span> (50 м²)</span></h1>
            <p class="sp-hero-sub sp-hero-anim" style="--hi: 2" itemprop="description">Используем шумоизоляцию MaxForte
              и гибкие связи из нержавеющей стали. Гарантия 2 года, замер — бесплатно.</p>
            <div class="sp-hero-btns sp-hero-anim" style="--hi: 3">
              <button @click="scrollTo('#contact')" class="sp-btn-hero-primary">Получить коммерческое предложение
                →</button>
              <button @click="openQuickModal()" class="sp-btn-hero-outline">Узнать стоимость</button>
            </div>
          </div>
          <div class="sp-hero-right sp-hero-anim" style="--hi: 2">
            <div class="sp-hero-tagline-inner" style="margin-bottom: 12px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"
                style="flex-shrink:0;opacity:.6">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Уют в вашей квартире начинается с правильных технологий</span>
            </div>
            <div class="sp-promo-card">
              <div class="sp-promo-top">
                <div class="sp-promo-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M15 9l-6 6M9 9l6 6" />
                  </svg>
                </div>
                <div>
                  <div class="sp-promo-title">Акция — скидка 10%</div>
                  <div class="sp-promo-text">При заказе кладки <strong>от 100 м²</strong> — скидка <strong>10%</strong>
                    на работу. Осталось <strong style="color:#fbbf24">5 мест</strong> на этот месяц!</div>
                </div>
              </div>
              <button @click="openQuickModal()" class="sp-btn-tg sp-btn-blue sp-btn-full">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Написать письмо
              </button>
            </div>
          </div>
        </div>
        <a href="#why" class="sp-hero-chevron" aria-label="Перейти вниз">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      </section>

      <section id="why" class="sp-sec sp-sec-white" aria-labelledby="why-title">
        <div class="sp-container">
          <div class="sp-container-text sp-animate sp-fade-up">
            <h2 id="why-title">Технология, которая обеспечивает <span class="sp-text-blue">тишину</span></h2>
            <p class="sp-sec-sub">Мы не просто «кладем блоки», мы создаем надежную конструкцию с повышенной
              звукоизоляцией по технологической карте.</p>
          </div>
          <div class="sp-grid4">
            <div class="sp-tech-card sp-animate sp-fade-up" :style="{ '--delay': i * 80 + 'ms' }" v-for="(t, i) in tech"
              :key="t.title">
              <div class="sp-tech-icon" v-html="t.icon" aria-hidden="true"></div>
              <h3>{{ t.title }}</h3>
              <p>{{ t.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="sp-sec sp-sec-pattern" aria-labelledby="materials-title">
        <div class="sp-container">
          <div class="sp-mat-header">
            <h2 id="materials-title" class="sp-mat-title">С чем мы <span class="sp-blue-dark">работаем</span></h2>
            <div class="sp-tabs" role="tablist" aria-label="Выбор материала">
              <button role="tab" :aria-selected="activeTab === 'gas'" :class="{ active: activeTab === 'gas' }"
                @click="activeTab = 'gas'">Газобетон</button>
              <button role="tab" :aria-selected="activeTab === 'pgp'" :class="{ active: activeTab === 'pgp' }"
                @click="activeTab = 'pgp'">ПГП (Пазогребень)</button>
            </div>
          </div>
          <div class="sp-mat-card sp-animate sp-fade-up" v-if="activeTab === 'gas'" role="tabpanel">
            <div class="sp-mat-text">
              <h3>Газобетонные блоки (Ytong, Bonolit)</h3>
              <p>Легкий, экологичный материал с отличной звукоизоляцией. Идеален для перегородок, где важна минимальная
                нагрузка на перекрытие.</p>
              <ul>
                <li>Легкость обработки (можно штробить)</li>
                <li>Высокая теплоизоляция</li>
                <li>Влагостойкие варианты для санузлов</li>
              </ul>
              <p class="sp-note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"
                  style="flex-shrink:0;margin-top:1px" aria-hidden="true">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span><strong>Важно:</strong> Закупаем материал со скидками партнеров или работаем с вашим.</span>
              </p>
            </div>
            <div class="sp-mat-img">
              <img src="https://stena-pro.vercel.app/2026-02-07%2018.17.37.jpg"
                alt="Газобетонные блоки Ytong Bonolit для перегородок" loading="lazy" width="600" height="320" />
              <div class="sp-mat-price-overlay">от 930 ₽/м²</div>
            </div>
          </div>
          <div class="sp-mat-card sp-animate sp-fade-up" v-if="activeTab === 'pgp'" role="tabpanel">
            <div class="sp-mat-text">
              <h3>Пазогребневые плиты (Knauf, Волма)</h3>
              <p>Гладкая поверхность плит позволяет клеить обои сразу после шпатлевания, минуя этап штукатурки. Экономия
                времени и денег.</p>
              <ul>
                <li>Не требует штукатурки (только шпатлевка)</li>
                <li>Экономия пространства (толщина 80 мм)</li>
                <li>Прочное соединение «паз-гребень»</li>
              </ul>
              <p class="sp-note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"
                  style="flex-shrink:0;margin-top:1px" aria-hidden="true">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span><strong>Важно:</strong> Есть полнотелые (прочнее) и пустотелые (легче) варианты.</span>
              </p>
            </div>
            <div class="sp-mat-img">
              <img src="https://stena-pro.vercel.app/2026-02-07%2018.17.43.jpg"
                alt="Пазогребневые плиты Knauf Волма для перегородок" loading="lazy" width="600" height="320" />
              <div class="sp-mat-price-overlay">от 1030 ₽/м²</div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" class="sp-sec sp-sec-white" aria-labelledby="process-title">
        <div class="sp-container">
          <h2 id="process-title" class="sp-process-title">Процесс работы</h2>
          <div class="sp-steps">
            <div class="sp-step sp-animate sp-fade-up" :style="{ '--delay': i * 100 + 'ms' }" v-for="(s, i) in steps"
              :key="i">
              <div class="sp-step-num" aria-hidden="true">{{ i + 1 }}</div>
              <h4>{{ s.title }}</h4>
              <p>{{ s.desc }}</p>
              <span v-if="s.badge" class="sp-step-badge">{{ s.badge.toUpperCase() }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="sp-sec sp-sec-dark" aria-labelledby="economy-title">
        <div class="sp-container">
          <div class="sp-econ-layout">
            <div class="sp-econ-left sp-animate sp-fade-right">
              <h2 id="economy-title" class="sp-econ-title"><span class="sp-white">Как мы экономим</span> <span
                  class="sp-blue-light">ваш бюджет</span></h2>
              <p class="sp-econ-sub">Кривые перегородки — это тонны лишней штукатурки. Мы строим так, чтобы вы не
                переплачивали за выравнивание.</p>
              <div class="sp-econ-items">
                <div class="sp-econ-item">
                  <div class="sp-econ-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                      <line x1="12" y1="12" x2="12" y2="16" />
                      <line x1="10" y1="14" x2="14" y2="14" />
                    </svg>
                  </div>
                  <div>
                    <h4>Экономия на материале стен</h4>
                    <p>Имеем дилерские скидки на блоки Ytong, Bonolit и Knauf до 15%.</p>
                  </div>
                </div>
                <div class="sp-econ-item">
                  <div class="sp-econ-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <h4>Экономия на штукатурке</h4>
                    <p>Слой штукатурки на наших стенах не превышает 1-2 см. Это экономит до 200₽ с каждого м².</p>
                  </div>
                </div>
              </div>
              <div class="sp-econ-note">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" stroke="#fff" stroke-width="2" />
                  <line x1="12" y1="16" x2="12.01" y2="16" stroke="#fff" stroke-width="2" />
                </svg>
                <span>Беремся за объемы <strong>от 30.000₽</strong>. Меньшие объемы обсуждаются индивидуально.</span>
              </div>
            </div>
            <div class="sp-econ-right sp-animate sp-fade-left" style="--delay: 150ms">
              <div class="sp-savings-card">
                <h3>Пример экономии на квартире 60 м²</h3>
                <div class="sp-srow sp-srow-bad">
                  <span>Штукатурка «кривых» стен (слой 5 см):</span>
                  <span>~85 000 ₽</span>
                </div>
                <div class="sp-srow sp-srow-good">
                  <span>Штукатурка наших стен (слой 1.5 см):</span>
                  <span>~25 500 ₽</span>
                </div>
                <div class="sp-srow sp-srow-total">
                  <span>Ваша выгода:</span>
                  <span>59 500 ₽</span>
                </div>
                <button @click="openQuickModal()" class="sp-btn-save">Хочу сэкономить</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cost" class="sp-sec sp-sec-white" aria-labelledby="cost-title">
        <div class="sp-container">
          <div class="sp-container-text sp-animate sp-fade-up">
            <h2 id="cost-title">Прозрачные цены за м²</h2>
            <p class="sp-sec-sub">Никаких скрытых наценок. Фиксируем стоимость в договоре до начала работ.</p>
          </div>
          <div class="sp-prices">
            <div class="sp-price-card sp-animate sp-fade-up" :style="{ '--delay': i * 100 + 'ms' }"
              v-for="(p, i) in prices" :key="p.title" :class="{ popular: p.popular }" itemscope
              itemtype="https://schema.org/Offer">
              <div v-if="p.popular" class="sp-pop-badge">ПОПУЛЯРНО</div>
              <h3 itemprop="name">{{ p.title }}</h3>
              <p v-if="p.subtitle" class="sp-price-sub">{{ p.subtitle }}</p>
              <div class="sp-price-amount" itemprop="price">{{ p.price }}</div>
              <ul>
                <li v-for="f in p.features" :key="f">{{ f }}</li>
              </ul>
              <button @click="scrollTo('#contact')" class="sp-btn-blue">Получить КП</button>
            </div>
          </div>
          <p class="sp-price-note">* Грунтовки, клей и металлические перемычки считаются отдельно</p>
        </div>
      </section>

      <section id="reviews" class="sp-sec sp-sec-gray" aria-labelledby="reviews-title">
        <div class="sp-container">
          <div class="sp-container-text sp-animate sp-fade-up">
            <h2 id="reviews-title">Что говорят клиенты</h2>
          </div>
          <div class="sp-reviews">
            <div class="sp-review-card sp-animate sp-fade-up" :style="{ '--delay': i * 100 + 'ms' }"
              v-for="(r, i) in reviews" :key="r.name" itemscope itemtype="https://schema.org/Review">
              <p class="sp-review-text" itemprop="reviewBody">{{ r.text }}</p>
              <div class="sp-review-author" itemprop="author" itemscope itemtype="https://schema.org/Person">
                <div class="sp-avatar" aria-hidden="true">{{ r.initial }}</div>
                <div>
                  <strong itemprop="name">{{ r.name }}</strong>
                  <span>{{ r.place }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="sp-sec sp-sec-white" aria-labelledby="contact-title">
        <div class="sp-container">
          <div class="sp-container-text sp-animate sp-fade-up">
            <h2 id="contact-title">Подберём материал и рассчитаем стоимость</h2>
            <p class="sp-sec-sub">Ответьте на 7 коротких вопросов — и мы подготовим персональное коммерческое
              предложение.</p>
          </div>

          <div class="sp-quiz-wrapper sp-animate sp-fade-up" style="--delay: 100ms">

            <div class="sp-quiz-progress">
              <div class="sp-quiz-progress-bar" :style="{ width: progressPercent + '%' }"></div>
            </div>
            <div class="sp-quiz-step-label">
              <span v-if="quizStep <= 7">Вопрос {{ quizStep }} из 7</span>
              <span v-else>Ваши контакты</span>
            </div>

            <div v-if="quizStep === 1" class="sp-quiz-block">
              <div class="sp-quiz-step-title">
                <span class="sp-quiz-step-num">1</span>
                <span>Тип помещения</span>
              </div>
              <div class="sp-quiz-question">
                <div class="sp-quiz-options">
                  <label v-for="opt in q1options" :key="opt" class="sp-quiz-option"
                    :class="{ selected: quiz.q1 === opt }">
                    <input type="radio" :value="opt" v-model="quiz.q1" @change="autoNext(1, !!quiz.q1)" />
                    <span>{{ opt }}</span>
                  </label>
                </div>
              </div>
              <div class="sp-quiz-nav">
                <button class="sp-btn-blue" @click="nextStep(1)" :disabled="!quiz.q1">Далее →</button>
              </div>
            </div>

            <div v-if="quizStep === 2" class="sp-quiz-block">
              <div class="sp-quiz-step-title">
                <span class="sp-quiz-step-num">2</span>
                <span>Где находится объект</span>
              </div>
              <div class="sp-quiz-question">
                <div class="sp-quiz-options">
                  <label v-for="opt in q2options" :key="opt" class="sp-quiz-option"
                    :class="{ selected: quiz.q2 === opt }">
                    <input type="radio" :value="opt" v-model="quiz.q2" @change="autoNext(2, !!quiz.q2)" />
                    <span>{{ opt }}</span>
                  </label>
                </div>
              </div>
              <div class="sp-quiz-nav">
                <button class="sp-quiz-btn-back" @click="quizStep = 1">← Назад</button>
                <button class="sp-btn-blue" @click="nextStep(2)" :disabled="!quiz.q2">Далее →</button>
              </div>
            </div>

            <div v-if="quizStep === 3" class="sp-quiz-block">
              <div class="sp-quiz-step-title">
                <span class="sp-quiz-step-num">3</span>
                <span>Площадь помещения</span>
              </div>
              <div class="sp-quiz-question">
                <div class="sp-quiz-options sp-quiz-options-grid">
                  <label v-for="opt in q3options" :key="opt" class="sp-quiz-option"
                    :class="{ selected: quiz.q3 === opt }">
                    <input type="radio" :value="opt" v-model="quiz.q3" @change="autoNext(3, !!quiz.q3)" />
                    <span>{{ opt }}</span>
                  </label>
                </div>
              </div>
              <div class="sp-quiz-nav">
                <button class="sp-quiz-btn-back" @click="quizStep = 2">← Назад</button>
                <button class="sp-btn-blue" @click="nextStep(3)" :disabled="!quiz.q3">Далее →</button>
              </div>
            </div>

            <div v-if="quizStep === 4" class="sp-quiz-block">
              <div class="sp-quiz-step-title">
                <span class="sp-quiz-step-num">4</span>
                <span>Высота помещения</span>
              </div>
              <div class="sp-quiz-question">
                <div class="sp-quiz-options">
                  <label v-for="opt in q4options" :key="opt" class="sp-quiz-option"
                    :class="{ selected: quiz.q4 === opt }">
                    <input type="radio" :value="opt" v-model="quiz.q4" @change="autoNext(4, !!quiz.q4)" />
                    <span>{{ opt }}</span>
                  </label>
                </div>
              </div>
              <div class="sp-quiz-nav">
                <button class="sp-quiz-btn-back" @click="quizStep = 3">← Назад</button>
                <button class="sp-btn-blue" @click="nextStep(4)" :disabled="!quiz.q4">Далее →</button>
              </div>
            </div>

            <div v-if="quizStep === 5" class="sp-quiz-block">
              <div class="sp-quiz-step-title">
                <span class="sp-quiz-step-num">5</span>
                <span>Наличие проекта</span>
              </div>
              <div class="sp-quiz-question">
                <div class="sp-quiz-options">
                  <label v-for="opt in q5options" :key="opt" class="sp-quiz-option"
                    :class="{ selected: quiz.q5 === opt }">
                    <input type="radio" :value="opt" v-model="quiz.q5" @change="autoNext(5, !!quiz.q5)" />
                    <span>{{ opt }}</span>
                  </label>
                </div>
              </div>
              <div class="sp-quiz-nav">
                <button class="sp-quiz-btn-back" @click="quizStep = 4">← Назад</button>
                <button class="sp-btn-blue" @click="nextStep(5)" :disabled="!quiz.q5">Далее →</button>
              </div>
            </div>

            <div v-if="quizStep === 6" class="sp-quiz-block">
              <div class="sp-quiz-step-title">
                <span class="sp-quiz-step-num">6</span>
                <span>Из каких материалов хотите возводить перегородки</span>
              </div>
              <div class="sp-quiz-question">
                <div class="sp-quiz-options">
                  <label v-for="opt in q6options" :key="opt" class="sp-quiz-option"
                    :class="{ selected: quiz.q6 === opt }">
                    <input type="radio" :value="opt" v-model="quiz.q6" @change="autoNext(6, !!quiz.q6)" />
                    <span>{{ opt }}</span>
                  </label>
                </div>
              </div>
              <div class="sp-quiz-nav">
                <button class="sp-quiz-btn-back" @click="quizStep = 5">← Назад</button>
                <button class="sp-btn-blue" @click="nextStep(6)" :disabled="!quiz.q6">Далее →</button>
              </div>
            </div>

            <div v-if="quizStep === 7" class="sp-quiz-block">
              <div class="sp-quiz-step-title">
                <span class="sp-quiz-step-num">7</span>
                <span>Когда желаете начать работы</span>
              </div>
              <div class="sp-quiz-question">
                <div class="sp-quiz-options">
                  <label v-for="opt in q7options" :key="opt" class="sp-quiz-option"
                    :class="{ selected: quiz.q7 === opt }">
                    <input type="radio" :value="opt" v-model="quiz.q7" />
                    <span>{{ opt }}</span>
                  </label>
                </div>
              </div>
              <div class="sp-quiz-nav">
                <button class="sp-quiz-btn-back" @click="quizStep = 6">← Назад</button>
                <button class="sp-btn-blue" @click="nextStep(7)" :disabled="!quiz.q7">Перейти к контактам →</button>
              </div>
            </div>

            <div v-if="quizStep === 8" class="sp-quiz-block">
              <div class="sp-quiz-step-title">
                <span class="sp-quiz-step-num" style="background:#22c55e">✓</span>
                <span>Ваши контакты</span>
              </div>

              <form @submit.prevent="submitForm" class="sp-contact-form" novalidate>
                <div class="sp-form-row">
                  <div class="sp-form-group">
                    <label for="name">Ваше имя *</label>
                    <input type="text" id="name" v-model="form.name" placeholder="Иван Иванов" required
                      autocomplete="name" />
                  </div>
                  <div class="sp-form-group">
                    <label for="phone">Телефон *</label>
                    <input type="tel" id="phone" v-model="form.phone" placeholder="+7 (900) 123-45-67" required
                      autocomplete="tel" @input="formatPhone" maxlength="18" />
                    <span v-if="phoneError" class="sp-field-error">{{ phoneError }}</span>
                  </div>
                </div>
                <div class="sp-form-group">
                  <label for="email">Email *</label>
                  <input type="email" id="email" v-model="form.email" placeholder="name@yandex.ru" required
                    autocomplete="email" @blur="validateEmail" />
                  <span v-if="emailError" class="sp-field-error">{{ emailError }}</span>
                </div>
                <div class="sp-form-group">
                  <label for="message">Комментарий <span class="sp-optional">— необязательно</span></label>
                  <textarea id="message" v-model="form.message" placeholder="Напишите ваш вопрос или пожелание..."
                    rows="3"></textarea>
                </div>
                <div class="sp-form-consent">
                  <input type="checkbox" id="consent" v-model="form.consent" required class="sp-consent-checkbox" />
                  <label for="consent" class="sp-consent-text">Я согласен с обработкой персональных данных</label>
                </div>
                <div class="sp-quiz-nav">
                  <button type="button" class="sp-quiz-btn-back" @click="quizStep = 7">← Назад</button>
                  <button type="submit" class="sp-btn-blue sp-btn-submit" :disabled="isSubmitting">
                    {{ isSubmitting ? 'Отправляем...' : 'Отправить заявку' }}
                  </button>
                </div>
                <p v-if="formMessage" :class="['sp-form-message', formMessageType]" role="alert">{{ formMessage }}</p>
              </form>
            </div>

          </div>
        </div>
      </section>

      <section class="sp-sec sp-sec-white" aria-labelledby="faq-title">
        <div class="sp-container sp-faq-wrap">
          <div class="sp-container-text sp-animate sp-fade-up">
            <h2 id="faq-title">Частые вопросы</h2>
          </div>
          <div class="sp-faq" itemscope itemtype="https://schema.org/FAQPage">
            <div class="sp-faq-item sp-animate sp-fade-up" :style="{ '--delay': i * 80 + 'ms' }" v-for="(q, i) in faq"
              :key="i" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
              <button class="sp-faq-q" @click="activeFaq = activeFaq === i ? null : i" :aria-expanded="activeFaq === i"
                :aria-controls="'faq-answer-' + i">
                <span itemprop="name">{{ q.q }}</span>
                <span class="sp-faq-arr" :class="{ open: activeFaq === i }" aria-hidden="true">▼</span>
              </button>
              <div :id="'faq-answer-' + i" class="sp-faq-a" :class="{ open: activeFaq === i }" itemscope
                itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <div class="sp-faq-a-inner" itemprop="text">{{ q.a }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="sp-footer" role="contentinfo" itemscope itemtype="https://schema.org/Organization">
      <div class="sp-container sp-footer-inner">
        <div class="sp-footer-brand">
          <div class="sp-logo">
            <img src="https://stena-pro.vercel.app/logo.jpg" alt="СтеныПро" width="42" height="42" />
            <div><span class="sp-logo-title sp-logo-white">СТЕНЫ<span class="sp-text-blue">ПРО</span></span></div>
          </div>
          <p>Профессиональное возведение межкомнатных перегородок с гарантией качества и геометрии.</p>
          <div class="sp-footer-messengers">
            <a href="tel:+79252753031" class="sp-messenger-icon" title="Позвонить" aria-label="Позвонить нам">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.76a16 16 0 0 0 6 6l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
              </svg>
            </a>
            <a href="https://max.ru/u/f9LHodD0cOIdwjoTOjhiyOz5kLJnqZr-yxvLnGglx15qlNHyvv7Dh7RQoFs" target="_blank"
              rel="noopener noreferrer" class="sp-messenger-icon" title="MAX" aria-label="Написать в MAX">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/archive/1/12/20251018145520%21Логотип_MAX.svg/120px-Логотип_MAX.svg.png"
                alt="Иконка MAX" width="32" height="32">
            </a>
            <a href="https://t.me/Stena_pro" target="_blank" rel="noopener noreferrer" class="sp-messenger-icon"
              title="Telegram" aria-label="Написать в Telegram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.2-.07-.06-.18-.04-.26-.02-.12.02-2.01 1.28-2.83 1.8-.27.18-.51.27-.73.27-.24 0-.7-.14-1.04-.25-.44-.15-.86-.32-1.24-.48-.41-.17-.45-.41-.07-.65 1.44-.94 3.15-1.87 5.13-2.8 2.44-1.14 2.95-1.34 3.28-1.34.07 0 .23.02.33.13.09.09.12.21.13.29.01.09.02.22-.01.34z" />
              </svg>
            </a>
          </div>
          <p class="sp-footer-max">
            Я пользуюсь мессенджером MAX.
            <a href="https://max.ru/u/f9LHodD0cOIdwjoTOjhiyOz5kLJnqZr-yxvLnGglx15qlNHyvv7Dh7RQoFs" target="_blank"
              rel="noopener noreferrer">Присоединяйся!</a>
          </p>
        </div>
        <div class="sp-footer-contacts">
          <h4>Контакты</h4>
          <ul>
            <li>
              <span class="sp-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.76a16 16 0 0 0 6 6l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
                </svg>
              </span>
              <div>
                <a href="tel:+79252753031" class="sp-contact-phone" itemprop="telephone">+7 (925) 275-30-31</a>
                <small>Ежедневно с 9:00 до 21:00</small>
              </div>
            </li>
            <li>
              <span class="sp-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <div>
                <a href="mailto:89252753031@mail.ru" itemprop="email">89252753031@mail.ru</a>
                <small style="cursor:pointer;color:#60a5fa !important;" @click="copyEmail">
                  {{ emailCopied ? '✓ Скопировано' : 'Скопировать' }}
                </small>
              </div>
            </li>
            <li>
              <span class="sp-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <address style="font-style:normal" itemprop="address" itemscope
                itemtype="https://schema.org/PostalAddress">
                <span itemprop="addressLocality">г. Москва</span>, <span itemprop="streetAddress">ул. Интернациональная
                  2, корп. 1, кв. 178</span>
              </address>
            </li>
          </ul>
        </div>
        <div class="sp-footer-tg">
          <h4>Остались вопросы?</h4>
          <p>Свяжитесь с нами по электронной почте или телефону — ответим быстро!</p>
          <button @click="openQuickModal()" class="sp-btn-tg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Написать письмо
          </button>
        </div>
      </div>
      <div class="sp-footer-bottom">
        <p>© 2026 СтеныПро. Все права защищены.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)
const activeTab = ref('gas')
const activeFaq = ref(null)
const isSubmitting = ref(false)
const formMessage = ref('')
const formMessageType = ref('')

const quickModalOpen = ref(false)
const isQuickSubmitting = ref(false)
const quickFormMessage = ref('')
const quickFormMessageType = ref('')
const quickForm = ref({ name: '', phone: '', consent: false })
const quickPhoneError = ref('')

const openQuickModal = () => {
  quickModalOpen.value = true
  quickForm.value = { name: '', phone: '', consent: false }
  quickFormMessage.value = ''
  quickPhoneError.value = ''
}

const formatQuickPhone = () => {
  let val = quickForm.value.phone.replace(/\D/g, '')
  if (val.startsWith('8')) val = '7' + val.slice(1)
  if (!val.startsWith('7')) val = '7' + val
  val = val.slice(0, 11)
  let formatted = '+7'
  if (val.length > 1) formatted += ' (' + val.slice(1, 4)
  if (val.length >= 4) formatted += ') ' + val.slice(4, 7)
  if (val.length >= 7) formatted += '-' + val.slice(7, 9)
  if (val.length >= 9) formatted += '-' + val.slice(9, 11)
  quickForm.value.phone = formatted
  quickPhoneError.value = ''
}

const submitQuickForm = async () => {
  if (!quickForm.value.name) { quickFormMessage.value = 'Введите ваше имя'; quickFormMessageType.value = 'error'; return }
  const digits = quickForm.value.phone.replace(/\D/g, '')
  if (digits.length !== 11) { quickPhoneError.value = 'Введите корректный номер'; return }
  if (!quickForm.value.consent) { quickFormMessage.value = 'Согласитесь с обработкой данных'; quickFormMessageType.value = 'error'; return }

  isQuickSubmitting.value = true
  try {
    await window.emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: quickForm.value.name,
        phone: quickForm.value.phone,
        email: '—',
        message: '[Быстрая заявка — Узнать стоимость]',
      }
    )
    quickModalOpen.value = false
    window.location.href = '/thank-you.html'
  } catch {
    quickFormMessage.value = 'Ошибка. Позвоните: +7 (925) 275-30-31'
    quickFormMessageType.value = 'error'
    isQuickSubmitting.value = false
  }
}

const quizStep = ref(1)
const quiz = ref({ q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '' })

const q1options = ['Новостройка', 'Вторичка', 'Коммерческое помещение']
const q2options = ['Моска', 'Московская область']
const q3options = ['До 30м²', 'До 50м²', 'До 70м²', 'До 90м²', 'Больше 90м²']
const q4options = ['До 2,7 м', 'До 3 м', 'До 3,5 м', 'До 4 м', 'Выше 4 м']
const q5options = ['Есть проект', 'Нет проекта', ' Сам сделаю замер и нарисую схему от руки', 'Нужен бесплатный замер']
const q6options = ['Газобетон', 'Пазогребневая плита(ПГП)', 'Силикатная пазогребневая плита(СПГП)', 'Гипсокартон']
const q7options = ['В течение недели', 'В течение двух недель', 'В течение месяца']

const progressPercent = computed(() => {
  const map = { 1: 5, 2: 18, 3: 31, 4: 44, 5: 57, 6: 70, 7: 85, 8: 95 }
  return map[quizStep.value] || 5
})

const nextStep = (step) => {
  quizStep.value = step + 1
  setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }, 50)
}

const autoNext = (step, hasValue) => {
  if (hasValue) setTimeout(() => nextStep(step), 280)
}

const form = ref({ name: '', phone: '', email: '', message: '', consent: false })
const phoneError = ref('')
const emailError = ref('')

const formatPhone = () => {
  let val = form.value.phone.replace(/\D/g, '')
  if (val.startsWith('8')) val = '7' + val.slice(1)
  if (!val.startsWith('7')) val = '7' + val
  val = val.slice(0, 11)
  let formatted = '+7'
  if (val.length > 1) formatted += ' (' + val.slice(1, 4)
  if (val.length >= 4) formatted += ') ' + val.slice(4, 7)
  if (val.length >= 7) formatted += '-' + val.slice(7, 9)
  if (val.length >= 9) formatted += '-' + val.slice(9, 11)
  form.value.phone = formatted
  phoneError.value = ''
}

const validatePhone = () => {
  const digits = form.value.phone.replace(/\D/g, '')
  if (digits.length !== 11) { phoneError.value = 'Введите корректный номер в формате +7 (XXX) XXX-XX-XX'; return false }
  phoneError.value = ''; return true
}

const validateEmail = () => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!re.test(form.value.email)) { emailError.value = 'Введите корректный email, например name@yandex.ru'; return false }
  emailError.value = ''; return true
}

const emailCopied = ref(false)
const copyEmail = () => {
  navigator.clipboard.writeText('89252753031@mail.ru')
  emailCopied.value = true
  setTimeout(() => emailCopied.value = false, 2000)
}

const handleScroll = () => { isScrolled.value = window.scrollY > 60 }

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('sp-visible'); observer.unobserve(entry.target) }
  })
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

const observeAll = () => { document.querySelectorAll('.sp-animate:not(.sp-visible)').forEach(el => observer.observe(el)) }

onMounted(() => {
  if (window.emailjs) window.emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
  window.addEventListener('scroll', handleScroll)
  observeAll()
  setTimeout(observeAll, 300)

  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') quickModalOpen.value = false })
})

onUnmounted(() => { window.removeEventListener('scroll', handleScroll) })
watch(activeTab, async () => { await nextTick(); observeAll() })

const scrollTo = (hash) => { document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }) }

const submitForm = async () => {
  if (!form.value.name) { formMessage.value = 'Введите ваше имя'; formMessageType.value = 'error'; return }
  if (!validatePhone()) return
  if (!validateEmail()) return
  if (!form.value.consent) { formMessage.value = 'Согласитесь с обработкой данных'; formMessageType.value = 'error'; return }

  isSubmitting.value = true; formMessage.value = ''

  const quizSummary = `
ОТВЕТЫ КВИЗА
1. Тип помещения: ${quiz.value.q1}
2. Площадь перегородок: ${quiz.value.q2}
3. Приоритет: ${quiz.value.q3}
4. Навесные предметы: ${quiz.value.q4}
5. Звукоизоляция: ${quiz.value.q5}
6. Отделка по блокам: ${quiz.value.q6}
7. Бюджет: ${quiz.value.q7}
  `.trim()

  try {
    await window.emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, {
      from_name: form.value.name,
      phone: form.value.phone,
      email: form.value.email,
      message: (form.value.message ? form.value.message + '\n\n' : '') + quizSummary,
    })
    window.location.href = '/thank-you.html'
  } catch {
    formMessage.value = 'Ошибка отправки. Позвоните нам: +7 (925) 275-30-31'
    formMessageType.value = 'error'
    isSubmitting.value = false
  }
}

const tech = [
  { title: 'Лазерный контроль', desc: 'Используем лазерные нивелиры и построители плоскостей на каждом этапе. Вертикальность проверяем каждый ряд.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="26" height="26"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>' },
  { title: 'Армирование', desc: 'Перфолента каждый 3-й ряд + гибкий монтаж к несущим стенам. Сетка в штукатурный слой.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="26" height="26"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>' },
  { title: 'Шумоизоляция', desc: 'Используем виброгасящие ленты и акустическую пену SoundFLEX в узлах примыкания к потолку и стенам.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="26" height="26"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>' },
  { title: 'Идеальная геометрия', desc: 'Наши стены требуют минимального слоя штукатурки (до 2 см). Вы экономите до 30% на сухих смесях.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="26" height="26"><circle cx="12" cy="12" r="2"/><path d="M12 2a7.5 7.5 0 0 1 5.5 12.5"/><path d="M12 2a7.5 7.5 0 0 0-5.5 12.5"/><line x1="12" y1="10" x2="18" y2="4"/><line x1="16" y1="4" x2="18" y2="4" stroke-width="2"/><line x1="18" y1="4" x2="18" y2="6" stroke-width="2"/></svg>' }
]

const steps = [
  { title: 'Заявка и замер', desc: 'Оставляете заявку. Мастер приезжает в удобное время, делает лазерный замер и мы делаем коммерческое предложение.', badge: 'Бесплатно' },
  { title: 'Закупка и доставка', desc: 'Закупаем материал по оптовым ценам. Организуем доставку, разгрузку и подъем на этаж.' },
  { title: 'Монтаж стен', desc: 'Бригада возводит до 50 м² в день. Соблюдаем режим тишины и чистоту в подъезде.' },
  { title: 'Уборка и сдача', desc: 'Убираем рабочее место. Вы проверяете геометрию, подписываем акт.', badge: 'Уборка включена' }
]

const prices = [
  { title: 'ПГП (80 мм)', price: 'от 1030 ₽ / м²', features: ['Монтаж плит', 'Монтаж перемычек', 'Крепление к стенам', 'Заполнение компенсационного зазора'], popular: false },
  { title: 'Газобетон (75-100 мм)', price: 'от 930 ₽ / м²', features: ['Кладка блоков', 'Армирование рядов', 'Монтаж перемычек', 'Заполнение компенсационного зазора'], popular: true },
  { title: 'Шумоизоляция стен', subtitle: 'актуально если планируете делать гидрошумоизоляцию пола', price: 'от 300 ₽ / м.п.', features: ['акустическая лента', 'акустический герметик', 'демпферный шов', 'пена SoundFLEX'], popular: false }
]

const reviews = [
  { text: '"Делали перепланировку в новостройке ПИК. Ребята за 3 дня возвели все стены. Лазером проверял сам — отклонений нет. Штукатуры потом хвалили."', initial: 'А', name: 'Алексей Смирнов', place: 'ЖК "Саларьево Парк"' },
  { text: '"Боялась, что будет грязь и шум. Но мастера работали очень аккуратно, весь мусор в мешки собрали. Стены из ПГП получились ровные, сразу обои клеили."', initial: 'Е', name: 'Елена Викторовна', place: 'г. Химки' },
  { text: '"Цену зафиксировали сразу, лишнего не накручивали. Материал сами закупили дешевле, чем я в Леруа смотрел. Рекомендую."', initial: 'Д', name: 'Дмитрий', place: 'ЖК "Символ"' }
]

const faq = [
  { q: 'Нужно ли штукатурить ваши стены?', a: 'Да, штукатурка требуется для идеальной геометрии, но благодаря нашей точной кладке слой будет минимальным (5-10 мм). ПГП (пазогребень) можно просто шпаклевать.' },
  { q: 'Как делаете перемычки над дверями?', a: 'Для перемычек мы используем металлический уголок толщиной 3 мм или закладную арматуру, что гарантирует прочность. U-блоки применяются только в несущих стенах.' },
  { q: 'Вывозите ли вы мусор?', a: 'Сбор мусора в мешки и уборка рабочего места входят в стоимость. Вывоз и заказ контейнера оплачиваются отдельно по тарифам перевозчика.' }
]
</script>

<style>
.sp-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 14, 26, 0.65);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.sp-modal-card {
  background: #fff;
  border-radius: 20px;
  padding: 40px 36px;
  max-width: 420px;
  width: 100%;
  position: relative;
  box-shadow: 0 24px 80px rgba(0, 0, 0, .25);
  animation: modal-in .3s ease;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: scale(.94) translateY(16px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.sp-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #f3f4f6;
  border: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: background .2s;
}

.sp-modal-close:hover {
  background: #e5e7eb;
}

.sp-modal-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: #eff6ff;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.sp-modal-card h3 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 1.3rem;
  font-weight: 800;
  color: #111827 !important;
  margin-bottom: 8px;
}

.sp-modal-card>p {
  font-size: .875rem;
  color: #6b7280 !important;
  line-height: 1.55;
  margin-bottom: 24px;
}

.sp-modal-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.sp-modal-field label {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 600;
  font-size: .875rem;
  color: #111827 !important;
  margin-bottom: 6px;
}

.sp-modal-field input {
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-family: 'Inter', sans-serif !important;
  font-size: .9rem;
  color: #111827 !important;
  transition: border-color .2s, box-shadow .2s;
}

.sp-modal-field input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, .1);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity .25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

html,
body {
  margin: 0 !important;
  padding: 0 !important;
  background: #fff !important;
  color: #1a1a1a !important;
  overflow-x: hidden;
  width: 100%;
}

body {
  display: block !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

#app {
  all: unset;
  display: block !important;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4 {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 700;
}

p {
  margin: 0;
  padding: 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  text-decoration: none !important;
  color: inherit !important;
  padding: 0 !important;
  background: none !important;
}

a:hover {
  background: none !important;
}

html {
  scroll-behavior: smooth;
}

.sp-root {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #1a1a1a;
  background: #fff;
  --blue: #2563eb;
  --blue-dark: #1d4ed8;
  --dark: #111827;
  --gray: #f3f4f6;
  --border: #e5e7eb;
  --text: #374151;
  --text-lt: #6b7280;
}

.sp-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.sp-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  transition: all .3s;
}

.sp-header.scrolled {
  border-bottom-color: var(--border);
  box-shadow: 0 1px 16px rgba(0, 0, 0, .08);
}

.sp-header-inner {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 14px 24px;
}

.sp-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.sp-logo img {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  object-fit: cover;
}

.sp-logo-title {
  display: block;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 800;
  font-size: .95rem;
  color: #111827 !important;
  line-height: 1.1;
}

.sp-logo-white {
  color: #fff !important;
}

.sp-logo-sub {
  display: block;
  font-size: .68rem;
  color: #9ca3af;
}

.sp-nav {
  display: flex;
  gap: 24px;
  flex: 1;
  justify-content: center;
}

.sp-nav a {
  color: #374151 !important;
  font-size: .875rem;
  font-weight: 500;
  transition: color .2s;
}

.sp-nav a:hover {
  color: var(--blue) !important;
  background: none !important;
}

.sp-hcta {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}

.sp-btn-wa {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #3b82f6 !important;
  padding: 11px 22px !important;
  color: #fff !important;
  border: none;
  border-radius: 10px;
  font-size: .8rem;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  text-decoration: none !important;
  transition: background .2s, transform .15s;
  white-space: nowrap;
  flex-shrink: 0;
}

.sp-btn-wa:hover {
  background: #316fd2 !important;
  transform: translateY(-1px);
}

.sp-btn-max {
  background: #6552ef !important;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 22px !important;
  color: #fff !important;
  border: none;
  border-radius: 10px;
  font-size: .8rem;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  text-decoration: none !important;
  transition: background .2s, transform .15s;
  white-space: nowrap;
  flex-shrink: 0;
}

.sp-btn-max:hover {
  background: rgb(109, 79, 207) !important;
  transform: translateY(-1px);
}


.sp-btn-wa-mob {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 13px;
  border-radius: 12px;
  font-size: .9rem;
  margin-top: 2px;
  color: white !important;
}

.sp-phone-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 20px;
}

.sp-phone {
  color: #111827 !important;
  font-weight: 600;
  font-size: .875rem;
  line-height: 1.2;
}

.sp-working {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: .68rem;
  font-weight: 500;
  color: #16a34a !important;
}

.sp-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: sp-blink 1.8s ease-in-out infinite;
}

@keyframes sp-blink {

  0%,
  100% {
    opacity: 1
  }

  50% {
    opacity: .4
  }
}

.sp-burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-left: auto;
  border-radius: 8px;
  transition: background .2s;
}

.sp-burger:hover {
  background: #f3f4f6;
}

.sp-burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #111827;
  border-radius: 2px;
  transition: all .3s;
}

.sp-burger span.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.sp-burger span.open:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.sp-burger span.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.sp-mmenu {
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  border-top: 1px solid transparent;
  background: #fff;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.35s ease, opacity 0.28s ease, padding 0.35s ease, border-color 0.28s ease;
  pointer-events: none;
}

.sp-mmenu.open {
  max-height: 480px;
  opacity: 1;
  padding: 16px 24px 20px;
  border-top-color: var(--border);
  pointer-events: auto;
}

.sp-mmenu a {
  color: #374151;
  font-weight: 500;
  font-size: .95rem;
  padding: 10px 0;
  border-bottom: 1px solid #f3f4f6;
}

.sp-mmenu a:last-of-type {
  border-bottom: none;
}

.sp-phone-mob {
  color: var(--blue) !important;
  font-weight: 700 !important;
  font-size: 1.05rem !important;
  margin: 10px 0;
}

.sp-mmenu-btn {
  margin-top: 12px;
  width: 100%;
}

.sp-btn-blue {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--blue);
  color: #fff !important;
  padding: 11px 22px;
  border-radius: 8px;
  font-weight: 600;
  font-size: .9rem;
  font-family: 'Montserrat', sans-serif !important;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: background .2s, transform .15s;
}


.sp-btn-blue:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.sp-btn-full {
  width: 100%;
}

.sp-btn-tg {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #3b82f6;
  color: #fff !important;
  padding: 11px 22px;
  border-radius: 8px;
  font-weight: 600;
  font-size: .9rem;
  font-family: 'Montserrat', sans-serif !important;
  border: none;
  cursor: pointer;
  transition: background .2s;
}

.sp-btn-tg:hover {
  background: #1d4ed8 !important;
  color: #fff !important;
}

.sp-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 72px;
  contain: layout;
}

.sp-hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('https://stena-pro.vercel.app/2026-02-07%2018.15.09.jpg');
  background-size: cover;
  background-position: center 30%;
}

.sp-hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 14, 26, 0.771);
}

.sp-hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 60px;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 100px;
}

.sp-hero-badge {
  display: inline-flex;
  align-items: center;
  border: 1.5px solid rgba(255, 255, 255, .4);
  color: rgba(255, 255, 255, .92) !important;
  padding: 5px 14px;
  border-radius: 4px;
  font-size: .68rem;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif !important;
  letter-spacing: .1em;
  text-transform: uppercase;
  margin-bottom: 22px;
}

.sp-hero-left h1 {
  font-size: clamp(1.8rem, 4vw, 3.2rem);
  font-weight: 800;
  color: #fff !important;
  line-height: 1.15;
  margin-bottom: 20px;
}

.sp-blue {
  color: #60a5fa !important;
}

.sp-hero-sub {
  color: rgba(255, 255, 255, .72) !important;
  font-size: .97rem;
  margin-bottom: 40px;
  line-height: 1.65;
}

.sp-hero-btns {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}

.sp-btn-hero-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #2563eb;
  color: #fff !important;
  padding: 16px 28px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif !important;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: background .2s, transform .15s;
}

.sp-btn-hero-primary:hover {
  background: #1d4ed8 !important;
  color: #fff !important;
  transform: translateY(-1px);
}

.sp-btn-hero-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #fff !important;
  padding: 15px 28px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif !important;
  border: 2px solid rgba(255, 255, 255, .7);
  white-space: nowrap;
  transition: all .2s;
  cursor: pointer;
}

.sp-btn-hero-outline:hover {
  background: rgba(255, 255, 255, .12) !important;
  border-color: #fff;
  color: #fff !important;
}

.sp-promo-card {
  background: rgba(255, 255, 255, .96);
  border-radius: 14px;
  padding: 24px 26px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, .35);
  backdrop-filter: blur(4px);
}

.sp-promo-top {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.sp-promo-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(37, 99, 235, .08);
  border: 1.5px solid rgba(37, 99, 235, .25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--blue);
  margin-top: 2px;
}

.sp-promo-title {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 700;
  font-size: .97rem;
  color: #111827 !important;
  margin-bottom: 6px;
}

.sp-promo-text {
  font-size: .83rem;
  color: #6b7280 !important;
  line-height: 1.55;
}

.sp-promo-text strong {
  color: #111827 !important;
}

.sp-hero-chevron {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  color: rgba(255, 255, 255, .6) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(255, 255, 255, .3);
  border-radius: 50%;
  transition: all .2s;
  animation: sp-bounce 2s ease-in-out infinite;
}

.sp-hero-chevron:hover {
  color: #fff !important;
  border-color: rgba(255, 255, 255, .7);
  background: none !important;
}

@keyframes sp-bounce {

  0%,
  100% {
    transform: translateX(-50%) translateY(0)
  }

  50% {
    transform: translateX(-50%) translateY(5px)
  }
}

.sp-sec {
  padding: 80px 0;
}

.sp-sec-white {
  background: #fff;
}

.sp-sec-light {
  background: #f9fafb;
}

.sp-sec-gray {
  background: #f9fafb;
}

.sp-sec-dark {
  background: #111827;
  color: #fff;
}

.sp-sec-dark h2 {
  color: #fff !important;
}

.sp-sec h2 {
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  color: #111827 !important;
  margin-bottom: 12px;
}

.sp-sec-sub {
  color: #6b7280 !important;
  font-size: .97rem;
  max-width: 600px;
  margin: 0 auto;
}

.sp-container-text {
  text-align: center;
  margin-bottom: 48px;
}

.sp-grid4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.sp-tech-card {
  padding: 26px 22px;
  border: 1px solid #e5e7eb;
  border-bottom: 3px solid transparent;
  border-radius: 12px;
  background: #fff;
  transition: box-shadow .2s, border-color .2s;
  cursor: default;
}

.sp-tech-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, .07);
  border-bottom-color: #2563eb;
}

.sp-tech-card:hover .sp-tech-icon {
  background: #2563eb;
  color: #fff !important;
}

.sp-tech-icon {
  color: var(--blue);
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  transition: background .25s, color .25s;
  flex-shrink: 0;
}

.sp-tech-card h3 {
  font-size: .97rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #111827 !important;
}

.sp-tech-card p {
  font-size: .875rem;
  color: #6b7280 !important;
  line-height: 1.6;
}

.sp-sec-pattern {
  padding: 80px 0;
  background-color: #f1f5f9;
  background-image: repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(0, 0, 0, .03) 8px, rgba(0, 0, 0, .03) 9px);
}

.sp-mat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 28px;
}

.sp-mat-title {
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  color: #111827 !important;
  margin: 0 !important;
}

.sp-blue-dark {
  color: #2563eb !important;
}

.sp-tabs {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  width: fit-content;
  flex-shrink: 0;
}

.sp-tabs button {
  padding: 10px 22px;
  background: #fff;
  border: none;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 600;
  font-size: .875rem;
  cursor: pointer;
  color: #6b7280;
  transition: all .2s;
  white-space: nowrap;
}

.sp-tabs button.active {
  background: var(--blue);
  color: #fff;
}

.sp-mat-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  background: #fff;
  border-radius: 16px;
  padding: 44px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, .07);
}

.sp-mat-text h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 14px;
  color: #111827 !important;
}

.sp-mat-text>p {
  color: #6b7280 !important;
  margin-bottom: 18px;
  font-size: .93rem;
  line-height: 1.65;
}

.sp-mat-text ul {
  margin-bottom: 20px;
}

.sp-mat-text ul li {
  padding: 7px 0 7px 26px;
  position: relative;
  font-size: .9rem;
  color: #374151 !important;
}

.sp-text-blue {
  color: var(--blue) !important;
}

.sp-mat-text ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2.5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E") center/contain no-repeat;
}

.sp-note {
  font-size: .83rem;
  background: #eff6ff;
  padding: 12px 16px;
  border-left: 3px solid #2563eb;
  border-radius: 0 8px 8px 0;
  display: flex !important;
  align-items: flex-start;
  gap: 8px;
  line-height: 1.5;
  color: #374151 !important;
}

.sp-note svg {
  color: #f59e0b;
  flex-shrink: 0;
  margin-top: 1px;
}

.sp-note strong {
  color: #111827 !important;
}

.sp-mat-img {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.sp-mat-img img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
  border-radius: 12px;
}

.sp-mat-price-overlay {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: #fff;
  color: #111827 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 700;
  font-size: .9rem;
  padding: 8px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, .15);
  white-space: nowrap;
}

.sp-process-title {
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  color: #111827 !important;
  text-align: center;
  margin-bottom: 40px;
}

.sp-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  position: relative;
}

.sp-steps::before {
  content: '';
  position: absolute;
  top: 50%;
  left: calc(12.5% + 30px);
  right: calc(12.5% + 30px);
  height: 2px;
  background: linear-gradient(to right, #e5e7eb 0%, #2563eb 33%, #2563eb 66%, #e5e7eb 100%);
  z-index: 0;
}

.sp-step {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 2px 12px rgba(0, 0, 0, .05);
  transition: box-shadow .2s;
  position: relative;
  z-index: 1;
}

.sp-step:hover {
  box-shadow: 0 6px 24px rgba(0, 0, 0, .09);
}

.sp-step-num {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #2563eb;
  color: #fff;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 800;
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(37, 99, 235, .3);
}

.sp-step:first-child .sp-step-num {
  background: #1f2937;
  box-shadow: 0 4px 12px rgba(0, 0, 0, .2);
}

.sp-step h4 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #111827 !important;
  line-height: 1.3;
}

.sp-step p {
  font-size: .875rem;
  color: #6b7280 !important;
  line-height: 1.65;
  flex: 1;
}

.sp-step-badge {
  margin-top: 16px;
  font-family: 'Montserrat', sans-serif !important;
  font-size: .72rem;
  font-weight: 700;
  color: #2563eb;
  letter-spacing: .06em;
  text-transform: uppercase;
}

.sp-econ-layout {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 60px;
  align-items: center;
}

.sp-econ-title {
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  color: #fff !important;
  margin-bottom: 14px;
  line-height: 1.2;
}

.sp-blue-light {
  color: #60a5fa !important;
}

.sp-econ-sub {
  color: rgba(255, 255, 255, .65) !important;
  font-size: .95rem;
  line-height: 1.7;
  margin-bottom: 32px;
}

.sp-econ-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
}

.sp-econ-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.sp-econ-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #2563eb;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sp-econ-item h4 {
  font-size: .97rem;
  font-weight: 700;
  color: #fff !important;
  margin-bottom: 5px;
  font-family: 'Montserrat', sans-serif !important;
}

.sp-econ-item p {
  font-size: .85rem;
  color: rgba(255, 255, 255, .6) !important;
  line-height: 1.55;
}

.sp-econ-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: rgba(255, 255, 255, .07);
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 10px;
  padding: 14px 16px;
  font-size: .85rem;
  color: rgba(255, 255, 255, .7) !important;
  line-height: 1.5;
}

.sp-econ-note svg {
  flex-shrink: 0;
  margin-top: 1px;
  color: #60a5fa;
}

.sp-white {
  color: #fff !important;
}

.sp-econ-note strong {
  color: #fff !important;
}

.sp-savings-card {
  background: #fff;
  border-radius: 16px;
  padding: 32px 36px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, .3);
}

.sp-savings-card h3 {
  font-size: 1.7rem;
  font-weight: 700;
  color: #374151 !important;
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f4f6;
  font-family: 'Montserrat', sans-serif !important;
  line-height: 1.4;
}

.sp-srow {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 14px 0;
  border-bottom: 1px solid #f3f4f6;
  font-size: .88rem;
  gap: 12px;
}

.sp-srow:last-of-type {
  border-bottom: none;
}

.sp-srow span:first-child {
  color: #6b7280 !important;
  flex: 1;
}

.sp-srow span:last-child {
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
}

.sp-srow-bad span:last-child {
  color: #ef4444 !important;
}

.sp-srow-good span:last-child {
  color: #ef4444 !important;
}

.sp-srow-total {
  background: #f8fafc;
  margin: 0 -36px;
  padding: 16px 36px;
  border-bottom: none !important;
}

.sp-srow-total span:first-child {
  font-weight: 700;
  color: #111827 !important;
  font-size: .95rem;
}

.sp-srow-total span:last-child {
  color: #2563eb !important;
  font-size: 1.15rem;
}

.sp-btn-save {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  background: #2563eb;
  color: #fff !important;
  padding: 15px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif !important;
  border: none;
  cursor: pointer;
  transition: background .2s;
}

.sp-btn-save:hover {
  background: #1d4ed8 !important;
  color: #fff !important;
}

.sp-prices {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  align-items: stretch;
}

.sp-price-card {
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 30px 26px;
  position: relative;
  background: #fff;
  transition: box-shadow .2s !important;
  display: flex;
  flex-direction: column;
}

.sp-price-card.popular {
  border-color: var(--blue);
  box-shadow: 0 8px 40px rgba(37, 99, 235, .14);
}

.sp-price-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, .09);
}

.sp-pop-badge {
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--blue);
  color: #fff;
  font-size: .68rem;
  font-weight: 800;
  font-family: 'Montserrat', sans-serif !important;
  padding: 4px 14px;
  border-radius: 100px;
  white-space: nowrap;
  letter-spacing: .04em;
}

.sp-price-card h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 6px;
  color: #111827 !important;
}

.sp-price-sub {
  font-size: .75rem;
  color: #9ca3af !important;
  margin-bottom: 10px;
  line-height: 1.4;
}

.sp-price-amount {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--blue);
  margin-bottom: 18px;
}

.sp-price-card ul {
  margin-bottom: 22px;
  flex: 1;
}

.sp-price-card .sp-btn-blue {
  margin-top: auto;
}

.sp-price-card ul li {
  padding: 7px 0 7px 20px;
  position: relative;
  font-size: .85rem;
  color: #6b7280 !important;
  border-bottom: 1px solid #f3f4f6;
}

.sp-price-card ul li:last-child {
  border-bottom: none;
}

.sp-price-card ul li::before {
  content: '✓';
  color: var(--blue);
  position: absolute;
  left: 0;
  font-weight: 700;
}

.sp-price-note {
  margin-top: 18px;
  font-size: .8rem;
  color: #9ca3af !important;
  text-align: center;
}

.sp-reviews {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.sp-review-card {
  background: #fff;
  border-radius: 14px;
  padding: 26px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, .05);
  border: 1px solid #f3f4f6;
}

.sp-review-text {
  font-size: .9rem;
  color: #374151 !important;
  line-height: 1.7;
  margin-bottom: 18px;
  font-style: italic;
}

.sp-review-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sp-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--blue);
  color: #fff;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sp-review-author strong {
  display: block;
  font-weight: 700;
  font-size: .875rem;
  color: #111827 !important;
}

.sp-review-author span {
  font-size: .78rem;
  color: #9ca3af !important;
}

.sp-quiz-wrapper {
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 36px 40px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, .07);
}

.sp-quiz-progress {
  height: 6px;
  background: #f1f5f9;
  border-radius: 100px;
  margin-bottom: 10px;
  overflow: hidden;
}

.sp-quiz-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #2563eb, #60a5fa);
  border-radius: 100px;
  transition: width 0.4s ease;
}

.sp-quiz-step-label {
  font-size: .78rem;
  color: #9ca3af;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: .04em;
  text-transform: uppercase;
  margin-bottom: 28px;
}

.sp-quiz-block {
  animation: sp-quiz-in 0.35s ease;
}

@keyframes sp-quiz-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.sp-quiz-step-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}

.sp-quiz-step-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #2563eb;
  color: #fff;
  font-size: .9rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sp-quiz-question {
  margin-bottom: 28px;
}

.sp-quiz-q-text {
  font-size: .93rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 14px;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.4;
}

.sp-quiz-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sp-quiz-options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.sp-quiz-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
  font-size: .875rem;
  color: #374151;
  transition: border-color .2s, background .2s;
  user-select: none;
}

.sp-quiz-option:hover {
  border-color: #93c5fd;
  background: #f0f7ff;
}

.sp-quiz-option.selected {
  border-color: #2563eb;
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 600;
}

.sp-quiz-option input[type="radio"] {
  display: none;
}

.sp-quiz-options-budget {
  flex-direction: row;
  gap: 12px;
}

.sp-quiz-option-budget {
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 16px;
}

.sp-budget-label {
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  font-size: .9rem;
}

.sp-budget-desc {
  font-size: .78rem;
  color: #9ca3af;
  line-height: 1.4;
}

.sp-quiz-option-budget.selected .sp-budget-desc {
  color: #3b82f6;
}

.sp-quiz-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.sp-quiz-btn-back {
  background: none;
  border: 1.5px solid #e5e7eb;
  color: #6b7280;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: .875rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color .2s, color .2s;
  font-family: 'Montserrat', sans-serif;
}

.sp-quiz-btn-back:hover {
  border-color: #9ca3af;
  color: #374151;
}

.sp-quiz-form-intro {
  font-size: .9rem;
  color: #6b7280;
  margin-bottom: 24px;
  line-height: 1.6;
}

.sp-contact-form {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
}

.sp-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.sp-form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.sp-form-group:last-of-type {
  margin-bottom: 0;
}

.sp-form-group label {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 600;
  font-size: .875rem;
  color: #111827 !important;
  margin-bottom: 8px;
}

.sp-contact-form input:not([type="checkbox"]),
.sp-contact-form textarea {
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-family: 'Inter', sans-serif !important;
  font-size: .9rem;
  color: #111827 !important;
  background: #fff;
  transition: border-color .2s, box-shadow .2s;
  width: 100%;
}

.sp-contact-form input:not([type="checkbox"]):focus,
.sp-contact-form textarea:focus {
  outline: none;
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, .1);
}

.sp-contact-form textarea {
  resize: vertical;
  min-height: 100px;
}

.sp-form-consent {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;
}

.sp-consent-checkbox {
  width: 18px;
  height: 18px;
  min-width: 18px;
  margin-top: 2px;
  cursor: pointer;
  flex-shrink: 0;
  accent-color: var(--blue);
}

.sp-consent-text {
  font-size: .875rem;
  color: #6b7280 !important;
  line-height: 1.5;
  cursor: pointer;
}

.sp-btn-submit {
  padding: 14px 32px;
  font-size: 1rem;
}

.sp-optional {
  font-size: .75rem;
  font-weight: 400;
  color: #9ca3af;
  font-family: 'Inter', sans-serif;
}

.sp-form-message {
  margin-top: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: .875rem;
  text-align: center;
  font-weight: 500;
}

.sp-form-message.success {
  background: #dcfce7;
  color: #166534 !important;
  border: 1px solid #86efac;
}

.sp-form-message.error {
  background: #fee2e2;
  color: #991b1b !important;
  border: 1px solid #fca5a5;
}

.sp-field-error {
  font-size: .78rem;
  color: #ef4444;
  margin-top: 4px;
}

.sp-faq-wrap {
  max-width: 740px;
}

.sp-faq {
  margin-top: 16px;
}

.sp-faq-item {
  border-bottom: 1px solid #e5e7eb;
}

.sp-faq-q {
  width: 100%;
  background: none;
  border: none;
  padding: 18px 0;
  text-align: left;
  font-family: 'Montserrat', sans-serif !important;
  font-size: .93rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  color: #111827 !important;
}

.sp-faq-arr {
  color: var(--blue);
  font-size: .72rem;
  transition: transform .25s;
  flex-shrink: 0;
}

.sp-faq-arr.open {
  transform: rotate(180deg);
}

.sp-faq-a {
  max-height: 0;
  overflow: hidden;
  transition: max-height .35s ease;
}

.sp-faq-a.open {
  max-height: 300px;
}

.sp-faq-a-inner {
  font-size: .875rem;
  color: #6b7280 !important;
  line-height: 1.7;
  padding-bottom: 16px;
}

.sp-footer {
  background: #0f172a;
  color: rgba(255, 255, 255, .75);
}

.sp-footer-inner {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr;
  gap: 48px;
  padding: 60px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.sp-footer-brand>p {
  margin-top: 14px;
  font-size: .85rem;
  color: rgba(255, 255, 255, .5) !important;
  line-height: 1.65;
}

.sp-footer-max {
  margin-top: 10px;
  font-size: .8rem;
  color: rgba(255, 255, 255, .4) !important;
}

.sp-footer-max a {
  color: #60a5fa !important;
}

.sp-footer-messengers {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  margin-bottom: 4px;
}

.sp-messenger-icon {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: rgba(255, 255, 255, .08);
  border: 1px solid rgba(255, 255, 255, .12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, .7) !important;
  transition: background .2s;
  overflow: hidden;
}

.sp-messenger-icon:hover {
  background: rgba(255, 255, 255, .15) !important;
}

.sp-messenger-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.sp-footer-contacts h4,
.sp-footer-tg h4 {
  font-size: .875rem;
  font-weight: 700;
  color: #fff !important;
  margin-bottom: 14px;
  font-family: 'Montserrat', sans-serif !important;
}

.sp-footer-contacts ul {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sp-footer-contacts ul li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.sp-contact-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(255, 255, 255, .07);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #60a5fa;
  margin-top: 1px;
}

.sp-contact-phone {
  display: block;
  color: #60a5fa !important;
  font-weight: 700 !important;
  font-size: .9rem;
  line-height: 1.3;
}

.sp-footer-contacts ul li small {
  display: block;
  color: rgba(255, 255, 255, .4) !important;
  font-size: .75rem;
}

.sp-footer-contacts ul li a:not(.sp-contact-phone),
.sp-footer-contacts ul li span,
.sp-footer-contacts ul li address {
  color: rgba(255, 255, 255, .55) !important;
  font-size: .85rem;
  line-height: 1.5;
}

.sp-footer-contacts ul li a:not(.sp-contact-phone):hover {
  color: #60a5fa !important;
}

.sp-footer-tg p {
  font-size: .85rem;
  color: rgba(255, 255, 255, .55) !important;
  margin-bottom: 16px;
  line-height: 1.5;
}

.sp-footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, .07);
  padding: 20px 24px;
  font-size: .78rem;
  color: rgba(255, 255, 255, .35) !important;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 1200px;
  margin: 0 auto;
}

.sp-hero-tagline-inner {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, .07);
  border: 1px solid rgba(255, 255, 255, .15);
  border-radius: 10px;
  padding: 14px 18px;
  color: rgba(255, 255, 255, .75) !important;
  font-size: .82rem;
  font-style: italic;
  line-height: 1.55;
}

.sp-animate {
  opacity: 0;
  transition: opacity 0.55s ease var(--delay, 0ms), transform 0.55s ease var(--delay, 0ms);
}

.sp-fade-up {
  transform: translateY(32px);
}

.sp-fade-right {
  transform: translateX(-32px);
}

.sp-fade-left {
  transform: translateX(32px);
}

.sp-animate.sp-visible {
  opacity: 1;
  transform: none;
}

@keyframes sp-hero-in {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.sp-hero-anim {
  opacity: 0;
  animation: sp-hero-in 0.6s ease forwards;
  animation-delay: calc(120ms + var(--hi, 0) * 130ms);
}

@media (max-width: 1100px) {
  .sp-econ-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .sp-srow-total {
    margin: 0 -32px;
    padding: 16px 32px;
  }
}

@media (max-width: 1024px) {

  .sp-nav,
  .sp-hcta {
    display: none;
  }

  .sp-burger {
    display: flex;
  }

  .sp-hero-inner {
    grid-template-columns: 1fr;
    gap: 32px;
    padding-top: 40px;
    padding-bottom: 80px;
  }

  .sp-hero-right {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .sp-promo-card {
    display: none;
  }

  .sp-mat-card {
    grid-template-columns: 1fr;
    padding: 28px;
    gap: 24px;
  }

  .sp-mat-img img {
    height: 240px;
  }

  .sp-footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 36px;
    padding: 48px 24px;
  }

  .sp-footer-brand {
    grid-column: 1 / -1;
  }

  .sp-steps {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .sp-steps::before {
    display: none;
  }

  .sp-prices {
    grid-template-columns: 1fr;
    max-width: 480px;
    margin: 0 auto;
  }

  .sp-quiz-options-grid {
    grid-template-columns: 1fr;
  }

  .sp-quiz-options-budget {
    flex-direction: column;
  }
}

@media (min-width: 1025px) {
  .sp-promo-card {
    display: block;
  }
}

@media (max-width: 768px) {
  .sp-sec {
    padding: 56px 0;
  }

  .sp-hero {
    min-height: 100svh;
    overflow: hidden;
  }

  .sp-hero-inner {
    padding-left: 16px;
    padding-right: 16px;
  }

  .sp-hero-left h1 {
    font-size: clamp(1.65rem, 5.5vw, 2.4rem);
    word-break: break-word;
  }

  .sp-hero-sub {
    font-size: .9rem;
    margin-bottom: 28px;
  }

  .sp-hero-btns {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    width: 100%;
  }

  .sp-btn-hero-primary,
  .sp-btn-hero-outline {
    width: 100%;
    justify-content: center;
    font-size: .95rem;
    padding: 15px 20px;
    white-space: normal;
  }

  .sp-sec h2 {
    font-size: clamp(1.35rem, 5vw, 1.8rem);
  }

  .sp-sec-sub {
    font-size: .9rem;
  }

  .sp-container-text {
    margin-bottom: 32px;
  }

  .sp-mat-header {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .sp-tabs {
    width: 100%;
  }

  .sp-tabs button {
    flex: 1;
    padding: 10px 12px;
    font-size: .8rem;
  }

  .sp-mat-card {
    padding: 20px;
  }

  .sp-steps {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .sp-step {
    padding: 22px 18px;
  }

  .sp-econ-layout {
    gap: 28px;
  }

  .sp-savings-card {
    padding: 24px 20px;
  }

  .sp-srow-total {
    margin: 0 -20px;
    padding: 14px 20px;
  }

  .sp-form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .sp-footer-inner {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 40px 16px;
  }

  .sp-footer-brand {
    grid-column: auto;
  }

  .sp-footer-bottom {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .sp-grid4 {
    grid-template-columns: 1fr 1fr;
  }

  .sp-reviews {
    grid-template-columns: 1fr;
  }

  .sp-prices {
    max-width: 100%;
  }

  .sp-quiz-wrapper {
    padding: 24px 20px;
  }

  .sp-quiz-nav {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .sp-quiz-btn-back,
  .sp-btn-submit {
    width: 100%;
    justify-content: center;
    text-align: center;
  }

  .sp-modal-card {
    padding: 32px 24px;
  }
}

@media (max-width: 480px) {
  .sp-header-inner {
    padding: 12px 16px;
  }

  .sp-logo img {
    width: 36px;
    height: 36px;
  }

  .sp-logo-title {
    font-size: .85rem;
  }

  .sp-hero-inner {
    padding-top: 30px;
    padding-bottom: 60px;
  }

  .sp-hero-badge {
    font-size: .62rem;
  }

  .sp-grid4 {
    grid-template-columns: 1fr;
  }

  .sp-tech-card {
    padding: 20px 18px;
  }

  .sp-mat-card {
    padding: 16px;
  }

  .sp-mat-img img {
    height: 200px;
  }

  .sp-step {
    padding: 18px 16px;
  }

  .sp-step-num {
    width: 38px;
    height: 38px;
    font-size: 1rem;
    margin-bottom: 14px;
  }

  .sp-savings-card {
    padding: 20px 16px;
  }

  .sp-srow-total {
    margin: 0 -16px;
    padding: 12px 16px;
  }

  .sp-price-card {
    padding: 24px 18px;
  }

  .sp-faq-q {
    font-size: .875rem;
  }

  .sp-mmenu.open {
    padding: 12px 16px 16px;
  }

  .sp-quiz-wrapper {
    padding: 20px 16px;
    border-radius: 14px;
  }
}

@media (max-width: 360px) {

  .sp-btn-hero-primary,
  .sp-btn-hero-outline {
    font-size: .875rem;
    padding: 13px 16px;
  }

  .sp-hero-left h1 {
    font-size: 1.5rem;
  }

  .sp-tabs button {
    padding: 9px 8px;
    font-size: .75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sp-animate {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .sp-hero-anim {
    opacity: 1;
    animation: none;
  }
}

.sp-modal-card button.sp-btn-blue,
.sp-modal-card button.sp-btn-blue.sp-btn-full {
  background-color: #2563eb !important;
  color: #ffffff !important;
  border: none !important;
  box-shadow: none !important;
}

.sp-modal-card button.sp-btn-blue:hover,
.sp-modal-card button.sp-btn-blue.sp-btn-full:hover {
  background-color: #1d4ed8 !important;
}

.sp-modal-card button.sp-btn-blue:disabled,
.sp-modal-card button.sp-btn-blue.sp-btn-full:disabled {
  opacity: 0.7 !important;
  cursor: not-allowed !important;
}
</style>