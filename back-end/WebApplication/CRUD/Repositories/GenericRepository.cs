using CRUD.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace Backend.CRUD.Repositories
{
    public class GenericRepository<TContext, TModel> :
        IGenericRepository<TModel> where TModel : class where TContext : DbContext, new()
    {

        private bool _disposed = false;

        private TContext _entities = new TContext();
        public TContext Context
        {
            get { return _entities; }
            set { _entities = value; }
        }

        public virtual IQueryable<TModel> GetAll()
        {
            IQueryable<TModel> query = this.GetDbSet();
            return query;
        }

        public IEnumerable<TModel> Get(
            Expression<Func<TModel, bool>> filter = null,
            Func<IQueryable<TModel>, IOrderedQueryable<TModel>> orderBy = null)
        {
            IQueryable<TModel> query = this.GetDbSet().AsQueryable();

            if (filter != null)
                query = query.Where(filter);

            if (orderBy != null)
                return orderBy(query).ToList();

            return query.ToList();
        }

        public virtual TModel GetById(object id)
        {
            return this.GetDbSet().Find(id);
        }

        public virtual void Insert(TModel entity)
        {
            this.GetDbSet().Add(entity);
        }

        public virtual void Delete(object id)
        {
            var entity = this.GetById(id);
            this.Delete(entity);
        }

        public virtual void Delete(TModel entity)
        {
            this.GetDbSet().Remove(entity);
        }

        virtual protected DbSet<TModel> GetDbSet()
        {
            return this._entities.Set<TModel>();
        }

        public virtual void Update(TModel entity)
        {
            _entities.Entry(entity).State = System.Data.Entity.EntityState.Modified;
        }

        public virtual void Save()
        {
            _entities.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    DisposeContext();
                }
            }
            this._disposed = true;
        }

        protected virtual void DisposeContext()
        {
            _entities.Dispose();
        }
    }
}
