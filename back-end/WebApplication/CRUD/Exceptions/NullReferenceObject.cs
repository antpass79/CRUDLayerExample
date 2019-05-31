using CRUD.Exceptions;

namespace Backend.CRUD.Exceptions
{
    public class NullReferenceObject : ExceptionDetailsMessage
    {
        public NullReferenceObject()
        {
        }

        public NullReferenceObject(string typeName)
            : base("Null reference object")
        {
            this.TypeName = TypeName;
        }

        public string TypeName { get; set; }

        public override string GetMessage()
        {
            return this.Message + " (type name: " + this.TypeName + ")";
        }
    }
}
