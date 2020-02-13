export const calcCurrentPage = (currentListCount: number, itemsPerPage: number): number => (
    Number.isInteger(currentListCount / itemsPerPage) ? currentListCount / itemsPerPage
        : Math.floor(currentListCount / itemsPerPage) + 1);

export const hasMoreItems = (currentListCount: number, itemsPerPage: number, totalPageCount: number): boolean => {
    const currentPage = calcCurrentPage(currentListCount, itemsPerPage);
    return currentPage < totalPageCount;
};
