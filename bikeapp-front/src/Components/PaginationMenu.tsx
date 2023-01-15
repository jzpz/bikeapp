import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { PaginationMenuProps } from '../Types/App';

const PaginationMenu = ({handlePageSwitch, currentPage}: PaginationMenuProps) => (
    <Pagination
        data-cy="pagination-menu"
        className="pagination-menu"
    >
        <Pagination.Prev 
            onClick={() => handlePageSwitch(currentPage - 1)} 
            data-cy="pagination-prev"
        />
        {currentPage > 1 &&
            <Pagination.Item 
                onClick={() => handlePageSwitch(currentPage - 2)}
                data-cy="pagination-minus-2"
            >
                {currentPage - 2}
            </Pagination.Item>
        }
        {currentPage > 0 &&
            <Pagination.Item 
                onClick={() => handlePageSwitch(currentPage - 1)}
                data-cy="pagination-minus-1"
            >
                {currentPage - 1}
            </Pagination.Item>
        }
        <Pagination.Item 
            active
            data-cy="pagination-current"
        >
            {currentPage}
        </Pagination.Item>
        <Pagination.Item 
            onClick={() => handlePageSwitch(currentPage + 1)}
            data-cy="pagination-plus-1"
        >
            {currentPage + 1}
        </Pagination.Item>
        <Pagination.Item 
            onClick={() => handlePageSwitch(currentPage + 2)}
            data-cy="pagination-plus-2"
        >
            {currentPage + 2}
        </Pagination.Item>
        <Pagination.Next 
            onClick={() => handlePageSwitch(currentPage + 1)} 
            data-cy="pagination-next"
        />
    </Pagination>
)

export default PaginationMenu;