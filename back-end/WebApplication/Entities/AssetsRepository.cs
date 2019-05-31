using Backend.CRUD.Repositories;
using System.Data.Entity;

namespace Backend.Entities
{
    public class AssetsRepository : GenericRepository<AssetsContext, Asset>
    {
        protected override DbSet<Asset> GetDbSet()
        {
            return this.Context.Assets;
        }
    }
}