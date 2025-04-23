

import Link from 'next/link';

const Custom404 = () => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#1e40af' }}>Oops! Page not found.</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link href="/">
        <button style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default Custom404;
