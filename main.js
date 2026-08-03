document.addEventListener('DOMContentLoaded', () => {

  // --- Password Logic ---
  const lockScreen = document.getElementById('lock-screen');
  const mainContent = document.getElementById('main-content');
  const passwordInput = document.getElementById('password-input');
  const unlockBtn = document.getElementById('unlock-btn');
  const errorMsgContainer = document.getElementById('error-msg-container');
  const showPasswordCheckbox = document.getElementById('show-password');
  const bgMusic = document.getElementById('bg-music');
  const musicControls = document.getElementById('music-controls');
  const wishJar = document.getElementById('wish-jar-btn');
  
  // Forgiving password check
  const correctPasswordStripped = "maggiready";

  function checkPassword() {
    const input = passwordInput.value;
    const stripped = input.toLowerCase().replace(/❤️/g, '').replace(/\s/g, '');
    
    if (stripped === correctPasswordStripped) {
      // Success
      errorMsgContainer.classList.add('hidden');
      lockScreen.classList.add('unlocked');
      
      setTimeout(() => {
        lockScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        musicControls.classList.remove('hidden');
        wishJar.classList.remove('hidden');
        initMainContent(); 
        
        // Try to play audio (some browsers block autoplay without interaction, but this was a click)
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio play prevented:", e));
      }, 1500); // Wait for glass morph fade
    } else {
      // Failure
      errorMsgContainer.classList.remove('hidden');
      
      // Reset animation
      errorMsgContainer.style.animation = 'none';
      errorMsgContainer.offsetHeight; // trigger reflow
      errorMsgContainer.style.animation = null; 
    }
  }

  unlockBtn.addEventListener('click', checkPassword);
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
  });
  
  showPasswordCheckbox.addEventListener('change', (e) => {
    passwordInput.type = e.target.checked ? 'text' : 'password';
  });

  // --- Audio Controls ---
  const muteBtn = document.getElementById('mute-btn');
  muteBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      muteBtn.innerHTML = '<i class="ph ph-speaker-high"></i>';
    } else {
      bgMusic.pause();
      muteBtn.innerHTML = '<i class="ph ph-speaker-slash"></i>';
    }
  });

  // --- Main Content Initialization ---
  // Initialize Custom Cursor immediately so it works on the lock screen
  setupCustomCursor();

  function initMainContent() {
    createBackgroundParticles();
    populateReasons();
    startCountdown();
    setupScrollReveals();
    setupParallax();
    setupInteractiveTap();
    setupWishJar();
    setupPopups();
    setupLightbox();
    setupLoveMeter();
    setupGrandFinale();
    setupV2Features(); // V2.0 Ultimate Upgrade Initialization
  }

  // --- Background Particles ---
  function createBackgroundParticles() {
    const container = document.getElementById('particles-container');
    
    // Create Fireflies
    for (let i = 0; i < 30; i++) {
      let firefly = document.createElement('div');
      firefly.classList.add('particle', 'firefly');
      firefly.style.left = `${Math.random() * 100}vw`;
      firefly.style.animationDuration = `${Math.random() * 15 + 10}s`;
      firefly.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(firefly);
    }
    
    // Create Petals
    for (let i = 0; i < 15; i++) {
      let petal = document.createElement('div');
      petal.classList.add('particle', 'petal');
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${Math.random() * 20 + 15}s`;
      petal.style.animationDelay = `${Math.random() * 10}s`;
      // random rotation
      petal.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(petal);
    }
  }

  // --- 10 Reasons Population ---
  function populateReasons() {
    const reasons = [
      "The way your nose crinkles when you laugh.",
      "How you always know how to make my day better.",
      "Your endless kindness to everyone around you.",
      "Because your eyes hold entire galaxies.",
      "The way my heart races every time I hear your voice.",
      "How safe and at home I feel in your arms.",
      "Your beautiful, radiant, imperfectly perfect smile.",
      "Because you are my best friend.",
      "How you inspire me to be a better person everyday.",
      "For simply being you, the love of my life."
    ];
    
    const container = document.querySelector('.reasons-grid');
    reasons.forEach((reason, index) => {
      const card = document.createElement('div');
      card.className = 'reason-card glass-panel reveal';
      card.innerHTML = `
        <div class="icon-heart">❤️</div>
        <p class="reason-text display-font">#${index + 1}<br><br>${reason}</p>
      `;
      container.appendChild(card);
    });
  }

  // --- Countdown Timer ---
  function startCountdown() {
    const targetDate = new Date('August 12, 2026 00:00:00').getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    function update() {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        document.querySelector('.countdown-glass').innerHTML = '<p class="countdown-label script-font" style="font-size:2.5rem; color: var(--rose-pink);">It is our special day! Happy Birthday!</p>';
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      if(daysEl) daysEl.innerText = days.toString().padStart(2, '0');
      if(hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
      if(minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
      if(secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');
    }
    
    update();
    setInterval(update, 1000);
  }

  // --- Scroll Reveals ---
  function setupScrollReveals() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, (index % 5) * 150); // Stagger
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    reveals.forEach(reveal => observer.observe(reveal));
  }

  // --- Parallax Effect ---
  function setupParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSlow = document.querySelectorAll('.parallax-slow');
      parallaxSlow.forEach(el => {
        el.style.transform = `translateY(${scrolled * 0.1}px)`;
      });
      const heroBg = document.querySelector('.hero-bg');
      if(heroBg) heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
  }

  // --- Custom Cursor ---
  function setupCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // Random sparkles on move
      if (Math.random() < 0.05) {
        createSparkle(e.clientX, e.clientY);
      }
    });
    
    document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
    document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
  }

  function createSparkle(x, y) {
    const container = document.getElementById('cursor-trail-container');
    if (!container) return;
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = (x + (Math.random() * 20 - 10)) + 'px';
    sparkle.style.top = (y + (Math.random() * 20 - 10)) + 'px';
    container.appendChild(sparkle);
    
    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }

  // --- Interactive Hearts on Tap ---
  function setupInteractiveTap() {
    document.addEventListener('click', (e) => {
      // Don't explode on buttons or popups
      if (e.target.closest('button') || e.target.closest('.glass-popup') || e.target.closest('.secret-trigger-container')) return;
      
      const numHearts = 5;
      for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '99999';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        heart.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(heart);
        
        // Animate
        setTimeout(() => {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 100 + 50;
          heart.style.transform = `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px) scale(0)`;
          heart.style.opacity = '0';
        }, 10);
        
        setTimeout(() => heart.remove(), 1000);
      }
    });
  }

  // --- Wish Jar ---
  function setupWishJar() {
    const wishes = [
      "I love you more than words can say. ❤️",
      "You are my sunshine on a rainy day.",
      "Thinking of you always brings a smile to my face.",
      "You're the best thing that ever happened to me.",
      "I can't wait to see what our future holds.",
      "You make my heart skip a beat.",
      "Every love story is beautiful, but ours is my favorite.",
      "I fall in love with you all over again every day.",
      "You are my today and all of my tomorrows.",
      "I am so lucky to call you mine.",
      "Your smile is my favorite view.",
      "Together is my favorite place to be.",
      "I love you to the moon and back.",
      "You are the missing piece to my puzzle.",
      "Life is beautiful because you are in it.",
      "I will choose you, a hundred lifetimes over.",
      "My soul saw you and it kind of went, 'Oh there you are.'",
      "You're my favorite reason to lose sleep.",
      "I love you not only for what you are, but for what I am when I am with you.",
      "If I know what love is, it is because of you.",
      "You are my compass star.",
      "With you, I've found my home.",
      "I just want to spend the rest of my life laughing with you.",
      "You are my greatest adventure.",
      "Forever isn't long enough with you."
    ];
    
    const jarBtn = document.getElementById('wish-jar-btn');
    const toast = document.getElementById('wish-toast');
    let timeout;
    
    jarBtn.addEventListener('click', () => {
      const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
      toast.innerText = randomWish;
      toast.classList.remove('hidden');
      
      // Explosion effect at jar
      createSparkle(jarBtn.getBoundingClientRect().left, jarBtn.getBoundingClientRect().top);
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        toast.classList.add('hidden');
      }, 4000);
    });
  }

  // --- Popups ---
  function setupPopups() {
    const overlay = document.getElementById('popup-overlay');
    const popups = document.querySelectorAll('.glass-popup');
    const closeBtns = document.querySelectorAll('.close-popup');
    
    // Secret Heart
    document.getElementById('secret-trigger').addEventListener('click', () => {
      openPopup('popup-secret');
    });
    
    // Memory Box
    document.getElementById('open-memory-box').addEventListener('click', () => {
      openPopup('popup-memory-box');
    });
    
    function openPopup(id) {
      overlay.classList.remove('hidden');
      popups.forEach(p => p.classList.add('hidden'));
      document.getElementById(id).classList.remove('hidden');
      document.getElementById(id).style.transform = 'scale(0.8)';
      setTimeout(() => {
        document.getElementById(id).style.transform = 'scale(1)';
      }, 10);
    }
    
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.classList.add('hidden');
      });
    });
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.add('hidden');
    });
  }

  // --- Lightbox ---
  function setupLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    galleryItems.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
      });
    });
    
    closeLightbox.addEventListener('click', () => lightbox.classList.add('hidden'));
    lightbox.addEventListener('click', (e) => {
      if (e.target !== lightboxImg) lightbox.classList.add('hidden');
    });
  }

  // --- Love Meter Animation ---
  function setupLoveMeter() {
    const percentEl = document.querySelector('.percent');
    if (!percentEl) return;
    
    let animated = false;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        // animate from 0 to infinity
        let count = 0;
        const interval = setInterval(() => {
          count += Math.floor(Math.random() * 15);
          if (count > 999) {
            clearInterval(interval);
            percentEl.style.display = 'none';
            document.querySelector('.infinity-symbol').style.display = 'inline';
            document.querySelector('.infinity-symbol').style.animation = 'pulse-large 2s infinite';
          } else {
            document.querySelector('.infinity-symbol').style.display = 'none';
            percentEl.innerText = count + '%';
          }
        }, 50);
      }
    });
    
    observer.observe(document.querySelector('.love-meter-container'));
  }

  // --- Grand Finale ---
  function setupGrandFinale() {
    const finaleBtn = document.getElementById('finale-btn');
    
    finaleBtn.addEventListener('click', () => {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100000 };

      // Make music emotional/louder (if placeholder allowed)
      bgMusic.volume = 1.0;
      
      // Button effect
      finaleBtn.innerHTML = "I LOVE YOU SAZUUUUUU! ❤️";
      finaleBtn.style.transform = "scale(1.1)";
      
      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
          colors: ['#722F37', '#D87D8D', '#D4AF37', '#ffffff'],
          shapes: ['circle', 'square']
        }));
        
        // Also custom heart confetti
        confetti(Object.assign({}, defaults, { 
          particleCount: 10, 
          origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
          colors: ['#722F37'],
          shape: 'heart'
        }));
        
      }, 250);
    });
  }

  // =========================================
  // V2.0 ULTIMATE UPGRADE LOGIC
  // =========================================
  function setupV2Features() {
    setupDayNightTheme();
    setupVirtualTeddy();
    setupDailyLoveGenerator();
    setupTreasureHunt();
    setupGiftBoxes();
    setupLoveQuiz();
    setupWheelOfLove();
    setupCatchMyHeart();
    setupBalloonPop();
    setupLoveCoupons();
    setupSecretEnvelope();
    setupFutureAdventures();
    setupSelfieBooth();
    setupOpenWhenCards();
    setupMoodDetector();
    setupBirthdayCake();
    setupMagicSky();
    setupSmartImageLoader();
  }

  function setupDayNightTheme() {
    const themeBtn = document.getElementById('theme-btn');
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('night-mode');
      if(document.body.classList.contains('night-mode')){
        themeBtn.innerHTML = '<i class="ph ph-sun"></i>';
      } else {
        themeBtn.innerHTML = '<i class="ph ph-moon"></i>';
      }
    });
  }

  function setupVirtualTeddy() {
    const teddy = document.getElementById('virtual-teddy');
    const speech = document.getElementById('teddy-speech');
    const msgs = ["I love you!", "You're cute!", "Pussu loves you!", "Smile!", "You're perfect!", "Hug me!"];
    teddy.addEventListener('click', () => {
      const msg = msgs[Math.floor(Math.random() * msgs.length)];
      speech.innerText = msg;
      speech.classList.remove('hidden');
      setTimeout(() => speech.classList.add('hidden'), 2000);
    });
  }

  function setupDailyLoveGenerator() {
    const quoteEl = document.getElementById('daily-quote');
    const widget = document.getElementById('daily-love-widget');
    const quotes = [
      "You are my today and all of my tomorrows.",
      "I love you more than pizza.",
      "Every love story is beautiful, but ours is my favorite.",
      "You stole my heart, but I'll let you keep it."
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.innerText = quote;
    setTimeout(() => { 
      widget.classList.remove('hidden');
    }, 3000);
  }

  function setupTreasureHunt() {
    let heartsFound = 0;
    for(let i=0; i<5; i++){
      let heart = document.createElement('div');
      heart.className = 'tiny-secret-heart';
      heart.innerText = '❤️';
      heart.style.top = Math.random() * 90 + 'vh';
      heart.style.left = Math.random() * 90 + 'vw';
      document.body.appendChild(heart);
      
      heart.addEventListener('click', function() {
        this.style.display = 'none';
        heartsFound++;
        if(heartsFound === 5) {
          alert("You found all the secret hearts! You unlocked my entire heart ❤️");
        }
      });
    }
  }

  function setupGiftBoxes() {
    const boxes = document.querySelectorAll('.gift-box');
    const modal = document.getElementById('gift-result-modal');
    const modalText = document.getElementById('gift-result-text');
    let realFound = false;

    boxes.forEach(box => {
      box.addEventListener('click', function() {
        if (realFound) return;
        this.classList.add('opened');
        this.innerText = '🎀';
        const content = this.getAttribute('data-content');
        
        modal.classList.remove('hidden');
        if(content === 'real surprise') {
          realFound = true;
          modalText.innerText = "You found the REAL SURPRISE! Infinite Love! ❤️";
          confetti();
        } else {
          modalText.innerText = "You got: " + content;
        }
        
        setTimeout(() => { modal.classList.add('hidden'); }, 3000);
      });
    });
  }

  function setupLoveQuiz() {
    const startBtn = document.getElementById('start-quiz-btn');
    const area = document.getElementById('quiz-area');
    const questionEl = document.getElementById('quiz-question');
    const opt1 = document.getElementById('quiz-opt-1');
    const opt2 = document.getElementById('quiz-opt-2');
    const result = document.getElementById('quiz-result');
    let startTime;
    
    const questions = [
      { q: "Who says sorry first?", o1: "Me (Pussu)", o2: "You (Shazuuu)" },
      { q: "Who loves food more?", o1: "Me", o2: "You" },
      { q: "Who is cuter?", o1: "Definitely Me", o2: "Definitely You" }
    ];
    let curr = 0;

    startBtn.addEventListener('click', () => {
      startTime = Date.now();
      startBtn.classList.add('hidden');
      area.classList.remove('hidden');
      loadQuestion();
    });

    function loadQuestion() {
      if(curr >= questions.length) {
        area.classList.add('hidden');
        result.classList.remove('hidden');
        result.innerText = "You know us perfectly! ❤️";
        const timeTaken = Math.floor((Date.now() - startTime)/1000);
        return;
      }
      questionEl.innerText = questions[curr].q;
      opt1.innerText = questions[curr].o1;
      opt2.innerText = questions[curr].o2;
    }

    opt1.addEventListener('click', () => { 
      curr++; loadQuestion(); 
    });
    opt2.addEventListener('click', () => { 
      curr++; loadQuestion(); 
    });
  }

  function setupWheelOfLove() {
    const btn = document.getElementById('spin-wheel-btn');
    const wheel = document.getElementById('love-wheel');
    const result = document.getElementById('wheel-result');
    const rewards = ["Big Hug", "Virtual Kiss", "Chocolate", "Secret Message", "Future Date", "Cute Nickname"];
    let spinCount = 0;
    
    btn.addEventListener('click', () => {
      spinCount++;
      const deg = Math.floor(Math.random() * 360) + 1440; // Spin at least 4 times
      wheel.style.transform = `rotate(${deg}deg)`;
      btn.disabled = true;
      
      setTimeout(() => {
        const rewardIndex = Math.floor(((deg % 360) / 360) * rewards.length);
        const won = rewards[rewardIndex];
        result.innerText = "You won: " + won + "!";
        btn.disabled = false;
        confetti({particleCount: 30, spread: 50});
      }, 4000);
    });
  }

  function setupCatchMyHeart() {
    const startBtn = document.getElementById('start-catch-btn');
    const area = document.getElementById('catch-game-area');
    const canvasContainer = document.getElementById('catch-canvas');
    const scoreEl = document.getElementById('catch-score');
    let score = 0;
    let missed = 0;
    let startTime;

    startBtn.addEventListener('click', () => {
      startTime = Date.now();
      startBtn.classList.add('hidden');
      area.classList.remove('hidden');
      
      const interval = setInterval(() => {
        let h = document.createElement('div');
        h.innerText = '❤️';
        h.style.position = 'absolute';
        h.style.left = Math.random() * 90 + '%';
        h.style.top = '100%';
        h.style.fontSize = '2rem';
        h.style.cursor = 'pointer';
        h.style.transition = 'top 3s linear';
        canvasContainer.appendChild(h);
        
        setTimeout(() => { h.style.top = '-20%'; }, 50);
        
        let clicked = false;
        h.addEventListener('click', function() {
          clicked = true;
          this.remove();
          score += 10;
          scoreEl.innerText = score;
          if(score >= 100) {
            clearInterval(interval);
            canvasContainer.innerHTML = '<h3 style="color:var(--wine-red); margin-top:20px;">You caught my heart forever! ❤️</h3>';
            const timeTaken = Math.floor((Date.now() - startTime)/1000);
          }
        });
        
        setTimeout(() => { 
          if(h.parentElement) {
            h.remove(); 
            if(!clicked) missed++;
          }
        }, 3000);
      }, 800);
    });
  }

  function setupBalloonPop() {
    const startBtn = document.getElementById('start-balloon-btn');
    const container = document.getElementById('balloon-container');
    const msgs = ["Smile!", "I miss u", "Cutie", "Forever"];
    let popped = 0;
    
    startBtn.addEventListener('click', () => {
      startBtn.classList.add('hidden');
      container.classList.remove('hidden');
      for(let i=0; i<8; i++){
        let b = document.createElement('div');
        b.innerText = '🎈';
        b.style.position = 'absolute';
        b.style.left = (i * 12) + '%';
        b.style.top = '80%';
        b.style.fontSize = '2.5rem';
        b.style.cursor = 'pointer';
        b.style.transition = 'top ' + (Math.random()*2+2) + 's ease-in';
        container.appendChild(b);
        
        setTimeout(() => { b.style.top = '-20%'; }, 50);
        
        b.addEventListener('click', function() {
          popped++;
          this.innerText = '💥 ' + msgs[i%msgs.length];
          this.style.fontSize = '1rem';
          this.style.color = 'var(--wine-red)';
          setTimeout(() => this.remove(), 1000);
        });
      }
    });
  }

  function setupLoveCoupons() {
    const btns = document.querySelectorAll('.redeem-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', function() {
        this.innerText = 'Redeemed!';
        this.closest('.coupon-card').classList.add('redeemed');
        const couponTitle = this.closest('.coupon-card').querySelector('h3').innerText;
      });
    });
  }

  function setupSecretEnvelope() {
    const btn = document.getElementById('open-envelope-btn');
    const env = document.querySelector('.envelope');
    const popup = document.getElementById('popup-secret-envelope');
    
    btn.addEventListener('click', () => {
      env.classList.add('open');
      btn.innerText = "Opening...";
      setTimeout(() => {
        document.getElementById('popup-overlay').classList.remove('hidden');
        popup.classList.remove('hidden');
      }, 1000);
    });
  }

  function setupFutureAdventures() {
    const items = document.querySelectorAll('.adventure-list li');
    let completed = 0;
    items.forEach(li => {
      li.addEventListener('click', function() {
        this.classList.toggle('done');
        const task = this.innerText;
        if (this.classList.contains('done')) {
          completed++;
        } else {
          completed--;
        }
      });
    });
  }

  function setupSelfieBooth() {
    const startBtn = document.getElementById('start-camera-btn');
    const takeBtn = document.getElementById('take-photo-btn');
    const addBtn = document.getElementById('add-sticker-btn');
    const video = document.getElementById('camera-stream');
    const placeholder = document.getElementById('camera-placeholder');
    const canvas = document.getElementById('photo-canvas');
    const overlay = document.getElementById('sticker-overlay');
    let stream;
    let selfiesTaken = 0;

    startBtn.addEventListener('click', async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.classList.remove('hidden');
        placeholder.classList.add('hidden');
        takeBtn.disabled = false;
        startBtn.classList.add('hidden');
      } catch(err) {
        placeholder.innerHTML = "Camera access denied. <br> Imagine a cute photo of us here!";
      }
    });

    takeBtn.addEventListener('click', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      video.classList.add('hidden');
      canvas.classList.remove('hidden');
      if(stream) stream.getTracks().forEach(t => t.stop());
      takeBtn.disabled = true;
      addBtn.disabled = false;
      selfiesTaken++;
    });

    addBtn.addEventListener('click', () => {
      let sticker = document.createElement('div');
      sticker.className = 'sticker';
      sticker.innerText = '❤️';
      sticker.style.left = Math.random() * 80 + '%';
      sticker.style.top = Math.random() * 80 + '%';
      overlay.appendChild(sticker);
    });
  }

  function setupOpenWhenCards() {
    const cards = document.querySelectorAll('.open-card');
    cards.forEach(card => {
      card.addEventListener('click', function() {
        const title = this.querySelector('.card-front').innerText;
        if(!this.classList.contains('flipped')){
          this.querySelector('.card-back').innerText = this.getAttribute('data-msg');
          this.classList.add('flipped');
        } else {
          this.classList.remove('flipped');
        }
      });
    });
  }

  function setupMoodDetector() {
    const btns = document.querySelectorAll('.mood-btn');
    const res = document.getElementById('mood-result');
    const resText = res.querySelector('h3');
    const responses = {
      'happy': "Yay! I'm happy when you're happy! ❤️",
      'sleepy': "Go get some rest, my sleepyhead. Sweet dreams! 😴",
      'missing': "I'm missing you too! Sending virtual hugs! 🤗",
      'hungry': "Let's get pizza! 🍕",
      'angry': "Take a deep breath... I love you! Please don't be mad 🥺",
      'cute': "You are ALWAYS cute! 🥰"
    };
    
    btns.forEach(btn => {
      btn.addEventListener('click', function() {
        const mood = this.getAttribute('data-mood');
        resText.innerText = responses[mood];
        res.classList.remove('hidden');
      });
    });
  }

  function setupBirthdayCake() {
    const btn = document.getElementById('blow-candles-btn');
    const flames = document.querySelectorAll('.flame');
    const surp = document.getElementById('cake-surprise');
    
    btn.addEventListener('click', () => {
      flames.forEach(f => f.classList.add('extinguished'));
      btn.innerText = "Yay! Happy Birthday! 🎉";
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      setTimeout(() => { surp.classList.remove('hidden'); }, 1500);
      
      // Unlock Grand Achievement here if they blow the cake
      setTimeout(() => {
        document.getElementById('popup-overlay').classList.remove('hidden');
        document.getElementById('popup-achievement').classList.remove('hidden');
      }, 4000);
    });
  }

  function setupMagicSky() {
    const sky = document.getElementById('magic-sky-container');
    
    window.addEventListener('scroll', () => {
      if(document.body.classList.contains('night-mode')) {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100;
        if(bottom) {
          sky.classList.add('active');
          if(sky.children.length === 0) {
            // Generate stars spelling "PUSSU ❤️ SHAZUUU" (abstractly, we will just make a dense cluster)
            for(let i=0; i<100; i++) {
              let s = document.createElement('div');
              s.className = 'magic-star';
              s.style.left = Math.random() * 100 + 'vw';
              s.style.top = Math.random() * 100 + 'vh';
              sky.appendChild(s);
            }
            let text = document.createElement('div');
            text.innerHTML = 'Pussu ❤️ Shazuuu';
            text.style.position = 'absolute';
            text.style.top = '50%';
            text.style.left = '50%';
            text.style.transform = 'translate(-50%, -50%)';
            text.style.color = 'white';
            text.style.fontFamily = "'Great Vibes', cursive";
            text.style.fontSize = '4rem';
            text.style.textShadow = '0 0 20px white, 0 0 40px var(--rose-pink)';
            sky.appendChild(text);
          }
        } else {
          sky.classList.remove('active');
        }
      }
    });
  }

  // --- Smart Image Loader (Silent & Resilient) ---
  function setupSmartImageLoader() {
    const images = document.querySelectorAll('img');
    const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
    
    images.forEach(img => {
      img.dataset.originalSrc = img.getAttribute('src');
      
      img.addEventListener('error', function() {
        if (this.dataset.fallbackComplete === "true") return;
        
        const originalSrc = this.dataset.originalSrc;
        if (!originalSrc) return;
        
        // Try fallback extensions silently
        const basePathMatch = originalSrc.match(/(.*)\.(jpg|jpeg|png|webp|svg)$/i);
        if (!basePathMatch) return;
        
        const basePath = basePathMatch[1];
        let nextExtIndex = parseInt(this.dataset.fallbackIndex || '-1') + 1;
        
        if (nextExtIndex < extensions.length) {
          this.dataset.fallbackIndex = nextExtIndex;
          this.src = basePath + extensions[nextExtIndex];
        } else {
          this.dataset.fallbackComplete = "true";
          // Graceful fallback to photo-01 if all else fails
          this.src = './assets/gallery/photo-01.jpg';
        }
      });
    });
  }

});
