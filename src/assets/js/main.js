import './chatbot';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const servicesContainerEl = document.querySelector('#services-container');
const mobileMenuIcon = document.querySelector('#mobile-menu');
const navbarEl = document.querySelector('nav');

// Disable scrolling
document.body.style.overflow = 'hidden';

// Mobile menu toggle
// Add an event listener to the mobile menu icon
mobileMenuIcon.addEventListener('click', () => {
  // Toggle the navbar class 'active'
  navbarEl.classList.toggle('active');
});

function hideLoader() {
  const loader = document.querySelector('.loader-container');
  if (!loader) return;
  
  const hide = () => {
    loader.style.display = 'none';
    document.body.style.overflow = '';
  };

  if (document.readyState === 'complete') {
    hide();
  } else {
    window.addEventListener('load', hide);
  }
}

let intwellDataCache = null;
async function fetchIntwellData() {
  if (intwellDataCache) return intwellDataCache;
  try {
    const response = await fetch('/intwell.json');
    intwellDataCache = await response.json();
    return intwellDataCache;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function getServices() {
  const track = document.querySelector('.services-track');
  if (!track) return;

  const data = await fetchIntwellData();
  if (!data || !data.services) return;
  const services = data.services;

  let html = '';
  
  // Generate HTML for a set of services
  services.forEach((service) => {
    const { icon, service: serviceName, description } = service;
    html += `
      <div class="glass-card-dark p-6 md:p-8 rounded-[24px] hover:scale-[1.02] transition-transform group w-[300px] md:w-[340px] flex-shrink-0">
        <div class="w-12 h-12 md:w-14 md:h-14 bg-secondary flex items-center justify-center rounded-xl md:rounded-2xl mb-4 md:mb-6 group-hover:rotate-6 transition-transform">
          <span class="material-symbols-outlined text-2xl md:text-3xl text-white">${icon}</span>
        </div>
        <h3 class="font-headline-lg text-headline-lg text-surface-bright mb-4">${serviceName}</h3>
        <p class="text-on-primary-container/80 text-pretty">${description}</p>
      </div>
    `;
  });

  // We need 2 identical sets for the marquee
  track.innerHTML = html + html;
}

function validateForm() {
  const form = document.getElementById('contact-form');
  if (!form) return; // Exit if form is not found

  const submitButton = form.querySelector('button[type="submit"]');

  // Create status message element
  const statusMessage = document.createElement('p');
  statusMessage.className = 'text-green-600 font-medium mt-4';
  form.appendChild(statusMessage);

  // Add event listener to form's submit event
  form.addEventListener('submit', function (event) {
    // Prevent form from submitting
    event.preventDefault();

    // Show loader / disable button
    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    // Change button text to 'Sending...' and add classes to style it
    submitButton.textContent = 'Sending...';
    submitButton.classList.add('opacity-70', 'cursor-not-allowed');

    // Send the form data using EmailJS
    emailjs
      .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, this, import.meta.env.VITE_PUBLIC_API)
      .then(
        (response) => {
          // Reset the form
          form.reset();
          // Show success message
          statusMessage.textContent = 'Message sent successfully!';
          // Remove the error class and add the success class
          statusMessage.classList.remove('text-red-600');
          statusMessage.classList.add('text-green-600');
          submitButton.style.backgroundColor = '#10b981'; // emerald-500
        },
        (error) => {
          // Show error message
          statusMessage.textContent = 'Failed to send message. Please try again.';
          // Remove the success class and add the error class
          statusMessage.classList.remove('text-green-600');
          statusMessage.classList.add('text-red-600');
        }
      )
      .finally(() => {
        setTimeout(() => {
          // Enable the button again
          submitButton.disabled = false;
          // Reset the button text
          submitButton.textContent = originalText;
          submitButton.style.backgroundColor = ''; // revert
          // Remove the classes that were added to style the button
          submitButton.classList.remove('opacity-70', 'cursor-not-allowed');
        }, 3000);
      });

    // Clear the status message after 5 seconds
    setTimeout(() => {
      statusMessage.textContent = '';
    }, 5000);
  });
}

function handleSmoothScroll() {
  // Create a smooth scroll instance
  const smoother = ScrollSmoother.create({
    // The wrapper element
    wrapper: '#main',
    // The content element
    content: '#content',
    // The smoothness of the scroll (lower = less smooth)
    smooth: 1.2,
    // Whether to apply the smooth scroll effect
    effects: true
  });

  // Handle anchor links smooth scroll
  // This code adds an event listener to all anchor links on the page
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      // Prevent the default link behavior
      event.preventDefault();
      // Get the href attribute of the link
      const targetHref = this.getAttribute('href');
      if (targetHref) {
        // Get the target element
        const target = document.querySelector(targetHref);
        if (target) {
          try {
            // Scroll to the target element with an animation
            smoother.scrollTo(target, true); // true = animate
          } catch (error) {
            console.error('Error scrolling to anchor:', error);
          }
        } else {
          console.warn(`Target not found for anchor link: ${targetHref}`);
        }
      } else {
        console.warn('Anchor link missing href attribute');
      }
    });
  });
}

