import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useState } from 'react';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public/data/movies.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return {
    props: {
      movies: data.movies,
      genres: data.genres,
      directors: data.directors,
    },
    revalidate: 10,
  };
}

export default function MoviesPage({ movies, genres, directors }) {
  const [selectedGenre, setSelectedGenre] = useState('');

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genreId === selectedGenre)
    : movies;

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
      <h1 style={{ textAlign: 'center', color: '#1e40af' }}>🎥 All Movies</h1>

      <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>
        Filter by Genre:
        <select
          onChange={(e) => setSelectedGenre(e.target.value)}
          value={selectedGenre}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1px solid #ccc'
          }}
        >
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </label>

      <div style={{ marginTop: '2rem' }}>
        {filteredMovies.map((movie) => {
          const director = directors.find((d) => d.id === movie.directorId);

          return (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  backgroundColor: '#fff',
                  transition: 'box-shadow 0.3s ease',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer'
                }}
              >
                <h3 style={{ color: '#1e3a8a' }}>{movie.title}</h3>
                <p>📅 Release Year: {movie.releaseYear}</p>
                <p>⭐ Rating: {movie.rating}</p>
                <p><strong>🎬 Director:</strong> {director?.name || 'Unknown'}</p>
                <p style={{ color: '#0070f3', textDecoration: 'underline', marginTop: '0.5rem' }}>
                  Click for Details
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}