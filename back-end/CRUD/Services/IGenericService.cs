using System;
using System.Collections.Generic;

namespace CRUD.Services
{
    public interface IGenericService<TDTO>
    {
        #region Public Functions

        TDTO GetById(Guid id);

        IEnumerable<TDTO> Get();

        void Insert(TDTO dto);

        void Update(TDTO dto);

        void Delete(object id);

        #endregion
    }
}
