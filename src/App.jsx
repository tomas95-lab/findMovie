import { useEffect, useState } from "react";

function App() {
  const apiKey = "c36ea98c4b9d4fafc3a5c0c015475a9e";
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [daylie, setDaylie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const result = await response.json();
        setData(result.results); // Guarda el arreglo de resultados
        console.log(result.results);
      } catch (err) {
        console.error(err.message); // Manejo de errores
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchData(); // Llama a la función de fetch
  }, [apiKey, movie]); // Se ejecuta cuando `movie` o `apiKey` cambian


  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzZlYTk4YzRiOWQ0ZmFmYzNhNWMwYzAxNTQ3NWE5ZSIsInN1YiI6IjY2MmVkZTBmNTExZDA5MDEyN2M1NGQwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I0gqlliYa5uiLTt8clkjokjZnNySE-UHewnbSw_4N0I",
    },
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?language=en-US`,options
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        
        const result = await response.json();
        setDaylie(result.results); // Guarda el arreglo de resultados
      } catch (err) {
        console.error(err.message); // Manejo de errores
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };
    fetchData(); // Llama a la función de fetch
  },[]); // Se ejecuta cuando `movie` o `apiKey` cambian

  function movieName(event) {
    let movieName = event.target.value;
    setMovie(movieName);
  }
  return (
    <main className="p-8 w-screen h-screen">
      <header className="relative w-full">
        {" "}
        {/* Cambiar de w-100 a w-full para asegurarte de que ocupe todo el ancho */}
        <form className="max-w-md mx-auto">
          {" "}
          {/* mx-auto asegura que el formulario esté centrado horizontalmente */}
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onInput={movieName}
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm rounded-lg bg-[#2A2A2C] border-gray-600 placeholder-gray-400 dark:text-white outline-none"
              placeholder="Search Mockups, Logos..."
              required
            />
          </div>
        </form>
        {/* Contenedor de resultados de películas centrado */}
        <div
          className={`${
            data.length === 0 ? "hidden" : ""
          } absolute p-4 mt-2 max-h-[300px] overflow-auto bg-[#19191B] rounded-lg max-w-md shadow-lg flex flex-col gap-4`}
          style={{
            left: "50%", // Centra horizontalmente
            transform: "translateX(-50%)", // Ajusta para que el centro del div quede en el centro del contenedor
          }}>
          {data.map((movie) => (
            <div key={movie.id} className="flex gap-4">
              <picture className="flex justify-start">
                <img
                  loading="lazy"
                  className="max-w-[5.4375rem] rounded-sm"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                />
              </picture>
              <div className="flex flex-col justify-center">
                <h3 className="text-[#EEEEF0] text-xl">{movie.title}</h3>
                <span className="text-[#fd0]">
                  <i className="fa-solid fa-star"></i>
                  {Math.floor(movie.vote_average)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </header>

      <article className="p-8">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-[#f3f3f3] md:text-5xl lg:text-6xl ">
          Top Trending Movies
        </h1>
        <div className=" flex justify-around gap-5 max-w-screen overflow-auto items-cemter p-4">
          {daylie.map((movieDay) => {
            return (
              <div className="titulo">
                <picture className="flex justify-start">
                  <img
                    loading="lazy"
                    className="max-w-[7.4375rem] rounded-sm"
                    src={`https://image.tmdb.org/t/p/original${movieDay.poster_path}`}
                    alt={`${movieDay.title} poster`}
                  />
                </picture>{" "}
                <h1 className="text-white">
                  {" "}
                  {movieDay.original_name
                    ? movieDay.original_name
                    : movieDay.title}
                </h1>
              </div>
            );
          })}
        </div>
      </article>
    </main>
  );
}

export default App;
