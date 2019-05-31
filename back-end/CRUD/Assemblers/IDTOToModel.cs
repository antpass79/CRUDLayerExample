using System.Collections.Generic;

namespace CRUD.Assemblers
{
    public interface IDTOToModel<TDTO, TModel>
        where TDTO : class
        where TModel : class
    {
        IEnumerable<TModel> ToModel(IEnumerable<TDTO> dtos);
        TModel ToModel(TDTO dto);

        TModel CopyToModel(TDTO dto, TModel model);
    }
}
