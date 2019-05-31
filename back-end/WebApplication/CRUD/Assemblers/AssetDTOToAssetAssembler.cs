using Backend.Entities;
using Backend.Models;
using CRUD.Assemblers;
using System.Collections.Generic;
using System.Linq;

namespace Backend.CRUD.Assemblers
{
    public class AssetDTOToAssetAssembler : IDTOToModel<AssetDTO, Asset>
    {
        public IEnumerable<Asset> ToModel(IEnumerable<AssetDTO> dtos)
        {
            var model = dtos.Select(dto => ToModel(dto));
            return model;
        }

        virtual public Asset ToModel(AssetDTO dto)
        {
            return new Asset()
            {
                Id = dto.Id,
                FileName = dto.FileName,
                CreatedOn = dto.CreatedOn,
                MimeType = dto.MimeType,
                CreatedBy = dto.CreatedBy,
                Email = dto.Email,
                Country = dto.Country,
                Description = dto.Description
            };
        }

        public Asset CopyToModel(AssetDTO dto, Asset model)
        {
            model.Id = dto.Id;
            model.FileName = dto.FileName;
            model.CreatedOn = dto.CreatedOn;
            model.MimeType = dto.MimeType;
            model.CreatedBy = dto.CreatedBy;
            model.Email = dto.Email;
            model.Country = dto.Country;
            model.Description = dto.Description;

            return model;
        }
    }
}