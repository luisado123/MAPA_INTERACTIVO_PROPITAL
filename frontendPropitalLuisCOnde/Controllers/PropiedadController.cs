using Microsoft.AspNetCore.Mvc;

namespace frontendPropitalLuisCOnde.Controllers
{
    public class PropiedadController : Controller
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public PropiedadController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClient = httpClientFactory.CreateClient();
            _configuration = configuration;

            var urlApi = _configuration["AppSettings:ApiUrl"];
            _httpClient.BaseAddress = new Uri(urlApi);
        }


        [Route("PropiedadController/GetAllPropiedades")]
        public async Task<IActionResult> GetAllPropiedades()
        {
            HttpResponseMessage response = await _httpClient.GetAsync("/api/Propiedad/GetAllPropiedades"); // Ruta del endpoint de tu API

            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                return Content(responseContent, "application/json"); // Retorna el contenido de la respuesta como JSON
            }
            // Resto de la lógica de tu acción

            return NotFound();
        }


        [Route("PropiedadController/GetAllPropiedadesByCiudad")]
        public async Task<IActionResult> GetAllPropiedadesByCiudad(string ciudad)
        {
            string url = $"/api/Propiedad/GetPropiedadesByCiudad/{ciudad}";
            HttpResponseMessage response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                return Content(responseContent, "application/json"); // Retorna el contenido de la respuesta como JSON
            }
            // Resto de la lógica de tu acción

            return NotFound();
        }
    }
}
