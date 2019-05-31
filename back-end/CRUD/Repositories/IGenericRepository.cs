using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace CRUD.Repositories
{
    public interface IGenericRepository<TModel> : IDisposable
    {
        IEnumerable<TModel> Get(
            Expression<Func<TModel, bool>> filter = null,
            Func<IQueryable<TModel>, IOrderedQueryable<TModel>> orderBy = null);

        TModel GetById(object id);

        void Insert(TModel entity);

        void Delete(object id);

        void Delete(TModel entityToDelete);

        void Update(TModel entityToUpdate);

        void Save();
    }
}
