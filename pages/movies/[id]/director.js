import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(
    () => id ? `/api/directors/${id}` : null,
    fetcher
  );

  
  if (!data) return <div>Loading...</div>;

  const { director, movies } = data;
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      backgroundColor: '#e6f0ff',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ textAlign: 'center', color: '#1e40af' }}>🎬 Director: {director.name}</h1>
      
      <p style={{ marginTop: '1rem' }}>
        <strong>📝 Biography:</strong> {director.biography}
      </p>
  
      <h2 style={{ marginTop: '2rem', color: '#1e3a8a' }}>🎞️ Movies Directed:</h2>
      <ul style={{ paddingLeft: '1.5rem' }}>
        {movies.map((movie) => (
          <li key={movie.id} style={{ marginBottom: '0.5rem' }}>
            {movie.title} ({movie.releaseYear})
          </li>
        ))}
      </ul>
    </div>
  );
  
}
