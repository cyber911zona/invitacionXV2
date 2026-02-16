document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LÓGICA PARA LEER NOMBRE Y NÚMERO DE PASES ---
    const urlParams = new URLSearchParams(window.location.search);
    
    // Leemos el nombre (?n=)
    const nombreInvitado = urlParams.get('n'); 
    const displayNombre = document.getElementById('invitadoNombre');

    // Leemos los pases (&p=)
    const pasesInvitado = urlParams.get('p'); 
    const displayPases = document.getElementById('numPases');

    // Inyectamos el nombre
    if (nombreInvitado && displayNombre) {
        // Convierte guiones bajos en espacios y pone todo en MAYÚSCULAS
        displayNombre.innerText = nombreInvitado.replace(/_/g, ' ').toUpperCase();
    }

    // Inyectamos el número de pases
    if (pasesInvitado && displayPases) {
        displayPases.innerText = pasesInvitado;
    } else if (displayPases) {
        displayPases.innerText = "1"; // Valor por defecto si no hay número en el link
    }

    // --- 2. LÓGICA DE APERTURA Y CIERRE (SIN PARPADEO) ---
    const sealBtn = document.getElementById('bowBtn');
    const closeBtn = document.getElementById('closeBtn');
    const wrapper = document.getElementById('wrapper');

    // Función para abrir la invitación
    if (sealBtn && wrapper) {
        sealBtn.addEventListener('click', () => {
            wrapper.classList.add('open');
            document.body.style.overflow = 'auto'; 
        });
    }

    // Función para cerrar (Sincronización perfecta)
    if (closeBtn && wrapper) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Iniciamos el cierre del pergamino
            wrapper.classList.remove('open');
            
            // Bloqueamos el scroll para evitar parpadeos blancos
            document.body.style.overflow = 'hidden';
            
            // Regresamos al inicio a los 1.5 segundos (Justo antes de que aparezca la tarjeta)
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' }); 
            }, 1500); 

            // Devolvemos el control del scroll al finalizar todo (1.8s)
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