function handleGsapAnimation() {
  // Animate the up arrow
  gsap.to('.up-arrow', {
    y: -5,
    repeat: -1,
    yoyo: true,
    duration: 0.4
  });

  // Animate the line animation
  gsap.utils.toArray('.trigger-line-animation').forEach((triggerEl) => {
    // define the animation
    gsap.from(triggerEl.querySelectorAll('.line-animation'), {
      // define the trigger element
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 90%', // customize as needed
        toggleActions: 'play none none none'
      },
      // define the animation properties
      rotationX: -100,
      transformOrigin: '50% 50% -160px',
      opacity: 0,
      duration: 1,
      ease: 'power3',
      stagger: 0.25
    });
  });
}

function initRedesignInteractions() {
  // Reveal animation on scroll
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Smooth header blur transition on scroll using GSAP scrub
  const header = document.getElementById('header');
  if (header) {
    // Set initial state to ensure proper interpolation
    gsap.set(header, { maxWidth: '100%' });
    
    gsap.to(header, {
      width: '85%',
      maxWidth: '960px',
      top: '16px',
      borderRadius: '32px', // rounded-full sometimes distorts on wide rectangles, 32px is a nice pill shape
      backgroundColor: 'rgba(252, 249, 248, 0.7)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'top -150px',
        scrub: 0.5
      }
    });
  }

  // Active link logic
  const sections = document.querySelectorAll('section, #hero');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('text-secondary');
          link.classList.add('text-gray-600');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-secondary');
            link.classList.remove('text-gray-600');
          }
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // Also handle click
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => {
        l.classList.remove('text-secondary');
        l.classList.add('text-gray-600');
      });
      this.classList.remove('text-gray-600');
      this.classList.add('text-secondary');
    });
  });
}

