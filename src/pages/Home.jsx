import { setItemsCount, setFilters } from "../redux/slices/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import qs from "qs";

import Sort, { sortList } from "../components/Sort";
import Categories, { categoriesList } from "../components/Categories";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, order, itemsPerPage, currentPage, searchValue } =
    useSelector((state) => state.filter);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [querryString, setQuerryString] = useState("");

  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(`https://637e0893cfdbfd9a63a4e9c0.mockapi.io/items${querryString}`)
      .then((res) => {
        setItems(res.data.items);

        dispatch(setItemsCount(res.data.count));
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isMounted.current) {
      const querryObject = {
        page: currentPage,
        limit: itemsPerPage,

        sortBy: sort.sortProperty,
        order,
      };

      if (categoryId > 0) {
        querryObject["category"] = categoryId;
      }

      if (searchValue) {
        querryObject["search"] = searchValue;
      }

      const querry = `?${qs.stringify(querryObject)}`;
      setQuerryString(querry);
      navigate(querry);
    }

    isMounted.current = true;
  }, [currentPage, itemsPerPage, sort, order, categoryId, searchValue]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((item) => item.sortProperty === params.sortBy);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [querryString]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">{categoriesList[categoryId]} пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
