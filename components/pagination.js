import React from 'react';
import {ArrowLeft, DoubleArrowLeft, DoubleArrowRight} from './Icon';

const Pagination = ({
    currentPage,
    itemsPerPage,
    totalItems,
    onPageChange,
    displayPageCount,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);

    let visiblePages = pageNumbers.slice(0, displayPageCount);

    if (currentPage > Math.floor(displayPageCount / 2)) {
        const startIndex = currentPage - Math.floor(displayPageCount / 2) - 1;
        visiblePages = pageNumbers.slice(
            startIndex,
            startIndex + displayPageCount
        );
    }

    return (
        <div className="flex justify-center items-center gap-2">
            <button
                className={
                    currentPage === 1
                        ? 'hidden'
                        : 'bg-white dark:bg-gray-700 shadow rounded-md px-4 text-center'
                }
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <ArrowLeft />
            </button>
            <button
                onClick={() => onPageChange(1)}
                className="bg-white dark:bg-gray-700 shadow rounded-md px-4 "
            >
                <DoubleArrowLeft />
            </button>

            {visiblePages.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={`shadow rounded-md px-4 py-2 ${
                        currentPage === pageNumber
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-500 text-black'
                    }`}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                className={
                    currentPage === totalPages
                        ? 'hidden'
                        : 'bg-white dark:bg-gray-700 shadow rounded-md px-4 text-center'
                }
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <DoubleArrowRight />
            </button>
        </div>
    );
};

export default Pagination;
