import { useEffect, useState, useContext } from "react";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setItemsCount } from "../redux/slices/filterSlice";
import axios from "axios";

import Sort from "../components/Sort";
import Categories from "../components/Categories";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, orderDesc, itemsPerPage, currentPage } =
    useSelector((state) => state.filter);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    setIsLoading(true);

    const sortType = sort.sortProperty;
    const order = orderDesc ? "desc" : "asc";
    const category = categoryId > 0 ? "&category=" + categoryId : "";
    const search = searchValue ? "&search=" + searchValue : "";

    axios
      .get(
        `https://637e0893cfdbfd9a63a4e9c0.mockapi.io/items?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortType}&order=${order}${category}${search}`
      )
      .then((res) => {
        setItems(res.data.items);
        dispatch(setItemsCount(res.data.count));
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [currentPage, sort, orderDesc, categoryId, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
