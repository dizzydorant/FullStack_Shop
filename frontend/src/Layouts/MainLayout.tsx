import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useGetMeQuery } from "../services/api";
import { setCredentials, logOut } from "../store/slices/authSlice";

export const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user, token } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { data: userData, isError } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (userData && token) {
      dispatch(setCredentials({ user: userData, token }));
    }
  }, [userData, token, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(logOut());
    }
  }, [isError, dispatch]);

  return (
    <div>
      <header
        style={{ padding: "15px", background: "#2c3e50", color: "white" }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Link
              to="/"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Главная
            </Link>

            {user ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <span style={{ color: "#2ecc71", fontSize: "0.9rem" }}>
                  👋 Привет, {user.name}!
                </span>
                <button
                  onClick={() => dispatch(logOut())}
                  style={{
                    background: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Выйти
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Войти
              </Link>
            )}
          </div>

          <Link
            to="/cart"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            🛒 Корзина:{" "}
            <span
              style={{
                background: "#e74c3c",
                padding: "2px 8px",
                borderRadius: "10px",
              }}
            >
              {totalCount}
            </span>
          </Link>
        </nav>
      </header>

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};
