import { Link } from "react-router-dom";
import emptyPng from "../../assets/img/empty-cart.png";

import "./CartEmpty.scss";

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <p>
        Похоже вы ещё не заказывали пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={emptyPng} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
