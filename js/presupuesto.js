document.addEventListener("DOMContentLoaded", cargarProductos); // Productos

let nProducto = 1;
function cargarProductos() {
    fetch("../items/productos.json")
        .then(response => response.json())
        .then(productos => {
            // Contenedor de los productos
            const contenedor = document.getElementById("Productos");
            contenedor.style.backgroundColor = "#FFF"
            contenedor.classList.add("justify-content-center");



            productos.forEach(producto => {

                // Contenedor producto
                const contenedorProductos = document.createElement("div")
                contenedorProductos.classList.add("text-start", "row", "contenedor-productos2");// Contenedor producto
                const contenedorGrandeProductos = document.createElement("div")
                contenedorGrandeProductos.appendChild(contenedorProductos);
                contenedor.appendChild(contenedorGrandeProductos);
                contenedorGrandeProductos.classList.add("col-lg-4", "text-start", "contenedor-productos");

                // Imagen
                const contenedorImagen = document.createElement("div");
                contenedorImagen.classList.add("text-center", "col-12");
                const imagen = document.createElement("img");
                imagen.src = producto.imagen;
                imagen.classList.add("img-fluid", "imagen-Productos");
                contenedorImagen.appendChild(imagen);

                // Nombre
                const nombreProducto = document.createElement("h4");
                nombreProducto.textContent = producto.nombre;

                // Precio
                const contenedorPrecio = document.createElement("div");
                contenedorPrecio.classList.add("col-6", "d-flex", "align-items-center", "gap-2");

                const precioProductoLabel = document.createElement("span");
                precioProductoLabel.textContent = "Precio: ";
                const precioProducto = document.createElement("span");
                precioProducto.id = "Producto" + nProducto;
                precioProducto.textContent = producto.precio;
                const euro1 = document.createElement("span");
                euro1.textContent = " €";
                contenedorPrecio.appendChild(precioProductoLabel);
                contenedorPrecio.appendChild(precioProducto);
                contenedorPrecio.appendChild(euro1);

                // Cantidad
                const contenedorCantidad = document.createElement("div");
                contenedorCantidad.classList.add("col-6");

                const contenedorCantidad2 = document.createElement("div");
                contenedorCantidad2.classList.add("input-group");

                const cantidadProductoLabel = document.createElement("span");
                cantidadProductoLabel.textContent = "Cantidad"
                cantidadProductoLabel.classList.add("input-group-text")

                const cantidadProducto = document.createElement("input");
                cantidadProducto.type = "Number";
                cantidadProducto.classList.add("form-control", "text-end");
                cantidadProducto.id = "Producto" + nProducto + "-Cantidad";
                cantidadProducto.min = "0";
                cantidadProducto.value = "0"
                cantidadProducto.addEventListener("keydown", function (event) {
                    event.preventDefault()
                })
                contenedorCantidad2.appendChild(cantidadProductoLabel);
                contenedorCantidad2.appendChild(cantidadProducto);
                contenedorCantidad.appendChild(contenedorCantidad2);
                cantidadProducto.addEventListener("change", () => actualizarPrecio(nProducto));


                // Extras
                const contenedorExtras = document.createElement("div");
                contenedorExtras.classList.add("row", "mt-3");
                const extras = producto.extras;
                contenedorExtras.id = "Producto" + nProducto + "-ExtrasContenedor";

                let nExtra = 1;
                extras.forEach(extra => {
                    const extraNombre = document.createElement("p");
                    extraNombre.classList.add("col-8");
                    extraNombre.textContent = extra.nombre + ":";
                    const extraPrecio = document.createElement("p");
                    extraPrecio.classList.add("col-3");
                    extraPrecio.textContent = extra.precio;
                    extraPrecio.id = "Producto" + nProducto + "-Extra" + nExtra;
                    const euro2 = document.createElement("span");
                    euro2.textContent = " €";
                    extraPrecio.appendChild(euro2)

                    const contenedorInput = document.createElement("div");
                    contenedorInput.classList.add("col-1", "form-check", "ps-0");
                    const inputExtra = document.createElement("input");
                    inputExtra.type = "checkbox";
                    inputExtra.classList.add("form-check-input");
                    inputExtra.id = "Producto" + nProducto + "-Extra" + nExtra + "-Checkbox";
                    inputExtra.addEventListener("change", () => actualizarPrecio(nProducto));

                    contenedorInput.appendChild(inputExtra);

                    contenedorExtras.appendChild(extraNombre);
                    contenedorExtras.appendChild(extraPrecio);
                    contenedorExtras.appendChild(contenedorInput);
                    nExtra++;
                });
                nProducto++;

                contenedorProductos.appendChild(contenedorImagen);
                contenedorProductos.appendChild(nombreProducto);
                contenedorProductos.appendChild(contenedorPrecio);
                contenedorProductos.appendChild(contenedorCantidad);
                contenedorProductos.appendChild(contenedorExtras);

            })
        });
}

