using CRUD.Exceptions;

namespace Backend.CRUD.Exceptions
{
    public class TooMuchResults : ExceptionDetailsMessage
    {
        public TooMuchResults()
        {
        }

        public TooMuchResults(int count, int limit)
            : base("Too much results")
        {
            this.Count = count;
            this.Limit = limit;
        }

        public int Count { get; set; }
        public int Limit { get; set; }

        public override string GetMessage()
        {
            return this.Message + " (count: " + this.Count + ", limit: " + this.Limit + ")";
        }
    }
}
