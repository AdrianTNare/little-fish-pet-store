using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/products/[controller]")]
    public class PetFishController : ControllerBase 
    {
        private readonly IPetFishProductService _fishProductsService;

        public PetFishController(IPetFishProductService fishProductsService)
        {
            _fishProductsService = fishProductsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts () 
        {
            var items = await _fishProductsService.GetAllAsync();

            return Ok(items);

        }
    }
    
}
