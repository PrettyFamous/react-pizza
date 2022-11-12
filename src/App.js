import Header from "./components/Header";
import Sort from "./components/Sort";
import Categories from "./components/Categories";
import PizzaBlock from "./components/PizzaBlock";
import Pagination from "./components/Pagination";

import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <PizzaBlock title={"Маргарита"} price={450} />
            <PizzaBlock title={"Мексиканская"} price={550} />
            <PizzaBlock title={"Сырная"} price={400} />
            <PizzaBlock title={"Карбонара"} price={450} />
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default App;
