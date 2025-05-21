using backend.Models.DTOs;

namespace backend.Services
{
    public class PetFishProductService : IPetFishProductService
    {
        public async Task<IEnumerable<PetFishProductListItemDto>> GetAllAsync()
        {
            var list = new List<PetFishProductListItemDto>
            {
                new PetFishProductListItemDto { Id = 1, Name = "first fish", Description = "here is the description of the first fish", Price = 20.11m},

                new PetFishProductListItemDto { Id = 1, Name = "second fish", Description = "here is the description of the second fish", Price = 20.11m}
            };

            return await Task.FromResult(list);
        }

    }

}
