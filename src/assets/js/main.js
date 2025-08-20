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
  //after window is loaded completely
  window.addEventListener('load', () => {
    //hide the preloader
    loader.style.display = 'none';
    // Enable scrolling again
    document.body.style.overflow = '';
  });
}

async function getServices() {
  try {
    // Fetch the JSON file
    const response = await fetch('/intwell.json');
    // Parse the JSON data
    const data = await response.json();
    // Extract the services array from the JSON object
    const services = data.services;

    // Loop through each service and generate the HTML
    services.forEach((service) => {
      // Destructure the service object
      const { id, image, service: serviceName, description } = service;

      // Create the service container element
      servicesContainerEl.innerHTML += `
        <div class="w-full bg-white border flex flex-col justify-center items-center border-gray-200 rounded-lg shadow-sm p-5 text-center line-animation" data-aos="fade-up">
          <!-- Service Image -->
          <img
            class="rounded-t-lg mb-4"
            src="${image}"
            alt="Service Image"
            loading="lazy"
            width="150"
            height="150"
          />
          <!-- Service Content -->
          <div>
            <!-- Service Title -->
            <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              ${serviceName}
            </h3>
            <!-- Service Description -->
            <p class="mb-3 font-normal text-gray-700 text-justify">
              ${description}
            </p>
          </div>
        </div>
      `;
    });
  } catch (error) {
    // Handle any errors while fetching the JSON file
    console.error('Error loading services:', error);
  }
}

function validateForm() {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
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
      submitButton.classList.add('bg-purple-600', 'text-white', 'cursor-not-allowed');

      // Log the form data to the console
      console.log(this, import.meta.env.VITE_SERVICE_ID);

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
          // Enable the button again
          submitButton.disabled = false;
          // Reset the button text
          submitButton.textContent = originalText;
          // Remove the classes that were added to style the button
          submitButton.classList.remove('bg-purple-600', 'text-white', 'cursor-not-allowed');
        });

      // Clear the status message after 5 seconds
      setTimeout(() => {
        statusMessage.textContent = '';
      }, 5000);
    });
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

hideLoader();
handleSmoothScroll();
handleGsapAnimation();
getServices();
validateForm();
