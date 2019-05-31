using System;
using System.Net;

namespace CRUD.Exceptions
{
    public class ServiceResourceException<T> : Exception, IServiceResourceException where T : new()
    {
        #region Constructors

        public ServiceResourceException(HttpStatusCode httpStatusCode, T details)
        {
            this.HttpStatusCode = httpStatusCode;
            this.Details = details;
        }

        #endregion

        #region Properties

        public HttpStatusCode HttpStatusCode { get; private set; }
        public T Details { get; private set; }

        HttpStatusCode IServiceResourceException.HttpStatusCode => this.HttpStatusCode;

        object IServiceResourceException.Details => this.Details;

        #endregion
    }
}
