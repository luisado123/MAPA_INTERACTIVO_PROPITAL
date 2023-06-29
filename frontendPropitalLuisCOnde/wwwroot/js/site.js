
var map;
var arregloMarcadores=[];
function initMap() {
    var center = { lat: 40.71277, lng: -74.005974 }; // Por ejemplo, Nueva York
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12, // Nivel de zoom inicial
        center: center // Centro del mapa
    });

    GestionPropiedades.GetAllPropiedades().then(function () {
        var arregloCoordenadasExtraidas = [];

        GestionPropiedades.arregloPropiedades.forEach(d => {
            let coordenadasSeparadas = d.ubicacion_coordenadas.split(",");
            let nombreCategoria = GestionCategorias.arregloCategorias.find(f => f.id == d.categoriaId).nombre;
            arregloCoordenadasExtraidas.push({
                "nombre": d.nombre,
                "categoria": nombreCategoria,
                "latitud": parseFloat(coordenadasSeparadas[0]),
                "longitud": parseFloat(coordenadasSeparadas[1]),
                "descripcion": "ubicada en" + " " + d.direccion + " " + "con un precio de" + " " + d.precio,
                "tamaño": "tamaño:" + d.superficie + "m²"
            });
        });


        arregloCoordenadasExtraidas.forEach(function (coordenada) {
            var marker = new google.maps.Marker({
                position: {
                    lat: coordenada.latitud,
                    lng: coordenada.longitud
                },
                map: map,
                icon: {
                    url: '/img/sign.png',
                    scaledSize: new google.maps.Size(50, 50)
                },
                title: coordenada.nombre


            });

            var infowindow = new google.maps.InfoWindow({
                content: '<h3>' + coordenada.nombre + '</h3><p>Categoría: ' + coordenada.categoria + '</p><p>' + coordenada.descripcion + '</p><p>' + coordenada.tamaño + '</p>'
            });




            // Agregar evento de clic al marcador
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

            arregloMarcadores.push(marker);
        });

 
        GestionPropiedades.cargarPropiedades(GestionPropiedades.arregloPropiedades);

    });

}

