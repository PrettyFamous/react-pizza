import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";

import styles from "./Pagination.module.scss";

const Pagination = () => {
  const dispatch = useDispatch();
  const { itemsCount } = useSelector((state) => state.pizza);
  const { itemsPerPage, currentPage } = useSelector((state) => state.filter);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={itemsPerPage}
      pageCount={Math.ceil(itemsCount / itemsPerPage)}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
