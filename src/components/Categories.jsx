const Categories = ({ value, setCategoryId, setCurrentPage }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетерианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onChangeCategory = (index) => {
    setCategoryId(index);
    setCurrentPage(1);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
