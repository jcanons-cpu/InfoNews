// ======================================================
// INFONEWS - JAVASCRIPT
// ======================================================


// ======================================================
// VARIABLES
// ======================================================

let noticias = [];


// ======================================================
// CARGAR NOTICIAS DESDE JSON
// ======================================================

fetch("data/noticias.json")

    .then(respuesta => respuesta.json())

    .then(datos => {

        noticias = datos;

        mostrarNoticias();

        mostrarFavoritos();

    })

    .catch(error => {

        console.error(
            "Error al cargar las noticias:",
            error
        );

    });


// ======================================================
// MOSTRAR NOTICIAS
// ======================================================

function mostrarNoticias(
    listaNoticias = noticias
) {

    const contenedor =
        document.getElementById(
            "contenedor-noticias"
        );


    if (!contenedor) {
        return;
    }


    contenedor.innerHTML = "";


    if (listaNoticias.length === 0) {

        contenedor.innerHTML = `

            <div class="mensaje-sin-noticias">

                <h3>
                    No hay noticias disponibles
                </h3>

                <p>
                    No encontramos noticias
                    para esta búsqueda o categoría.
                </p>

            </div>

        `;

        return;
    }


    listaNoticias.forEach(noticia => {

        const tarjeta =
            document.createElement("article");


        tarjeta.classList.add(
            "tarjeta-noticia"
        );


        tarjeta.innerHTML = `

            <img
                src="${noticia.imagen}"
                alt="${noticia.titulo}"
                class="imagen-noticia"
            >


            <div class="contenido-noticia">

                <span class="categoria-noticia">

                    ${noticia.categoria}

                </span>


                <h3>

                    ${noticia.titulo}

                </h3>


                <p>

                    ${noticia.descripcion}

                </p>


                <small class="fecha-noticia">

                    ${noticia.fecha}

                </small>

            </div>


            <button
                class="boton-ver-mas"
                onclick="mostrarDetalle(${noticia.id})">

                VER MÁS →

            </button>


            <button
                class="boton-favorito"
                onclick="toggleFavorito(${noticia.id})">

                ${
                    esFavorito(noticia.id)
                        ? "❤️"
                        : "🤍"
                }

            </button>

        `;


        contenedor.appendChild(tarjeta);

    });

}


// ======================================================
// FILTRAR POR CATEGORÍA
// ======================================================

