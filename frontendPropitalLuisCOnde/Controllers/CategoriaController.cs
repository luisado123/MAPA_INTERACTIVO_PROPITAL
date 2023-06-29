using Microsoft.AspNetCore.Mvc;

namespace frontendPropitalLuisCOnde.Controllers
{
    public class CategoriaController : Controller
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public CategoriaController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClient = httpClientFactory.CreateClient();
            _configuration = configuration;

            var urlApi = _configuration["AppSettings:ApiUrl"];
            _httpClient.BaseAddress = new Uri(urlApi);
        }


        [Route("CategoriaController/GetAllCategorias")]
        public async Task<IActionResult> GetAllCategorias()
        {
            HttpResponseMessage response = await _httpClient.GetAsync("/api/Categoria/GetAllCategorias"); // Ruta del endpoint de tu API

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
