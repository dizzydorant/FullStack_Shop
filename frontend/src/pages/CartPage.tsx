import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

export const CartPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Ваша корзина пуста 🛒</h2>
        <p>Самое время добавить в неё что-нибудь интересное!</p>
        <Link to="/" style={{ color: "#27ae60", fontWeight: "bold" }}>
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Оформление заказа</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{ width: "60px", height: "60px" }}
              />
              <div>
                <h3 style={{ margin: 0 }}>{item.product.name}</h3>
                <p style={{ margin: "5px 0 0 0", color: "#666" }}>
                  {item.product.price} руб. / шт.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      productId: item.product.id,
                      quantity: item.quantity - 1,
                    }),
                  )
                }
                disabled={item.quantity <= 1}
                style={{ padding: "5px 10px", cursor: "pointer" }}
              >
                -
              </button>
              <span
                style={{
                  fontWeight: "bold",
                  width: "20px",
                  textAlign: "center",
                }}
              >
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      productId: item.product.id,
                      quantity: item.quantity + 1,
                    }),
                  )
                }
                style={{ padding: "5px 10px", cursor: "pointer" }}
              >
                +
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <span style={{ fontWeight: "bold" }}>
                {item.product.price * item.quantity} руб.
              </span>
              <button
                onClick={() => dispatch(removeFromCart(item.product.id))}
                style={{
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#f9f9f9",
          borderRadius: "8px",
          textAlign: "right",
        }}
      >
        <h2>
          Итого: <span style={{ color: "#27ae60" }}>{totalPrice} руб.</span>
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "15px",
            marginTop: "15px",
          }}
        >
          <button
            onClick={() => dispatch(clearCart())}
            style={{
              background: "#95a5a6",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Очистить корзину
          </button>
          <button
            style={{
              background: "#27ae60",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => alert("Интеграция оформления заказа будет далее!")}
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};
