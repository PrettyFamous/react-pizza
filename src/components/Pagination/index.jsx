import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, setCurrentPage } from "../../redux/slices/filterSlice";
import { selectPizza } from "../../redux/slices/pizzaSlice";

import styles from "./Pagination.module.scss";

const Pagination = () => {
  const dispatch = useDispatch();
  const { itemsCount } = useSelector(selectPizza);
  const { itemsPerPage, currentPage } = useSelector(selectFilter);

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