function filtrarCategoria(categoria) {

    const noticiasFiltradas =
        noticias.filter(
            noticia =>
                noticia.categoria === categoria
        );


    mostrarNoticias(
        noticiasFiltradas
    );


    const seccionNoticias =
        document.getElementById(
            "noticias"
        );


    if (seccionNoticias) {

        seccionNoticias.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ======================================================
// MOSTRAR TODAS LAS NOTICIAS
// ======================================================

function mostrarTodasLasNoticias() {

    const buscador =
        document.getElementById(
            "buscador"
        );


    if (buscador) {

        buscador.value = "";

    }


    mostrarNoticias(
        noticias
    );


    const seccionNoticias =
        document.getElementById(
            "noticias"
        );


    if (seccionNoticias) {

        seccionNoticias.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ======================================================
// BUSCADOR DE NOTICIAS
// ======================================================

const buscador =
    document.getElementById(
        "buscador"
    );


if (buscador) {

    buscador.addEventListener(
        "input",
        function () {

            const texto =
                buscador.value
                    .toLowerCase()
                    .trim();


            if (texto === "") {

                mostrarNoticias(
                    noticias
                );

                return;

            }


            const resultados =
                noticias.filter(
                    noticia =>

                        noticia.titulo
                            .toLowerCase()
                            .includes(texto)

                        ||

                        noticia.categoria
                            .toLowerCase()
                            .includes(texto)

                        ||

                        noticia.descripcion
                            .toLowerCase()
                            .includes(texto)

                        ||

                        noticia.contenido
                            .toLowerCase()
                            .includes(texto)

                );


            mostrarNoticias(
                resultados
            );

        }
    );

}


// ======================================================
// MOSTRAR DETALLE
// ======================================================

function mostrarDetalle(id) {

    const noticia =
        noticias.find(
            item => item.id === id
        );


    if (!noticia) {
        return;
    }


    cerrarDetalle();


    const modal =
        document.createElement("div");


    modal.classList.add(
        "modal-noticia"
    );


    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";

    modal.style.backgroundColor =
        "rgba(0, 0, 0, 0.75)";

    modal.style.display = "flex";

    modal.style.alignItems =
        "center";

    modal.style.justifyContent =
        "center";

    modal.style.padding = "20px";

    modal.style.boxSizing =
        "border-box";

    modal.style.zIndex = "99999";


    modal.innerHTML = `

        <div class="contenido-modal">


            <button
                class="cerrar-modal"
                aria-label="Cerrar noticia">

                ✕

            </button>


            <span class="categoria-noticia">

                ${noticia.categoria}

            </span>


            <h2>

                ${noticia.titulo}

            </h2>


            <p class="fecha-noticia">

                ${noticia.fecha}

            </p>


            <img
                src="${noticia.imagen}"
                alt="${noticia.titulo}"
                class="imagen-modal"
            >


            <p class="descripcion-modal">

                ${noticia.descripcion}

            </p>


            <div class="texto-noticia">

                <p>

                    ${noticia.contenido}

                </p>

            </div>


            <button
                class="boton-favorito-modal"
                onclick="
                    toggleFavorito(${noticia.id});
                    actualizarBotonFavoritoModal(${noticia.id});
                ">

                ${
                    esFavorito(noticia.id)
                        ? "❤️ Quitar de favoritos"
                        : "🤍 Agregar a favoritos"
                }

            </button>


        </div>

    `;


    document.body.appendChild(
        modal
    );


    const botonCerrar =
        modal.querySelector(
            ".cerrar-modal"
        );


    botonCerrar.addEventListener(
        "click",
        cerrarDetalle
    );


    modal.addEventListener(
        "click",
        function (evento) {

            if (
                evento.target === modal
            ) {

                cerrarDetalle();

            }

        }
    );


    document.body.style.overflow =
        "hidden";

}


// ======================================================
// CERRAR MODAL
// ======================================================

function cerrarDetalle() {

    const modalExistente =
        document.querySelector(
            ".modal-noticia"
        );


    if (modalExistente) {

        modalExistente.remove();

    }


    document.body.style.overflow =
        "";

}


// ======================================================
// FAVORITOS
// ======================================================

function obtenerFavoritos() {

    return JSON.parse(
        localStorage.getItem(
            "favoritosInfoNews"
        )
    ) || [];

}


function esFavorito(id) {

    const favoritos =
        obtenerFavoritos();


    return favoritos.includes(
        id
    );

}


// ======================================================
// AGREGAR / QUITAR FAVORITO
// ======================================================

function toggleFavorito(id) {

    let favoritos =
        obtenerFavoritos();


    if (
        favoritos.includes(id)
    ) {

        favoritos =
            favoritos.filter(
                favoritoId =>
                    favoritoId !== id
            );

    } else {

        favoritos.push(id);

    }


    localStorage.setItem(
        "favoritosInfoNews",
        JSON.stringify(
            favoritos
        )
    );


    mostrarNoticias();

    mostrarFavoritos();

}


// ======================================================
// MOSTRAR FAVORITOS
// ======================================================

function mostrarFavoritos() {

    const seccionFavoritos =
        document.querySelector(
            "#favoritos"
        );


    if (!seccionFavoritos) {
        return;
    }


    const favoritos =
        obtenerFavoritos();


    if (
        favoritos.length === 0
    ) {

        seccionFavoritos.innerHTML = `

            <h2>
                ❤️ Mis favoritos
            </h2>

            <p>
                Aún no tienes noticias favoritas.
            </p>

        `;

        return;

    }


    const noticiasFavoritas =
        noticias.filter(
            noticia =>
                favoritos.includes(
                    noticia.id
                )
        );


    seccionFavoritos.innerHTML = `

        <h2>
            ❤️ Mis favoritos
        </h2>

        <p>
            Aquí encontrarás las noticias
            que hayas guardado.
        </p>


        <div class="grid-noticias">

            ${
                noticiasFavoritas
                    .map(
                        noticia => `

                        <article
                            class="tarjeta-noticia"
                        >

                            <img
                                src="${noticia.imagen}"
                                alt="${noticia.titulo}"
                                class="imagen-noticia"
                            >


                            <div
                                class="contenido-noticia"
                            >

                                <span
                                    class="categoria-noticia"
                                >

                                    ${noticia.categoria}

                                </span>


                                <h3>

                                    ${noticia.titulo}

                                </h3>


                                <p>

                                    ${noticia.descripcion}

                                </p>


                                <small
                                    class="fecha-noticia"
                                >

                                    ${noticia.fecha}

                                </small>

                            </div>


                            <button
                                class="boton-ver-mas"
                                onclick="
                                    mostrarDetalle(
                                        ${noticia.id}
                                    )
                                "
                            >

                                VER MÁS →

                            </button>


                            <button
                                class="boton-favorito"
                                onclick="
                                    toggleFavorito(
                                        ${noticia.id}
                                    )
                                "
                            >

                                ❤️

                            </button>

                        </article>

                    `
                    )
                    .join("")
            }

        </div>

    `;

}


// ======================================================
// ACTUALIZAR FAVORITO DEL MODAL
// ======================================================

function actualizarBotonFavoritoModal(
    id
) {

    const boton =
        document.querySelector(
            ".boton-favorito-modal"
        );


    if (!boton) {
        return;
    }


    boton.innerHTML =
        esFavorito(id)

            ? "❤️ Quitar de favoritos"

            : "🤍 Agregar a favoritos";

}


// ======================================================
// VALIDACIÓN DEL FORMULARIO
// ======================================================

const formulario =
    document.getElementById(
        "formulario-contacto"
    );


if (formulario) {

    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const nombre =
                document.getElementById(
                    "nombre"
                );


            const correo =
                document.getElementById(
                    "correo"
                );


            const telefono =
                document.getElementById(
                    "telefono"
                );


            const mensaje =
                document.getElementById(
                    "mensaje"
                );


            const errorNombre =
                document.getElementById(
                    "error-nombre"
                );


            const errorCorreo =
                document.getElementById(
                    "error-correo"
                );


            const errorTelefono =
                document.getElementById(
                    "error-telefono"
                );


            const errorMensaje =
                document.getElementById(
                    "error-mensaje"
                );


            const mensajeExito =
                document.getElementById(
                    "mensaje-exito"
                );


            errorNombre.textContent = "";

            errorCorreo.textContent = "";

            errorTelefono.textContent = "";

            errorMensaje.textContent = "";

            mensajeExito.textContent = "";


            let formularioValido =
                true;


            // NOMBRE

            if (
                nombre.value.trim() === ""
            ) {

                errorNombre.textContent =
                    "El nombre es obligatorio.";

                formularioValido =
                    false;

            } else if (
                nombre.value.trim().length < 3
            ) {

                errorNombre.textContent =
                    "El nombre debe tener mínimo 3 caracteres.";

                formularioValido =
                    false;

            }


            // CORREO

            const expresionCorreo =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                correo.value.trim() === ""
            ) {

                errorCorreo.textContent =
                    "El correo es obligatorio.";

                formularioValido =
                    false;

            } else if (
                !expresionCorreo.test(
                    correo.value.trim()
                )
            ) {

                errorCorreo.textContent =
                    "Ingresa un correo electrónico válido.";

                formularioValido =
                    false;

            }


            // TELÉFONO

            const telefonoLimpio =
                telefono.value.replace(
                    /\D/g,
                    ""
                );


            if (
                telefonoLimpio === ""
            ) {

                errorTelefono.textContent =
                    "El teléfono es obligatorio.";

                formularioValido =
                    false;

            } else if (
                telefonoLimpio.length < 7 ||
                telefonoLimpio.length > 10
            ) {

                errorTelefono.textContent =
                    "El teléfono debe tener entre 7 y 10 números.";

                formularioValido =
                    false;

            }


            // MENSAJE

            if (
                mensaje.value.trim() === ""
            ) {

                errorMensaje.textContent =
                    "El mensaje es obligatorio.";

                formularioValido =
                    false;

            } else if (
                mensaje.value.trim().length < 10
            ) {

                errorMensaje.textContent =
                    "El mensaje debe tener mínimo 10 caracteres.";

                formularioValido =
                    false;

            }


            // ÉXITO

            if (
                formularioValido
            ) {

                mensajeExito.textContent =
                    "¡Mensaje enviado correctamente!";


                formulario.reset();

            }

        }
    );

}