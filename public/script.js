window.selectPackage = function(pacoteName) {
  const select = document.getElementById('pacote-select');
  if (select) {
    select.value = pacoteName;
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // --- Portfolio Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- Lightbox Implementation ---
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close-lightbox');
  closeBtn.innerHTML = '&times;';
  closeBtn.ariaLabel = 'Fechar Galeria';
  lightbox.appendChild(closeBtn);

  document.body.appendChild(lightbox);

  // Use .portfolio-card click to handle overlay issues
  const cards = document.querySelectorAll('.portfolio-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img) {
        lightbox.classList.add('active');
        const newImg = document.createElement('img');
        newImg.src = img.src;

        // Clear previous image
        const oldImg = lightbox.querySelector('img');
        if (oldImg) {
          lightbox.removeChild(oldImg);
        }

        lightbox.appendChild(newImg);
      }
    });
  });

  // Close lightbox on click outside image or close button
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === closeBtn) {
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
        const orcamento = formData.get('orcamento');
        const pacote = formData.get('pacote');
        const sonho = formData.get('sonho');
        const origem = formData.get('origem');
        const msgUser = formData.get('mensagem');

        let message = `Olá, sou *${nome}*. Gostaria de uma proposta VIP para *${tipo}*.\n\n📅 Data: *${data}*\n📍 Local: *${local}*`;

        if (orcamento) {
          message += `\n💰 Investimento: *${orcamento}*`;
        }

        if (pacote && pacote !== "Ainda não decidi") {
          message += `\n📦 Coleção de interesse: *${pacote}*`;
        }

        if (sonho) {
          message += `\n\n✨ *Meu Sonho:* ${sonho}`;
        }

        if (origem && origem !== "Selecione") {
          message += `\n\n📢 *Conheceu por:* ${origem}`;
        }

        if (msgUser) {
          message += `\n\n💬 *Obs:* ${msgUser}`;
        }

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
        console.error('Submission error (Netlify):', error);
        // Fallback: Construct message and open WhatsApp anyway
        const nome = formData.get('nome');
        const whatsappUrl = `https://wa.me/5516999999999?text=Ol%C3%A1%2C%20sou%20${encodeURIComponent(nome)}.%20Tive%20um%20problema%20no%20envio%20do%20form%2C%20mas%20gostaria%20de%20um%20or%C3%A7amento.`;
        window.open(whatsappUrl, '_blank');

        form.innerHTML = `
          <div class="success-message" style="text-align: center; padding: 20px;">
            <h3 style="color: var(--gold-strong);">Redirecionando...</h3>
            <p>Houve um erro no nosso servidor, mas estamos te levando para o WhatsApp!</p>
            <p><a href="${whatsappUrl}" target="_blank" style="text-decoration: underline;">Clique aqui se não abrir.</a></p>
          </div>
        `;
      });
    });
  }
});
