import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

const Pagination = ({ onChangePage, itemCount }) => {
  console.log("count" + itemCount);
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={Math.ceil(itemCount / 8)}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