async function getFeedbacks() {
  const container = document.querySelector('#carousel-container');
  if (!container) return;

  const data = await fetchIntwellData();
  if (!data || !data.feedbacks) return;
  const feedbacks = data.feedbacks;

    if (!feedbacks || feedbacks.length === 0) return;

    // Generate HTML for each feedback card
    feedbacks.forEach((feedback) => {
      container.innerHTML += `
        <div class="card-wrapper">
          <div class="card-content">
            <svg class="quote-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 11L8 15H11V19H5V15L7 11H10ZM20 11L18 15H21V19H15V15L17 11H20Z"/>
            </svg>
            <p class="quote">${feedback.quote}</p>
            <div class="user-info">
              <img src="${feedback.avatar}" class="avatar" alt="${feedback.name}" />
              <div class="user-details">
                <h4>${feedback.name}</h4>
                <p>${feedback.role}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    });

  // Initialize Carousel
  initCarousel();
}

function initCarousel() {
  if (typeof MotionPathPlugin !== 'undefined') {
    gsap.registerPlugin(MotionPathPlugin);
  }

  const cards = document.querySelectorAll('.card-wrapper');
  const container = document.querySelector('#carousel-container');

  if (!cards.length || !container) return;

  const N = cards.length;
  let cardSlots = Array.from({ length: N }, (_, i) => i); 

  let states = [];
  let paths = {};
  let rotateTl;
  let isHovering = false;
  let timer;

  function getEllipsePoint(angle, rx, ry) {
    const rad = angle * Math.PI / 180;
    return {
      x: rx * Math.cos(rad),
      y: ry * Math.sin(rad)
    };
  }

  function generatePath(startA, endA, rx, ry) {
    let path = [];
    let steps = 6; 
    for (let i = 1; i <= steps; i++) {
      let a = startA + ((endA - startA) * (i / steps));
      path.push(getEllipsePoint(a, rx, ry));
    }
    return path;
  }

  function generateStraightPath(startPt, endPt) {
    let path = [];
    let steps = 3;
    for (let i = 1; i <= steps; i++) {
      path.push({
        x: startPt.x + (endPt.x - startPt.x) * (i / steps),
        y: startPt.y + (endPt.y - startPt.y) * (i / steps)
      });
    }
    return path;
  }

  function calculateLayout() {
    const width = window.innerWidth;
    let rx = 380; 
    let ry = 110;
    let sideScale = 0.85;

    if (width < 1024) {
      rx = 280;
      ry = 90;
    }
    if (width < 768) {
      rx = 200;
      ry = 70;
      sideScale = 0.75;
    }
    if (width < 480) {
      rx = 130;
      ry = 50;
      sideScale = 0.65;
    }

    const centerAngle = -90;
    const leftAngle = 150;
    const rightAngle = 30;

    states[0] = { ...getEllipsePoint(leftAngle, rx, ry), scale: sideScale, opacity: 0.5, zIndex: 2, filter: 'blur(0px)' }; 
    states[1] = { ...getEllipsePoint(centerAngle, rx, ry), scale: 1, opacity: 1, zIndex: 4, filter: 'blur(0px)' };       
    states[2] = { ...getEllipsePoint(rightAngle, rx, ry), scale: sideScale, opacity: 0.5, zIndex: 2, filter: 'blur(0px)' }; 

    let queueCount = N - 3;
    let baseY = ry + 40; 

    for (let i = 3; i < N; i++) {
      let queueIdx = i - 3; 
      let scale = Math.max(0.4, sideScale - 0.15 - (queueIdx * 0.1));
      let opacity = Math.max(0, 0.2 - (queueIdx * 0.08));
      let blur = 4 + (queueIdx * 4); 
      let yPos = baseY + (queueIdx * 20); 

      states[i] = {
        x: 0,
        y: yPos,
        scale: scale,
        opacity: opacity,
        zIndex: 1,
        filter: `blur(${blur}px)`
      };
    }

    paths["1_0"] = generatePath(centerAngle, leftAngle - 360, rx, ry); 
    paths["2_1"] = generatePath(rightAngle, centerAngle, rx, ry); 
    paths["3_2"] = generateStraightPath(states[3], states[2]);

    let leftPt = states[0];
    let backQueuePt = states[N - 1];
    paths[`0_${N - 1}`] = [
      { x: leftPt.x * 0.5, y: backQueuePt.y + 20 }, 
      { x: backQueuePt.x, y: backQueuePt.y }
    ];

    for (let i = 4; i < N; i++) {
      paths[`${i}_${i - 1}`] = generateStraightPath(states[i], states[i - 1]);
    }
  }

  function initCards() {
    calculateLayout();
    cards.forEach((card, i) => {
      let slot = cardSlots[i];
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50,
        x: states[slot].x,
        y: states[slot].y,
        scale: states[slot].scale,
        opacity: states[slot].opacity,
        zIndex: states[slot].zIndex,
        filter: states[slot].filter
      });
    });
  }

  function rotate() {
    if (isHovering) return;

    rotateTl = gsap.timeline({
      onComplete: () => {
        timer.restart(true);
      }
    });

    cards.forEach((card, i) => {
      let currentSlot = cardSlots[i];
      let nextSlot = (currentSlot - 1 + N) % N; 

      let targetState = states[nextSlot];
      let path = paths[`${currentSlot}_${nextSlot}`];

      if (nextSlot === 1) { 
        rotateTl.set(card, { zIndex: 4 }, 0.5); 
      } else if (currentSlot === 1) { 
        rotateTl.set(card, { zIndex: 3 }, 0); 
        rotateTl.set(card, { zIndex: 2 }, 0.5); 
      } else if (nextSlot === 0 || nextSlot === 2) {
        rotateTl.set(card, { zIndex: 2 }, 0);
      } else {
        rotateTl.set(card, { zIndex: 1 }, 0);
      }

      rotateTl.to(card, {
        motionPath: {
          path: path,
          type: "thru"
        },
        scale: targetState.scale,
        opacity: targetState.opacity,
        filter: targetState.filter,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0);

      cardSlots[i] = nextSlot;
    });
  }

  initCards();

  cards.forEach((card) => {
    const content = card.querySelector('.card-content');
    gsap.to(content, {
      y: -12,
      duration: 2 + Math.random(),
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: Math.random() * 2
    });
  });

  timer = gsap.delayedCall(2, rotate);

  container.addEventListener('mouseenter', () => {
    isHovering = true;
    timer.pause();
    if (rotateTl) {
      rotateTl.pause();
    }
  });

  container.addEventListener('mouseleave', () => {
    isHovering = false;
    timer.play();
    if (rotateTl && rotateTl.paused()) {
      rotateTl.play();
    }
  });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (rotateTl) rotateTl.kill();
      initCards();
      timer.restart(true);
    }, 200);
  });
}

function initServicesMarquee() {
  const track = document.querySelector('.services-track');
  if (!track) return;
  
  // Set up GSAP to scroll 50% of the total width
  // Since there are 16 items total (2 sets of 8), scrolling 50% covers exactly one set
  const tween = gsap.to(track, {
    xPercent: -50,
    ease: "none",
    duration: 40, // adjust speed here (higher = slower)
    repeat: -1
  });

  // Pause on hover
  const container = track.parentElement;
  if (container) {
    container.addEventListener('mouseenter', () => tween.pause());
    container.addEventListener('mouseleave', () => tween.play());
  }
}

hideLoader();
handleSmoothScroll();
handleGsapAnimation();
getServices().then(() => {
  initServicesMarquee();
});
getFeedbacks();
validateForm();
initRedesignInteractions();
