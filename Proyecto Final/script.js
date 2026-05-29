const destinos = [
    {
        id: 1,
        nombre: "Islas Flotantes de los Uros",
        categoria: "naturaleza",
        descripcion: "Construidas enteramente de totora, estas islas albergan a una comunidad ancestral que mantiene vivas sus costumbres de pesca y tejido",
        imagen: "https://www.raptravelperu.com/wp-content/uploads/portada-de-los-uros.webp"
    },
    {
        id: 2,
        nombre: "Complejo Arqueológico de Sillustani",
        categoria: "arqueologia",
        descripcion: "Ubicado a 34 km de Puno, destaca por sus impresionantes chullpas (torres funerarias preincas e incas) situadas a orillas de la hermosa laguna Umayo",
        imagen: "https://dreamy.tours/wp-content/uploads/2021/09/sillustani-puno-tour2.jpg"
    },
    {
        id: 3,
        nombre: "Isla de Taquile",
        categoria: "naturaleza",
        descripcion: "Famosa internacionalmente por su arte textil tradicional, declarado Patrimonio Cultural Inmaterial por la UNESCO. Ofrece una experiencia de turismo vivencial y vistas espectaculares del lago.",
        imagen: "https://cuscoperu.b-cdn.net/wp-content/uploads/2024/03/Tour-isla-Taquile-en-Puno.webp"
    },
    {
        id: 4,
        nombre: "Chucuito",
        categoria: "arqueologia",
        descripcion: "Conocido como la Ciudad de las Cajas Reales, alberga el misterioso templo inca de Inca Uyo (templo de la fertilidad) y la iglesia de Santo Domingo.",
        imagen: "https://www.ytuqueplanes.com/imagenes/fotos/novedades/chucuito_nota.webp"
    },
        {
        id: 5,
        nombre: "Isla de Amantaní",
        categoria: "naturaleza",
        descripcion: "Ideal para pernoctar en casas de familias locales (turismo rural) y realizar caminatas hacia los templos prehispánicos de Pachamama y Pachatata",
        imagen: "https://www.chullostravelperu.com/blog/wp-content/uploads/2023/04/Isla-Amantani-2.jpg"
    },
    {
        id: 6,
        nombre: "Ciudad de Puno",
        categoria: "arqueologia",
        descripcion: "En el centro histórico destacan la Basílica Catedral, el Arco Deústua y el Mirador Kuntur Wasi, desde donde se obtienen vistas panorámicas de la ciudad y el lago.",
        imagen: "https://machupicchuviajesperu.com/wp-content/uploads/2025/06/main-square-of-Puno-scaled.webp"
    }

];

// Al cargar el documento, mostramos todos los destinos por defecto
document.addEventListener("DOMContentLoaded", () => {
    mostrarDestinos(destinos);
    
    // Verificar si el usuario ya tenía activado el modo oscuro anteriormente
    if (localStorage.getItem("modo") === "oscuro") {
        document.body.classList.add("modo-oscuro");
    }
});

// =========================================================================
// 2. FUNCIÓN PARA MOSTRAR Y FILTRAR DESTINOS DINÁMICAMENTE
// =========================================================================
function mostrarDestinos(lista) {
    const contenedor = document.getElementById("lista-destinos");
    contenedor.innerHTML = ""; // Limpiamos el contenedor antes de rellenar

    lista.forEach(destino => {
        // Creamos la estructura de la tarjeta usando plantillas de texto (Template Strings)
        const tarjetaHtml = `
            <article class="tarjeta-destino">
                <img src="${destino.imagen}" alt="${destino.nombre}">
                <div class="tarjeta-cuerpo">
                    <h5>${destino.nombre}</h5>
                    <p>${destino.descripcion}</p>
                    <span class="badge bg-secondary text-capitalize">${destino.categoria}</span>
                </div>
            </article>
        `;
        contenedor.innerHTML += tarjetaHtml;
    });
}

function filtrarDestino(categoria) {
    if (categoria === 'todos') {
        mostrarDestinos(destinos);
    } else {
        // Filtramos el array según la categoría seleccionada
        const filtrados = destinos.filter(dest => dest.categoria === categoria);
        mostrarDestinos(filtrados);
    }
}

