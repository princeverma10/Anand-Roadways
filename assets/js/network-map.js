/* ==========================================
   ANAND ROADWAYS — POSTER BRAND COLOR SYSTEM
   Transport Route Flow State Highlight & Pulse Dot Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initRouteBoard();
});

function initRouteBoard() {
  const stateRows = document.querySelectorAll('.route-state-row');
  const routeLines = document.querySelectorAll('.route-thin-line');
  const destGroups = document.querySelectorAll('.dest-marker-group');
  const detailTitle = document.getElementById('route-detail-title');
  const detailDesc = document.getElementById('route-detail-desc');
  const detailHubs = document.getElementById('route-detail-hubs');
  const pulseDot = document.querySelector('.route-pulse-dot');

  const stateData = {
    'wb': {
      title: 'West Bengal (Operational Hub)',
      description: 'Headquartered in Howrah. Direct lorry sourcing & commission agency operations connecting Howrah, Kolkata, Durgapur, Haldia, & Siliguri corridors.',
      hubs: ['Howrah (Base)', 'Kolkata', 'Durgapur', 'Haldia', 'Siliguri']
    },
    'br': {
      title: 'Bihar Transport Route',
      description: 'Regular freight movement & lorry arrangements connecting Bengal with Patna, Gaya, Muzaffarpur, Bhagalpur, & Purnia.',
      hubs: ['Patna', 'Muzaffarpur', 'Gaya', 'Bhagalpur', 'Purnia']
    },
    'jh': {
      title: 'Jharkhand Industrial Route',
      description: 'Seamless transport connections across key industrial centers including Ranchi, Jamshedpur, Dhanbad, Bokaro, & Hazaribagh.',
      hubs: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh']
    },
    'up': {
      title: 'Uttar Pradesh Trade Corridor',
      description: 'Long-distance transport & lorry arrangements connecting Howrah with Varanasi, Allahabad/Prayagraj, Kanpur, Lucknow, & Agra.',
      hubs: ['Varanasi', 'Kanpur', 'Lucknow', 'Prayagraj', 'Agra']
    },
    'mp': {
      title: 'Madhya Pradesh Corridor',
      description: 'Central India transport connectivity for industrial & commercial goods to Indore, Bhopal, Jabalpur, & Gwalior.',
      hubs: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior']
    },
    'rj': {
      title: 'Rajasthan Commercial Corridor',
      description: 'Regional freight movement & dedicated lorry supply connecting Bengal with Jaipur, Kota, Jodhpur, Udaipur, & Ajmer.',
      hubs: ['Jaipur', 'Kota', 'Jodhpur', 'Bhilwara', 'Udaipur']
    }
  };

  function animateRouteDot(pathElement) {
    if (!pulseDot || !pathElement || typeof gsap === 'undefined') return;
    const pathLength = pathElement.getTotalLength ? pathElement.getTotalLength() : 200;

    gsap.killTweensOf(pulseDot);
    
    // Animate traveler dot along active route path outward from Howrah
    gsap.fromTo(pulseDot, 
      { 
        opacity: 1,
        scale: 1 
      },
      {
        duration: 2.2,
        repeat: -1,
        ease: 'power1.inOut',
        onUpdate: function() {
          const progress = this.progress();
          const point = pathElement.getPointAtLength(progress * pathLength);
          pulseDot.setAttribute('cx', point.x);
          pulseDot.setAttribute('cy', point.y);
        }
      }
    );
  }

  stateRows.forEach(row => {
    const activate = () => {
      const stateCode = row.getAttribute('data-state');

      stateRows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');

      let activePath = null;

      routeLines.forEach(line => {
        if (line.getAttribute('data-line') === stateCode) {
          line.classList.add('active');
          line.style.opacity = '1';
          activePath = line;
        } else {
          line.classList.remove('active');
          line.style.opacity = '0.35';
        }
      });

      destGroups.forEach(group => {
        const rect = group.querySelector('rect');
        const text = group.querySelector('text');
        if (group.getAttribute('data-dest') === stateCode) {
          if (rect) rect.setAttribute('fill', '#B02024');
          if (text) text.setAttribute('fill', '#F3F4F4');
        } else {
          if (rect) rect.setAttribute('fill', '#27405C');
          if (text) text.setAttribute('fill', '#AEB9C5');
        }
      });

      if (stateData[stateCode]) {
        const info = stateData[stateCode];
        if (detailTitle) detailTitle.textContent = info.title;
        if (detailDesc) detailDesc.textContent = info.description;
        if (detailHubs) {
          detailHubs.innerHTML = info.hubs.map(h => `<span class="route-hub-pill">${h}</span>`).join('');
        }
      }

      if (activePath) {
        animateRouteDot(activePath);
      }
    };

    row.addEventListener('mouseenter', activate);
    row.addEventListener('click', activate);
  });

  // Initial Traveler Animation
  const initialPath = document.querySelector('.route-thin-line.active');
  if (initialPath) {
    animateRouteDot(initialPath);
  }
}
