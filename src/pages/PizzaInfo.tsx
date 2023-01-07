import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PizzaInfo: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://637e0893cfdbfd9a63a4e9c0.mockapi.io/items/" + id)
      .then((response) => setPizza(response.data.items))
      .catch((error) => {
        alert("Ошибка при полукчении пиццы!");
        navigate("/");
      });
  }, []);

  if (!pizza) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl}></img>
      <h2>{pizza.title}</h2>
      <p>{pizza.price}</p>
    </div>
  );
};

export default PizzaInfo;
