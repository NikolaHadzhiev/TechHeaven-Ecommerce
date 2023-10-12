using System.Text.Json;
using API.RequestHelpers;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void PaginationHeader(this IHeaderDictionary responseHeaders, PaginationMetaData paginationMetaData)
        {
            var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

            responseHeaders.Add("Pagination-Info", JsonSerializer.Serialize(paginationMetaData, options));
            responseHeaders.Add("Access-Control-Expose-Headers", "Pagination-Info"); //to make PaginationInfo header available on client
        }
    }
}