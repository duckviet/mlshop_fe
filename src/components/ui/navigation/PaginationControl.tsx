import React from "react";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  setPage: (page: number) => void;
}

const MAX_PAGE_BUTTONS = 5;
const MAX_LENGTH_COL = 9;

const PaginationControl: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  setPage,
}) => {
  const totalPages = Math.ceil(totalItems / MAX_LENGTH_COL);
  const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
  const adjustedStartPage = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = adjustedStartPage; i <= endPage; i++) {
      buttons.push(
        <div
          key={i}
          className={`rounded-md hover:bg-base-200 p-2 cursor-pointer  ${
            i === currentPage ? "bg-base-300 p-2" : ""
          }`}
          onClick={() => setPage(i)}
        >
          {i}
        </div>
      );
    }
    return buttons;
  };

  return (
    <div className="flex justify-between my-10">
      <p className="font-medium">Total: {totalItems}</p>
      <div className="flex gap-2 items-center  text-sm font-medium">
        <button
          className="  rounded-md hover:bg-base-200 p-2 cursor-pointer"
          onClick={() => setPage(1)}
          disabled={currentPage === 1}
        >
          «
        </button>

        {renderPageButtons()}

        <button
          className="  rounded-md hover:bg-base-200 p-2 cursor-pointer"
          onClick={() => setPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default PaginationControl;
