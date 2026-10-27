import React, { useState } from "react";
import { useLoginMutation } from "../services/api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCredentials } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => !!state.auth.token);

  const [login, { isLoading }] = useLoginMutation();

  if (isAuth) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Вы уже вошли в систему</h2>
        <Link to="/" style={{ color: "#27ae60" }}>
          Перейти на главную
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      const userData = await login({ email, password }).unwrap();

      dispatch(setCredentials(userData));

      navigate("/");
    } catch (err: any) {
      if (err?.data?.message) {
        setErrorMsg(err.data.message);
      } else {
        setErrorMsg("Не удалось связаться с сервером. Попробуйте позже.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Авторизация</h2>

      {errorMsg && (
        <div
          style={{
            padding: "10px",
            background: "#fce4e4",
            border: "1px solid #fcc2c2",
            color: "#cc0000",
            borderRadius: "4px",
            marginBottom: "15px",
            fontSize: "0.9rem",
          }}
        >
          {errorMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@mail.com"
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
            Пароль:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "10px",
            background: isLoading ? "#bdc3c7" : "#2c3e50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: isLoading ? "not-allowed" : "pointer",
            marginTop: "10px",
          }}
        >
          {isLoading ? "Вход..." : "Войти"}
        </button>
      </form>

      <p
        style={{
          fontSize: "0.8rem",
          color: "#666",
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        Данные для теста:
        <br /> <b>test@example.com</b> / <b>password123</b>
      </p>
    </div>
  );
};