// =========================================================================
// 3. LOGICA DEL FORMULARIO DE ITINERARIO (Planificación)
// =========================================================================
function calcularItinerario(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // 1. Captura y limpieza de datos
    const nombre = document.getElementById("nombre").value.trim();
    const dias = parseInt(document.getElementById("dias").value);
    const presupuesto = parseFloat(document.getElementById("presupuesto").value);
    const cajaResultado = document.getElementById("resultado-itinerario");

    // 2. Validación técnica de seguridad (Buenas prácticas de Ingeniería)
    if (!nombre || isNaN(dias) || isNaN(presupuesto) || dias <= 0 || presupuesto <= 0) {
        cajaResultado.classList.remove("d-none", "alert-info", "alert-success");
        cajaResultado.classList.add("alert-danger");
        cajaResultado.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i> <strong>Error:</strong> Por favor, ingresa datos válidos en todos los campos.`;
        return;
    }

    // 3. Definición de Atractivos por categoría de presupuesto
    // Mapeamos los destinos obligatorios según el poder adquisitivo simulado
    let tipoPerfil = "";
    let actividadesDisponibles = [];

    if (presupuesto < 400) {
        tipoPerfil = "Mochilero / Económico";
        actividadesDisponibles = [
            "Plaza de Armas y Arco Deustua (Centro Histórico)",
            "Isla Flotante de los Uros (Tour tradicional en lancha colectiva)",
            "Mirador Puma Uta para fotos panorámicas del Titicaca",
            "Feria artesanal del puerto de Puno",
            "Visita pedestre al malecón ecoturístico"
        ];
    } else if (presupuesto >= 400 && presupuesto <= 1200) {
        tipoPerfil = "Viajero Estándar Cultural";
        actividadesDisponibles = [
            "Tour de día completo a las Islas de los Uros y Taquile (Almuerzo comunal incluido)",
            "Complejo Arqueológico de Sillustani y las Chullpas monumentales",
            "Excursión a la Ciudad Rosada de Lampa y su réplica de La Piedad",
            "Cena show con danzas típicas locales (Diablada y Sikuris)",
            "Paseo guiado en el buque museo Yavarí"
        ];
    } else {
        tipoPerfil = "Experiencia Vivencial Premium";
        actividadesDisponibles = [
            "Pernocte vivencial en la Isla Amantaní (Conexión cultural Quechua/Aymara)",
            "Tour en lancha rápida hacia Taquile y demostración de textiles ancestrales",
            "Excursión privada al Complejo Arqueológico de Cutimbo",
            "Ruta mística hacia el Portal de Aramu Muru (Hayu Marca)",
            "Cena gourmet andina basada en trucha del Titicaca y quinua orgánica"
        ];
    }

    // 4. Procesamiento lógico del itinerario día por día
    const gastoPorDia = (presupuesto / dias).toFixed(2);
    let htmlItinerarioDiaADia = '<div class="mt-3 text-start">';

    // Construimos la agenda usando un bucle finito controlado por los días del usuario
    for (let i = 1; i <= dias; i++) {
        // Seleccionamos una actividad de forma cíclica si los días superan las actividades del arreglo
        const actividadIndex = (i - 1) % actividadesDisponibles.length;
        const actividadAsignada = actividadesDisponibles[actividadIndex];

        htmlItinerarioDiaADia += `
            <div class="mb-2 p-2 bg-white rounded border-start border-primary border-3 shadow-sm">
                <span class="badge bg-primary mb-1">Día ${i}</span>
                <p class="mb-0 small text-dark fw-semibold">${actividadAsignada}</p>
            </div>
        `;
    }
    htmlItinerarioDiaADia += '</div>';

    // 5. Inyección dinámica en el DOM con clases Bootstrap limpias
    cajaResultado.classList.remove("d-none", "alert-danger", "alert-info");
    cajaResultado.classList.add("alert-success", "animar-entrada"); // Usamos la animación CSS que agregamos antes

    cajaResultado.innerHTML = `
        <h5 class="fw-bold"><i class="bi bi-airplane-engines-fill text-success me-2"></i>¡Ruta Generada para ${nombre}!</h5>
        <p class="mb-1 small">Tu perfil asignado es: <span class="badge bg-dark">${tipoPerfil}</span></p>
        <p class="mb-3 small">Dispones de un presupuesto estimado de <strong>S/. ${gastoPorDia}</strong> por día para tus <strong>${dias} días</strong> de estadía.</p>
        
        <h6 class="fw-bold border-top pt-2"><i class="bi bi-calendar3 me-2"></i>Cronograma Propuesto:</h6>
        ${htmlItinerarioDiaADia}
        
        <small class="d-block mt-3 text-muted border-top pt-2 italic">
            * Este itinerario prioriza la reactivación económica de las comunidades nativas y la preservación del patrimonio de la región Puno.
        </small>
    `;
}

// =========================================================================
// 4. CAMBIO DE MODO CLARO / OSCURO (Persistente con localStorage)
// =========================================================================
function cambiarModo() {
    const cuerpo = document.body;
    cuerpo.classList.toggle("modo-oscuro");

    // Guardamos la elección actual en el almacenamiento del navegador
    if (cuerpo.classList.contains("modo-oscuro")) {
        localStorage.setItem("modo", "oscuro");
    } else {
        localStorage.setItem("modo", "claro");
    }
}