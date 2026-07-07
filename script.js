// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// PROJECT CAROUSEL
const track = document.getElementById("projectsTrack");
const prev = document.getElementById("projectsPrev");
const next = document.getElementById("projectsNext");
const cards = document.querySelectorAll("#projectsTrack .project-card");

let index = 0;

function cardsPerView() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 28;
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

next.addEventListener("click", () => {
  const maxIndex = cards.length - cardsPerView();
  if (index < maxIndex) index++;
  updateCarousel();
});

prev.addEventListener("click", () => {
  if (index > 0) index--;
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);



// ---------------------------------------------------------
// ⭐ CONTACT FORM — EmailJS + Disable Submit Button
// ---------------------------------------------------------

// Init EmailJS (byt ut din public key)
emailjs.init("ffpoELejPRq53N2VA");

// Hämta formuläret
const form = document.getElementById("contactForm");
const inputs = form.querySelectorAll("input, textarea");
const button = form.querySelector(".btn-form");

// Disable knappen tills allt är ifyllt
function checkForm() {
  let valid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) valid = false;
  });

  button.disabled = !valid;
}

inputs.forEach(input => {
  input.addEventListener("input", checkForm);
});

checkForm(); // disable från start

// Skicka formuläret via EmailJS
form.addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_ejaub5c", "template_0xk26as", this)
    .then(() => {
      alert("Meddelandet har skickats! Jag återkommer snart.");
      form.reset();
      checkForm(); // disable igen efter reset
    })
    .catch(error => {
      alert("Något gick fel, försök igen.");
      console.error(error);
    });
});
// HAMBURGER MENU
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

// Stäng menyn när man klickar på en länk
document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

// DARK MODE TOGGLE 
const themeToggle = document.getElementById("themeToggle");
const emoji = document.querySelector(".switch-emoji");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    emoji.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    emoji.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  emoji.textContent = "☀️";
}


// Scroll reveal effect
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Parallax hero
window.addEventListener("scroll", () => {
  const offset = window.pageYOffset;
  document.querySelector(".hero").style.backgroundPositionY = offset * 0.4 + "px";
});
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});

// FULL PAGE FLOATING PARTICLES
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create particles
const particles = [];
for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4
  });
}

// Animate particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

    // Light mode = bright particles
    if (!document.body.classList.contains("dark")) {
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(0,0,0,0.3)";
    } 
    // Dark mode = subtle particles
    else {
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(255,255,255,0.2)";
    }

    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();
