
import { useEffect, useState } from "react";
import styles from "./App.module.css";
import api from './api'; 

interface Product {
  id: number;
  title: string;
  price: number;
  img: string;
  description: string;
  category: string;
  is_available: string;
}

interface Movie {
  id: number;
  title: string;
  genre: string;
  description: string;
  age_rating: number;
  year: number;
  duration: string;
}

function App() {
  // Данные
  const [product, setProduct] = useState<Product[]>([]);
  const [movies, setMovie] = useState<Movie[]>([]);

  // Состояние заметок
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("")
  const [description, setDescription] = useState("")
  const [age_rating, setAge_Rating] = useState<number | string>()
  const [year, setYear] = useState<number | string>()
  const [seat, setSeat] = useState<number | string>()
  const [row, setRow] = useState<number | string>()
  const [name, setName] = useState("")

  // Состояния фильтров
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [ordering, setOrdering] = useState("");

  // Загрузка товаров с учетом фильтров
  const loadProducts = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (minPrice) params.set("min_price", minPrice);
    if (maxPrice) params.set("max_price", maxPrice);
    if (ordering) params.set("ordering", ordering);

api.get<Product[]>(`/product/?${params.toString()}`)

      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке товаров:", error);
      });
  };

  // Сброс фильтров
  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setOrdering("");
    
    // Перезагрузка списка без параметров
    api.get<Product[]>('/product/')
      .then((response) => {
        setProduct(response.data);
      });
  };

  // Создание заметки
  const createMovie = () => {
    if (!title || !genre || !year) return;
    api.post("/movies/", {
      title: title,
      genre: genre,
      duration: duration,
      age_rating: Number(age_rating),
      description: description,
      year: Number(year),
    }).then(() => {
      setTitle("");
      setGenre("");
      setYear("");
      setAge_Rating("");
      setDescription("");
      setDuration("");
      
      // Перезагрузка заметок после создания
      api.get<Movie[]>('/movies/').then((res) => setMovie(res.data));
    });
  };

  // Первоначальная загрузка
  useEffect(() => {
    loadProducts();

    api.get<Movie[]>('/movies/')
      .then((response) => {
        setMovie(response.data);
      });
  }, []);

  return (
    <>
      <div>
        <section className={styles.crd}>
          <h1 className={styles.title}>Главная</h1>
        </section>

        {/* Панель фильтров */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input className={styles.cgr}
            type="text"
            placeholder="Поиск товара"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          /> 

          <select className={styles.cgr}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Все категории</option>
            <option value="electronics">Электроника</option>
            <option value="shoes">Обувь</option>
            <option value="toy">Игрушки</option>
          </select>

          <input className={styles.cgr}
            type="number"
            placeholder="Цена от"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
          />

          <input className={styles.cgr}
            type="number"
            placeholder="Цена до"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />

          <select className={styles.cgr}
            value={ordering}
            onChange={(event) => setOrdering(event.target.value)}
          >
            <option value="">Без сортировки</option>
            <option value="price">Цена ↑</option>
            <option value="-price">Цена ↓</option>
            <option value="title">Название ↑</option>
            <option value="-title">Название ↓</option>
          </select>

          <button className={styles.cgr} onClick={loadProducts}>Применить фильтры</button>
          <button className={styles.cgr} onClick={resetFilters}>Сбросить</button>
        </div>


{/* Список товаров */}
        <section className={styles.card}>
          {product.length === 0 ? (
            <p>Товары не найдены</p>
          ) : (
            product.map((item) => (
              <div key={item.id}>
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.text}>Описание:{item.description}</p>
                <p className={styles.text}>Цена: {item.price} ₸</p>
                <img className={styles.cgr} src={item.img.startsWith('http') ? item.img : `http://127.0.0.1:8000${item.img}`} alt={item.title} />
                <p className={styles.text}>Категория: {item.category}</p>
                <p className={styles.text}>Доступность: {item.is_available}</p>
              </div>
            ))
          )}
        </section>

        {/* Блок заметок */}
        {/* <div>
          <section className={styles.crrd}>
            <h1 className={styles.title}>Фильмы</h1>
          </section>
          
          <section className={styles.carrd}>
            {movies.map((movie) => (
              <div key={movie.id}>
                <h2 className={styles.title}>{movie.title}</h2>
                <p className={styles.text}>Жанр - {movie.genre}</p>
                <p className={styles.text}>Год выпуска - {movie.year}</p>
                <p className={styles.text}>Описание - {movie.description}</p>
                <p className={styles.text}>Длителность - {movie.duration}</p>
                <p className={styles.text}>Возростной порог - {movie.age_rating}</p>
              </div>
            ))}
          <div> */}
            {/* <textarea className={styles.cgr}
              placeholder="Выбор фильма"
              value={name}
              onChange={(event) => setName(event.target.value)}
            /> */}

          {/* <select className={styles.cgr}
            value={name}
            onChange={(event) => setName(event.target.value)}
          >
            <option value="">Выбор фильмы</option>
            <option value="Интерстеллар">Интерстеллар</option>
            <option value="Аватар">Аватар</option>
            <option value="Терминатор">Терминатор</option>
          </select>

          <select className={styles.cgr}
            value={seat}
            onChange={(event) => setSeat(event.target.value)}
          >
            <option value="">Выбор места</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          
          <select className={styles.cgr}
            value={row}
            onChange={(event) => setRow(event.target.value)}
          >
            <option value="">Выбор ряда</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select> */}
            {/* <textarea className={styles.cgr}
              placeholder="Выбор места"
              value={seat}
              onChange={(event) => setSeat(event.target.value)}
            />
            <textarea className={styles.cgr}
              placeholder="Ряд места"
              value={row}
              onChange={(event) => setRow(event.target.value)}
            /> */}
            {/* <button className={styles.cgr} onClick={createMovie}>Купить билет на фильм</button> */}
          </div>
      </>
  );
}

export default App;