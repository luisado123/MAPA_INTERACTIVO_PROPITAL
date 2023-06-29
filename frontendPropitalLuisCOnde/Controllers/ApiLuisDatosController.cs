using Microsoft.AspNetCore.Mvc;

namespace frontendPropitalLuisCOnde.Controllers
{
    public class ApiLuisDatosController : Controller
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public ApiLuisDatosController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClient = httpClientFactory.CreateClient();
            _configuration = configuration;

            var urlApi = _configuration["AppSettings:ApiUrl"];
            _httpClient.BaseAddress = new Uri(urlApi);
        }

        [Route("ApiLuisDatosController/ConectarApiLuis")]
        public async Task<IActionResult> ConectarApiLuis()
        {
            HttpResponseMessage response = await _httpClient.GetAsync("/api/Propiedad/GetAllPropiedades"); // Ruta del endpoint de tu API

            if (response.IsSuccessStatusCode)       
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                // Procesa la respuesta de la API
            }

            // Resto de la lógica de tu acción

            return View();
        }
    }
}

