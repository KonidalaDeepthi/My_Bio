document.addEventListener('DOMContentLoaded',function(){
  // Year
  const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  if(toggle && nav){
    toggle.setAttribute('aria-expanded','false');
    nav.setAttribute('aria-hidden','true');
    toggle.addEventListener('click', ()=>{
      const isOpen = nav.classList.toggle('show');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      nav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    // Close menu when a nav link is clicked
    nav.addEventListener('click', (e)=>{
      if(e.target && e.target.tagName === 'A'){
        nav.classList.remove('show');
        toggle.setAttribute('aria-expanded','false');
        nav.setAttribute('aria-hidden','true');
      }
    });
  }

  // Simple contact form handling (opens mail client)
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name')||'';
      const email = data.get('email')||'';
      const message = data.get('message')||'';
      if(!name || !message){
        if(formMsg) formMsg.textContent = 'Please fill the Name and Message fields.';
        return;
      }
      
      if(formMsg) formMsg.textContent = 'Sending message...';
      fetch("https://formsubmit.co/ajax/konidaladeepthi1425@gmail.com", {
          method: "POST",
          headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              name: name,
              email: email,
              message: message,
              _subject: "New contact message from Portfolio"
          })
      })
      .then(response => response.json())
      .then(result => {
          if(formMsg) formMsg.textContent = 'Message sent successfully!';
          form.reset();
      })
      .catch(error => {
          if(formMsg) formMsg.textContent = 'Error sending message. Please try again.';
          console.log(error);
      });
    });
  }

    // Animated stats counters
    const statEls = document.querySelectorAll('.stat-number');
    if(statEls && statEls.length){
      const animateStat = (el) => {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1500;
        let start = null;
        const step = (timestamp) => {
          if(!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          el.textContent = Math.floor(progress * target);
          if(progress < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(step);
      };

      // Use IntersectionObserver to trigger when visible
      if('IntersectionObserver' in window){
        const obs = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if(entry.isIntersecting){
              animateStat(entry.target);
              observer.unobserve(entry.target);
            }
          });
        }, {threshold: 0.3});
        statEls.forEach(el => obs.observe(el));
      } else {
        // fallback: animate all immediately
        statEls.forEach(el => animateStat(el));
      }
    }
});
