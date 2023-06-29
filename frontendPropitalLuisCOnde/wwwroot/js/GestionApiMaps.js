var GestionApiMaps = {
    arregloCoordenadas: [],
    marcadores: [],
    arregloCoordenadasFiltradas:[],

    MoverACiudad: function (ciudadDestino) {
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ address: ciudadDestino }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
                var location = results[0].geometry.location;
                map.panTo(location);
                //GestionApiMaps.AgregarMarcadoresMapa();
            } else {
                console.log("No se encontró la ciudad: " + ciudadDestino + ". Estado: " + status);
            }
        });

    },

    MoverAMarcador: function (latitud,longitud) {
        var location = new google.maps.LatLng(latitud, longitud);
        map.panTo(location);
    },


    ConvertirDireccionesACoordenadas: function (direcciones) {
        var geocoder = new google.maps.Geocoder();
        direcciones.forEach(function (direccion) {
            geocoder.geocode({ address: direccion }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var latitud = results[0].geometry.location.lat();
                    var longitud = results[0].geometry.location.lng();

                    console.log("Latitud: " + latitud);
                    console.log("Longitud: " + longitud);
                    arregloCoordenadas.push({
                        "latitud": latitud,
                        "longitud": longitud,
                        "precio": direccion.precio,
                        "Categoria": direccion.categoriaId
                    })
                } else {
                    console.log("Geocodificación fallida para la dirección: " + direccion + ". Estado: " + status);
                }
            });
        });
    },


    filtrarMarcadores: function () {
        arregloMarcadores.forEach((marcador, index) => {
            var latitud = marcador.getPosition().lat();
            var longitud = marcador.getPosition().lng();
            var banderaControl = false;
            GestionApiMaps.arregloCoordenadasFiltradas.forEach(coord => {
                if (latitud == coord.latitud && longitud == coord.longitud) {
                    banderaControl = true;
                }
            });
            if (banderaControl == false) {
                marcador.setVisible(false);
            }
        });
    },

    ResetearFiltrosMarcadores: function () {
        arregloMarcadores.forEach(marcador => {
            marcador.setVisible(true);
        })
    }
}