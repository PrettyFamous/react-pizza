import { Link } from "react-router-dom";
import emptySvg from "../assets/img/empty-cart.png";

const CartEmpty = () => {
  return (
    <div class="cart cart--empty">
      <p>
        Похоже вы ещё не заказывали пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={emptySvg} alt="Empty cart" />
      <Link to="/" class="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
