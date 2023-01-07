import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort, setOrder, selectFilter } from "../redux/slices/filterSlice";

type SortItem = {
  name: string;
  sortProperty: string;
};

export const sortList: SortItem[] = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

export const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const { sort, order } = useSelector(selectFilter);
  const [isVisible, setIsVisible] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const onClickListItem = (item: SortItem) => {
    dispatch(setSort(item));
    setIsVisible(false);
  };

  useEffect(() => {
    // @TODO Сделать нормальный тип
    const onClickOutOfSort = (event: any) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener("click", onClickOutOfSort);

    return () => document.body.removeEventListener("click", onClickOutOfSort);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        {order === "desc" ? (
          <svg
            onClick={() => dispatch(setOrder("acs"))}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0.625C10 0.455729 9.93815 0.309245 9.81445 0.185547C9.69075 0.0618491 9.54427 0 9.375 0H0.625C0.455729 0 0.309245 0.0618491 0.185547 0.185547C0.061849 0.309245 0 0.455729 0 0.625C0 0.794271 0.061849 0.940755 0.185547 1.06445L4.56055 5.43945C4.68424 5.56315 4.83073 5.625 5 5.625C5.16927 5.625 5.31576 5.56315 5.43945 5.43945L9.81445 1.06445C9.93815 0.940755 10 0.794271 10 0.625Z"
              fill="#2C2C2C"
            />
          </svg>
        ) : (
          <svg
            onClick={() => dispatch(setOrder("desc"))}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            ></path>
          </svg>
        )}

        <b
          onClick={() => dispatch(setOrder(order === "desc" ? "asc" : "desc"))}
        >
          Сортировка по:
        </b>
        <span onClick={() => setIsVisible(!isVisible)}>{sort.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortList.map((item, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(item)}
                className={sort.sortProperty === index ? "active" : ""}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
