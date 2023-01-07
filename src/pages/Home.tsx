import { selectFilter, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizza } from "../redux/slices/pizzaSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import qs from "qs";

import Sort, { sortList } from "../components/Sort";
import Categories, { categoriesList } from "../components/Categories";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status } = useSelector(selectPizza);
  const { categoryId, sort, order, itemsPerPage, currentPage, searchValue } =
    useSelector(selectFilter);

  const [querryString, setQuerryString] = useState("");

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((item) => item.sortProperty === params.sortBy);
      dispatch(setFilters({ ...params, sort }));
    }
  }, []);

  useEffect(() => {
    const querryObject = {
      page: currentPage,
      limit: itemsPerPage,
      sortBy: sort.sortProperty,
      order,
      category: null,
      search: null,
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
  }, [currentPage, itemsPerPage, sort, order, categoryId, searchValue]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (querryString) {
      // @ts-ignore
      dispatch(fetchPizzas(querryString));
    }
  }, [querryString]);

  // @TODO Поменять тип с any на нормальный
  const pizzas = items.map((item: any) => (
    <PizzaBlock key={item.id} {...item} />
  ));
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">{categoriesList[categoryId]} пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😒</h2>
          <p>
            К сожалению, пиццы получить не удалось. <br /> Попробуйте повторить
            попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
