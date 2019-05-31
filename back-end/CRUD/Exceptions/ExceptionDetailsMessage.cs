namespace CRUD.Exceptions
{
    public abstract class ExceptionDetailsMessage : IExceptionDetailsMessage
    {
        public string Message { get; private set; }

        protected ExceptionDetailsMessage()
        {
        }

        protected ExceptionDetailsMessage(string message)
        {
            this.Message = message;
        }

        virtual public string GetMessage()
        {
            return this.Message;
        }
    }
}
