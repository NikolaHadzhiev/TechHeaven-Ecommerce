using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{
    public class PagedList<T> : List<T>
    {
        public PagedList(List<T> items, int count, int currentPageNumber, int pageSize)
        {
            PaginationMetaData = new PaginationMetaData
            {
                TotalCount = count,
                CurrentPage = currentPageNumber,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize)
            };
            AddRange(items);
        }

        public PaginationMetaData PaginationMetaData { get; set; }

        public static async Task<PagedList<T>> ToPagedListAsync(IQueryable<T> query, int currentPageNumber, int pageSize)
        {
            var count = await query.CountAsync();
            var items = await query.Skip((currentPageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, count, currentPageNumber, pageSize);
        }
    }
}