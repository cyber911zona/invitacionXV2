// Esta línea le dice al navegador que espere a que toda la página cargue antes de activar las funciones
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA PARA LEER NOMBRE Y NÚMERO DE PASES ---
    // Esta sección se encarga de buscar el nombre de la familia y los pases en el link que envías
    const urlParams = new URLSearchParams(window.location.search); // Revisa la dirección de la página para buscar datos
    
    // Leemos el nombre (?n=)
    const nombreInvitado = urlParams.get('n'); // Busca el nombre que pusiste después de la "n" en el link
    const displayNombre = document.getElementById('invitadoNombre'); // Busca el lugar en el pase donde debe ir el nombre

    // Leemos los pases (&p=)
    const pasesInvitado = urlParams.get('p'); // Busca el número que pusiste después de la "p" en el link
    const displayPases = document.getElementById('numPases'); // Busca el lugar en el pase donde va el número de personas

    // Inyectamos el nombre en la tarjeta
    if (nombreInvitado && displayNombre) { // Si el link trae un nombre, hace lo siguiente:
        // Convierte guiones bajos en espacios y pone todo en MAYÚSCULAS para que se vea elegante
        displayNombre.innerText = nombreInvitado.replace(/_/g, ' ').toUpperCase();
    }

    // Inyectamos el número de pases
    if (pasesInvitado && displayPases) { // Si el link trae un número de pases:
        displayPases.innerText = pasesInvitado; // Pone ese número en el óvalo dorado
    } else if (displayPases) {
        displayPases.innerText = "1"; // Si el link no tiene número, pone "1" por defecto
    }

    // --- 2. LÓGICA DE APERTURA, CIERRE Y MÚSICA INTELIGENTE ---
    // Esta parte controla los botones de entrar, cerrar y el sonido
    const sealBtn = document.getElementById('bowBtn'); // Identifica el pase (la tarjeta de inicio)
    const closeBtn = document.getElementById('closeBtn'); // Identifica el sello de cerrar al final
    const wrapper = document.getElementById('wrapper'); // Identifica toda la estructura de la invitación
    const music = document.getElementById('bgMusic'); // Identifica la canción elegida
    const musicBtn = document.getElementById('musicToggle'); // Identifica el botón circular de la esquina
    const musicIcon = document.getElementById('musicIcon'); // Identifica el icono de la bocina que cambia

    // Abrir y reproducir (Lo que pasa al tocar el botón de entrar)
    if (sealBtn && wrapper) {
        sealBtn.addEventListener('click', () => { // Cuando el invitado toca el pase:
            wrapper.classList.add('open'); // Abre visualmente el pergamino
            document.body.style.overflow = 'auto'; // Permite que el invitado pueda bajar para leer
            if (music) {
                music.play().catch(err => console.log("Audio bloqueado:", err)); // Inicia la canción automáticamente
                musicBtn.classList.add('visible'); // Aparece el botón de silenciar en la esquina
                musicIcon.innerText = "🔊"; // Pone el icono de sonido activo
            }
        });
    }

    // Cerrar y PAUSAR (Lo que pasa al tocar el sello al final)
    if (closeBtn && wrapper) {
        closeBtn.addEventListener('click', (e) => { // Cuando el invitado toca "CERRAR":
            e.stopPropagation(); // Evita que se activen otros botones por error
            wrapper.classList.remove('open'); // Enrolla y oculta la invitación
            document.body.style.overflow = 'hidden'; // Bloquea el movimiento de la pantalla
            
            if (music) {
                music.pause(); // Detiene la canción de inmediato
                musicIcon.innerText = "🔇"; // Cambia el icono a sonido apagado
            }

            // Regresa la pantalla hasta arriba suavemente para mostrar de nuevo el pase
            setTimeout(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, 1500); 
            setTimeout(() => { document.body.style.overflow = 'auto'; }, 1800); 
        });
    }

    // Pausa automática al salir del navegador (Para no molestar si el invitado se sale de la página)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) { // Si el invitado minimiza el navegador o cambia de pestaña:
            if (music) music.pause(); // Pausa la música solo
        } else {
            // Si el invitado regresa y la invitación estaba abierta, vuelve a sonar
            if (wrapper.classList.contains('open') && music) {
                music.play();
                musicIcon.innerText = "🔊";
            }
        }
    });

    // Control manual (Botón flotante circular)
    if (musicBtn && music) {
        musicBtn.addEventListener('click', (e) => { // Cuando el invitado toca el botón de la esquina:
            e.stopPropagation();
            if (music.paused) { // Si la música estaba pausada:
                music.play(); // Dale play
                musicIcon.innerText = "🔊"; // Pon la bocina encendida
            } else { // Si la música estaba sonando:
                music.pause(); // Ponle pausa
                musicIcon.innerText = "🔇"; // Pon la bocina tachada
            }
        });
    }

    // --- 3. ACORDEONES ---
    // Esta sección controla las ventanitas informativas que se abren y cierran (Iglesia, Recepción, etc.)
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => { // Cuando el invitado toca una sección:
            const item = header.parentElement; // Identifica la sección que se tocó
            document.querySelectorAll('.accordion-item').forEach(other => {
                if (other !== item) other.classList.remove('active'); // Si hay otra abierta, la cierra
            });
            item.classList.toggle('active'); // Abre la sección tocada o la cierra si ya estaba abierta
        });
    });

    // ******************************************************
    // AQUÍ ES DONDE LLAMAMOS AL RELOJ PARA QUE ENCIENDA
    // ******************************************************
    // Esta línea es el interruptor que pone a funcionar el reloj de los días
    iniciarReloj(); 

}); // <-- Aquí termina el bloque principal que espera la carga de la página

// --- 4. DEFINICIÓN DEL RELOJ (Instrucciones de cómo debe contar) ---
function iniciarReloj() {
    // Configuramos la fecha exacta de tus XV años
    const fechaFiesta = new Date('2026-12-19T12:00:00').getTime();
    const display = document.getElementById('mainCountdown'); // Busca los cuadritos del reloj en la tarjeta
    
    if (!display) return; // Si no encuentra el reloj en la página, se detiene para evitar errores

    // Le dice al reloj que revise y actualice el tiempo cada 1 segundo
    setInterval(() => {
        const ahora = new Date().getTime(); // Revisa qué hora y día es justo ahora
        const diff = fechaFiesta - ahora; // Calcula cuánto tiempo falta para llegar a la fecha de la fiesta

        if (diff <= 0) { // Si el tiempo se acabó (es el día de la fiesta):
            display.innerHTML = "¡ES HOY EL GRAN DÍA!"; // Muestra este mensaje de felicitación
            return;
        }

        // Cálculos matemáticos sencillos para separar el tiempo restante
        const d = Math.floor(diff / (1000 * 60 * 60 * 24)); // Saca los Días
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Saca las Horas
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // Saca los Minutos
        const s = Math.floor((diff % (1000 * 60)) / 1000); // Saca los Segundos

        // Inyecta los números calculados dentro de los cuadritos de la tarjeta
        display.innerHTML = `
            <div class="countdown-unit"><span class="countdown-number">${d}</span><span class="countdown-label">Días</span></div>
            <div class="countdown-unit"><span class="countdown-number">${h}</span><span class="countdown-label">Hrs</span></div>
            <div class="countdown-unit"><span class="countdown-number">${m}</span><span class="countdown-label">Min</span></div>
            <div class="countdown-unit"><span class="countdown-number">${s}</span><span class="countdown-label">Seg</span></div>
        `;
    }, 1000); // El "1000" significa que todo esto se repite cada segundo exacto
}
