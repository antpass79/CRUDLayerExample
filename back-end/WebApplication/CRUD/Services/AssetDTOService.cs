using Backend.CRUD.Assemblers;
using Backend.Entities;
using Backend.Models;
using CRUD.Repositories;
using CRUD.Services;
using System;

namespace Backend.CRUD.Services
{
    public class AssetDTOService : BidirectionalAssemblerGenericService<Asset, AssetDTO, AssetToAssetDTOAssembler, AssetDTOToAssetAssembler>
    {
        public AssetDTOService(IGenericRepository<Asset> repository) : base(repository)
        {
        }

        public override void Insert(AssetDTO dto)
        {
            dto.Id = Guid.NewGuid();
            dto.CreatedOn = DateTime.Now;
            base.Insert(dto);
        }

        public override void Update(AssetDTO dto)
        {
            dto.CreatedOn = DateTime.Now;
            base.Update(dto);
        }
    }
}