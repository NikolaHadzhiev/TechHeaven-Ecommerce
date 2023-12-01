import { Box, Typography, Pagination } from "@mui/material";
import { Pagination as PaginationInterface } from "../interfaces/pagination";
import { useState } from "react";
import "./AppPagination.scss"

interface Props {
    pagination: PaginationInterface,
    onPageChange: (page: number) => void;
}

export default function AppPagination({ pagination, onPageChange }: Props) {
    const { pageSize, currentPage, totalCount, totalPages } = pagination;
    const [pageNumber, setPageNumber] = useState(currentPage);

    function handlePageChange(page: number) {
        setPageNumber(page);
        onPageChange(page);
    }

    return (
        <Box className="app-pagination">
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
                page={pageNumber}
                onChange={(e, page) => handlePageChange(page)}
            />
        </Box>
    )
}