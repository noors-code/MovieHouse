import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const trendingMovies = [...data.movies].sort((a, b) => b.rating - a.rating);

  return {
    props: {
      trendingMovies,
    },
    revalidate: 10,
  };
}

export default function HomePage({ trendingMovies }) {
  const router = useRouter();

  const goToGenres = () => router.push('/genres');
  const goToMovies = () => router.push('/movies');

  const helpSections = [
    { name: 'Help', slug: '' },
    { name: 'FAQs', slug: 'faqs' },
    { name: 'Contact', slug: 'contact' },
    { name: 'Privacy', slug: 'privacy' },
  ];

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
      <Head>
        <title>Movie House | Trending</title>
      </Head>

      <h1 style={{ textAlign: 'center', color: '#1e40af' }}>🎬 Trending Movies</h1>

      <ul>
        {trendingMovies.map((movie) => (
          <li key={movie.id} style={{ marginBottom: '2rem' }}>
            <Link href={`/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2 style={{ color: '#1e3a8a' }}>{movie.title}</h2>
            </Link>
            <p>{movie.description}</p>
            <p><strong>⭐ Rating:</strong> {movie.rating}</p>

            {movie.videoUrl && (
              <video width="320" height="240" controls style={{ marginTop: '1rem' }}>
                <source src={movie.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={goToGenres}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Browse Genres
        </button>
        <button
          onClick={goToMovies}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Movies
        </button>
      </div>

      <div>
        <h2 style={{
  backgroundColor: '#f9f9f9', }}>❓ Help Sections</h2>
        <ul>
          {helpSections.map((section) => (
            <li key={section.slug} style={{ marginBottom: '1rem' }}>
              <Link href={`/help/${section.slug}`}>
                <button
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {section.name}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
