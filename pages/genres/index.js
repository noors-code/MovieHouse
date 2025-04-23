import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function GenresPage({ genres }) {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ color: '#1e40af', textAlign: 'center' }}>🎭 All Movie Genres</h1>

      <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc', marginTop: '1rem' }}>
        {genres.map((genre) => (
          <li key={genre.id} style={{ marginBottom: '0.5rem' }}>
            <Link
              href={`/genres/${genre.id}`}
              style={{
                textDecoration: 'none',
                color: '#0070f3',
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'movies.json'); // ✅ make sure file exists here
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  return {
    props: {
      genres: data.genres || [], // fallback in case genres is undefined
    },
  };
}
