import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setCategoryId } from "../redux/slices/filterSlice";

const Categories = () => {
  const dispatch = useDispatch();
  const { categoryId } = useSelector((state) => state.filter);
  const categories = [
    "Все",
    "Мясные",
    "Вегетерианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={categoryId === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
