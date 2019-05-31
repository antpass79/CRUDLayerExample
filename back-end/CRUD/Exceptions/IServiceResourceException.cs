using System.Net;

namespace CRUD.Exceptions
{
    public interface IServiceResourceException
    {
        HttpStatusCode HttpStatusCode { get; }
        object Details { get; }
    }
}
