// Constructor de las noticias
function cargarNoticias() {
    fetch("items/news.json")
        .then(response => response.json())
        .then(noticias => {

            const contendor = document.getElementById("noticias")
            contendor.classList.add("bloque-noticias")
            const articulos = noticias.articles;

            articulos.forEach(articulo => {
                // Contenedor de cada noticia
                const contenedorArticulo = document.createElement("div");
                contenedorArticulo.classList.add("col-lg-4");
                contenedorArticulo.classList.add("text-start");
                contenedorArticulo.classList.add("contenedor-noticia")

                // Enlace de la noticia
                const titular = document.createElement("h4");
                const url = document.createElement("a");
                url.href = articulo.url;
                titular.textContent = articulo.title;
                url.classList.add("row");
                url.classList.add("noticia-titular");
                url.target = '_blank';

                // Imagen de la noticia
                const imagen = document.createElement("img");
                imagen.src = articulo.img;
                imagen.classList.add("img-fluid");
                imagen.classList.add("noticia-imagen")
                imagen.classList.add("col-12")

                // Descripción mínima de la noticia
                const description = document.createElement("p");
                description.textContent = articulo.description;

                // Fecha de la publicación
                const date = document.createElement("p");
                date.textContent = articulo.date;
                date.classList.add("text-center");


                url.appendChild(imagen);
                url.appendChild(titular);
                url.appendChild(description);
                url.appendChild(date);
                //contenedorArticulo.appendChild(url);


                //contendor.appendChild(contenedorArticulo);
                url.classList.add("col-lg-4");
                url.classList.add("text-start");
                url.classList.add("contenedor-noticia")
                contendor.appendChild(url);
            });


        })
        .catch(error => console.error("Error al cargar el archivo JSON:", error));
}

// Constructor de los tours
function cargarTours() {
    // Cargar el archivo JSON (puedes hacer esto de varias maneras, aquí se usa Fetch)
    fetch("items/tours.json")
        .then(response => response.json())
        .then(mes => {
            // Obtener el contenedor donde se insertará el contenido
            const contenedor = document.getElementById("tours");
            // Lista de tours
            const listaTours = document.createElement("ul");

            // Iterar sobre los datos del JSON y generar HTML dinámicamente
            mes.forEach(item => {

                // Añadir encabezado (Mes)
                const contendorMes = document.createElement("li"); // Fila
                const mesJson = document.createElement("h4"); // Texto
                mesJson.textContent = item.month; // Texto del JSON
                contendorMes.classList.add("noList");
                mesJson.classList.add("mes");
                contendorMes.appendChild(mesJson) // Añadir Texto a la fila
                listaTours.appendChild(contendorMes); // Añadir fila a la tabla

                const conciertos = item.concerts;

                // Añadir tours a la lista de tours del mes
                conciertos.forEach(item2 => { // Cada tour
                    const tourLista = document.createElement("li"); // Fila
                    tourLista.classList.add("row");
                    tourLista.classList.add("justify-content-center");
                    tourLista.classList.add("noList", "concierto");

                    // Elementos de la fila
                    // Fecha
                    const fechaContendor = document.createElement("div");
                    const fecha = document.createElement("p");
                    fecha.textContent = item2.date;
                    fechaContendor.appendChild(fecha);
                    fechaContendor.classList.add("col-md-1");

                    // Localidad
                    const localidadContendor = document.createElement("div");
                    const localidad = document.createElement("p");
                    localidad.textContent = item2.location;
                    localidadContendor.appendChild(localidad);
                    localidadContendor.classList.add("col-sm-4");

                    // Sala
                    const salaContendor = document.createElement("div");
                    const sala = document.createElement("p");
                    sala.textContent = item2.hall;
                    salaContendor.appendChild(sala);
                    salaContendor.classList.add("col-sm-4");

                    // Grupos invitados (en caso de que los haya)
                    const invitadosContendor = document.createElement("div");
                    // Cada grupo en caso de que haya
                    const invitados = document.createElement("ul")
                    invitados.classList.add("row")
                    item2.guests.forEach(grupo => {
                        const bandaContenedor = document.createElement("li");
                        bandaContenedor.classList.add("col-12");
                        bandaContenedor.classList.add("noList");

                        const banda = document.createElement("p");
                        banda.textContent = grupo;
                        bandaContenedor.appendChild(banda);
                        invitados.appendChild(bandaContenedor);
                    });
                    invitadosContendor.appendChild(invitados);
                    invitadosContendor.classList.add("col-sm-3");

                    // Fila
                    tourLista.appendChild(fechaContendor);
                    tourLista.appendChild(localidadContendor);
                    tourLista.appendChild(salaContendor);
                    tourLista.appendChild(invitadosContendor);
                    // Meter a la tabla
                    listaTours.appendChild(tourLista);
                });
                contenedor.appendChild(listaTours);
            });
        })
        .catch(error => console.error("Error al cargar el archivo JSON:", error));
}


// Ejecutar los constructores cuando la página se haya cargado
document.addEventListener("DOMContentLoaded", cargarNoticias);
document.addEventListener("DOMContentLoaded", cargarTours); // Tours
