/* ==========================================
   ANAND ROADWAYS — TRANSPORT ENQUIRY FORM UX
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.transport-enquiry-form');
  forms.forEach(form => initEnquiryForm(form));
});

function initEnquiryForm(form) {
  if (!form) return;

  const phoneInput = form.querySelector('input[name="phone"]');
  const nameInput = form.querySelector('input[name="name"]');
  const pickupInput = form.querySelector('input[name="pickup"]');
  const deliveryInput = form.querySelector('input[name="delivery"]');
  const goodsInput = form.querySelector('input[name="goods"]');
  const vehicleInput = form.querySelector('select[name="vehicle"]');
  const dateInput = form.querySelector('input[name="date"]');
  const detailsInput = form.querySelector('textarea[name="details"]');
  const whatsappBtn = form.querySelector('.btn-whatsapp-submit');
  const submitBtn = form.querySelector('button[type="submit"]');
  const feedbackBox = form.querySelector('.form-feedback');

  // Input Sanitization for Phone Number (digits only)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    });
  }

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    // Show Loading State
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('data-original-text', submitBtn.innerHTML);
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10"/>
        </svg>
        Submitting...
      `;
    }

    // Simulate API network submission + Success Response
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtn.getAttribute('data-original-text');
      }

      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.className = 'form-feedback success';
        feedbackBox.innerHTML = `
          <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid var(--clr-accent-green); padding: 1.25rem; border-radius: var(--radius-md); text-align: center; color: var(--clr-text-main);">
            <h4 style="color: var(--clr-accent-green); margin-bottom: 0.4rem;">Enquiry Submitted Successfully!</h4>
            <p style="font-size: 0.9rem; margin-bottom: 1rem;">Thank you, <strong>${escapeHtml(nameInput ? nameInput.value : '')}</strong>. Anand Roadways team will contact you shortly on <strong>+91 ${escapeHtml(phoneInput ? phoneInput.value : '')}</strong>.</p>
            <a href="${createWhatsAppUrl(form)}" target="_blank" class="btn btn-whatsapp btn-sm" style="display: inline-flex;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              Also Send via WhatsApp
            </a>
          </div>
        `;
      }

      form.reset();
    }, 800);
  });

  // Direct WhatsApp Button Trigger
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!validateForm(form)) return;
      const url = createWhatsAppUrl(form);
      window.open(url, '_blank');
    });
  }
}

function validateForm(form) {
  let isValid = true;
  const nameGroup = form.querySelector('input[name="name"]')?.closest('.form-group');
  const phoneGroup = form.querySelector('input[name="phone"]')?.closest('.form-group');
  const pickupGroup = form.querySelector('input[name="pickup"]')?.closest('.form-group');
  const deliveryGroup = form.querySelector('input[name="delivery"]')?.closest('.form-group');

  const nameInput = form.querySelector('input[name="name"]');
  const phoneInput = form.querySelector('input[name="phone"]');
  const pickupInput = form.querySelector('input[name="pickup"]');
  const deliveryInput = form.querySelector('input[name="delivery"]');

  // Reset errors
  [nameGroup, phoneGroup, pickupGroup, deliveryGroup].forEach(grp => grp?.classList.remove('error'));

  if (nameInput && !nameInput.value.trim()) {
    nameGroup?.classList.add('error');
    isValid = false;
  }

  if (phoneInput && (!phoneInput.value.trim() || phoneInput.value.trim().length < 10)) {
    phoneGroup?.classList.add('error');
    isValid = false;
  }

  if (pickupInput && !pickupInput.value.trim()) {
    pickupGroup?.classList.add('error');
    isValid = false;
  }

  if (deliveryInput && !deliveryInput.value.trim()) {
    deliveryGroup?.classList.add('error');
    isValid = false;
  }

  return isValid;
}

function createWhatsAppUrl(form) {
  const name = form.querySelector('input[name="name"]')?.value || 'Not specified';
  const phone = form.querySelector('input[name="phone"]')?.value || 'Not specified';
  const pickup = form.querySelector('input[name="pickup"]')?.value || 'Not specified';
  const delivery = form.querySelector('input[name="delivery"]')?.value || 'Not specified';
  const goods = form.querySelector('input[name="goods"]')?.value || 'Not specified';
  const vehicle = form.querySelector('select[name="vehicle"]')?.value || 'Not specified';
  const date = form.querySelector('input[name="date"]')?.value || 'Not specified';
  const details = form.querySelector('textarea[name="details"]')?.value || '';

  let message = `Hello Anand Roadways,\nI would like to submit a transport requirement:\n\n` +
    `*Name*: ${name}\n` +
    `*Mobile*: ${phone}\n` +
    `*Pickup Location*: ${pickup}\n` +
    `*Delivery Location*: ${delivery}\n` +
    `*Material/Goods*: ${goods}\n` +
    `*Vehicle/Lorry*: ${vehicle}\n` +
    `*Preferred Date*: ${date}`;

  if (details) {
    message += `\n*Additional Details*: ${details}`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/918100012052?text=${encodedMessage}`;
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
