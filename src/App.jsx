import { useEffect, useState } from "react";

function App() {
  const apiKey = "c36ea98c4b9d4fafc3a5c0c015475a9e";
  const movie = "nemo";
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
        console.log(result.results)
      } catch (err) {
        console.error(err.message); // Manejo de errores
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchData(); // Llama a la función de fetch
  }, [apiKey, movie]); // Se ejecuta cuando `movie` o `apiKey` cambian

  if (loading) {
    return <p>Cargando...</p>; // Indicación de estado de carga
  }

  if (data.length === 0) {
    return <p>No se encontraron resultados.</p>; // Si no hay datos
  }

  return (
    <>
      {data.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
        </div>
      ))}
    </>
  );
}

export default App;
