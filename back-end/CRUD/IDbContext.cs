using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace CRUD
{
    public interface IDbContext<T> where T : class
    {
        T Find(params object[] keyValues);
        IEnumerable<T> Find(Expression<Func<T, bool>> filter);
        void Insert(T model);
        void Update(T model);
        void Delete(T model);
        int Save();
        void Dispose();
    }
}
