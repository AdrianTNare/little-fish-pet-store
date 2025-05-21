using backend.Models.DTOs;

namespace backend.Services
{
    public interface IPetFishProductService
    {
        Task<IEnumerable<PetFishProductListItemDto>> GetAllAsync();
        
    }
}
