using Backend.Entities;
using Backend.Models;
using CRUD.Assemblers;
using System.Collections.Generic;
using System.Linq;

namespace Backend.CRUD.Assemblers
{
    public class AssetToAssetDTOAssembler : IModelToDTO<Asset, AssetDTO>
    {
        public IEnumerable<AssetDTO> ToDTO(IEnumerable<Asset> models)
        {
            var dto = models.Select(model => ToDTO(model));
            return dto;
        }

        virtual public AssetDTO ToDTO(Asset model)
        {
            return new AssetDTO()
            {
                Id = model.Id,
                FileName = model.FileName,
                CreatedOn = model.CreatedOn,
                MimeType = model.MimeType,
                CreatedBy = model.CreatedBy,
                Email = model.Email,
                Country = model.Country,
                Description = model.Description
            };
        }
    }
}