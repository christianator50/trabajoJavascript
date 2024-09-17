// Coordenadas de la empresa
const empresaCoords = [51.523800, -0.158406];

// Inicializar el mapa y establecer la vista inicial (coordenadas y nivel de zoom)
const map = L.map('mapa').setView(empresaCoords, 20); // Coordenadas de Madrid, España

// Añadir las teselas de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Añadir un marcador en la ubicación de la empresa
const marker = L.marker(empresaCoords).addTo(map)
    .bindPopup('Ubicación de nuestra empresa.')
    .openPopup();

// Cálculo de rutas
// Función para obtener la ubicación del usuario
function obtenerUbicacionUsuario() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("La geolocalización no está soportada por tu navegador.");
    }
}

// Si se obtiene la ubicación correctamente
let userCoords = [];
function success(position) {
    userCoords = [position.coords.latitude, position.coords.longitude]; // Coordenadas del usuario
    console.log("Ubicación del usuario:", userCoords);

    // Añadir un marcador en la ubicación del usuario
    const markerUsuario = L.marker(userCoords).addTo(map)
        .bindPopup('Tu ubicación actual.')
        .openPopup();

    // Llamar a la función para calcular la ruta
    calcularRuta(userCoords, empresaCoords);
}

// Función para manejar errores en la geolocalización
function error() {
    alert("No se pudo obtener tu ubicación.");
}

// Función para calcular la ruta usando OSRM
function calcularRuta(inicio, fin) {
    const url = `https://router.project-osrm.org/route/v1/driving/${inicio[1]},${inicio[0]};${fin[1]},${fin[0]}?geometries=geojson&overview=full`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Datos de la ruta:", data);

            const route = data.routes[0].geometry; // Obtener la geometría de la ruta (línea)

            // Crear una polilínea en el mapa para la ruta
            L.geoJSON(route, {
                style: { color: 'blue', weight: 5 }
            }).addTo(map);
            // Ajustar la vista del mapa para mostrar la ubicación del usuario y la empresa
            map.fitBounds([empresaCoords, userCoords]);
        })
        .catch(error => {
            console.error("Error al calcular la ruta:", error);
        });
}

// Llamar a la función para obtener la ubicación del usuario al cargar la página
obtenerUbicacionUsuario();