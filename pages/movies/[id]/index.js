import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'public/data/movies.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const paths = data.movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'public/data/movies.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const movie = data.movies.find((m) => m.id === params.id);

  if (!movie) {
    return { notFound: true };
  }

  const director = data.directors.find((d) => d.id === movie.directorId);

  return {
    props: {
      movie,
      directorName: director ? director.name : 'Unknown Director',
    },
    revalidate: 10,
  };
}


export default function MovieDetail({ movie, directorName }) {
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
      <h1 style={{ textAlign: 'center', color: '#1e40af' }}>{movie.title}</h1>

      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p>
        <strong>Director:</strong>{' '}
        <Link href={`/movies/${movie.directorId}/director`} style={{ color: '#0070f3', textDecoration: 'underline' }}>
          {directorName}
        </Link>
      </p>

      <p style={{ marginTop: '2rem' }}>
        <Link href="/movies" style={{ color: '#0070f3', textDecoration: 'none' }}>
          ← Back to All Movies
        </Link>
      </p>
    </div>
  );
}

