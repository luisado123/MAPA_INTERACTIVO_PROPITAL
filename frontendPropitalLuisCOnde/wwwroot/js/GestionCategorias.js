var GestionCategorias = {
    arregloCategorias: [],
    consultarCategorias: function () {

        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/CategoriaController/GetAllCategorias",
                type: "GET",
                success: function (response) {
                    // Procesar la respuesta de la API
                    console.log(response);
                    GestionCategorias.arregloCategorias = response;
                    GestionCategorias.cargarSelectCategorias(GestionCategorias.arregloCategorias);
                    resolve(response)
                    //GestionCategorias.cargarSelectCategorias(response);

                },
                error: function (xhr, status, error) {
                    // Manejar el error de la solicitud
                    reject(error);
                    console.error(error);
                }
            });
        });
  
    },
    cargarSelectCategorias: function(data){
        var selectCategorias = document.getElementById("formCategoria"); 
        data.forEach(function (opcion) {
            var option = document.createElement("option");
            option.value = opcion.id;
            option.text = opcion.nombre;
            selectCategorias.appendChild(option);
        });
    },





}

