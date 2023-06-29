import React from "react";
import { Pagination } from "@mui/material";

const CustomPagination = ({ totalPages, setPageNumber }) => {
  const handlePageChange = (page) => {
    window.scroll(0, 0);
    setPageNumber(page * 2);
  };

  return (
    <Pagination
      count={isNaN(totalPages) ? 0 : Math.floor(totalPages / 2)}
      onChange={(e, page) => handlePageChange(page)}
      variant="outlined"
      shape="rounded"
      color="primary"
      sx={{
        "& .Mui-selected": {
          color: "red", // Change to your desired text color
        },
        "& .MuiPaginationItem-root": {
          color: "white", // Change to your desired text color
        },
      }}
    />
  );
};

export default CustomPagination;
