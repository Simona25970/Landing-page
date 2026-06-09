// Efekt pro menu při scrollování 
window.addEventListener('scroll', function () {
     const menu = document.querySelector('.menu');

     if (window.scrollY > 10) {
          menu.classList.add('scrolled');
     } else {
          menu.classList.remove('scrolled');
     }
});


// Fade-in efekt pro sekce 
const faders = document.querySelectorAll('.fade-in');

const appearOnScroll = new IntersectionObserver(function (entries) {
     entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
     });
}, {
     threshold: 0.5
});

faders.forEach(fader => {
     appearOnScroll.observe(fader);
});


// Mobile menu header
$(document).ready(function () {
     $('.mobile-nav-icon').click(function () {
          var nav = $('.jq--main-nav');
          var icon = $('.jq--nav-icon');

          nav.toggleClass('open');

          // výměna ikonek
          if (nav.hasClass('open')) {
               icon.attr("src", "img/crossMenu.png");
          } else {
               icon.attr("src", "img/hamburgerMenu.png");
          }
     });

     // Zavření menu po kliknutí na odkaz (pro plynulé scrollování na stejné stránce)
     $('.jq--main-nav li a').click(function () {
          var nav = $('.jq--main-nav');
          var icon = $('.jq--nav-icon');

          // Pokud je menu vysunuté (má třídu 'open' nebo je vidět přes slideToggle)
          if (nav.hasClass('open') || nav.is(':visible')) {

               // Pokud používám animaci .open (vysouvání z boku):
               nav.removeClass('open');

               // Vrácení ikonky zpět na hamburger
               icon.attr("src", "img/hamburgerMenu.png");
          }
     });

     // zavření menu po kliknutí na odkaz (pro plynulý scroll)
     $('.jq--main-nav a').click(function () {
          $('.jq--main-nav').removeClass('open');
          $('.jq--nav-icon').attr("src", "img/hamburgerMenu.png");
     });
});



const scrollBtn = document.getElementById("scrollToTop");

window.onscroll = function () {
     if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
          scrollBtn.style.display = "block";
     } else {
          scrollBtn.style.display = "none";
     }
};

// plynulý scroll nahoru
scrollBtn.onclick = function () {
     window.scrollTo({
          top: 0,
          behavior: 'smooth',
     });
};


// Contact-form 
const form = document.querySelector(".contact-form");
const message = document.getElementById("form-message");

form.addEventListener("submit", async function (e) {
     e.preventDefault(); // Zabrání přesměrování na Web3Forms stránku

     message.innerHTML = "Odesílám zprávu...";
     message.classList.add("show");

     const data = new FormData(form);

     try {
          const response = await fetch(form.action, {
               method: "POST",
               body: data
          });

          const result = await response.json();

          // Web3Forms vrací v odpovědi result.success = true
          if (result.success) {
               //  message.innerHTML = "✅ Děkuji za zprávu. Ozvu se Vám co nejdříve.";
               setTimeout(() => {
                    window.location.href = "dekuji.html";
               }, 1000); // přesměrování po 1 sekundě
               form.reset();
          } else {
               message.innerHTML = "❌ " + (result.message || "Odeslání se nepovedlo. Zkuste to prosím znovu.");
          }
     } catch (error) {
          message.innerHTML = "❌ Došlo k chybě při spojení se serverem.";
     }
});



// Cookies
function setCookie(name, value, days) {
     let expires = '';
     if (days) {
          const maxAge = days * 24 * 60 * 60;
          expires = `; max-age=${maxAge}`;
     }
     document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
     const cookieString = document.cookie;
     const cookies = cookieString ? cookieString.split('; ') : [];
     for (const cookie of cookies) {
          const [key, value] = cookie.split('=');
          if (decodeURIComponent(key) === name) {
               return decodeURIComponent(value || '');
          }
     }
     return null;
}

function hasCookieConsent() {
     return getCookie('cookieConsent') === 'true';
}

window.addEventListener('DOMContentLoaded', function () {
     const cookieBar = document.getElementById('cookie-bar');
     const acceptButton = document.getElementById('cookie-accept');
     if (!cookieBar || !acceptButton) {
          return;
     }

     cookieBar.style.display = 'none';

     if (!hasCookieConsent()) {
          setTimeout(function () {
               cookieBar.style.display = 'block';
          }, 1000);
     }

     acceptButton.addEventListener('click', function () {
          setCookie('cookieConsent', 'true', 365);
          cookieBar.style.display = 'none';
     });
});