function actualizarPrecio(nProducto) {
    // Total donde guardar el cálculo
    const inputTotal = document.getElementById("inputTotal")

    // Calcular el precio total
    let precioTotal = 0;


    // Precio de los extras
    for (i = 1; i < nProducto; i++) {
        let cantidad = document.getElementById("Producto" + i + "-Cantidad");
        cantidad = cantidad.value;
        let precio = document.getElementById("Producto" + i);
        precio = Number.parseFloat(precio.textContent);

        precioTotal += precio * cantidad;

        if (cantidad > 0) {
            const contenedorExtras = document.getElementById("Producto" + i + "-ExtrasContenedor");
            const elementosExtra = contenedorExtras.querySelectorAll('p[id*="-Extra"]');


            let j = 1;
            elementosExtra.forEach(e => {

                let precioExtra = document.getElementById("Producto" + i + "-Extra" + j);
                precioExtra = Number.parseFloat(precioExtra.textContent);
                let checkExtra = document.getElementById("Producto" + i + "-Extra" + j + "-Checkbox");
                if (checkExtra.checked) {
                    precioTotal += precioExtra;
                }

                j++;
            });
        }
    }

    let numDias = document.getElementById("inputPlazo");
    numDias = Number.parseInt(numDias.value);
    if (numDias >= 3 && numDias < 7) // Urgente
        precioTotal *= 0.95
    else if (numDias >= 7 && numDias < 21)
        precioTotal *= 0.85
    else if (numDias >= 21)
        precioTotal *= 0.75

    inputTotal.value = precioTotal.toFixed(2);

}
let inputPlazo = document.getElementById("inputPlazo");
inputPlazo.addEventListener("input", () => actualizarPrecio(nProducto))
function validarFormularioTotal(e) {

    // Términos y condiciones
    const inputTerminos = document.getElementById("inputTerminos");
    inputTerminos.classList.remove("is-invalid")
    if (!inputTerminos.checked) {
        e.preventDefault();
        inputTerminos.focus();
        inputTerminos.classList.add("is-invalid");
    }
    // Correo electrónico
    const inputCorreo = document.getElementById("inputCorreo");
    inputCorreo.classList.remove("is-invalid")
    const emailRegEx = /\w+@\w+\.\w+/g;
    if (!emailRegEx.test(inputCorreo.value)) {
        e.preventDefault();
        inputCorreo.focus();
        inputCorreo.classList.add("is-invalid");
    }
    // Teléfono
    const inputTel = document.getElementById("inputTel");
    inputTel.classList.remove("is-invalid")
    if (inputTel.value.toString().length < 9 || inputTel.value.toString().length > 9 || isNaN(inputTel.value)) {
        e.preventDefault();
        inputTel.focus();
        inputTel.classList.add("is-invalid");
    }
    // Apellidos
    const inputApellidos = document.getElementById("inputApellidos");
    inputApellidos.classList.remove("is-invalid")
    if (inputApellidos.value.toString() === "") {
        e.preventDefault();
        inputApellidos.focus();
        inputApellidos.classList.add("is-invalid");
    } else if (inputApellidos.value.toString().length > 40){
        e.preventDefault();
        inputApellidos.focus();
        inputApellidos.classList.add("is-invalid");
        alert("Los apellidos no pueden tener más de 40 caracteres.");
    } else if (!/^[A-Za-z]+$/.test(inputApellidos.value.toString())) { // Validación de solo letras
        e.preventDefault();
        inputApellidos.focus();
        inputApellidos.classList.add("is-invalid");
        alert("Los apellidos solo pueden contener letras.");
    }

    // Nombre
    const inputNombre = document.getElementById("inputNombre");
    inputNombre.classList.remove("is-invalid")
    if (inputNombre.value.toString() === "") {
        e.preventDefault();
        inputNombre.focus();
        inputNombre.classList.add("is-invalid");
    } else if (inputNombre.value.toString().length > 15){
        e.preventDefault();
        inputNombre.focus();
        inputNombre.classList.add("is-invalid");
        alert("El nombre no puede tener más de 15 caracteres.");
    }  else if (!/^[A-Za-z]+$/.test(inputNombre.value.toString())) { // Validación de solo letras
        e.preventDefault();
        inputNombre.focus();
        inputNombre.classList.add("is-invalid");
        alert("El nombre solo puede contener letras.");
    }

    // Plazo
    const inputPlazo = document.getElementById("inputPlazo");
    inputPlazo.classList.remove("is-invalid")
    let plazoValue = Number.parseFloat(inputPlazo.value);

    console.log(Number.isInteger(plazoValue)); // true
    if (inputPlazo.value.toString() === "" || inputPlazo.value <= 0 || !Number.isInteger(plazoValue)) {
        e.preventDefault();
        inputPlazo.focus();
        inputPlazo.classList.add("is-invalid");
    }
    // Total - Si no tiene artículos seleccionados
    const inputTotal = document.getElementById("inputTotal");
    inputTotal.classList.remove("is-invalid")
    if (inputTotal.value.toString() === "0") {
        e.preventDefault();
        inputTotal.classList.add("is-invalid");
    }
}

const formularios = document.getElementById("formularioTotal");
formularios.addEventListener("submit", validarFormularioTotal);

