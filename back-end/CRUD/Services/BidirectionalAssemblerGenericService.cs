using CRUD.Assemblers;
using CRUD.Repositories;
using System;
using System.Collections.Generic;

namespace CRUD.Services
{
    public class BidirectionalAssemblerGenericService<TModel, TDTO, TModelToDTOAssembler, TDTOToModelAssembler> : GenericService<TModel, TDTO>
    where TModel : class
    where TDTO : class
    where TModelToDTOAssembler : IModelToDTO<TModel, TDTO>, new()
    where TDTOToModelAssembler : IDTOToModel<TDTO, TModel>, new()
    {
        #region Constructors

        public BidirectionalAssemblerGenericService(IGenericRepository<TModel> repository)
            : base(repository)
        {
            this.AutoSaveOnAction = true;

            DTOToModelAssembler = new TDTOToModelAssembler();
            ModelToDTOAssembler = new TModelToDTOAssembler();
        }

        #endregion

        #region Properties

        protected TDTOToModelAssembler DTOToModelAssembler { get; private set; }
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
