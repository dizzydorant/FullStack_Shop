import React from "react";
import { useGetProductsQuery } from "../services/api";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/slices/cartSlice";

export const HomePage: React.FC = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const dispatch = useAppDispatch();

  if (isLoading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>Загрузка...</div>
    );
  if (isError || !products) return <div>Ошибка загрузки сервера</div>;

  return (
    <div>
      <h1>Каталог товаров</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%" }}
            />
            <h3>{product.name}</h3>
            <p>{product.price} руб.</p>

            <button
              onClick={() => dispatch(addToCart(product))}
              style={{
                padding: "8px 16px",
                background: "#27ae60",
                color: "white",
                border: "none",
                cursor: "pointer",
                width: "100%",
              }}
            >
              В корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
