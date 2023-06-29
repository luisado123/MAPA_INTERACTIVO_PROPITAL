document.getElementById("consumirApi").addEventListener("click", function () {
    // Realizar solicitud al controlador
    $.ajax({
        url: "/PropiedadController/GetAllPropiedades",
        type: "GET",
        success: function (response) {
            if (response.ok) {
                // La solicitud se realizó con éxito
                return response.text();
            } else {
                // La solicitud falló
                throw new Error("Error en la solicitud");
            }
        },
        success: function (data) {
            // Procesar la respuesta de la API
            console.log(data);
        },
        error: function (xhr, status, error) {
            // Manejar el error de la solicitud
            console.error(error);
        }
    });
});


function GetAllPropiedades() {

        // Realizar solicitud al controlador
        $.ajax({
            url: "/PropiedadController/GetAllPropiedades",
            type: "GET",
            success: function (response) {
                if (response.ok) {
                   GestionPropiedades.cargarPropiedades(response.text())
                    return response.text();
                } else {
                    // La solicitud falló
                    throw new Error("Error en la solicitud");
                }
            },
            success: function (data) {
                // Procesar la respuesta de la API
                console.log(data);
            },
            error: function (xhr, status, error) {
                // Manejar el error de la solicitud
                console.error(error);
            }
        });
    
}

function GetPropiedadesByCiudad() {
    var ciudad = document.getElementById("city").value;
    // Realizar solicitud al controlador
    $.ajax({
        url: "/PropiedadController/GetAllPropiedadesByCiudad",
        type: "GET",
        data: {
            ciudad: ciudad
        },
        success: function (response) {
            if (response.ok) {
                // La solicitud se realizó con éxito
                return response.text();
            } else {
                // La solicitud falló
                throw new Error("Error en la solicitud");
            }
        },
        success: function (data) {
            // Procesar la respuesta de la API
            console.log(data);
        },
        error: function (xhr, status, error) {
            // Manejar el error de la solicitud
            console.error(error);
        }
    });

}