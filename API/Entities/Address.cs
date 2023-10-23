namespace API.Entities
{
    public class Address
    {
        public string FullName { get; set; }
        public string MainAddress { get; set; }
        public string OptionalAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
    }
}