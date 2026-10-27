const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_123";

app.use(cors());

app.use(express.json());

const PRODUCTS = [
  {
    id: 1,
    name: "Беспроводные наушники",
    price: 4990,
    image: "https://placeholder.com",
  },
  { id: 2, name: "Смарт-часы", price: 8990, image: "https://placeholder.com" },
  {
    id: 3,
    name: "Механическая клавиатура",
    price: 5500,
    image: "https://placeholder.com",
  },
];

const USERS = [
  {
    id: 1,
    email: "test@example.com",
    password: "password123",
    name: "Иван Иванов",
  },
];

//Ручка гет запроса продкутов
app.get("/api/products", (req, res) => {
  res.json(PRODUCTS);
});

//авторизация
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = USERS.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Неверный email или пароль" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
});

// Middleware для защиты маршрутов (Проверка токена)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Доступ запрещен. Токен отсутствует." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Невалидный или просроченный токен." });
    }
    req.user = user;
    next();
  });
};

// ручка профиля пользователя
app.get("/api/auth/me", authenticateToken, (req, res) => {
  const user = USERS.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "Пользователь не найден" });

  res.json({ id: user.id, email: user.email, name: user.name });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}`);
});
