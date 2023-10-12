import { Box, Typography, Pagination } from "@mui/material";
import { Pagination as PaginationInterface } from "../interfaces/pagination";


interface Props {
    pagination: PaginationInterface,
    onPageChange: (page: number) => void;
}

export default function AppPagination({ pagination, onPageChange }: Props) {
    const { pageSize, currentPage, totalCount, totalPages } = pagination;
    return (
        <Box display='flex' justifyContent='space-between' alignItems='baseline'>
            <Typography>
                Displaying {(currentPage - 1) * pageSize + 1}-
                {currentPage * pageSize > totalCount!
                    ? totalCount
                    : currentPage * pageSize
                } of {totalCount} results
            </Typography>
            <Pagination
                color='primary'
                size='large'
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => onPageChange(page)}
            />
        </Box>
    )
}