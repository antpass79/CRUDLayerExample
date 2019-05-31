using CRUD.Assemblers;
using CRUD.Repositories;
using CRUD.Services;
using System;
using System.Collections.Generic;

namespace CRUD.Services
{
    public class ModelDTOAssemblerGenericService<TModel, TDTO, TModelToDTOAssembler> : GenericService<TModel, TDTO>
    where TModel : class
    where TDTO : class
    where TModelToDTOAssembler : IModelToDTO<TModel, TDTO>, new()
    {
        #region Constructors

        public ModelDTOAssemblerGenericService(IGenericRepository<TModel> repository)
            : base(repository)
        {
            this.ModelToDTOAssembler = new TModelToDTOAssembler();
        }

        #endregion

        #region Properties

        protected TModelToDTOAssembler ModelToDTOAssembler { get; private set; }

        #endregion

        #region Public Functions

        override public TDTO GetById(Guid id)
        {
            return ModelToDTOAssembler.ToDTO(this.Repository.GetById(id));
        }

        override public IEnumerable<TDTO> Get()
        {
            return ModelToDTOAssembler.ToDTO(this.Repository.Get());
        }

        public override void Insert(TDTO dto)
        {
            throw new NotImplementedException();
        }

        public override void Update(TDTO dto)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
