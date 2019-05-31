using System.Collections.Generic;

namespace CRUD.Assemblers
{
    public interface IModelToDTO<TModel, TDTO>
        where TModel : class
        where TDTO : class
    {
        IEnumerable<TDTO> ToDTO(IEnumerable<TModel> models);
        TDTO ToDTO(TModel model);
    }
}
