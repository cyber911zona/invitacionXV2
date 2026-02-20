document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LÓGICA PARA LEER NOMBRE Y PASES ---
    const urlParams = new URLSearchParams(window.location.search);
    const nombreInvitado = urlParams.get('n'); 
    const pasesInvitado = urlParams.get('p'); 
    const displayNombre = document.getElementById('invitadoNombre');
    const displayPases = document.getElementById('numPases');

    if (nombreInvitado && displayNombre) {
        displayNombre.innerText = nombreInvitado.replace(/_/g, ' ').toUpperCase();
    }
    if (displayPases) {
        displayPases.innerText = pasesInvitado || "1";
    }

    // --- 2. LÓGICA DE APERTURA, CIERRE Y MÚSICA INTELIGENTE ---
    const sealBtn = document.getElementById('bowBtn');
    const closeBtn = document.getElementById('closeBtn');
    const wrapper = document.getElementById('wrapper');
    const music = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');

    // Abrir y reproducir
    if (sealBtn && wrapper) {
        sealBtn.addEventListener('click', () => {
            wrapper.classList.add('open');
            document.body.style.overflow = 'auto'; 
            if (music) {
                music.play().catch(err => console.log("Audio bloqueado:", err));
                musicBtn.classList.add('visible');
                musicIcon.innerText = "🔊";
            }
        });
    }

    // Cerrar y PAUSAR
    if (closeBtn && wrapper) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            wrapper.classList.remove('open');
            document.body.style.overflow = 'hidden';
            
            if (music) {
                music.pause();
                musicIcon.innerText = "🔇";
            }

            setTimeout(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, 1500); 
            setTimeout(() => { document.body.style.overflow = 'auto'; }, 1800); 
        });
    }

    // Pausa automática al salir del navegador
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (music) music.pause();
        } else {
            if (wrapper.classList.contains('open') && music) {
                music.play();
                musicIcon.innerText = "🔊";
            }
        }
    });

    // Control manual (Botón flotante)
    if (musicBtn && music) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (music.paused) {
                music.play();
                musicIcon.innerText = "🔊";
            } else {
                music.pause();
                musicIcon.innerText = "🔇";
            }
        });
    }

    // --- 3. ACORDEONES ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            document.querySelectorAll('.accordion-item').forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // ******************************************************
    // AQUÍ ES DONDE LLAMAMOS AL RELOJ PARA QUE ENCIENDA
    // ******************************************************
    iniciarReloj(); 

}); // <-- Aquí cierra el bloque principal

// --- 4. DEFINICIÓN DEL RELOJ (Fuera para mayor orden) ---
function iniciarReloj() {
    const fechaFiesta = new Date('2026-12-19T12:00:00').getTime();
    const display = document.getElementById('mainCountdown');
    
    if (!display) return;

    setInterval(() => {
        const ahora = new Date().getTime();
        const diff = fechaFiesta - ahora;

        if (diff <= 0) {
            display.innerHTML = "¡ES HOY EL GRAN DÍA!";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        display.innerHTML = `
            <div class="countdown-unit"><span class="countdown-number">${d}</span><span class="countdown-label">Días</span></div>
            <div class="countdown-unit"><span class="countdown-number">${h}</span><span class="countdown-label">Hrs</span></div>
            <div class="countdown-unit"><span class="countdown-number">${m}</span><span class="countdown-label">Min</span></div>
            <div class="countdown-unit"><span class="countdown-number">${s}</span><span class="countdown-label">Seg</span></div>
        `;
    }, 1000);
}
