document.addEventListener("DOMContentLoaded", function () {
    // Inicializar el mapa con un centro predeterminado
    var map = L.map('map').setView([12.1097, -86.2504], 13);

    // Añadir tiles de mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Coordenadas del Hospital Vélez Paiz en Managua
    var hospitalLatitude = 12.1097;
    var hospitalLongitude = -86.2504;

    // Añadir marcador para la ubicación del hospital
    L.marker([hospitalLatitude, hospitalLongitude]).addTo(map)
        .bindPopup('Hospital Vélez Paiz')
        .openPopup();

    // Intentar obtener la ubicación actual del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userLatitude = position.coords.latitude;
            var userLongitude = position.coords.longitude;

            // Centrar el mapa en la ubicación del usuario
            map.setView([userLatitude, userLongitude], 13);

            // Añadir marcador para la ubicación del usuario
            L.marker([userLatitude, userLongitude]).addTo(map)
                .bindPopup('Tu ubicación actual')
                .openPopup();

            // Dibujar una línea entre el usuario y el hospital
            var latlngs = [
                [userLatitude, userLongitude],
                [hospitalLatitude, hospitalLongitude]
            ];
            var polyline = L.polyline(latlngs, { color: 'blue' }).addTo(map);

            // Calcular la distancia entre la ubicación del usuario y el hospital
            var distance = map.distance([userLatitude, userLongitude], [hospitalLatitude, hospitalLongitude]);

            // Convertir la distancia a tiempo estimado de llegada (suponiendo una velocidad promedio)
            var averageSpeed = 50; // km/h
            var estimatedTime = (distance / 1000) / averageSpeed; // en horas
            var estimatedMinutes = Math.round(estimatedTime * 60); // convertir a minutos

            // Mostrar el tiempo estimado de llegada
            document.querySelector('.estimated-arrival').textContent = 'Tiempo estimado de llegada: ' + estimatedMinutes + ' minutos';
        }, function (error) {
            // Manejo de errores
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("Permiso denegado por el usuario para obtener la ubicación.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Información de ubicación no disponible.");
                    break;
                case error.TIMEOUT:
                    alert("La solicitud para obtener la ubicación ha expirado.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("Se produjo un error desconocido al obtener la ubicación.");
                    break;
            }
        });
    } else {
        alert("La geolocalización no es compatible con este navegador.");
    }
});

function toggleMenu() {
    var sideMenu = document.querySelector('.side-menu');
    var overlay = document.querySelector('.overlay');
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}
