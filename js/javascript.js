document.addEventListener('DOMContentLoaded', () => {
        // --- 2. LÓGICA DE APERTURA, CIERRE Y MÚSICA ---
        const sealBtn = document.getElementById('bowBtn');
        const closeBtn = document.getElementById('closeBtn');
        const wrapper = document.getElementById('wrapper');
        const music = document.getElementById('bgMusic');
        const musicBtn = document.getElementById('musicToggle');
        const musicIcon = document.getElementById('musicIcon');

        // Función para abrir la invitación e iniciar música
        if (sealBtn && wrapper) {
            sealBtn.addEventListener('click', () => {
                wrapper.classList.add('open');
                document.body.style.overflow = 'auto'; 
                
                // Inicia la música al entrar
                music.play().catch(error => console.log("Autoplay bloqueado:", error));
                musicBtn.classList.add('visible');
            });
        }

        // Lógica del botón de Silenciar/Reproducir
        if (musicBtn) {
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

        // Función para cerrar (Mantenemos tu sincronización perfecta)
        if (closeBtn && wrapper) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                wrapper.classList.remove('open');
                document.body.style.overflow = 'hidden';                          
                
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'instant' }); 
                }, 1500); 

                setTimeout(() => {
                    document.body.style.overflow = 'auto';
                }, 1800); 
            });
        }

    // --- 3. LÓGICA PARA EL ACORDEÓN INTERACTIVO ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Cierra los otros acordeones si quieres que solo haya uno abierto
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });

            // Abre o cierra el actual
            item.classList.toggle('active');
        });
    });
});

// --- LÓGICA DEL CONTEO REGRESIVO DINÁMICO ---
function actualizarContador() {
    const fechaFiesta = new Date('2026-12-19T12:00:00').getTime();
    const display = document.getElementById('mainCountdown');

    const timer = setInterval(() => {
        const ahora = new Date().getTime();
        const diferencia = fechaFiesta - ahora;

        if (diferencia <= 0) {
            clearInterval(timer);
            display.innerHTML = "¡ES HOY EL GRAN DÍA!";
            return;
        }

        // Cálculos de tiempo
        const d = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const h = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diferencia % (1000 * 60)) / 1000);

        // Estructura visual bonita
        display.innerHTML = `
            <div class="countdown-unit"><span class="countdown-number">${d}</span><span class="countdown-label">Días</span></div>
            <div class="countdown-unit"><span class="countdown-number">${h}</span><span class="countdown-label">Hrs</span></div>
            <div class="countdown-unit"><span class="countdown-number">${m}</span><span class="countdown-label">Min</span></div>
            <div class="countdown-unit"><span class="countdown-number">${s}</span><span class="countdown-label">Seg</span></div>
        `;
    }, 1000);
}

actualizarContador();
