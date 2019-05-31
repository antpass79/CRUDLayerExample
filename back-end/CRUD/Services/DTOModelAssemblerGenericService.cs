using CRUD.Assemblers;
using CRUD.Repositories;
using CRUD.Services;
using System;
using System.Collections.Generic;

namespace CRUD.Services
{
    public class DTOModelAssemblerGenericService<TModel, TDTO, TDTOToModelAssembler> : GenericService<TModel, TDTO>
    where TModel : class
    where TDTO : class
    where TDTOToModelAssembler : IDTOToModel<TDTO, TModel>, new()
    {
        #region Constructors

        public DTOModelAssemblerGenericService(IGenericRepository<TModel> repository)
            : base(repository)
        {
            this.DTOToModelAssembler = new TDTOToModelAssembler();
        }

        #endregion

        #region Properties

        protected TDTOToModelAssembler DTOToModelAssembler { get; private set; }

        #endregion

        #region Public Functions

        override public TDTO GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        override public IEnumerable<TDTO> Get()
        {
            throw new NotImplementedException();
        }

        public override void Insert(TDTO dto)
        {
            var model = DTOToModelAssembler.ToModel(dto);
            this.Repository.Insert(model);

            if (AutoSaveOnAction)
                this.Repository.Save();
        }

        public override void Update(TDTO dto)
        {
            var model = DTOToModelAssembler.ToModel(dto);
            this.Repository.Update(model);

            if (AutoSaveOnAction)
                this.Repository.Save();
        }

        #endregion
    }
}
