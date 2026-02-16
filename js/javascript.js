document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LÓGICA PARA LEER EL NOMBRE DEL INVITADO ---
    // Esta parte lee el nombre desde el link (?n=Nombre_Apellido)
    const urlParams = new URLSearchParams(window.location.search);
    const nombreInvitado = urlParams.get('n'); 
    const displayElement = document.getElementById('invitadoNombre');

    if (nombreInvitado && displayElement) {
        // Convierte guiones bajos en espacios y pone todo en MAYÚSCULAS
        displayElement.innerText = nombreInvitado.replace(/_/g, ' ').toUpperCase();
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
    // Mantenemos esta parte para que tus secciones desplegables sigan funcionando
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
