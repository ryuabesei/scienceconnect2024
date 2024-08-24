// Scroll Animations
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Animate sections on scroll
  gsap.utils.toArray('.content-wrapper').forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Animate timeline items
  gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
      duration: 1,
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
  });
}

// Parallax Effect
function initParallax() {
  const parallaxSections = document.querySelectorAll('.parallax-section');

  parallaxSections.forEach(section => {
    const bg = section.querySelector('.parallax-bg');
    if (bg) {
      gsap.to(bg, {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: true
        }, 
      });
    }
  });
}

// Form Submission
function initFormSubmission() {
  const form = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      
      fetch('process-form.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          formMessage.textContent = data.message;
          formMessage.style.color = 'green';
          form.reset();
        } else {
          formMessage.textContent = 'エラー: ' + data.message;
          formMessage.style.color = 'red';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        formMessage.textContent = '送信中にエラーが発生しました。後でもう一度お試しください。';
        formMessage.style.color = 'red';
      });
    });
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// Navigation Highlight
function initNavigationHighlight() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// Three.js Animation
function initThreeAnimation() {
  // Three.js animation code here
  console.log('Three.js animation initialized');
}

// Initialize everything when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initThreeAnimation();
  initScrollAnimations();
  initParallax();
  initFormSubmission();
  initSmoothScrolling();
  initNavigationHighlight();
});