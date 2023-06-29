var GestionPropiedades = {
    arregloPropiedades:[],
    arregloPropiedadesFiltradas: [],
    arregloCoordenadas: [],

    GetAllPropiedades: function () {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/PropiedadController/GetAllPropiedades",
                type: "GET",
                success: function (response) {
                    console.log(response);
                    //GestionPropiedades.cargarPropiedades(response);
                    GestionPropiedades.arregloPropiedades = response;
                    GestionCategorias.consultarCategorias().then(function () {
                        resolve(); // Resuelve la promesa cuando los datos y las categorías están disponibles
                    }).catch(function (error) {
                        reject(error); // Rechaza la promesa en caso de error
                    });
                },
                error: function (xhr, status, error) {
                    console.error(error);
                    reject(error); // Rechaza la promesa en caso de error
                }
            });
        });
    },


    GetAllPropiedadesByCiudad: function () {
        var ciudad = document.getElementById("campoCiudad").value;
        $.ajax({
            url: "/PropiedadController/GetAllPropiedadesByCiudad",
            type: "GET",
            data: {
                ciudad: ciudad
            },
            success: function (response) {
                console.log(response);
                GestionApiMaps.MoverACiudad(ciudad);
                GestionPropiedades.arregloPropiedades = response;
                if (response != null && response.length > 0) {
                    GestionPropiedades.cargarPropiedades(response);

                }
                
            },
            error: function (xhr, status, error) {
                // Manejar el error de la solicitud
                console.error(error);
            }
        });

    },

    ResetearFiltros: function () {
        const div = document.getElementById("lateralFiltros");
        const inputs = div.querySelectorAll('input');
        const selects = div.querySelectorAll('select');

        // Limpiar inputs
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }

        // Limpiar selects
        for (let i = 0; i < selects.length; i++) {
            selects[i].selectedIndex = 0;
        }

        GestionPropiedades.cargarPropiedades(GestionPropiedades.arregloPropiedades);
        GestionApiMaps.ResetearFiltrosMarcadores();
    },

    GetPropiedadesFiltradas: function () {
        GestionPropiedades.arregloPropiedadesFiltradas = [];
        GestionApiMaps.arregloCoordenadasFiltradas = [];
        var filtros = {
            categoriaId: document.getElementById("formCategoria").value,
            precioMin: document.getElementById("formPrecioMin").value,
            precioMax: document.getElementById("formPrecioMax").value,
            superficieMin: document.getElementById("formSuperficieMin").value,
            superficieMax: document.getElementById("formSuperficieMax").value
        };
        GestionPropiedades.arregloPropiedades.forEach(objeto => {
            const categoriaValida = filtros.categoriaId === '' || objeto.categoriaId === filtros.categoriaId;
            const precioValido = (filtros.precioMin === '' || objeto.precio >= filtros.precioMin) &&
                (filtros.precioMax === '' || objeto.precio <= filtros.precioMax)
            const superficieValida = (filtros.superficieMin === '' || objeto.superficie >= filtros.superficieMin) &&
                (filtros.superficieMax === '' || objeto.superficie <= filtros.superficieMax)

            if (categoriaValida && precioValido && superficieValida) {
                GestionPropiedades.arregloPropiedadesFiltradas.push(objeto);
            }
        });
        GestionPropiedades.arregloPropiedadesFiltradas.forEach(p => {
            let coordenadas = p.ubicacion_coordenadas.split(",");
            GestionApiMaps.arregloCoordenadasFiltradas.push({
                "latitud": coordenadas[0],
                "longitud": coordenadas[1]
            });
        });
        GestionApiMaps.filtrarMarcadores();
        GestionPropiedades.cargarPropiedades(GestionPropiedades.arregloPropiedadesFiltradas);
    },

    cargarPropiedades: function (data) {
        
        // Obtén el contenedor principal donde agregarás los productos
        var contenedor = document.getElementById('propiedadesContainer');
        var productoDiv = document.createElement('div');
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
        GestionApiMaps.arregloCoordenadas = [];
        
        if (data != null && data.length > 0) {
   
            // Genera el código HTML para cada producto
            data.forEach(function (propiedad, index) {
                // Crea un elemento de contenedor para el producto
                productoDiv.classList.add('producto');


                // Crea los elementos de contenido para el producto (nombre, precio, imagen, etc.)
                var nombreElement = document.createElement('h3');
                nombreElement.textContent = propiedad.nombre;

                var ciudadElement = document.createElement('h4');
                ciudadElement.textContent = propiedad.ciudad;

                var ubicacion = document.createElement('p');
                ubicacion.textContent = propiedad.direccion;


                var precioElement = document.createElement('p');
                precioElement.textContent = 'Precio: $' + propiedad.precio.toFixed(2);

                var superficie = document.createElement('p');
                superficie.textContent = 'Superficie: ' + propiedad.superficie.toFixed(2) + ' m²';

                var categoria = document.createElement('p');
                let nombrecategoria = GestionCategorias.arregloCategorias.find(cat => cat.id == propiedad.categoriaId).nombre;
                categoria.textContent = 'Categoria: ' + nombrecategoria;

                var boton = document.createElement('button');
                let coordenadas = propiedad.ubicacion_coordenadas.split(",");
                GestionApiMaps.arregloCoordenadas.push({
                    "longitud": parseFloat(coordenadas[0]), 
                    "latitud": parseFloat(coordenadas[1])
                })
                boton.textContent = 'Ir a la ubicación';
                boton.onclick = function () {
                    GestionApiMaps.MoverAMarcador(coordenadas[0], coordenadas[1]);
                };
                productoDiv.appendChild(nombreElement);
                productoDiv.appendChild(ciudadElement);
                productoDiv.appendChild(ubicacion);
                productoDiv.appendChild(categoria);
                productoDiv.appendChild(precioElement);
                productoDiv.appendChild(superficie);
                productoDiv.appendChild(boton);
                contenedor.appendChild(productoDiv);
            });
        } else {
            let noElementos = document.createElement('p');
            noElementos.textContent = 'no se han encontrado propiedades con esas caracteristicas';
            productoDiv.appendChild(noElementos);
            contenedor.appendChild(productoDiv);
        }
 
    }

}