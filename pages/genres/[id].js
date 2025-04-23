import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function GenreDetailPage({ genreName, movies }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎬 Movies in {genreName}</h1>

      {movies.length === 0 ? (
        <p>No movies found for this genre.</p>
      ) : (
        <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
          {movies.map((movie) => (
            <li key={movie.id} style={{ marginBottom: '0.5rem' }}>
              <Link
                href={`/movies/${movie.id}`}
                style={{ textDecoration: 'none', color: '#fffe' }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p style={{ marginTop: '2rem' }}>
        <Link href="/genres" style={{ color: '#0070f3' }}>
          &larr; Back to Genres
        </Link>
      </p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const genreId = context.params.id;

  const filePath = path.join(process.cwd(), 'public', 'data', 'movies.json');

  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  // Safely find genre
  const genre = data.genres.find(g => g.id === genreId);


  // Filter movies by genre ID
  const filteredMovies = data.movies.filter(
    movie => movie.genreId === genreId
  );
  

  return {
    props: {
      genre: genre ?? null,
      movies: filteredMovies,
    },
  };
}





