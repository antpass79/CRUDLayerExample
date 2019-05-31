using CRUD.Repositories;
using System;
using System.Collections.Generic;

namespace CRUD.Services
{
    public abstract class GenericService<TModel, TDTO> : IGenericService<TDTO>
        where TModel : class
        where TDTO : class
    {
        #region Constructors

        public GenericService(IGenericRepository<TModel> repository)
        {
            _repository = repository;

            this.AutoSaveOnAction = true;
        }

        #endregion

        #region Properties

        protected bool AutoSaveOnAction { get; set; }

        private IGenericRepository<TModel> _repository;
        protected IGenericRepository<TModel> Repository
        {
            get
            {
                return _repository;
            }
        }

        #endregion

        #region Public Functions

        abstract public TDTO GetById(Guid id);

        abstract public IEnumerable<TDTO> Get();

        abstract public void Insert(TDTO dto);

        abstract public void Update(TDTO dto);

        virtual public void Delete(object id)
        {
            _repository.Delete(id);

            if (AutoSaveOnAction)
                _repository.Save();
        }

        virtual public void Delete(TModel model)
        {
            _repository.Delete(model);

            if (AutoSaveOnAction)
                _repository.Save();
        }

        #endregion
    }
}
