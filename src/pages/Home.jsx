import { useEffect, useState, useContext } from "react";
import { SearchContext } from "../App";

import Sort from "../components/Sort";
import Categories from "../components/Categories";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [orderDesc, setOrderDesc] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const { searchValue } = useContext(SearchContext);
  const itemsPerPage = 4;

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty;
    const order = orderDesc ? "desc" : "asc";
    const category = categoryId > 0 ? "&category=" + categoryId : "";
    const search = searchValue ? "&search=" + searchValue : "";

    fetch(
      `https://637e0893cfdbfd9a63a4e9c0.mockapi.io/items?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}&order=${order}${category}${search}`
    )
      .then((response) => response.json())
      .then((arr) => {
        setItems(arr.items);
        setItemCount(arr.count);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [currentPage, sortType, orderDesc, categoryId, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          setCategoryId={setCategoryId}
          setCurrentPage={setCurrentPage}
        />
        <Sort
          value={sortType}
          onChangeSort={setSortType}
          orderDesc={orderDesc}
          setOrderDesc={setOrderDesc}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <Pagination
        onChangePage={setCurrentPage}
        itemCount={itemCount}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Home;
