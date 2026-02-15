document.addEventListener('DOMContentLoaded', () => {
  // Lightbox Implementation
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  document.body.appendChild(lightbox);

  const images = document.querySelectorAll('.portfolio-card img');
  images.forEach(img => {
    img.style.cursor = 'pointer'; // Indicate clickable
    img.addEventListener('click', () => {
      lightbox.classList.add('active');
      const newImg = document.createElement('img');
      newImg.src = img.src;

      // Clear previous content
      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild);
      }

      lightbox.appendChild(newImg);
    });
  });

  // Close lightbox on click outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // Form Dual Capture Logic
  const form = document.querySelector('form[name="contato"]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Enviando...';
      submitBtn.disabled = true;

      const formData = new FormData(form);

      // Submit to Netlify first (hidden)
      fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      })
      .then(() => {
        // Construct WhatsApp Message
        const nome = formData.get('nome');
        const data = formData.get('data') || 'Data a definir';
        const local = formData.get('local') || 'Local a definir';
        const tipo = formData.get('evento');

        const message = `Olá, sou ${nome}. Gostaria de um orçamento para *${tipo}* no dia *${data}* em *${local}*.`;
        const whatsappUrl = `https://wa.me/5516999999999?text=${encodeURIComponent(message)}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Update UI
        form.innerHTML = `
          <div class="success-message" style="text-align: center; padding: 20px;">
            <h3 style="color: var(--gold-strong);">Solicitação Recebida!</h3>
            <p>Se o WhatsApp não abriu automaticamente, <a href="${whatsappUrl}" target="_blank" style="text-decoration: underline;">clique aqui</a>.</p>
          </div>
        `;
      })
      .catch((error) => {
        console.error('Submission error:', error);
        alert('Houve um erro ao enviar. Por favor, tente novamente ou chame no WhatsApp direto.');
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      });
    });
  }
});
