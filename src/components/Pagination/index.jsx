import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

const Pagination = ({ onChangePage, itemCount, itemsPerPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={itemsPerPage}
      pageCount={Math.ceil(itemCount / itemsPerPage)}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
