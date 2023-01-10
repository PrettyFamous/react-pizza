import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSort,
  setOrder,
  selectFilter,
  SortItem,
  SortProperty,
  Order,
} from "../../redux/slices/filterSlice";

import arrowSvg from "../../assets/img/arrow-top.svg";

import "./Sort.scss";

export const sortList: SortItem[] = [
  { name: "популярности", sortProperty: SortProperty.RATING },
  { name: "цене", sortProperty: SortProperty.PRICE },
  { name: "алфавиту", sortProperty: SortProperty.TITLE },
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
    const onClickOutOfSort = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
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
          <img
            className="arrow--reverted"
            src={arrowSvg}
            onClick={() => dispatch(setOrder(Order.ASCENTIC))}
          />
        ) : (
          <img
            src={arrowSvg}
            onClick={() => dispatch(setOrder(Order.DESCENDING))}
          />
        )}

        <b
          onClick={() =>
            dispatch(
              setOrder(
                order === Order.DESCENDING ? Order.ASCENTIC : Order.DESCENDING
              )
            )
          }
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
                className={
                  sort.sortProperty === sortList[index].sortProperty
                    ? "active"
                    : ""
                }
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
